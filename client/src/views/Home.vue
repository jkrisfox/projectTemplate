<template>
  <div class="home">
    <div class="tile is-ancestor">
      <div class="hours tile is-vertical is-parent is-3">
        <div class="tile is-child box">
          <p class="title">OPEN</p>
        </div>
        <div class="tile is-child box">
          <p class="title">Hours</p>
            <table style="width:100%">
              <tr>
                <th>Weekdays</th>
                <th>Weekends</th> 
                <th></th>
              </tr>
              <tr>
                <td>8 am - 7 pm</td>
                <td>10 am - 6 pm</td> 
                <td></td>
              </tr>
            </table>
        </div>
        <div class="location tile is-child box">
          <a href="https://maps.calpoly.edu/place/bldg-014-0/@35.3084197,-120.6805840,14.1z">
            14256 Frank Pilling Road, San Luis Obispo, 93407
          </a>
        </div>
      </div>

      <div class="announcement tile is-parent is-vertical">
        <div class="tile is-child box">
          <p class="title">Announcement</p>
        </div>
        <div class="tile is-child box">
          <p class="title">Featured</p>
        </div>
      </div>
    </div>
    <footer class="footer">
    <div class="content has-text-centered">
      <p>
        <strong>WhiteSky</strong> 2019<a href="https://jgthms.com"></a>. The source code is licensed
        <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
      </p>
    </div>
</footer>
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

export default class Home extends Vue {}
</script>

<style scoped lang="scss">
  .home {
    max-width: unset;
    width: unset;
    margin: 2%;
  }
</style>