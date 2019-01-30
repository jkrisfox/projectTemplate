<template>
<div class="todos">
  <body>
    <H1>My Todo List</H1>

    <table>
      <tr>
        <th>Check</th>
        <th>Todo Item</th>
        <th>Due Date</th>
        <th>Delete</th>
      </tr>
      <tr v-for="(todo, index) in mytodos" v-bind:key="index">
        <td>
          <input type="checkbox">
        </td>
        <td>{{ todo.name }}</td>
        <td>{{ todo.duedate }}</td>
        <td>
          <button class="button">Delete</button>
        </td>
      </tr>
    </table>
    <br>

    <body>
      <form v-on:submit.prevent="onSubmit">
        <H1>New Todo Item</H1>Name
        <!--<input class="input" type="text" v-model="item.name">-->
        <input type="text" v-model="item.name"/>
        <br>Due Date
        <input type="text" v-model="item.duedate"/>
        <br>
        <button class="button" v-on:click="addTodoItem">Add</button>      
      </form>
    </body>
  </body>
</div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class ToDos extends Vue {
item: ToDo = {
    name: "",
    duedate: ""
  };

  mytodos: ToDo[] = [
    { name: "Laundry", duedate: "1/31/19" }
  ];
  addTodoItem() {
    this.mytodos.push({
      name: this.item.name,
      duedate: this.item.duedate
    });

  }
}

export interface ToDo {
  name: string;
  duedate: string | undefined;
}
</script>

<style scoped>
table,
th,
td {
  border: 1px solid black;
}
</style>
