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
    {{loadToDos()}}
    <h2>My ToDoList:</h2>
    <table>
      <tr>
        <th>Todo   </th>
        <th>Duedate   </th>
        <th>Delete   </th>
      </tr>
      <tr v-for="(todo, index) in mytodos" v-bind:key="index" style="width:100%">
        <td>{{ todo.title }}</td>
        <td>{{ new Date(todo.ddate).toDateString() }}</td>
        <td>
          <button class="button button3" v-on:click="deleteItem(todo.id)">Delete?</button>
        </td>
      </tr>
    </table>

    <!-- <button class="button button2" v-on:click="addtoItem">Add</button> -->
    <a class="button button2" v-if="isLoggedIn" v-on:click="showNewItmModal()"><strong>Add</strong></a>

    <newItm
      v-bind:is-showing="showNewItm"
      v-on:success="success()"
      v-on:cancel="cancel()"
    />
    <!-- <button class="button button2" v-on:click="addtoItem()">Save</button>
    <button class="button button3">Cancel</button> -->
   
  </div>
</template>

<script lang="ts">
import newItm from "@/components/newitem.vue";

import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component, Prop, Vue } from "vue-property-decorator";
import Modal from "./Modal.vue";
import { itodo } from "../models/todo.interface";


@Component({
  components: {
    newItm
  }
})
export default class ToDos extends Vue {
  public shownt: boolean = false;
  public showNewItm: boolean = false;
  mytodos: ToDo[] = [];
  get isLoggedIn(): boolean {
    return !!this.$store.state.user;
  }
  loadToDos() {
    if (this.$store.state.user) {
      axios.get(APIConfig.buildUrl("/todos"), {
        headers: {token: this.$store.state.userToken}
      })
      .then((response) => {
        this.mytodos = response.data;
      })
      .catch((errorResponse: any) => {
        this.mytodos = errorResponse.response.data.reason;
      });
    }
  }
  // forms: f = {title: "", ddate: ""};
  // addtoItem(title : string, ddate : string) {
  //   this.mytodos.push({ name: this.forms.title, duedate: this.forms.ddate });
  //   this.forms.title="";
  //   this.forms.ddate="";
  // }
  deleteItem(index : number) {
     axios.delete(APIConfig.buildUrl("/todos/"+index), 
     {headers: {token: this.$store.state.userToken}})
     .then(() => {
       this.loadToDos();
     })
  }
  showNewItmModal() {
    this.showNewItm = true;
  }
  success() {
    this.showNewItm = false;
  }
  cancel() {
    this.showNewItm = false;
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
table, td, th {
  border: 1px solid black;
}
table {
  border-collapse: collapse;
  width: 100%;
}
th {
  text-align: left;
}
</style>
