<template>
    <div class="todos">
        <div>Hi from todos</div>

        <div v-for="(todo, index) in mytodos" v-bind:key="index">
            <span>{{ todo.name }}</span>
            <span>{{ todo.duedate }}</span>
        </div>
        <div class="buttons">
            <a class="button is-primary" v-if="!isLoggedIn" v-on:click="showTodosModal()">
                <strong>Add</strong>
            </a>
        </div>
        <Todos v-bind:is-showing="showTodos"
               v-on:success="successTodos()"
               v-on:cancel="cancelTodos()" />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Todos from "../components/Todo.vue";

@Component({ components: { Todos } })
export default class ToDos extends Vue {
  mytodos: ToDo[] = [
    { name: "Tod one", duedate: undefined },
    { name: "todo two", duedate: undefined },
    { name: "todo three", duedate: undefined }
  ];

    public showTodos: boolean = false;

    showTodosModal() {
        this.showTodos = true;
    }
    successTodos() {
        this.mytodos.push({
            name: `todo${new Date().getTime()}`,
            duedate: undefined
        });
        this.showTodos = false;
    }
    cancelTodos() {
        this.showTodos = false;
    }
}

interface ToDo {
  name: string;
  duedate: Date | undefined;
}
</script>

<style scoped>
</style>
