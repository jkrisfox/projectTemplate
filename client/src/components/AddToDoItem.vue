<template>
  <modal v-bind:is-showing="isShowing" title="Add Todo Item" success-button="Add" v-on:success="success" v-on:cancel="cancel">
    <form v-on:submit.prevent="onSubmit">
      <p v-if="error" class="is-danger">
        {{ error }}
      </p>
      <div class="field">
        <label class="label">What do you need to do?</label>
        <div class="control">
          <input class="input" type="text" placeholder="Pick-up Groceries" v-model="item.data"/>
        </div>
      </div>
      <div class="field">
        <label class="label">Date</label>
        <div class="control">
          <input class="input" type="text" placeholder="1/31/19 at 10am" v-model="item.date"/>
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
import { iToDoItem } from "../models/user.interface";

@Component({
  components: { Modal }
})
export default class AddToDoItem extends Vue {
  @Prop(Boolean) isShowing: boolean = false;
  item: ToDoItem = {
    data: "",
    date: ""
  };
  error: string | boolean = false;

  success() {
    this.error = false;
    console.log('hello');
    axios
      .post(APIConfig.buildUrl("/todoitems"), {
        ...this.item
      })
      .then((response: AxiosResponse<iToDoItem>) => {
        this.$emit("success");
      })
      .catch((reason: any) => {
        this.error = reason.message;
      });
  }

  cancel() {
    this.$emit("cancel");
  }
}

export interface ToDoItem {
  data: string;
  date: string;
}
</script>
