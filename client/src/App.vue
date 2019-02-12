<template>
  <div id="app">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
    <div class="navbar">
      <div class="navbar-menu">
        <div class="navbar-logo">
          <router-link to="/" exact-active-class="is-active">
            <img class="foxcycle-logo-img" src="./assets/foxcyclelogo.png">
            <p class="foxcycle-logo-text">FoxCycle</p>
          </router-link>
            <p class="foxcycle-logo-city">San Luis Obispo, CA</p>
        </div>
        <div class="navbar-start">
          <router-link class="navbar-item is-tab" to="/" exact-active-class="is-active">Home</router-link> 
          <router-link class="navbar-item is-tab" to="/services" exact-active-class="is-active">Services</router-link>
          <router-link class="navbar-item is-tab" to="/products" exact-active-class="is-active">Products</router-link>
          <router-link class="navbar-item is-tab" to="/about" exact-active-class="is-active">About</router-link>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <span class="icon">
              <router-link to="/cart" exact-active-class="is-active">
                <i class="fas fa-shopping-cart"></i>
              </router-link>
            </span>
            <div class="buttons">
              <a class="button is-primary" v-if="!isLoggedIn" v-on:click="showSignupModal()">
                <strong>Sign up</strong>
              </a>
              <router-link
                class="button is-text"
                v-if="isLoggedIn"
                to="/my-profile"
                exact-active-class="is-active"
              >My Profile</router-link>
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

.foxcycle-logo-img {
  height: 100px;
  width: 100px;
}

.navbar-start {
  margin-left: auto;
  margin-right: unset;
}

.foxcycle-logo-text {
  display: inline;
  font-size: 2.5rem;
  color: black;
}

.fas.fa-shopping-cart {
  margin-right: 25px;
  color: black;
}

.navbar-start {
  padding-top: 86px;
}

.navbar-end {
  padding-top: 86px;
}

.foxcycle-logo-city {
  padding-left: 6px;
}

</style>
