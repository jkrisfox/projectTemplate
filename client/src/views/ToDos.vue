<template>
<div class="todos">
    <ul>
        <li v-for="(todo, index) in mytodos" v-bind:key="index">{{ todo.name }} </li>
    </ul>
    <button class="button" v-on:click="addTodoItem">Add</button>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from "vue-property-decorator";
@Component
export default class ToDos extends Vue {
    mytodos: ToDo[] = [
        { name: "Tod one", duedate: undefined },
        { name: "Tod two", duedate: undefined },
        { name: "Tod three", duedate: undefined },
    ];
    addTodoItem() {
        this.mytodos.push({name: `todo${new Date().getTime()}`, duedate: undefined});
    }
}

interface ToDo {
    name: string;
    duedate: Date | undefined;
}
</script>

<style scoped>
    table, th, td {
        border: 1px solid black;
    }
</style>
