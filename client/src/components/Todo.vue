<template>
    <modal v-bind:is-showing="isShowing" title="Todos" success-button="Add" v-on:success="success" v-on:cancel="cancel">
        <form v-on:submit.prevent="onSubmit">
            <p v-if="error" class="is-danger">
                {{ error }}
            </p>
            <div class="field">
                <label class="label">Item</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Item name" v-model="todos.item" />
                </div>
            </div>
            <div class="field">
                <label class="label">Due Date</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Due date" v-model="todos.duedate" />
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
  components: { Modal }
})
export default class Todos extends Vue {
  @Prop(Boolean) isShowing: boolean = false;
  todos: TodosForm = {
      item: "",
      duedate: undefined
  };
  error: string | boolean = false;

  success() {
    this.error = false;
    // this.signup.firstName = "done";
    console.log("hello");
    axios
      .post(APIConfig.buildUrl("/users"), {
        ...this.todos
      })
      .then((response: AxiosResponse<iUser>) => {
        this.$emit("success");
      })
      .catch((errorResponse: any) => {
        this.error = errorResponse.response.data.reason;
      });
  }

  cancel() {
    this.$emit("cancel");
  }
}

export interface TodosForm {
    item: string;
    duedate: Date | undefined;
}
</script>
