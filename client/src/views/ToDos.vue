<template>
  <div>
    <modal
      v-bind:is-showing="isVisible"
      title="Add To Do Item"
      success-button="Add"
      v-on:success="addToDoItem"
      v-on:cancel="cancel"
    >
      <form v-on:submit.prevent="onSubmit">
        <div class="field">
          <label class="label">Add Item</label>
          <div class="control">
            <input class="input" type="text" placeholder="add item" v-model="newItem.name">
          </div>
        </div>
        <div class="field">
          <label class="label">Due Date</label>
          <div class="control">
            <input class="input" type="date" placeholder="date" v-model="newItem.duedate">
          </div>
        </div>
      </form>
    </modal>
    <h1 id="to-do-header">My To-Do List</h1>
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Due Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(todo, index) in mytodos" v-bind:key="index" class="to-do-row">
          <td class="option-col">
            <input type="checkbox" name="option{index}">
            {{ todo.name }}
            <br>
          </td>
          <td class="due-date">{{ todo.duedate }}</td>
          <td class="delete">
            <button v-on:click="deleteToDoItem(index)" class="button">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button class="button" v-on:click="showAddModal">Add</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import Modal from "../components/Modal.vue";

@Component({
  components: {
    Modal
  }
})
export default class ToDos extends Vue {
  @Prop(Boolean) isVisible = false;
  mytodos: ToDo[] = [
    { name: "Item one", duedate: new Date() },
    { name: "Item two", duedate: new Date() }
  ];

  newItem: ToDo = {
    name: "",
    duedate: undefined,
  };

  showAddModal() {
    this.isVisible = true;
  }

  hideAddModal() {
    this.isVisible = false;
  }

  addToDoItem() {
    this.mytodos.push({
      name: this.newItem.name,
      duedate: this.newItem.duedate
    });
    this.hideAddModal();
  }

  deleteToDoItem(index: number) {
    this.mytodos.splice(index, 1);
  }

  cancel() {
    this.hideAddModal();
  }
}

interface ToDo {
  name: string;
  duedate: Date | undefined;
}
</script>

<style scoped>
table {
  width: 500px;
  margin-left: 30px;
}

th {
  text-align: left;
}

.due-date {
  font: normal;
}

.option-col {
  text-align: left;
}

.delete {
  text-align: center;
}

.delete-button {
  background-color: firebrick;
}

.add-button {
  margin-left: 35px;
  background-color: lightgreen;
}

.cancel-button {
  background-color: lightgray;
}

.add-todo-item {
  text-align: left;
}

#to-do-header {
  margin-bottom: 10px;
}
</style>

