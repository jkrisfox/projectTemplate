<template>
    <div class="todos">
        <div> Hi from todos</div>
        <!-- <h1> My Todo List </h1> -->
        <!-- this is now a data driven component
                that outputs anything in the todos array -->
        <div v-for="(todo, index) in mytodos" v-bind:key="index">
            <span>{{ todo.name }}</span>
            <span>{{ todo.duedate }}</span>
        </div>
        <button class="button" v-on:click="addTodoItem">Add</button>
    </div>
</template>



<script lang='ts'>
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

/* NOTE: it is useful for only Api and Client 
 * in separate windows with VS Code */

/* this is creating a component */
@Component
// if default then 
// import ToDos from './views/ToDos.vue'
//  if not default then
// import { ToDos } from './views/ToDos.vue'

// NOTE: do npm run serve in the client dir to compile

export default class ToDos extends Vue {
// this export says, if another files imports this file, 
// then it only gets this component
    mytodos: ToDo[] = [
        { name: "Tod one", duedate: undefined },
        { name: "Tod two", duedate: undefined },
        { name: "Tod three", duedate: undefined }
    ];
    addTodoItem() {
        this.mytodos.push({name: `todo${new Date().getTime()}`, duedate: undefined});
    }
}

interface ToDo {
    name: string;
    duedate: Date | undefined;
};

</script>