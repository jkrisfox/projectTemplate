<template>
  <div id="app">

    <!-- <h2>New To-Do Item</h2>
    <form id="app">
      <label for="title">Title</label>
      <input type="text" id="title" placeholder="title" v-model="forms.title">
      <label for="duedate">Due Date</label>
      <input type="text" id="ddate" placeholder="due date" v-model="forms.ddate">

    </form>
    <button class="button button2" @click="addtoItem">Add</button> -->

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
          <button class="button button3" v-on:click="deleteItem(index)">Delete?</button>
        </td>
      </tr>
    </table>
    <!-- <button class="button button2" v-on:click="addtoItem">Add</button> -->
    <a class="button is-primary" v-on:click="showSignupModal()"><strong>Add</strong></a>

    <Signup
      v-bind:is-showing="showSignup"
      v-on:success="successSignup()"
      v-on:cancel="cancelSignup()"
    />
    <!-- <button class="button button2" v-on:click="addtoItem()">Save</button>
    <button class="button button3">Cancel</button> -->
   
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Signup from "@/components/newitem.vue";

@Component({
  components: {
    Signup
  }
})
export default class ToDos extends Vue {
  public shownt: boolean = false;
  public showSignup: boolean = false;
  mytodos: ToDo[] = [
    { name: "sleep", duedate: "Dec/17/2001" },
    { name: "A program", duedate: "Jan/30/2019" }
  ];
  forms: f = {title: "", ddate: ""};
  addtoItem(title : string, ddate : string) {
    this.mytodos.push({ name: this.forms.title, duedate: this.forms.ddate });
    this.forms.title="";
    this.forms.ddate="";
  }
  deleteItem(index : number) {
    this.mytodos.splice(index,1);
  }

  showSignupModal() {
    this.showSignup = true;
  }

  successSignup() {
    this.showSignup = false;
  }

  cancelSignup() {
    this.showSignup = false;
  }
}

export interface f {
  title: string;
  ddate: string;
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
