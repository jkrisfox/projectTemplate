<template>
  <div class='todos'>
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Date</th>
        </tr>
      </thead>
          <tr v-for="(todo,index) in mytodos" v-bind:key="index">
            <td>{{ todo.name}}</td>
            <td>{{ todo.duedate}}</td></tr>
          <td> new <input id="message" size = "20px" type = "test"></td>
          <td> date <input id="duedate" size = "20px" type = "test"></td>
          <button class="button" v-on:click="addToDoItem()">Add</button>
    </table>
  </div>
    
    <!-- <div>Hi from todos</div>
    <div v-for="(todo,index) in mytodos" v-bind:key="index">
      <span> {{todo.name}}</span>
      <span>{{todo.duedate}}</span>
    </div>
    <span> new <input v-model="message" size = "20px" type = "test"></span>
    <span> date <input v-model="duedate" size = "20px" type = "test"></span>
    <button class="button" v-on:click="addToDoItem(message, duedate)">Add</button>
  </div> -->

</template>

  <script lang="ts">
    import Vue from 'vue';
    import { Component } from "vue-property-decorator";
    @Component
    export default class ToDos extends Vue {
      mytodos: ToDo[] = [
      { name: "Todo one", duedate: undefined}];
      
      addToDoItem() {
        const duDate = (<HTMLInputElement>document.getElementById("duedate")).value;
        console.log(duDate)
        const what = (<HTMLInputElement>document.getElementById("message")).value;
        if (duDate) {
        this.mytodos.push({name: what, duedate: duDate ? new Date(duDate) : undefined})}
      }
    }
interface ToDo {
  name: string;
  duedate: Date | undefined;
}
//   <style scoped>
//     </style>
  </script>
