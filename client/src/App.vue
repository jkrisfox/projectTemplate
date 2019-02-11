<template>
  <div id="app">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
    <div class="navbar">
      <div class="navbar-menu">
        <div class="navbar-logo">
          <a href="/">
            <img class="foxcycle-logo-img" src="./assets/foxcyclelogo.png">
            <p class="foxcycle-logo-text">FoxCycle</p>
          </a>
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
              <a class="button is-primary" v-on:click="showSignupModal()">
                <strong>Sign up</strong>
              </a>
              <a class="button is-light" v-on:click="showLoginModal()">
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view/>
    <Modal v-bind:is-showing="showSignup" title="Signup" v-on:success="successSignup()" v-on:cancel="cancelSignup()">
      <Signup/>
    </Modal>
    <Modal v-bind:is-showing="showLogin" title="Login" v-on:success="successLogin()" v-on:cancel="cancelLogin()">
      <Login/>
    </Modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Modal from "@/components/Modal.vue";
import Signup from "@/components/Signup.vue";
import Login from "@/components/Login.vue";

@Component({
  components: {
    Modal,
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
}
</script>


<style lang="scss">
@import "~bulma/css/bulma.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
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

</style>
