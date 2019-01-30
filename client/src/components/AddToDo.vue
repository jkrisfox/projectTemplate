<template>
    <html>
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Add To Do Item</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" media="screen" href="custom.css" />
    </head>
    <body>

        <div class="mycontainer">
            <div class="header border-bottom">Add Item</div>

            <div class="mycontainer">
                <div class="form">
                    <div class="mycenter">
                        <form>
                            <h3>My To Do Item</h3>
                            Title<br><input type="text" name="title"><br><br>
                            Detail<br><input type="text" name="detail"><br><br>

                            <button class="button2" type="button">Add</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
        
    </body>
    </html>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop} from "vue-property-decorator";
import ToDos from "./views/TODO.vue";
import Modal from "./Modal.vue";

@Component({
  components: {
    Modal
  }
})
export default class AddToDo extends Vue {
    addtodo: AddToDoForm = {
        name: "",
        duedate: undefined
    }
}

export interface AddToDoForm {
    name: string;
    duedate: Date | undefined;
}





</script>