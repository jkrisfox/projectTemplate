<template>
  <modal v-bind:is-showing="isShowing" title="NewToDo" success-button="Add" v-on:success="success" v-on:cancel="cancel">
    <form v-on:submit.prevent="onSubmit">
      <p v-if="error" class="is-danger">
        {{ error }}
      </p>
      <div class="field">
        <label class="label">Item Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="name" v-model="newItem.name"/>
        </div>
      </div>
      <div class="field">
        <label class="label">Due Date</label>
        <div class="control">
          <input class="input" type="text" placeholder="duedate" v-model="newItem.duedate"/>
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
export default class NewToDo extends Vue {
  @Prop(Boolean) isShowing: boolean = false;
  newItem: NewToDoForm = {
    name: "",
    duedate: undefined
  };
  error: string | boolean = false;

  success() {
    this.error = false;
    console.log('hello');
  }

  cancel() {
    this.$emit("cancel");
  }
}

export interface NewToDoForm {
  name: string;
  duedate: Date | undefined;
}
</script>
