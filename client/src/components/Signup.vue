<template>
  <form  v-on:submit.prevent="onSubmit">
    <div class="field">
      <label class="label">First Name</label>
      <div class="control">
        <input class="input" type="text" placeholder="first name" v-bind="signup.firstName"/>
      </div>
    </div>
    <div class="field">
      <label class="label">Last Name</label>
      <div class="control">
        <input class="input" type="text" placeholder="last name" v-bind="signup.lastName"/>
      </div>
    </div>
    <div class="field">
      <label class="label">Email Address</label>
      <div class="control">
        <input class="input" type="text" placeholder="email address" v-bind="signup.emailAddress"/>
      </div>
    </div>
    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input class="input" type="password" placeholder="password" v-bind="signup.firstName"/>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Signup extends Vue {
  signup: SignupForm = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: ""
  };
}

export interface SignupForm {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
}
</script>
