<template>
    <div id="todolist" class="table">
        <h1>My Todo List</h1>
        <table>
          <tr>
            <th class="column-0"> </th>
            <th class="column-1">To Do:</th>
            <th class="column-2">By:</th>
            <th class="column-3"> </th>       
          </tr>
          <tr v-for="(item, index) in items" v-bind:key="index">
            <td><input type="checkbox" v-on:change="completeToDoItem(item.id)" v-bind:checked="item.complete"></td>
            <td>{{item.data}}</td>
            <td>{{ new Date(item.date).toLocaleString()}}</td>
            <td><button v-on:click="deleteToDoItem(item.id)">Delete</button></td>
          </tr>
        </table>
        {{getItems()}}
        <br>
        <a class="button is-primary" v-on:click="showAddToDoItemModal()">
                <strong>Add Item</strong>
              </a>
        <AddToDoItem v-bind:is-showing="showAddToDoItem" v-on:success="successAddToDoItem()" v-on:cancel="cancelAddToDoItem()"/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import AddToDoItem from "@/components/AddToDoItem.vue";
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { iToDoItem } from "../models/toDoItem.interface";
import { ToDo } from "../../../api/entity";
@Component({
  components: {
    AddToDoItem
  }
})
export default class ToDos extends Vue {
  public showAddToDoItem: boolean = false;
  public items: ToDo[] = [];
  getItems() {
    if (this.$store.state.userToken) {
      axios.get(APIConfig.buildUrl("/todos/load"), {
        headers: {
          token: this.$store.state.userToken
        }
      })
      .then((response) => {
          this.items = response.data;
      });
    }
  }
  showAddToDoItemModal() {
      this.showAddToDoItem = true;
  }
  successAddToDoItem() {
      this.showAddToDoItem = false;
      this.getItems();
  }
  cancelAddToDoItem() {
      this.showAddToDoItem = false;
      this.getItems();
  }
  completeToDoItem(id: number) {
    axios.put(APIConfig.buildUrl("/todos/" + id), { complete: true }, {
      headers: {
        token: this.$store.state.userToken
      }
    })
  }
  deleteToDoItem(id: number) {
    axios.delete(APIConfig.buildUrl("/todos/" + id), {
      headers: {
        token: this.$store.state.userToken
      }
      }).then(() => {
        this.getItems();
    });
  }
  created() {
    this.getItems();
  }
  beforeRouteUpdate(to: string, from: string, next: string) {
    if (to == "todos") {
      this.getItems();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.table {
  display: table;
}
.row {
  display: table-row;
}
.cell {
  display: table-cell;
  padding: 20px;
}
.cell.list {
  border-style: outset;
  border-color: blue;
}
</style>