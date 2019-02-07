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
                    <td><span>{{todo.title}}</span></td>
                    <td><span>{{todo.duedate}}</span></td>
                    <td><span>{{todo.completed}}</span></td>
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
import AddItem from "@/components/AddItem.vue";
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";

@Component({
  components: {
    AddItem
  }
})

export default class ToDos extends Vue {
    public showAddItem: boolean = false;
    error: string | boolean = false;

    /* 
    new_item: ToDo = {
        name: "",
        duedate: new Date(),
        completed: false,
    }
    */

    mytodos: () => any[] =
         function(){ 
        //this.error = false;
        //debugger;
        console.log("getting todo items");
        axios
            .get(APIConfig.buildUrl("/todos"))
            .then((response:AxiosResponse) => {
                console.log(response.data);
                console.log(JSON.stringify(response.data))
                return response.data;
            })
            .catch((response:AxiosResponse) => {
                //this.error = response.data.error;
                console.log(this.error);
            });

        return [];
         
    };

    successAdditem(n:ToDo){
        //this.mytodos.push({name: n.name, duedate: n.duedate});
        this.addToDoItem(n);    //push to database
        this.showAddItem = false;
    }
    cancelAddItem(){
        this.showAddItem = false;
    }
    showAddItemModal(){
        this.showAddItem = true;
    }

    
    deleteItem(ind: number){
        //this.mytodos.splice(ind,1);
        console.log("delete item");
    }

    addToDoItem(n: ToDo){
        this.error=false;
        //console.log(n.title);
        //debugger;
        axios
            .post(APIConfig.buildUrl("/todos"), {
                title: n.title,
                duedate: n.duedate,
                completed: false,
            })
            .then((response: AxiosResponse<ToDoResponse>)=> {
                console.log("inside then you should work");
                this.$store.commit("todo", {
                    token: response.data.token,
                    ToDoId: response.data.ToDoId,
                });
                //this.$emit("success");
            })
            .catch((response: AxiosResponse) => {
                //this.error = errorResponse.response.data.reason;
                console.log("error");
                //console.log(this.error);
            });
    }   

    
    /*
    addToDoItem(){
        this.mytodos.push({name: `todo${new Date().getTime()}`, duedate: undefined});
    }
    */
}

interface ToDo {
    title: string;
    duedate: Date | undefined;
    completed: boolean;
}

interface ToDoResponse{
    token: string;
    ToDoId: string;
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
    width: 60%;
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