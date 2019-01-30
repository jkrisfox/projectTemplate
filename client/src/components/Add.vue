<template>
  <form  v-on:submit.prevent="onSubmit">
    <div class="field">
      <label class="label">Title</label>
      <div class="control">
        <input class="input" type="text" placeholder="title" v-bind="addi.title"/>
      </div>
    </div>
    <div class="field">
      <label class="label">Due Date</label>
      <div class="control">
        <input class="input" type="text" placeholder="due date" v-bind="addi.date"/>
      </div>
    </div>
  </form>
</template>

<script lang="ts">

import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component, Prop, Vue } from "vue-property-decorator";
import Modal from "./Modal.vue";
import { iItem } from "../models/item.interface";

@Component
export default class Add extends Vue {
  addi: Item = {
    title: "",
    date: ""
  };


  error: string | boolean = false;

  success() {
    this.error = false;
    console.log('hello');
    axios
      .post(APIConfig.buildUrl("/item"), {
        ...this.addi
      })
      .then((response: AxiosResponse<iItem>) => {
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

export interface Item {
  title: string;
  date: string;
}
</script>
