<template>
    <div class='todos'>
        <h1>My To Do List</h1><br><br>
        <table id="myTable" style="width:100%">
        <tr>
            <th></th>
            <th>Task</th>
            <th>Due Date</th>
            <th><button class="button" v-on:click="showAddModal">Add</button></th>
        </tr>
        <tr>
            <td><input type="checkbox" ></td>
            <td>cook</td>
            <td>12/4/19</td>
            <td><button type="button">delete</button></td>
        </tr>   
        <tr>
            <td><input type="checkbox"></td>
            <td>run</td>
            <td>12/4/19</td>          
            <td><button type="button">delete</button></td>
        </tr> 
        <tr v-for="(todo, index) in mytodos" v-bind:key="index">
            <td><input type="checkbox"></td>
            <td>{{todo.name}}</td>
            <td>12/4/19</td>          
            <td><button type="button" >delete</button></td>
        </tr>
    </table>
    <Modal v-bind:is-showing="showAdd" title="Add" v-on:success="cancelAdd()" v-on:cancel="cancelAdd()">
      <Add/>
    </Modal>
    </div>

</template>

<script lang ="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';
import Modal from "../components/Modal.vue"
import Add from "../components/Add.vue"

@Component({
    components: {
        Modal,
        Add
    }
})

export default class ToDos extends Vue{
    public showAdd: boolean = false;
    mytodos: ToDo[] = [
        {name: "tod one", dueDate: undefined},
        {name: "rawr", dueDate: new Date()}
    ];

    addTodoItem(){
        
        this.mytodos.push({name: `todo${new Date().getTime()}`, dueDate: undefined})
        this.showAdd = false;
    }

    showAddModal() {
        this.showAdd = true;
    }

    cancelAdd(){
        this.showAdd = false;
    }

}

interface ToDo{
    name: string
    dueDate: Date | undefined;
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

