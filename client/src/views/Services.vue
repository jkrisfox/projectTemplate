<template>
  <div class="services tile is-ancestor">
    <div class="tile is-parent is-vertical">
      <p > All Services are performed in store</p>
      <div class="tile is-child box">
        <p class="title">Install</p>
          <body>
            BAR TAPE     $20 <br>
            BASKET     $15
            BOTTOM BRACKET     $30 <br>
            CASSETTE/FREEWHEEL/COG     $15 <br>
            CHAIN      $12 <br>
            HEADSET     $40 <br>
            RACK     $20 <br>
            SPOKE     $25 (FRONT)/$35 (REAR) <br>
            TUBE     $8 <br>
          </body>
        </div>
      </div>

    <div class="tile is-parent">
      <div class="tile is-child box">
      <p class="title">Tune-Ups & Builds</p>
      
        <body>  
            TIP TOP TUNE-UP <br>
            FREE FOR AS LONG AS YOU OWN YOUR TIP TOP BIKE <br>
            STANDARD TUNE     $ 90 <br>
            SINGLE-SPEED TUNE     $60 <br>
            BUILD BIKE FROM BOX     $100 <br>
            BUILD CUSTOM BICYCLE     STARTING AT $200 <br>
          </body>
        </div>
      </div>
  
  
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

// @Component({
//   components: {
//     HelloWorld
//   }
// })

export default class services extends Vue {}
</script>

<style scoped lang="scss">

  .services {
    margin: 2%;
  }
</style>