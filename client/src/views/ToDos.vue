<template>
<div>

<section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title has-text-centered">
          To Do List
        </h1>
      </div>
    </div>
</section>
{{redirect()}}
<div class="columns">
  <div class="column">
    <section >
        <b-field >
            <b-input placeholder="New To Do" expanded
            type="text"
            v-model="todo.title">
            </b-input>

            <b-datepicker
              placeholder="Type or select a date..."
              icon="calendar-today"
              editable
              v-model="todo.dueDate">
            </b-datepicker>

            <p class="control">
                <button class="button is-link" v-on:click="addTodoItem">Add</button>
            </p>
        </b-field>
    </section>
    <table class="table is-fullwidth is-hoverable">
       <thead>
        <th> </th>
         <th>Title</th>
         <th>Due Date</th>
         <th> </th>
       </thead>
      <tr v-for="(todo, index) in todos" v-bind:key="index">
        <td><b-checkbox> </b-checkbox></td>
        <td>{{todo.title}}</td>
        <td>{{todo.dueDate}}</td>
        <td><a class="button is-danger" v-on:click="deleteToDoItem(index)">Delete</a></td>
      </tr>
    </table>
  </div>
</div>

</div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import {iTodo} from "../models/todos.interface";
import {iUser} from "../models/user.interface";
import { APIConfig } from "../utils/api.utils";
import axios, { AxiosResponse } from "axios";

@Component
export default class ToDos extends Vue {

  user!: iUser | null;
  error: string | boolean = false;

  todo: iTodo = {
    id: 0,
    title: "",
    dueDate: undefined,
    complete: false,
    user: this.user,
  }

  todos: iTodo[] = [];

  mounted() {
    axios
      .get(APIConfig.buildUrl("/todos"))
      .then((response: AxiosResponse<{todos: iTodo[]}>) => {
         this.todos = response.data.todos;
      })
      .catch((errorResponse: any) => {
        this.error = errorResponse.response.data.reason;
      });
  }

  addTodoItem() {
    debugger;
    axios
      .post(APIConfig.buildUrl("/todos"), 
        this.todo
      , {headers: {token: this.$store.state.userToken}})
      .then((response: AxiosResponse<{todo: iTodo}>) => {
         this.todos.push(response.data.todo);
      })
      .catch((errorResponse: any) => {
        this.error = errorResponse.response.data.reason;
      });
  }

  redirect(){
    if (!this.$store.state.user) {
      this.$router.push({ name: "home" });
    }
  }

  deleteToDoItem(index : number){
    const todo = this.todos[index];
    axios.delete(APIConfig.buildUrl(`/todos/${todo.id}`)).then(() => {
          this.todos.splice(index, 1);
    })
  }



}

</script>


<style scoped>
</style>
