<template>
    <div class="todos" style="margin-left: 50px">
        <div class="ToDo-Container">
            <h1>To Do List:</h1>
            <div v-for="(todo, index) in mytodos" v-bind:key="index">
                <div class="ToDoItem" style="margin-top: 20px">
                    <div class="ToDoItem-Text">
                        <span class="ToDoItem-one">{{ todo.name }}</span>
                        <span class="ToDoItem-two">{{ todo.duedate }}</span>
                    </div>
                    <button v-on:click="deleteItem(index)">delete</button>
                </div>
            </div>
        </div>
        <div style="margin-top: 100px">
            <input v-model="inputName" type="text" placeholder="To Do Item"/>
            <input v-model="inputDate" type="date"/>
        </div>
        <button v-on:click="addTodoItem(inputName, inputDate)">Add</button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from "vue-property-decorator";
@Component
export default class ToDos extends Vue {

    mytodos: ToDo[] = [
        { name: "To Do One", duedate: undefined },
        { name: "To Do Two", duedate: undefined },
        { name: "To Do Three", duedate: undefined }
    ];

    addTodoItem(inputName: string, inputDate: Date) {
        this.mytodos.push({name: inputName, duedate: inputDate});
    }

    deleteItem(index: number){
        this.mytodos.splice(index, 1);
    }
}

interface ToDo {
    name: string;
    duedate: Date | undefined;
}

</script>
<style>
    .ToDoItem {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .ToDoItem-Text {
        width: 60%;
        background-color: white;
        border: 1px solid lightgrey;
        box-shadow: 1px 1px 1px lightgrey;
        padding: 12px;
        margin-right: 10px;
    }
    .ToDo-Container {
        width: 80%;
        margin: 0 auto;
    }
    .ToDoItem-one {
        width: 70%;
        padding: 12px;
        margin-right: 10px;
    }
    .ToDoItem-two {
        width: 20%;
        padding: 12px;
        margin-right: 10px;
    }
</style>
