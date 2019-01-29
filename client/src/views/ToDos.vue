<template>
    <div class='todos'>
    <div>Hi from ToDos</div>
    <ul>
        <li>hello</li>   
        <li v-for="(todo, index) in mytodos" v-bind:key="index" >{{todo.name}}</li>      
    </ul>
    <button class="button" v-on:click="addTodoItem">Add</button>
    </div>

</template>

<script lang ="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';

@Component
export default class ToDos extends Vue{
    mytodos: ToDo[] = [
        {name: "tod one", dueDate: undefined},
        {name: "rawr", dueDate: undefined}
    ];

    addTodoItem(){
        this.mytodos.push({name: `todo${new Date().getTime()}`, dueDate: undefined})
    }
}

interface ToDo{
    name: string
    dueDate: Date | undefined;
}
</script>

<style scoped> 

</style>

