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
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Signup extends Vue {
  addi: Item = {
    title: "",
    date: ""
  };
}

export interface Item {
  title: string;
  date: string;
}
</script>
