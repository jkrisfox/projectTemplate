<template>
    <div class="todos">
        <table>
            <thead>
                <th></th>
                <th> Item </th>
                <th> Due Date </th>
            </thead>
        <!--actual to do list -->
        <!--group the box with todo item-->
            <tbody>
                <tr v-for="(todo, index) in mytodos" v-bind:key="index">
                    <td><input type="checkbox"></td>
                    <td>{{ todo.name }}</td>
                    <td>{{ "\t" + todo.duedate + "\t"}}</td>
                    <td><button class="button" v-on:click="deleteTodoItem(todo.id)"> Delete </button></td>
                </tr>
            </tbody>
        </table>
        <div>
            <span> Title <br><input v-model="message" size= "30px" type="text" ></span>
            <br>
            <span> Due Date <br><input  v-model="due_date" class="due-date" size="40px" type="date" ></span>
        </div>
        <button class="button" v-on:click="addTodoItem(message, due_date)"> Add </button>
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
    addTodoItem(message: string, due_date: Date) {
        this.mytodos.push({name: message, duedate: due_date, id: this.idVal++});
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
    th, td {
        padding: 15px;
    }        
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