<template>
  <div>
    <h1 class="title">Todo List</h1>
    <div class="todos">
      <table>
        <tr>
          <td>To Do Item</td>
          <td>Due Date</td>
        </tr>
        <tr v-for="(todo, index) in mytodos" v-bind:key="index">
          <td>{{ todo.name }}</td>
          <td>{{ todo.duedate }}</td>
          <td>
              <button v-on:click="deleteItem(todo)"></button>
          </td>
        </tr>
        <tr>
          <td><input type="text" v-model="toDoName" placeholder="Enter Item"></td>
          <td><input type="text" v-model="duedate" placeholder="MM DD YY"></td>
          <td><button class="addButton" v-on:click="addTodoItem"></button></td>
        </tr>           
      </table>  
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class ToDos extends Vue {
  toDoName: string = "";
  duedate: string = "";
  mytodos: ToDo[] = [];
  
  formatDate(dueDate: string) {
    var formatDate = dueDate.split(' ');
    return formatDate[0] + "-" + formatDate[1] + "-" + formatDate[2];
  }

  addTodoItem() {
    this.mytodos.push({
        name: this.toDoName,
        duedate: this.formatDate(this.duedate)
    })
    this.toDoName = "";
    this.duedate = "";
  }

  deleteItem(todo: ToDo) {
    var target = this.mytodos.filter(function(mytodo) {
      return mytodo != todo;
    });
    this.mytodos = target;
  }
}
interface ToDo {
  name: string;
  duedate: string | undefined;
}
</script>
