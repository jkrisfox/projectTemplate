<template>
    <div class='todos'>
        <h1>My To Do List</h1><br><br>
        <form class="additem">
            <input type="text" id="myTitle" name="fname" placeholder="New To Do Item" v-model="item.name">
            <input type="text" id="myDueDate" name="lname" placeholder="Due Date" v-model="item.date">
        </form>
        <table id="myTable" style="width:100%">
            <tr>
                <th></th>
                <th>Task</th>
                <th>Due Date</th>
                <th><button class="button" v-on:click="addTodoItem" >Add</button></th>
            </tr>
            <tr v-for="(todo, index) in mytodos" v-bind:key="index">
                <td><input type="checkbox"></td>
                <td>{{todo.name}}</td>
                <td>{{todo.dueDate.getMonth() + 1}}/{{todo.dueDate.getDate()}}/{{todo.dueDate.getFullYear()}}</td>          
                <td><button type="button" v-on:click="deleteToDoItem(index)">delete</button></td>
            </tr>
        </table>
        
    </div>
</template>

<script lang ="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';


@Component
export default class ToDos extends Vue{
    public showAdd: boolean = false;
    item: itemform = {
        name: "",
        date: ""
    };

    mytodos: ToDo[] = [
        {name: "sleep", dueDate: new Date("12/3/1241")},
        {name: "study", dueDate: new Date("12/3/1241")},
    ];

    addTodoItem(){
        this.mytodos.push({name: this.item.name, dueDate: new Date (this.item.date)});
        this.item.name = "";
        this.item.date = "";
    }

    deleteToDoItem(index : number){
        this.mytodos.splice(index, 1);
    }

}

interface ToDo{
    name: string
    dueDate: Date | undefined;
}

export interface itemform{
    name: string;
    date: string;
}

</script>

<style scoped> 
/* CSS */

h1 {
    text-align: center;
    font-size: 40px;
}

body {
    position: center;
    text-align: center;
}

input {
    margin: 0;
    border: none;
    border-radius: 0;
    width: 40%;
    padding: 10px;
    font-size: 16px;
  }

table {
    padding: 0;
    border-collapse: collapse;
}

th {
    height: 50px;
    border: 1px solid black;
    padding: 15px;
    text-align: center;
    font-size: 25px;
    font-weight: bold;
}

th, td{
    text-align: center;
    height: 30px;
}

td {
    font-size: 20px;
    padding: 3px;
}

td:hover {
    background-color: #f5f5f5;
}

button {
    border-radius: 5px;
    border-color: black;
    font-size: 20px;
}

button:hover {
    background-color: rgb(40, 60, 146);
    color: white;
}
</style>

