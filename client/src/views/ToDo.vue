<template>
    <div class="ToDos">
        <header>
            <h2 class="padding">To-Do List</h2>
        </header>

        <br><br><br>

        <div class="row">
            <div class="column left">
                <h3>To-Do</h3>
            </div>
   
            <div class="column middle">
                <h3>Finish By</h3>
            </div>
   
            <div class="column right">
                <h3>Delete?</h3>
            </div>
        </div>

        <hr width=1300px align=left>

        <ul>
            <my-item v-for="(todo, index) in mytodos" 
                        v-on:remove="removeItem(index)"
                        v-bind:key="index">
                <div class="row">
                    <div class="column left">
                        <form action="/action_page.php">
                            <input type="checkbox" name="item" value="done"> 
                            <span> {{ todo.name }} </span>
                        </form>
                    </div>
   
                    <div class="column middle">
                        <span> {{ todo.duedate }} </span>
                    </div>
   
                    <div class="column right">
                        <button class="button" v-on:click="removeItem">Delete</button>
                    </div>
                </div>
                <hr width=1050px align=left>
            </my-item>
        </ul>
        <router-link class="button2" to="/addtodos" exact-active-class="is-active">Add ToDos</router-link>
    </div>
    
</template>

<script lang="ts">
import Vue from "vue"
import { Component } from "vue-property-decorator"
import AddToDo from "@/components/AddToDo.vue"
@Component({
  components: { AddToDo }
})
export default class ToDos extends Vue{
    mytodos: ToDo[] = [
        {name: "Grocery Shopping", duedate: undefined}
    ]; 

    addToDoItem(name: string, duedate: string){
       this.mytodos.push({name: ``, duedate: undefined});
    }

    removeItem(index: number){
       this.mytodos.splice(index,1);
    }
}

interface ToDo{
    name: string;
    duedate: string | undefined;
}
</script>