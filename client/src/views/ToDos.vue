<template>
    <div class="page">

        <!--Page Header-->
        <div class="element">
            <h1>TODO LIST</h1>
        </div>
        
        <!--Display To Do Items in table-->
        <div class="element">
            <table>
                <tr>
                    <th>NO.</th>
                    <th>ITEM</th>
                    <th>DUE DATE</th>
                    <th>COMPLETE</th>
                    <th>DELETE</th>
                </tr>
                <tr v-for="(todo,index) in mytodos" v-bind:key="index">
                    <td>{{index+1}}</td>
                    <td><span>{{todo.name}}</span></td>
                    <td><span>{{todo.duedate}}</span></td>
                    <td><span>{{todo.complete}}</span></td>
                    <td><button class="button" v-on:click="deleteItem(index)">x</button></td>
                </tr>
            </table>
        </div>

        <!--Button - add item-->
        <div class="element">
            <a class="button is-light" v-on:click="showAddItemModal">Add Item</a>
        </div>

        <!--Add item Modal-->
        <router-view/>
        <AddItem v-bind:is-showing="showAddItem"  v-on:success="successAdditem" v-on:cancel="cancelAddItem"/>
        
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop} from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";

import AddItem from "@/components/AddItem.vue";
import Axios from 'axios';

@Component({
  components: {
    AddItem
  }
})

export default class ToDos extends Vue {
    public showAddItem: boolean = false;
    error: string | boolean = false;

    //fill this with data from the database?
    mytodos: ToDo[] = [];

    new_item: ToDo = {
        name: "",
        duedate: new Date(),
        complete: false,
    }

    //irrelevant
    addToDoItem(){
        this.mytodos.push({name: `todo${new Date().getTime()}`, duedate: undefined, complete: false});
    }

    deleteItem(ind: number){
        this.mytodos.splice(ind,1);
    }

    successAdditem(n:ToDo){
        //console.log("@success add item");
        //console.log(n);

        //get rid of this later
        this.mytodos.push({name: n.name, duedate: n.duedate, complete: false});

        //adding new item to database
        this.error = false;
        axios
        .post(APIConfig.buildUrl("/todos"), {
            name: n.name,
            duedate: n.duedate,
        })
        .then((response: AxiosResponse<ToDoResponse>) => {
            this.$store.commit("todo", {
                token: response.data.token,
                todoId: response.data.todoId,
                //name: response.data.name,
                //duedate: response.data.duedate,
            });
            //this.$emit("Success");
        })
        .catch((response: AxiosResponse) => {
            debugger;
            this.error = response.data.error;
        });

        this.showAddItem = false;
    }
    cancelAddItem(){
        this.showAddItem = false;
    }
    showAddItemModal(){
        this.showAddItem = true;
    }

}

interface ToDo {
    name: string;
    duedate: Date | undefined;
    complete: boolean,
}

interface ToDoResponse {
    token: string;
    todoId: string;
    //name: string;
    //duedate: Date;
}

</script>


<!--"scoped" so that any changes to the style will only happen here-->
<style scoped>

.page {
    padding: 20px;
    margin: auto;
    text-align: center;
}

.element {
    padding: 15px;
    margin: auto;
    text-align: center; 
}

h1 {
    font-size: 30px;
    font-weight: bold;
    text-align: center;
}

table {
    width: 50%;
    margin: auto;
}

th {
    background-color: darkgrey;
}

th, td {
    padding: 15px;
    text-align: center;
    border: 1px solid black;
}

</style>