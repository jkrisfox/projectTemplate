<template>

    <div class="todoList">
    <h1>My To-Do List</h1>
    
    <div class="todos">
        <b-table striped hover :items="mytodos"></b-table>
        <button v-on:click="addTodoItem(message,message2)" >Add Item </button>
         <input type="text" id="myInput" v-model="message" placeholder="Add Something" >
         <input type="text" id="myInput2" v-model="message2" placeholder="DueDate" >

         <br>
        <ul class="list-group">
            <li v-for="(name, index) in mytodos" :key="index" class="list-group-item">
                <input id= $name type="checkbox">     
                <label for="name"> TODO: {{ name.name }}</label>
                <label for="date"> DUE: {{ name.duedate.toLocaleString() }}</label>
            </li>
        </ul>
    </div>
    </div>
</template>


<script lang="ts">
import Vue from 'vue';
import { Component } from "vue-property-decorator";

@Component
export default class ToDos extends Vue{
    mytodos: todoz[] = [
        { name: "Todo one", duedate: new Date('10-10-10') ,  },
        { name: "Todo two", duedate:  new Date('10-10-10'),  },
        { name: "Todo three", duedate:  new Date('10-10-10') ,  }

    ]
    addTodoItem(n:any, d:any) {
        this.mytodos.push({name: n , duedate: new Date(d)});
    }

}
interface todoz {
 name: string;
 duedate: Date | undefined;
}
</script>
