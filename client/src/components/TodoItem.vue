<template>
<modal v-bind:is-showing="isShowing" title="TodoItem" success-button="TodoItem" v-on:success="success" v-on:cancel="cancel">
    <form v-on:submit.prevent="onSubmit">
      <p v-if="error" class="is-danger">
        {{ error }}
      </p>
      <div class="field">
        <label class="label">Todo Item</label>
        <div class="control">
          <input class="input" type="text" placeholder="todo item" v-model="todos.name"/>
        </div>
      </div>
      <div class="field">
        <label class="label">Due Date</label>
        <div class="control">
          <input class="input" type="text" placeholder="due date" v-model="todos.duedate"/>
        </div>
      </div>
    </form>
  </modal>
</template>

<script lang="ts">
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component, Prop, Vue } from "vue-property-decorator";
import Modal from "./Modal.vue";
import { iUser } from "../models/user.interface";

@Component({
  components: {
    Modal
  }
})
export default class Todos extends Vue {
  todos: Todo = {
    name: "",
    duedate: "",
  };
  error: string | boolean = false;
  @Prop(Boolean) isShowing: boolean = false;

  success() {
    this.error = false;
    console.log('hello');
    axios
      .post(APIConfig.buildUrl("/users"), {
        ...this.todos
      })
      .then((response: AxiosResponse<iUser>) => {
        this.$emit("success");
      })
      .catch((reason: any) => {
        this.error = reason;
      });
  }

  cancel() {
    this.$emit("cancel");
  }
}

export interface Todo {
  name: string;
  duedate: string;
}
</script>