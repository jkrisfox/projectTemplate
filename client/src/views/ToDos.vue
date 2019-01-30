<template>
    <div id="todolist" class="table">
        <h1>My Todo List</h1>
        
        <table>
          <tr>
            <th class="column-1">To Do:</th>
            <th class="column-2">By:</th>       
          </tr>
          <tr v-for="item in items">
            <td>{{item.data}}</td>
            <td>{{item.date}}</td>
          </tr>
        </table>
        
        <br>
        <a class="button is-primary" v-on:click="showAddToDoItemModal()">
                <strong>Add Item</strong>
              </a>
        <a class="button is-primary" v-on:click="getItems()">
                <strong>Get Items</strong>
              </a>
        <AddToDoItem v-bind:is-showing="showAddToDoItem" v-on:success="successAddToDoItem()" v-on:cancel="cancelAddToDoItem()"/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import AddToDoItem from "@/components/AddToDoItem.vue";
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { iToDoItem } from "../models/user.interface";

@Component({
  components: {
    AddToDoItem
  }
})
export default class ToDos extends Vue {
  private msg!: string;
  public showAddToDoItem: boolean = false;
  public items: Object[] = [];

  // mounted: function () {
    
  //     this.getItems();
    
  // }

  getItems() {
    axios.get(APIConfig.buildUrl('/todoitems'), {
    }).then((response: AxiosResponse<[iToDoItem]>) => {
      this.items = response.data.items;
    }).catch((reason: any) => {
      console.log(reason);
    })
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
