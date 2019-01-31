<template>
<div>
  <h2>New To-Do Item</h2>
  <form>
    <label for="title">Title</label>
    <input type="text" id="title" name="title">
    <label for="duedate">Due Date</label>
    <input type="text" id="ddate" name="ddate">
  </form>

  <a href="/todos" class="button button2" v-on:click="addtoItem( 'hello', 'hi')">Save</a>
  <a href="/todos" class="button button3">Cancel</a>
</div>
</template>



<script lang="ts">
import Vue from "vue";
import ToDos from "./ToDos.vue";
import { Component } from "vue-property-decorator";
@Component
export default class newItm extends ToDos {

}
</script>


<style>
.button {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  cursor: pointer;
}
.button2 {
  background-color: white;
  color: black;
  border: 2px solid #008cba;
}

.button2:hover {
  background-color: #008cba;
  color: white;
}
.button3 {
  background-color: white;
  color: black;
  border: 2px solid #f44336;
}

.button3:hover {
  background-color: #f44336;
  color: white;
}
input[type="text"] {
  width: 100%;
  margin: 8px 0;
  box-sizing: border-box;
  border: none;
  border-bottom: 2px solid gray;
}
</style>