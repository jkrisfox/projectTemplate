<template>
  <div class="todos">
    <div>Hi from todos</div>
    <table>
      <tr>
        <th>Title</th>
        <th>Due Date</th>
        <th>Complete</th>
      </tr>
      <tr v-for="(todo, index) in mytodos" v-bind:key="index">
        <th>{{todo.title}}</th>
        <th>{{todo.dueDate.toLocaleString().split(',')[0]}}</th>
        <th>
          <input 
            type="checkbox" 
            :id="todo.id"
            :checked="todo.complete"
            v-on:click="editTodoItem" 
          />
        </th>
      </tr>
    </table>
    <input class="input" type="text" placeholder="new item" v-model="todo.title"/>
    <input class="input" type="date" v-model="todo.dueDate"/>
    <button class="button" v-on:click="addTodoItem">Add</button>
    <button class="button" v-on:click="deleteTodoItem">Delete</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component } from "vue-property-decorator";
@Component
export default class ToDos extends Vue {
  todo: ToDo = {
    id: undefined,
    title: "",
    dueDate: undefined,
    complete: false
  };
  mytodos: ToDo[] = [];
  error: string | boolean = false;

  mounted() {
    console.log("component has mounted");
    axios.get(APIConfig.buildUrl("/todos"), {
      headers: { token: this.$store.state.userToken }
    }).then((response: AxiosResponse) => {
      const todos = response.data.todos;
      todos.forEach((todo: any) => {
        todo.dueDate = new Date(todo.dueDate);
      });
      this.mytodos = todos;
    }).catch((error: any) => {
      console.log(error.response.data);
      this.error = error.response.data;
    });
  }

  addTodoItem() {
    if (!this.todo.dueDate || !this.todo.title) {
      return;
    }
    axios.post(APIConfig.buildUrl("/todos"), {
      title: this.todo.title,
      dueDate: new Date(this.todo.dueDate + 'T00:00:00'),
      complete: false
    }, {
      headers: { token: this.$store.state.userToken }
    }).then((response: AxiosResponse) => {
      const newTodo = response.data.todo;
      newTodo.dueDate = new Date(newTodo.dueDate);
      this.mytodos.push(newTodo);
      this.$emit("success");
    }).catch((error: any) => {
      console.log(error.response.data);
      this.error = error.response.data;
    });
  }

  deleteTodoItem() {
    const id = this.mytodos[this.mytodos.length - 1].id;
    axios.delete(APIConfig.buildUrl(`/todos/${id}`), {
      headers: { token: this.$store.state.userToken }
    }).then((response: AxiosResponse) => {
      this.mytodos.pop();
      this.$emit("success");
    }).catch((error: any) => {
      console.log(error.response.data);
      this.error = error.response.data;
    });
  }

  editTodoItem(event: any) {
    event.preventDefault();
    const todo = this.mytodos.find((todo: ToDo) => todo.id == event.target.id);
    if (!todo) return;
    axios.patch(APIConfig.buildUrl(`/todos/${event.target.id}`), {
      complete: !todo.complete
    }, {
      headers: { token: this.$store.state.userToken }
    }).then((response: AxiosResponse) => {
      todo.complete = response.data.todo.complete;
      this.$emit("success");
    }).catch((error: any) => {
      console.log(error.response.data);
      this.error = error.response.data;
    })
  }
}

interface ToDo {
  id: number | undefined;
  title: string;
  dueDate: Date | undefined;
  complete: boolean;
}
</script>

<style scoped>
table,
th,
td {
  border: 1px solid black;
  padding: 5px;
}
</style>
