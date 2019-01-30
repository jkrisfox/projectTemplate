<template>

    <html>
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>To Do List</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" media="screen" href="custom.css" />
    </head>
    <body>

        <div class="mycontainer">
            <div class="header border-bottom">My To Do List</div>
            <div class="mycontainer">
                <table style="width:80%">
                    <tr style="background: lightblue">
                        <th>Done?</th>
                        <th>To Do</th>
                        <th>Due Date <a v-on:click="sortByDate">(sort)</a></th> 
                        <th>Delete?</th>
                    </tr>
                    <tr v-for="(todo, index) in mytodos" v-bind:key="index">
                        <td><input type="checkbox"></td>
                        <td>{{ todo.name }} </td>
                        <td>{{ todo.duedate.getMonth() + 1 }}/{{ todo.duedate.getDate() }}/{{ todo.duedate.getFullYear() }}</td>
                        <td><button type="button" v-on:click="deleteToDoItem(index)">Delete</button></td>
                    </tr>       
                </table>

                <div class="horizontal-div"></div>

                <!-- add to do item form -->
                <div class="form">
                     <h3 style="padding-left: 20px">Add To Do Item</h3>
                        <form class="form-inline">        
                            <label for="name">Title</label>
                            <input type="text" name="title" placeholder="My Task" v-model="form.title">
                            <label for="date">Due Date</label>
                            <input type="text" name="date" placeholder="Format: 02/09/2019" v-model="form.date">
                            <button class="button2" type="button" v-on:click="addToDoItem">Add</button>
                        </form>
                </div>
                <!-- END add to do item form -->

            </div>
        </div>
    </body>
    </html>
</template>

<script lang="ts">
import Vue from "vue"
import { Component } from "vue-property-decorator"
@Component
export default class ToDos extends Vue {
    mytodos: ToDo[] = [
        { name: "csc 307 lab", duedate : new Date("01/30/2019") },
        { name: "PL1 assign3", duedate: new Date("02/03/2019") },
        { name: "clean kitchen", duedate: new Date("02/09/2019") },
    ];

    form: ToDoForm = {
        title: "",
        date: ""
    };

    sortByDate() {
        this.mytodos.sort(function(a : any, b : any){return a.duedate - b.duedate});
    }

    addToDoItem() {
        this.mytodos.push({name: this.form.title, duedate: new Date(this.form.date)});
        this.form.title = "";
        this.form.date = "";
    }

    deleteToDoItem(index : number) {
        this.mytodos.splice(index, 1);
    }
}

export interface ToDoForm {
    title: string;
    date: string;
}

interface ToDo {
    name: string;
    duedate: Date | undefined;
}

</script>

<style scoped>
.mycontainer {
    margin: 25px;
}

.mycenter {
    margin: 0 auto;
    width: 200px;
    padding-bottom: 20px;
}

.horizontal-div {
    border-bottom: 3px;
    border: 1px solid lightblue;
    margin-bottom: 10px;
    margin-top: 10px;
}

.form-inline { 
  display: flex;
  flex-flow: row wrap;
  align-items: center;
}

/* Add some margins for each label */
.form-inline label {
  margin: 10px 10px 10px 20px;
}

/* Style the input fields */
.form-inline input {
  vertical-align: middle;
  margin: 5px 10px 5px 0;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
}

.form {
    margin: auto;
    width: 650px;
    background-color: lightblue;
    padding: 25px;
}

.header {
    color: lightsalmon;
    font-size: 32px;
    font-family: 'Courier New', Courier, monospace;
    padding-bottom: 5px;
}

div.border-bottom {
    border-bottom: 2px solid lightsalmon;
}

/* format table */
th {
    border-collapse: collapse;
    color: white;
    font-family: 'Courier New', Courier, monospace;
    font-size: 18px;
    text-align: center;
}

h3 {
    font-family: 'Courier New', Courier, monospace;
}

label {
    font-family: 'Courier New', Courier, monospace;
}

th, td {
    padding: 15px;
}

table {
    border-spacing: 20px;
    margin: 0 auto;
}

td {
    text-align: center;
}


/* style buttons */
button {
    border: none;
    color: red;
    padding: 5px 10px;
    text-align: center;
    border: 2px solid red;
    font-size: 16px;
    font-family: 'Courier New', Courier, monospace;
    cursor: pointer;
    border-radius: 5px;
    -webkit-transition-duration: 0.4s; /* Safari */
    transition-duration: 0.4s;
  }

  .button2 {
    background-color: green;
    color: white;
    border: 2px solid green;
  }

  .button2:hover {
    background-color: rgb(90, 189, 90); /* Green */
    color: white;
    border: 2px solid rgb(90, 189, 90)
  }

  button:hover {
    background-color: red; /* Green */
    color: white;
  }

  /* style input type */
  input[type=text] {
      width: 150 px;
      padding: 10px;
      margin: 5px;
      border: 1px solid lightgray;
      border-radius: 4px;
      outline: none;
  }

input[type=text]:focus {
    border: 2px solid lightsalmon;
  }

input[type=checkbox]{
    width: 40px;
    height: 40px;
    border: 1px solid lightsalmon;
}

</style>