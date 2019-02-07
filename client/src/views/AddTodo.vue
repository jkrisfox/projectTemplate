<template>
    <div align = "center">
        <input class = textBox type="text" v-model="nameText" placeholder="Item Name">
        <input class = textBox type="text" v-model="duedateText" placeholder="Item Due Date">
        <input class = addButt type="submit" value="ADD" v-on:click="addTodo">
    </div>
</template>

import axios, { AxiosResponse } from "axios";
import { APIConfig } from "@/utils/api.utils";
import { iUser } from "@/models/user.interface";
<script>
export default{
    name: "AddTodo",
    data(){
        return {
            nameText: '',
            duedateText: '',
            complete: '',
            user: '',
        };
    },
    methods: {
        addTodo(){
            if (this.nameText.length > 0 && this.duedateText.length > 0){
                const title = this.nameText;
                const dueDate = this.duedateText;
                const complete = false;
                const userId = null;

                const newTodo = {title, complete, dueDate, userId};
                this.$emit('add-todo', newTodo);

                this.nameText = '';
                this.duedateText = '';
            }
        }
    }
    
}
</script>

<style scoped>
    .textBox{
		background-color: lightgrey;
		margin: 20px; 
		padding: 10px;
		font-size: 130%;
    }
    .addButt{
        text-align: center;
		border: none;
  		border-radius: 4px;
  		cursor: pointer;
		color: white;
		background-color: rgb(24, 114, 121);
		height: 50px;
		width: 100px;
		font-size: 150%;
		padding: 7px 20px;
    }
</style>
