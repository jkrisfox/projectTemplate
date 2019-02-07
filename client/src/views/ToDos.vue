<template>
  <div class="todo">
    <table class="table is-bordered is-striped">
      <thead class="is-primary">
      <tr> <th>Task</th><th>Due Date</th><th>Completed</th><th></th></tr>
      </thead>
      <tbody>
      <tr v-for="(todo, index) in todos" v-bind:key="index">
        <td>{{todo.title}}</td>
        <td>{{todo.dueDate}}</td>
        <td>
          <div class="control">
            <button v-if="!todo.complete" class="button is-primary is-small" v-on:click="completeItem(todo)">&#10003;</button>
            <button v-if="todo.complete" class="button is-warning is-small" v-on:click="completeItem(todo)">X</button>
          </div>
        </td>
        <td>
            <button class="button is-danger is-small" v-on:click="deleteItem(todo.id)">-</button>

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
              <p v-if="nameError" class="help is-danger">Task name required</p>
            </div>
          </td>
          <td>
            <div class="field">
            <div class="control">
              <input class="input" type="date" placeholder="Due Date" v-model="newDueDate"/>
            </div>
            <p v-if="dateError" class="help is-danger">Date is required</p>
            </div>
          </td>
          <td></td>
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
import { Component, Watch } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { iToDo } from "../models/todo.interface";
import { ToDoList } from "../models/todoList";
import { iUser } from '../models/user.interface';

@Component
export default class ToDos extends Vue {
  error: string | boolean = false;
  nameError: string | boolean = false;
  dateError: string | boolean = false;
  todos: iToDo[] = [];
  newToDoTitle: string = "";
  newDueDate: string = "";

  addItem() {
    this.error = false;
    this.nameError = this.newToDoTitle === "";
    this.dateError = this.newDueDate === "";
    if(this.dateError || this.nameError) {
      return;
    }

    axios
      .post(
        APIConfig.buildUrl("/todos"),
        {
          title: this.newToDoTitle,
          dueDate: this.newDueDate,
          completed: false
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
    axios
      .delete(APIConfig.buildUrl(`/todos/${itemId}`), {
        headers: { token: this.$store.state.userToken }
      })
      .then((response: AxiosResponse<ToDoResponse>) => {
        this.todos = this.todos.filter((t:iToDo) => {
          return t.id != response.data.id;
        })
        this.$emit("success");
      })
      .catch(response => {
        this.error = response.message;
      });
  }

  completeItem(item: iToDo) {
    this.error = false;
    axios
      .put(APIConfig.buildUrl(`/todos/${item.id}`), {
          title: item.title,
          dueDate: item.dueDate,
          completed: !item.complete
      }, {
        headers: { token: this.$store.state.userToken }
      })
      .then((response: AxiosResponse<ToDoResponse>) => {
        this.todos.forEach((item: iToDo) => {
          if(item.id == response.data.id) {
            item.complete = response.data.complete;
          }
        })
        this.$emit("success");
      })
      .catch(response => {
        this.error = response.message;
      });
  }

  get token() {
    return this.$store.state.userToken;
  }

  fetchList() {
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

  @Watch('token')
  handleTokenChange(oldToken: string, newToken: string) {
    if(!newToken){
      this.todos = [];
    } else if (oldToken != newToken){
      this.fetchList();
    }
  }
}

interface ToDoResponse {
  title: string,
  dueDate: string,
  id: number,
  complete: boolean,
  user: iUser;
}

function reorderDate(date: string) {
  let sDate = date.split("-");
  return sDate[2] + "-" + sDate[1] + "-" + sDate[0];
}  
</script>

<style scoped>
.todo {
  padding-top: 10% ;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 150%;
}
</style>

