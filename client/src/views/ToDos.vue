
<template>
  <div class='todos'>
    <div>Hi from Todos</div>
      <div v-for="(todo, index) in mytodos" v-bind:key="index">
          <span>{{todo.title}}</span>
          <span>{{todo.dueDate}}</span>
      </div>
      <div class="buttons">
        <a class="button is-primary" v-on:click="showTodoModal()">
          <strong>Add</strong>
         </a>
      </div>
      <router-view/>
      <Todo v-bind:is-showing="showTodo" v-on:success="addTodo()" v-on:cancel="cancelTodo()"/>
  </div>
</template>

<script lang="ts">
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import Vue from 'vue';
import { Component } from "vue-property-decorator";
import Todo from "../components/Todo.vue";

@Component({
  components: { Todo }
})

export default class ToDos extends Vue {
    public showTodo: boolean = false;
    mytodos: any[] = [];
    addTodo() {
        this.refresh();
      this.showTodo = false;
    }
    showTodoModal(){
      this.showTodo = true;
    }
    cancelTodo(){
      this.showTodo = false;
    }
    mounted(){
        this.refresh();
    }
    refresh() {
      axios.get(APIConfig.buildUrl("/todos"), { headers: { token: this.$store.state.userToken } })
          .then((res: AxiosResponse<{ todos: any[] }>) => {
              debugger;
              this.mytodos = res.data.todos;
              console.log("mytodos", this);
      })
    }
}

export interface Todos {
    item: string;
    duedate: string | undefined;
}
</script>