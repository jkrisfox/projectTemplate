<template>
  <div class="todo">
    <table class="table is-bordered is-striped">
      <thead class="is-primary">
      <tr> <th>Task</th><th>Due Date</th><th></th></tr>
      </thead>
      <tbody>
      <tr v-for="(todo, index) in todos" v-bind:key="index">
        <td>{{todo.title}}</td>
        <td>{{todo.dueDate}}</td>
        <td>
          <div class="control">
            <button class="button is-danger is-small" v-on:click="deleteItem(todo.id)">-</button>
          </div>
        </td>
      </tr> 
      </tbody>
      <tfoot>
        <tr>
          <td>
            <div class="field">
            <div class="control">
              <input class="input" type="text" placeholder="New Task" v-model="newToDoTitle"/>
            </div>
            <!-- <p v-if="nameError" class="help is-danger">Task name required</p> -->
            </div>
          </td>
          <td>
            <div class="field">
            <div class="control">
              <input class="input" type="date" placeholder="Due Date" v-model="newDueDate"/>
            </div>
            <!-- <p v-if="dateError" class="help is-danger">Date is required</p> -->
            </div>
          </td>
          <td>
            <div class="control">
              <button class="button is-info is-small" v-on:click="addItem">+</button>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { iToDo } from "../models/todo.interface";
import { ToDoList } from "../models/todoList";

@Component
export default class ToDos extends Vue {
  error: string | boolean = false;
  todos: iToDo[] = [];
  newToDoTitle: string = "";
  newDueDate: string = "";

  created() {
    this.error = false;
    axios
      .get(APIConfig.buildUrl("/todos"), {
        headers: { token: this.$store.state.userToken }
      })
      .then((response: AxiosResponse<{ todos: ToDoList }>) => {
        this.todos = response.data.todos.list;
        this.$emit("success");
      })
      .catch(response => {
        this.error = response.message;
      });
  }

  addItem() {
    this.error = false;
    axios
      .post(
        APIConfig.buildUrl("/todos"),
        {
          title: this.newToDoTitle,
          dueDate: this.newDueDate
        },
        { headers: { token: this.$store.state.userToken } }
      )
      .then((response: AxiosResponse<{ savedTodo: iToDo }>) => {
        this.todos.push(response.data.savedTodo);
        this.newToDoTitle = "";
        this.newDueDate = "";
      })
      .catch(response => {
        this.error = response.message;
      });
  }

  deleteItem(itemId: number) {
    this.error = false;
    console.log(this.todos);
    axios
      .delete(APIConfig.buildUrl(`/todos/${itemId}`), {
        headers: { token: this.$store.state.userToken }
      })
      .then((response: AxiosResponse<{ todo: iToDo }>) => {
        this.todos = this.todos.filter((t: iToDo) => {
          console.log(response.data.todo.id);
          return t.id != response.data.todo.id;
        });
        this.$emit("success");
      })
      .catch(response => {
        this.error = response.message;
      });
  }
}

function reorderDate(date: string) {
  let sDate = date.split("-");
  return sDate[2] + "-" + sDate[1] + "-" + sDate[0];
}
</script>
