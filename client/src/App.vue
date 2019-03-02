<template>
  <div id="app">
    <div class="navbar">
      <div class="navbar-menu">
        <div class="navbar-start">
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <span class="icon">
              <router-link to="/cart" exact-active-class="is-active">
                <i class="fas fa-shopping-cart"></i>
              </router-link>
            </span>
            <div class="buttons">
              <a class="button is-link" v-if="!isLoggedIn" v-on:click="showSignupModal()">
                <strong>Sign up</strong>
              </a>
              <a class="button is-light" v-if="!isLoggedIn" v-on:click="showLoginModal()">Log in</a>
              <a class="button is-light" v-if="isLoggedIn" v-on:click="logout">Log out</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view class="container"/>
    <Signup
      v-bind:is-showing="showSignup"
      v-on:success="successSignup()"
      v-on:cancel="cancelSignup()"
    />
    <Login v-bind:is-showing="showLogin" v-on:success="successLogin()" v-on:cancel="cancelLogin()"/>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Signup from "@/components/Signup.vue";
import Login from "@/components/Login.vue";
import { APIConfig } from "@/utils/api.utils";
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

@Component({
  components: {
    Signup,
    Login
  }
})
export default class App extends Vue {
  public showSignup: boolean = false;
  public showLogin: boolean = false;

  showSignupModal() {
    this.showSignup = true;
  }

  successSignup() {
    this.showSignup = false;
  }

  cancelSignup() {
    this.showSignup = false;
  }

  showLoginModal() {
    this.showLogin = true;
  }

  successLogin() {
    this.showLogin = false;
  }

  cancelLogin() {
    this.showLogin = false;
  }

  get isLoggedIn(): boolean {
    return !!this.$store.state.user;
  }

  logout() {
    axios
      .post(APIConfig.buildUrl("/logout"), null, {
        headers: { token: this.$store.state.userToken }
      })
      .then(() => {
        this.$store.commit("logout");
        this.$router.push({ name: "home" });
      });
  }
}
</script>


<style lang="scss">

$footer-background-color: white !default;
$footer-padding: 10rem 0rem 0rem !default;


@import "~bulma/css/bulma.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.footer {
  background-color: $footer-background-color;
  padding: $footer-padding;
}

.navbar-start {
  margin-left: auto;
}


.navbar-start {
  padding-top: 20px;
}

.navbar-end {
  margin-right: auto;
  padding-top: 20px;
}

</style>
