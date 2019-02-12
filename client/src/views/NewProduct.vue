<template>
  <div>
    <h1>New Product</h1>
    <div class="container">
      <AddNewProduct v-if="user" v-bind:user="user"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import axios, { AxiosResponse } from "axios";
import { APIConfig } from "@/utils/api.utils";
import { iUser } from "@/models/user.interface";

import AddNewProduct from "@/components/AddNewProduct.vue";

@Component({ components: { AddNewProduct } })
export default class NewProduct extends Vue {
  get user() {
    return this.$store.state.user;
  }
  mounted() {
    if (!this.$store.state.user) {
      this.$router.push({ name: "home" });
    }
  }
}
</script>
