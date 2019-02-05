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

        <br><br><br>
        
        <div class="row">
            <form id="new_item" class="text" @submit.prevent="processForm(item, finish)">
                <br>
                <div class="column middle1">
                    Item: 
                    <input 
                        type="text" 
                        class="input"
                        name="item"
                        v-model="form.title">
                 </div>
  
                <span>Finish By:</span>
                <br> 
                <div class="column middle2">
                    <input 
                        type="text" 
                         class="input"
                         name="finish"
                         v-model="form.date">
                </div>
                <div class="column middle3">
                    <button class="button3" v-on:click="add(item, finish)">Save</button>
                </div>
            </form> 
        </div>
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
    form: newItem = {
        title: "",
        date: ""
    };

    mytodos: ToDo[] = [
        {name: "Grocery Shopping", new Date("2/2/2019")};
    ]; 

    addToDoItem(name: string, duedate: string){
       this.mytodos.push(name, duedate);
       this.form.title = "";
       this.form.date = "";
    }

    removeItem(index: number){
       this.mytodos.splice(index,1);
    }
}

interface ToDo{
    name: string;
    duedate: Date | undefined;
}

export interface newItem{
    title: string;
    date: string;
}
</script>