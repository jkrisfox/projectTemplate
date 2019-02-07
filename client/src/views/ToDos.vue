<template>
  <div class="todos">
    <div>Hi from todos</div>

    <div v-for="(todo, index) in mytodos" v-bind:key="index">
      <span>{{ todo.name }}</span>
      <span>{{ todo.duedate }}</span>
    </div>
    <button class="button" v-on:click="addTodoItem">Add</button>
  </div>
  
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class ToDos extends Vue {
  mytodos: ToDo[] = [
    { name: "Tod one", duedate: undefined },
    { name: "todo two", duedate: undefined },
    { name: "todo three", duedate: undefined }
  ];
  addTodoItem() {
    this.mytodos.push({
      name: `todo${new Date().getTime()}`,
      duedate: undefined
    });
  }
}

interface ToDo {
  name: string;
  duedate: Date | undefined;
}
</script>

<style scoped>
</style>
