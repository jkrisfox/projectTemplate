<template>
  <modal v-bind:is-showing="isShowing" title="Login" success-button="Login" v-on:success="success" v-on:cancel="cancel">
    <form  v-on:submit.prevent="onSubmit">
      <p v-if="error">{{ error }}</p>
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
  </modal>
</template>

<script lang="ts">
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component, Prop, Vue } from "vue-property-decorator";
import Modal from "./Modal.vue";

@Component({
  components: {
    Modal
  }
})
export default class Signup extends Vue {
  signup: LoginForm = {
    emailAddress: "",
    password: ""
  };
  error: string | boolean = false;
  @Prop(Boolean) isShowing: boolean = false;

  success() {
    this.error = false;
    axios.post(APIConfig.buildUrl('/login'), {
      ...this.signup
    }).then((response: AxiosResponse<LoginResponse>) => {
      this.$store.commit('login', response.data.token);
      this.$emit("success");
    }).catch((reason: any) => {
      this.error = reason;
    })
  }

  cancel() {
    this.$emit("cancel");
  }
}

interface LoginResponse {
  token: string
}

export interface LoginForm {
  emailAddress: string;
  password: string;
}
</script>
