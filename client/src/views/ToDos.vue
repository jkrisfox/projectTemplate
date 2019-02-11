
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
      <NewToDo v-bind:is-showing="showNewToDo" v-on:success="addNewToDo()" v-on:cancel="cancelNewToDo()"/>
  </div>
</template>

<script lang="ts">
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import Vue from 'vue';
import { Component } from "vue-property-decorator";
import Modal from "../components/Modal.vue";
import NewToDo from "../components/NewToDo.vue";

@Component({
  components: { NewToDo }
})

export default class ToDos extends Vue {
    public showNewToDo: boolean = false;
    mytodos: any[] = [];
    addNewToDo(){
      /*this.mytodos.push({
        name: `todo${new Date().getTime()}`,
        duedate: undefined
        });*/
      this.showNewToDo = false;
    }
    showNewToDoModal(){
      this.showNewToDo = true;
    }
    cancelNewToDo(){
      this.showNewToDo = false;
    }
    mounted(){
      axios.get(APIConfig.buildUrl("/todos"), {headers: {token: this.$store.state.userToken}})
      .then((res: AxiosResponse<{todos: any[]}>) => {
        this.mytodos = res.data.todos;
      })
    }
}

export interface Todo {
    name: string;
    duedate: string | undefined;
}
</script>