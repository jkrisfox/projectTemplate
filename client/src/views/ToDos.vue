<template>
    <div class = "todos">
        <h1 class = "h1Style">Todo List</h1>
        <table class = "table" align = "center">
			<tr>
				<th></th><th>Todo Item</th><th>Due Date</th><th></th>
			</tr>
            <tr v-for = "(todo, index) in mytodos" v-bind:key="index">
                
                <td>{{index + 1}} </td> <td>{{ todo.title }}</td> <td>{{ todo.dueDate }}</td> <td><CompleteTodo v-on:complete-todo = "completeTodo(todo)"/></td>
                
            </tr>
            </table>
        <br>
		<br>
        <AddTodo v-on:add-todo = "addTodo"/>
    </div>

</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import AddTodo from "./AddTodo.vue";
import CompleteTodo from "./CompleteTodo.vue";

import axios, { AxiosResponse } from "axios";
import { APIConfig } from "@/utils/api.utils";
import { iUser } from "@/models/user.interface";

import Profile from "@/components/Profile.vue";

@Component({
  components: {
    AddTodo,
    CompleteTodo,
  }
})
export default class ToDos extends Vue{
    mytodos: ToDo[] = [];

    addTodo(newTodo) {
        this.mytodos.push(newTodo);

        const userID = this.$store.state.userId;
        if (userID) {
        axios
            .get(APIConfig.buildUrl(`/users/${userID}`))
            .then((res: AxiosResponse<{ user: iUser }>) => {
                newTodo.user = res.data.user;
            });
        }

        console.log('adding');
        axios
        .post(APIConfig.buildUrl("/todos"), {
            ...newTodo
        })
        .catch((errorResponse: any) => {
            debugger;
        });
    }   

    completeTodo(todo) {
        const todoIndex = this.mytodos.indexOf(todo);
        this.mytodos[todoIndex].complete = true;
        const cTodo = this.mytodos[todoIndex];

        axios
        .put(APIConfig.buildUrl("/todos/:id"), {
            ...cTodo
        })
        .catch((errorResponse: any) => {
            debugger;
        });
        this.mytodos.splice(todoIndex, 1);
    }   
}

interface ToDo {
    title: String;
    complete: boolean,
    dueDate: Date | undefined;
    user: iUser;
}
</script>

<style scoped>
    .table{
        font-family: Bookman; 
        background-color: rgb(205, 255, 247);
		color: black;
		font-size: 200%;
		width: 60%;
	}
    .h1Style{
        font-size: 300%;
        text-align: center;
    }

</style>

//str = "One" + new Date().getTime()'One ${}'