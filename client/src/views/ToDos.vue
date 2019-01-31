<template>
  <div id="app">

    <!-- <h2>New To-Do Item</h2>
    <form id="app">
      <label for="title">Title</label>
      <input type="text" id="title" v-model="title" placeholder="title">
      <label for="duedate">Due Date</label>
      <input type="text" id="ddate" v-model="ddate" placeholder="due date">
      <button class="button button2" @click="addtoItem">Add</button>
    </form> -->

    <h2>My ToDoList:</h2>

    <table v-for="(todo, index) in mytodos" v-bind:key="index" style="width:100%">
      <tr>
        <th>Todo item   </th>
        <th>Due date   </th>
        <th>Delete   </th>
      </tr>
      <tr>
        <td>{{ todo.name }}</td>
        <td>{{ todo.duedate }}</td>
        <td>
          <button class="button button3" v-on:click="deleteItem">Delete?</button>
        </td>
      </tr>
    </table>
    <button class="button button2" v-on:click="addtoItem">Add</button>
    <a href="\newItm" class="button button2">Add</a>


    <!-- <button class="button button2" v-on:click="addtoItem()">Save</button>
    <button class="button button3">Cancel</button> -->
   
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class ToDos extends Vue {
  mytodos: ToDo[] = [
    { name: "sleep", duedate: "Dec/17/2001" },
    { name: "A program", duedate: "Jan/30/2019" }
	];
  addtoItem(title : string, ddate : string) {
    this.mytodos.push({ name: "title", duedate: "ddate" });
  }
  deleteItem() {
    this.mytodos.pop();
  }
}


interface ToDo {
  name: string | null;
  duedate: string | undefined | null;
}
</script>

<style scoped>
.button {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  cursor: pointer;
}
.button2 {
  background-color: white;
  color: black;
  border: 2px solid #008cba;
}

.button2:hover {
  background-color: #008cba;
  color: white;
}
.button3 {
  background-color: white;
  color: black;
  border: 2px solid #f44336;
}

.button3:hover {
  background-color: #f44336;
  color: white;
}
table {
  border-collapse: collapse;
  border: 1px solid black;
}
</style>