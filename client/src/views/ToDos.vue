<template>
  <div class="todos">
    <div>Hi from todos</div>
    <table>
      <tr v-for="(todo, index) in mytodos" v-bind:key="index">
        <th>{{todo.name}}</th>
        <th>{{todo.duedate.toLocaleString().split(',')[0]}}</th>
      </tr>
    </table>
    <input class="input" type="text" placeholder="new item" v-model="todo.name"/>
    <input class="input" type="date" v-model="todo.duedate"/>
    <button class="button" v-on:click="addTodoItem">Add</button>
    <button class="button" v-on:click="deleteTodoItem">Delete</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from "vue-property-decorator";
@Component
export default class ToDos extends Vue {
  todo: ToDo = {
    name: "",
    duedate: undefined
  };
  mytodos: ToDo[] = [
    {name: "todo one", duedate: new Date('2011-04-11')},
    {name: "todo two", duedate: new Date('2011-04-11')},
    {name: "todo three", duedate: new Date('2011-04-11')}
  ];
  addTodoItem() {
    const duedate = new Date(this.todo.duedate);
    this.mytodos.push({name: this.todo.name, duedate: duedate});
  }
  deleteTodoItem() {
    this.mytodos.pop();
  }
}

interface ToDo {
  name: string;
  duedate: Date;
}
</script>

<style scoped>
  table, th, td {
    border: 1px solid black;
    padding: 5px;
  }
</style>