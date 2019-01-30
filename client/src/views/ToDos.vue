<template>
    <div id="todolist" class="table">
        <h1>My Todo List</h1>
        <div class="row">
            <div class="cell list">
                <input type="checkbox">Todo Item 1
            </div>
            <div class="cell list">
                <p>Item 1 Due Date</p>
            </div>
            <div class="cell list">
                <button class="delete-button">Delete</button>
            </div>
        </div>
        <div class="row">
            <div class="cell list">
                <input type="checkbox">Todo Item 2, which is a longer todo item and has lot of words
            </div>
            <div class="cell list">
                <p>Item 2 Due Date</p>
            </div>
            <div class="cell list">
                <button class="delete-button">Delete</button>
            </div>
        </div>
        <div class="row">
            <div class="cell list">
                <input type="checkbox">Todo Item 3
            </div>
            <div class="cell list">
                <p>Item 4 Due Date</p>
            </div>
            <div class="cell list">
                <button class="delete-button">Delete</button>
            </div>
        </div>
        <div class="row">
            <div class="cell list">
                <input type="checkbox">Todo Item 4
            </div>
            <div class="cell list">
                <p>Item 4 Due Date</p>
            </div>
            <div class="cell list">
                <button class="delete-button">Delete</button>
            </div>
        </div>
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

@Component({
  components: {
    AddToDoItem
  }
})
export default class ToDos extends Vue {
  private msg!: string;
  public showAddToDoItem: boolean = false;

  showAddToDoItemModal() {
      this.showAddToDoItem = true;
  }
  successAddToDoItem() {
      this.showAddToDoItem = false;
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
