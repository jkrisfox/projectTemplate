<template>
    <div class='todos'>
        <h1>To Do List</h1><br><br>
        <form class="additem" >
            <table id="myTable" style="width:100%">
                <tr>
                    <th><input type="text" id="myTitle" name="fname" placeholder="New To Do Item"  style="width:100%" v-model="item.name"></th>
                    <th><input type="text" id="myDueDate" name="lname" placeholder="Due Date" style="width:100%" v-model="item.date"></th>
                    <th><button class="button"  style="width:100%" v-on:click="addTodoItem" >Add</button></th>
               </tr>
        </table>
        </form>
        <table id="myTable" style="width:100%">
            <tr v-for="(todo, index) in mytodos" v-bind:key="index">
                <td><input type="checkbox"></td>
                <td>{{todo.title}}</td>
                <td><span v-if="todo.date">{{todo.date.getMonth() + 1}}/{{todo.date.getDate()}}/{{todo.date.getFullYear()}}</span></td>          
                <td><button type="button" v-on:click="deleteToDoItem(index)">delete</button></td>
            </tr>
        </table>
        
    </div>
</template>

<script lang ="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { iItem } from "../models/item.interface";
import { iToDo } from "../models/todo.interface";
import { iUser } from "../models/user.interface";


@Component
export default class ToDos extends Vue{
    public showAdd: boolean = false;
    item: itemform = {
        name: "",
        date: "",
        complete: false,

    };

    get user() {
        return this.$store.state.user;
    }

    mytodos: ToDo[] = [];

    error: string | boolean = false;

    addTodoItem(){
        if (this.$store.state.user) {
            this.error = false;
            console.log('hello');
            axios
            .post(APIConfig.buildUrl("/todos"), {
                ...this.item
            })
            .then((response: AxiosResponse<{item: iItem}>) => {
            // debugger;
                this.item.name = "";
                this.item.date = "";
            // const { title, date, id, complete, user} = response.data.item;
            // this.mytodos.push({title, date: new Date (date), id, });
                this.$emit("success");
            })
            .catch((reason: any) => {
                this.error = reason;
                this.item.name = "";
                this.item.date = "";
            });
        } else {
            this.$router.push({ name: "home" });
        }
    }

    mounted() {
        axios.get(APIConfig.buildUrl("/todos"))
        .then((response: AxiosResponse<any>) => {
            this.$emit("success");
            this.mytodos = response.data.items.map((todos : any) => {
                return {...todos, date: todos.date};
            });
        })
    }

    deleteToDoItem(index : number){
        const item = this.mytodos[index];
        axios.delete(APIConfig.buildUrl(`/items/${item.id}`)).then(() => {
             this.mytodos.splice(index, 1);
        })
    }

}

// front end object that holds server objects 
interface ToDo{
    title: string
    date: Date | undefined;
    id: number | undefined;
    complete: boolean | undefined;
    user: iUser;
}

// pushed to back end
export interface itemform{
    name: string;
    date: string;
    complete: boolean;

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

