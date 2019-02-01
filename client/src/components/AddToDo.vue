<template>
    <div>
        <header>
            <h2 class="padding">New To-Do Item</h2>
        </header>

        <br><br><br>
        <div class="row">
        <form id="new_item" class="text" @submit.prevent="processForm(item, finish)">
            Item:
            <br>
            <div class="column">
                <input 
                    type="text" 
                    class="input"
                    name="item"
                    v-model="item">
            </div>
  
            <br><br><br>
  
            <span>Finish By:</span>
            <br> 
            <div class="column">
                <input 
                    type="text" 
                    class="input"
                    name="finish"
                    v-model="finish">
            </div>
  
            <br><br><br>
  
            <!-- <button class="button3" type="submit">Save &raquo;</button> -->
            <button class="button3" v-on:click="add(item, finish)">Save</button>
            <router-link class="button3" to="/todos" exact-active-class="is-active">Cancel</router-link>
        </form> 
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue"
import { Component } from "vue-property-decorator"
import ToDos from "./ToDo.vue"

export default {
    data:{
        item: '',
        finish: ''
    },

    methods:{
        processForm: function(item: string, finish: string){
            alert(item);
            alert(finish);
        }
    }
}
</script>