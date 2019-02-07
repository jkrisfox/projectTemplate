<template>
  <modal v-bind:is-showing="isShowing" title="Add" success-button="Add" v-on:success="success" v-on:cancel="cancel">
    <form v-on:submit.prevent="onSubmit">
      <p v-if="error" class="is-danger">
        {{ error }}
      </p>
      <div class="field">
        <label class="label">Title</label>
        <div class="control">
          <input class="input" type="text" placeholder="Title" v-model="signup.title"/>
        </div>
      </div>
      <div class="field">
        <label class="label">Due Date</label>
        <div class="control">
          <input class="input" type="text" placeholder="Due Date" v-model="signup.ddate"/>
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
import { itodo } from "../models/todo.interface";

@Component({
  components: { Modal }
})
export default class newItem extends Vue {
  @Prop(Boolean) isShowing: boolean = false;
  signup: newItemForm = {
    title: "",
    ddate: ""
  };
  error: string | boolean = false;

  success() {
    debugger;
    this.error = false;
    console.log('hello');
    axios
      .post(APIConfig.buildUrl("/todos"), {
        ...this.signup
      }, {headers: {token: this.$store.state.userToken}})
      .then((response: AxiosResponse<itodo>) => {
        this.$emit("success");
      })
      .catch((errorResponse: any) => {
        debugger;
        this.error = errorResponse.response.data.reason;
      });
  }

  cancel() {
    this.$emit("cancel");
  }
}

export interface newItemForm {
  title: string;
  ddate: string;
}
</script>
