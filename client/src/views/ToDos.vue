<template>
    <div class='todos'>
        <table>
            <thead>
                <tr>
                    <th/>
                    <th>Item</th>
                    <th>Due Date</th>
                    <th/>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(todo, index) in mytodos" v-bind:key="index">
                    <td><input type="checkbox" v-on:change="markDone(index)" v-bind:checked="todo.done"/></td>
                    <td>{{ todo.name }}</td>
                    <td>{{ todo.duedate || "N/A" }}</td>
                    <td><button class="button is-danger is-inverted is-small" v-on:click="deleteTodoItem(index)">Delete</button></td>
                </tr>
            </tbody>
        </table>
        
        <div class="add-new">
            <button class="button is-success" v-on:click="addTodoItem">Add</button>
            <input id="dateInput" type="date" class="input"/>
            <input id="descInput" type="text" placeholder="Todo description" class="input"/>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from "vue-property-decorator";
@Component
export default class ToDos extends Vue {
    mytodos: ToDo[] = [
        { name: "Todo one", duedate: undefined },
        { name: "Todo two", duedate: undefined, done: true },
        { name: "Todo three", duedate: undefined }
    ];
    addTodoItem() {
        // Cast input elements to non-null before getting value
        const dueDate = (<HTMLInputElement>document.getElementById("dateInput")).value;
        const desc = (<HTMLInputElement>document.getElementById("descInput")).value;
        if (desc) {
            this.mytodos.push({name: desc, duedate: dueDate ? new Date(dueDate) : undefined });
        }
    }
    deleteTodoItem(index: number) {
        this.mytodos.splice(index, 1);
    }
    markDone(index: number) {
        this.mytodos[index].done = !this.mytodos[index].done;
    }
}

interface ToDo {
    name: string;
    duedate?: Date;
    done?: boolean;
}
</script>

<style scoped>
th {
    text-align: left;
}

td, th {
    padding-left: 1em;
    padding-right: 1em;
}

.add-new {
    padding: 5px;
    display: flex;
}

.add-new #dateInput {
    flex: 0 0 200px;
}

.add-new #descInput {
    flex: 0 1 500px;
}

.add-new input, .add-new button {
    margin: 5px;
}
</style>