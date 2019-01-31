<template>
<div class = 'todos'>
      <div>Hi from todos</div?
         <div v-for="(todo, index) in mytodos" v-bind:key="index">
            <span>{{ todo.name }}</span>
            <span>{{ todo.duedate }}</span>
         </div>
         <button v-on:click="addTodoItem">Add</button>
      </div>
   </template>

<script lang = "ts">
import Vue from 'vue'
import { Component } from "vue property-decorator";
@Component
export class ToDos extends Vue {
   mytodos: ToDo[] = [
      { name: "Todo one", duedate: undefined },
      { name: "todo two", duedate: undefined }
      { name: "Todo three", duedate: undefined}
   ];
   addTodoItem() {
      this.mytodos.push({name: 'todo${new Date().getTime()}', duedate: undefined})
   }

   newToDo: ToDoForm = {
      emailAddress: "",
      password: ""Vue};
   }
}
</script>