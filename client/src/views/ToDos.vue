<template>
  <div class="todo">
    <table class="table is-bordered is-striped">
      <thead class="is-primary">
      <tr> <th>Task</th><th>Due Date</th><th></th></tr>
      </thead>
      <tbody>
      <tr v-for="(todo, index) in mytodos" v-bind:key="index">
        <td>{{todo.name}}</td>
        <td>{{todo.duedate}}</td>
        <td>
          <div class="control">
            <button class="button is-danger is-small" v-on:click="deleteFromList(index)">-</button>
          </div>
        </td>
      </tr> 
      </tbody>
      <tfoot>
        <tr>
          <td>
            <div class="field">
            <div class="control">
              <input v-if="!nameError" class="input" type="text" placeholder="New Task" v-model="newtodoname"/>
              <input v-if="nameError" class="input is-danger" type="text" placeholder="New Task" v-model="newtodoname"/>
            </div>
            <p v-if="nameError" class="help is-danger">Task name required</p>
            </div>
          </td>
          <td>
            <div class="field">
            <div class="control">
              <input v-if="!dateError" class="input" type="date" placeholder="Due Date" v-model="newtododatestring"/>
              <input v-if="dateError" class="input is-danger" type="date" placeholder="Due Date" v-model="newtododatestring"/>
            </div>
            <p v-if="dateError" class="help is-danger">Date is required</p>
            </div>
          </td>
          <td>
            <div class="control">
              <button class="button is-info is-small" v-on:click="addTodoListItem">+</button>
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
@Component
export default class ToDos extends Vue {
  mytodos: ToDo[] = [];
  newtodoname: string = "";
  newtododatestring: string = "";

  dateError: boolean = false;
  nameError: boolean = false;
  addTodoListItem() {
    this.nameError = this.newtodoname == "";
    this.dateError = this.newtododatestring == "";

    if (this.nameError || this.dateError) return;

    this.mytodos.push({
      name: this.newtodoname,
      duedate: reorderDate(this.newtododatestring)
    });

    this.newtodoname = "";
    this.newtododatestring = "";
  }
  deleteFromList(i: number) {
    this.mytodos = this.mytodos.filter(function(value, index, arr) {
      return index != i;
    });
  }
}

function reorderDate(date: string) {
  let sDate = date.split("-");
  return sDate[2] + "-" + sDate[1] + "-" + sDate[0];
}

interface ToDo {
  name: string;
  duedate: String;
}
</script>
