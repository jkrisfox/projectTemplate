<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title has-text-centered">
          To Do List
        </h1>
        <h2 class="subtitle has-text-centered">
          Please Login or Sign Up
        </h2>
        {{redirect()}}
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  get user() {
    return this.$store.state.user;
  }

  redirect(){
    if (this.$store.state.user) {
      this.$router.push({ name: "todos" });
    }
  }
}
</script>

<style scoped lang="scss">
  .home {
    max-width: unset;
    width: unset;
    margin: 2%;
  }
</style>