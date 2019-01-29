<template>
    <div class="todos">
        <div> Hi from todos</div>
    
        <!--actual to do list -->
        <!--group the box with todo item-->
        <div v-for="(todo, index) in mytodos" v-bind:key="index">
            <span>{{ todo.name }}</span> 
            <span>{{ todo.duedate }}</span>
            <button class="button" v-on:click="deleteTodoItem(todo.id)"> Delete </button>
        </div>
        <button class="button" v-on:click="addTodoItem"> Add </button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from "vue-property-decorator";
@Component
export default class ToDos extends Vue {
    idVal: number = 0;
    mytodos: ToDo[] = [
        { name: "todo one", duedate: undefined, id: this.idVal++},
        { name: "todo two", duedate: undefined, id: this.idVal++},
        { name: "todo three", duedate: undefined, id: this.idVal++}
    ];
    addTodoItem() {
        this.mytodos.push({name: `todo${new Date().getTime()}`, duedate: undefined, id: this.idVal++});
    }
    deleteTodoItem(id: number) {
        const index: number = this.mytodos.findIndex((todo: ToDo) => todo.id == id);
        this.mytodos.splice(index, 1);
    }
}
interface ToDo {
    name: string;
    duedate: Date | undefined;
    id: number;
}
</script>

<style scoped>        
        /*ul {
          list-style: none;
          position: relative;
        }
        ul.list {
          display: inline-block;
          vertical-align: top;
        }
        .title{
          margin-left: 32px;
        }
        .due-date {
          margin-left: 3px;
        }
        .buttons {
          margin-left: 170px;
        }
        .cancel {
          margin-left: 50px;
        }*/
</style>