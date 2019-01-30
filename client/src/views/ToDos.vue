<template>
<div class='todos'>
    <h1>ToDo List</h1>
    <table>
        <tr v-for="(todo, index) in mytodos" v-bind:key="index">
            <td>{{ todo.name }}</td>
            <td>{{ todo.duedate}}</td>
            <td><input type="button" value="Delete" v-on:click="deleteToDoItem(index)"/></td>
        </tr>
    </table>
    <div>
        <span class="left">Title</span>
        <span class="right"><input id="title" type="text" class="textbox"/></span>
    </div>
    <div>
        <span class="left">Due Date</span>
        <span class="right"><input id="date" type="date" class="textbox" v-model="DueDate"/></span>
    </div>
    <input type="button" value="Add" v-on:click="addToDoItem"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from "vue-property-decorator";
@Component
export default class ToDos extends Vue {
    mytodos: ToDo[] = [];
    addToDoItem() {
        this.mytodos.push({name: (<HTMLInputElement>document.getElementById("title")).value, duedate: new Date((<HTMLInputElement>document.getElementById("date")).value)})
    }
    deleteToDoItem(index: number) {
        this.mytodos.splice(index, 1);
    }
}

interface ToDo {
    name: string;
    duedate: Date | undefined;
}
</script>

<style scoped>
        .left {
            width: 5%;
            float: left;
            text-align: right;
        }
        .right {
            width: 25%;
            float: left;
            margin-left: 10px;
        }
</style>