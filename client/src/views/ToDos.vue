
<template>
  <div class='todos'>
    <div>Hi from Todos</div>
      <div v-for="(todo, index) in mytodos" v-bind:key="index">
          <span>{{todo.name}}</span>
          <span>{{todo.duedate}}</span>
      </div>
      <div class="buttons">
        <a class="button is-primary" v-on:click="showNewToDoModal()">
          <strong>Add</strong>
         </a>
      </div>
      <router-view/>
      <NewToDo v-bind:is-showing="showNewToDo" v-on:success="successNewToDo()" v-on:cancel="cancelNewToDo()"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from "vue-property-decorator";
import Modal from "../components/Modal.vue";
import NewToDo from "../components/NewToDo.vue";

@Component({
  components: { NewToDo }
})

export default class ToDos extends Vue {
  public showNewToDo: boolean = false;
    mytodos: Todo[] = [
        {name: "Tod one", duedate: undefined },
        {name: "todo two", duedate: undefined}
    ];
    addTodoItem(){
        this.mytodos.push({
            name: `todo${new Date().getTime()}`,
            duedate: undefined
            });
    }
    showNewToDoModal(){
      this.showNewToDo = true;
    }
    successNewToDo(){
      this.showNewToDo = false;
    }
    cancelNewToDo(){
      this.showNewToDo = false;
    }
}

export interface Todo {
    name: string;
    duedate: Date | undefined;
}
</script>