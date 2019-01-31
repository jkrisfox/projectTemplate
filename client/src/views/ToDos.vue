<template>
<div id="todos">
 <div class="todos">
    <div v-for="(todo, index) in mytodos" v-bind:key="index">
        <span>{{ todo.name }}</span>
        <span>{{ todo.duedate }}</span>
    </div>
    </div>
        <div class="buttons">
              <a class="button is-primary" v-on:click="addTodoItem()">
                <strong>Add</strong>
              </a>
              
              <TodoItem v-bind:is-showing="showTodo" v-on:success="successTodo()" v-on:cancel="cancelTodo()"/>
        </div>    
  
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from "vue-property-decorator";
import TodoItem from "@/components/TodoItem.vue"


@Component({
  components: {
    TodoItem
  }
})
export default class Todos extends Vue{
    mytodos: ToDo[] = [
        { name: "Todo one", duedate: undefined},
        { name: "Todo two", duedate: undefined},
        { name: "todo three", duedate: undefined}
    ];
    public showTodo: boolean = false;

    addTodoItem(){
        this.mytodos.push({name: `todo${new Date().getTime()}`, duedate: undefined});
        this.showTodo = true;  
    }
    showTodoModal(){
        this.showTodo = true;
    }
    successTodo(){
        this.showTodo = false;
  }
    cancelTodo(){
        this.showTodo = false;
    }
}

interface ToDo{
        name: string
        duedate: Date | undefined
}

</script>

<style scoped>

</style>