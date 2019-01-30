<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <ToDos msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import ToDos from "@/views/ToDos.vue"

@Component({
  components: {
    HelloWorld, ToDos
  }
})
export default class Home extends Vue {}
</script>
