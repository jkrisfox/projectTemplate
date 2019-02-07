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
                    <td><input type="checkbox" v-on:change="markDone(index)" v-bind:checked="todo.complete"/></td>
                    <td>{{ todo.title }}</td>
                    <td>{{ todo.dueDate || "N/A" }}</td>
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
import axios, { AxiosError, AxiosResponse } from "axios";
import Vue from 'vue'
import { APIConfig } from "../utils/api.utils";
import { Component } from "vue-property-decorator";
@Component
export default class ToDos extends Vue {
    mytodos: ToDo[] = [
        /*
        { title: "Todo one", dueDate: undefined },
        { title: "Todo two", dueDate: undefined, complete: true },
        { title: "Todo three", dueDate: undefined }
        */
    ];
    addTodoItem() {
        // Cast input elements to non-null before getting value
        const dueDate = (<HTMLInputElement>document.getElementById("dateInput")).value;
        const desc = (<HTMLInputElement>document.getElementById("descInput")).value;
        if (desc) {
            const todo: ToDo = {title: desc, dueDate: dueDate ? new Date(dueDate) : undefined, complete: false };
            axios
                .post(APIConfig.buildUrl("/todos"), todo, {
                    headers: {
                        token: this.$store.state.userToken
                    }
                })
                .then((response) => {
                    this.mytodos.push(response.data.todo);
                });
        }
    }
    deleteTodoItem(index: number) {
        const todo = this.mytodos[index];
        axios
            .delete(APIConfig.buildUrl("/todos/" + todo.id), {
                headers: {
                    token: this.$store.state.userToken
                }
            })
            .then(() => {
                this.mytodos.splice(index, 1);
            });
    }
    markDone(index: number) {
        const complete = !this.mytodos[index].complete;
        this.mytodos[index].complete = complete;
        const todo = this.mytodos[index];
        axios
            .put(APIConfig.buildUrl("/todos/" + todo.id), { complete: complete }, {
                headers: {
                    token: this.$store.state.userToken
                }
            })
    }
    loadTodos() {
        if (this.$store.state.userToken) {
            axios
                .get(APIConfig.buildUrl("/todos/load"), {
                    headers: {
                        token: this.$store.state.userToken
                    }
                })
                .then((response) => {
                    this.mytodos = response.data;
                });
        }
    }
    mounted() {
        this.loadTodos();

        this.$store.watch(
            (state) => state.userToken,
            (newValue, oldValue) => {
                if (newValue) {
                    this.loadTodos();
                }
            }
        );
    }
    beforeRouteUpdate(to: string, from: string, next: string) {
        if (to == "todos") {
            this.loadTodos();
        }
    }
}

interface ToDo {
    title: string;
    dueDate?: Date;
    complete?: boolean;
    id?: number;
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
