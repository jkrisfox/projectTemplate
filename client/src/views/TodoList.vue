
<template>
  <div class="about">
     <h1> My Todo List </h1> 
        <table>
            <tr class="content"> 
                <div v-for="(todo, index) in mytodos" v-bind:key="index"> 
                    <td> <input type="checkbox"> {{ todo.title }} </td>
                    <td>  {{ todo.duedate }} </td>
                    <td> <input type="button" v-on:click> Delete </td> 
                </div>


            </tr>  
        </table>

    <h2> New to-do item </h2>
    <form>
        <tr>
            <td> Title: </td>
            <td> <input type="text" name="item" v-model="form.title"> </td>
        </tr>

        <tr>
            <td> Due date: </td>
            <td> <input type="text" name="due" v-model="form.duedate">  </td>
        </tr>

        <!-- <tr>
            <td> </td>
            <td> 
                <a v-bind:href="addTodo">
                    <button class="button" v-on:click="addTodoItem" > Save </button> 
                </a> 
                <a v-bind:href="addTodo">
                    <button class="button" v-on:click="goBack"> Cancel </button> 
                </a>
            </td>
        </tr> -->
    </form>
        <button class="button" v-on:click="addTodoItem" > Save </button>
    </div>
  
</template>


<script lang="ts">
    import Vue from 'vue' 
    import { Component } from "vue-property-decorator";
    import VueRouter from 'vue-router';
    import router from '@/router';
    
    @Component
     export default class 
     
     TodoList extends Vue {
      mytodos: ToDo[] = [];
      
      form: TodoForm = {
          title: "",
          duedate: ""
      }

      addTodoItem() {
       // this.mytodos.push({title: `todo ${new Date().getTime()}`, duedate: undefined});
        this.mytodos.push({title: this.form.title, duedate: this.form.duedate});
        this.form.title = "";
        this.form.duedate = "";
      }

      gotoAdd() {
        router.push("/addTodo");
      }

      del(index : number) {
          this.mytodos.splice(0, index) 
      }
    }

    export interface TodoForm {
        title: string;
        duedate: string;
    }
    interface ToDo {
      title: string;
      duedate: string;
    }
</script>

<style scoped> 
  .content {
      font-family: "Arial", Helvetica, sans-serif;
      font-size: 18px;
  }

  h1 {
      font-family: "Arial", Helvetica, sans-serif;
      color: #ED572A;
      padding-left: 50px;
  }

  h2 {
      font-family: "Arial", Helvetica, sans-serif;
      padding-left: 50px;
      color: #8E4CD1;
  }

  td
  {
      /* top right bottom left  */
      padding:0 15px 0 15px;
  }

  /* .table {
      padding
  } */

</style>
