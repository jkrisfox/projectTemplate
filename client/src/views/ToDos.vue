
<style>
    #check {
        margin-right: 10px;
        margin-left: 10px;
    }
    .columns {
        width: 50%;
    }
    h2 {
        font-size: 20px;
        font-weight:bold;
    }
    #due {
        margin-left: 50px;
    }
</style>
<template>
    <div class="todo">
        <div class="columns">
            <div class="column">
                <h2>TODO LIST</h2>
                <ul>
                    <li v-for="(todo,index) in mytodos" v-bind:key="index">
                        <input type="checkbox" id="check"/>{{todo.name}}<span id="due">{{todo.duedate}}</span>
                    </li>
                </ul>
                <button class="button" v-on:click="addToDoItem">Add Item</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component} from "vue-property-decorator";
var date
@Component
export default class ToDos extends Vue {
    mytodos: ToDo[] = [
        {name: "yay", duedate:(new Date("2015-3-25"))},
        {name: "yay2", duedate:new Date("2019-2-14")}
    ];
    addToDoItem() {
        this.mytodos.push({name: `todo${new Date().getTime()}`, duedate:undefined});
    }
}

interface ToDo {
    name: string;
    duedate: Date | undefined;
}

</script>
