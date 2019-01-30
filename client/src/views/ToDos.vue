<template>
    <div>
        <center>
        <table border='2' style="width:50%">
            <tr>
                <th>Item</th>
                <th>Due Date</th>
            </tr>
            <tr v-for="(todo, index) in mytodos" :key="index">
                <td>{{ todo.name }}</td>
                <td>{{ todo.duedate }}</td>
            </tr>
        </table>
        </center>
        <br>
        <center>
        <form>
            Item Name: <input type="text" placeholder="What do you want to add?" v-model="name"/>
            <br>
            Due Date: <input type="date" v-model="duedate"/>
            <button type="button" v-on:click="addTodoItem()">Add</button>
        </form>
        </center>
    </div> 
</template>

<script lang='ts'>
import Vue from 'vue'
import {Component} from 'vue-property-decorator';
@Component
export default class ToDos extends Vue {
    mytodos: Todo[] = [

    ];

    addTodoItem(){
        console.log("hello" + this.mytodos.values());
        this.mytodos.push({name: this.name, duedate: this.duedate})
    }

    
} 


interface Todo {
    name: string;
    duedate: Date;
}
</script>