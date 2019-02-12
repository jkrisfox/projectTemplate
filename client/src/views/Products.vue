<template>
  <div class="products">
    <h1>This is a products page</h1>
    <!-- <a class="button is-light" v-if="isLoggedIn" v-on:click="startAddNewProduct()">Add a New Product</a> -->
    <router-link
                class="button is-text"
                v-if="isLoggedIn"
                to="/products/newproduct"
                exact-active-class="is-active"
              >Add a New Product</router-link>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import App from "@/App.vue";

@Component({
  components: {
    App
  }
})
export default class Products extends Vue {
    get isLoggedIn(): boolean {
        return !!this.$store.state.user;
    }

    startAddNewProduct() {

    }

}

</script>