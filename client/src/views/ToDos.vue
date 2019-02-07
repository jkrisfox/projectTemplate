<template>
    <div class="page">

        <!--Page Header-->
        <div class="element">
            <h1>TODO LIST</h1>
        </div>
        
        <!--Display To Do Items in table-->
        <div class="element">
            <table >
                <tr>
                    <th>NO.</th>
                    <th>ITEM</th>
                    <th>DUE DATE</th>
                    <th>COMPLETE</th>
                    <th>DELETE</th>
                </tr>
                <tr v-for="(todo,index) in mytodos" v-bind:key="index">
                    <!--<td><span>{{todo.id}}</span></td>-->
                    <td><span>{{index+1}}</span></td>
                    <td><span>{{todo.title}}</span></td>
                    <td><span id="datetime">{{todo.duedate}}</span></td>
                    <!--<td><span>{{todo.complete}}</span></td>-->
                    <td v-if=todo.complete><span>&#10004;</span></td>
                    <td v-else><span>not yet</span></td>
                    <!--
                    <td v-else>
                        <input type="checkbox" v-on:click="checkComplete(todo.id)"/>
                        <label for="checkbox">{{ checked }}</label>
                    </td>
                    -->
                    <td>
                        <button class="button" v-on:click="deleteItem(todo.id)"><span>&#10006;</span></button>
                    </td>
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

   //fill todolist
    mytodos: any[] = [];
    created(){
        this.getToDoList();
    }


    successAdditem(n:ToDo){
        this.addToDoItem(n);    //push to database
        this.showAddItem = false;
        this.getToDoList();
    }
    cancelAddItem(){
        this.showAddItem = false;
    }
    showAddItemModal(){
        this.showAddItem = true;
    }

    addToDoItem(n: ToDo){
        this.error=false;
        //debugger;
        axios
            .post(APIConfig.buildUrl("/todos"), {
                title: n.title,
                duedate: n.duedate,
                complete: false,
            })
            .then((response: AxiosResponse<ToDoResponse>)=> {
                this.$store.commit("todo", {
                    token: response.data.token,
                    ToDoId: response.data.ToDoId,
                });
                //this.$emit("success");
            })
            .catch((response: AxiosResponse) => {
                this.error = response.data.error;
                console.log(this.error);
            });
    }   

    getToDoList(){ 
        this.error = false;
        //debugger;
        axios
            .get(APIConfig.buildUrl("/todos"))
            .then((response:AxiosResponse) => {
                //console.log(response.data.todo);
                this.mytodos = response.data.todo;
                return response.data;
            })
            .catch((response:AxiosResponse) => {
                this.error = response.data.error;
                console.log(this.error);
            });
    }

    deleteItem(ind: number){
        //this.mytodos.splice(ind,1);
        this.error = false;
        console.log("delete item", ind);
        axios
            .delete(APIConfig.buildUrl("/todos"), {
                params: {
                    id : ind
                }
            })
            .catch((response: AxiosResponse) => {
                console.log("couldn't delete");
            });
    }

    checkComplete(ind: number){
        console.log("clicked");
        this.error = false;
        console.log("delete item", ind);
        axios
            .put(APIConfig.buildUrl("/todos"), {
                params: {
                    id : ind
                },
                body : {
                    complete: true
                }
            })
            .catch((response: AxiosResponse) => {
                console.log("couldn't delete");
            });
    }

}

interface ToDo {
    title: string;
    duedate: Date | undefined;
    complete: boolean;
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
    background-color: #E393CA;
}

th, td {
    padding: 15px;
    text-align: center;
    border: 1px solid black;
}

</style>
