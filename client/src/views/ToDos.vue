<template>
    <div class = "todos">
        <h1 class = "h1Style">Todo List</h1>
        <table class = "table" align = "center">
			<tr>
				<th></th><th>Todo Item</th><th>Due Date</th><th></th>
			</tr>
            <tr v-for = "(todo, index) in mytodos" v-bind:key="index">
                
                <td>{{index + 1}} </td> <td>{{ todo.name }}</td> <td>{{ todo.duedate }}</td> <td><DeleteTodo v-on:delete-todo = "deleteTodo(todo)"/></td>
                
            </tr>
            </table>
        <br>
		<br>
        <AddTodo v-on:add-todo = "addTodo"/>
    </div>

</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from "vue-property-decorator";
import AddTodo from "./AddTodo.vue"
import DeleteTodo from "./DeleteTodo.vue"

@Component({
  components: {
    AddTodo,
    DeleteTodo,
  }
})
export default class ToDos extends Vue{
    mytodos: ToDo[] = [
        { name: "todo one", duedate: undefined },
        { name: "todo two", duedate: undefined},
        { name: "todo three", duedate: undefined}
    ];

    addTodo(newTodo) {
        this.mytodos.push(newTodo);
    }   

    deleteTodo(todo) {
        const todoIndex = this.mytodos.indexOf(todo);
        this.mytodos.splice(todoIndex, 1);
    }   
}

interface ToDo {
    name: String;
    duedate: Date | undefined;
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