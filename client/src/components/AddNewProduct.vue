<template>
  <div class="profile columns">
    <div class="profilePhoto column">
      <form enctype="multipart/form-data" novalidate>
        <div class="profilePhoto">
          <img :src="profileUrl"/>
        </div>
        <div class="file">
          <label class="file-label">
            <input
              type="file"
              name="profilePhoto"
              :disabled="isSaving"
              v-on:change="filesChanged"
              accept="image/*"
              class="input-file file-input"
            >
            <span class="file-cta">
              <span class="file-icon">
                <font-awesome-icon icon="upload"/>
              </span>
              <span class="file-label">
                Choose an item image…
              </span>
            </span>
          </label>
          <p v-if="isSaving">Uploading file...</p>
        </div>
      </form>
    </div>
    <div class="profileInfo column">
      <div class="field">
        <label class="label">Product Name:</label>
        <div class="control">
          <input class="input" type="text" placeholder="product name" v-model="item.name">
        </div>
      </div>
      <div class="field">
        <label class="label">Description:</label>
        <div class="control">
          <textarea class="input" type="" placeholder="item description" v-model="item.description"></textarea>
        </div>
      </div>
      <div class="field">
        <label class="label">Price:</label>
        <div class="control">
          <input class="input" type="text" placeholder="email address" v-model="item.price">
        </div>
      </div>
      <div class="field">
        <label class="label">Stock/Inventory Count:</label>
        <div class="control">
          <input class="input" type="text" placeholder="stock/inventory count" v-model="item.stockCount">
        </div>
      </div>
      <div class="field">
        <label class="label">Item Categories/Tags: (separated by ";")</label>
        <div class="control">
          <input class="input" type="text" placeholder="item categories/tags" v-model="item.tags">
        </div>
      </div>
      <label class="checkbox">
        <input type="checkbox" v-bind:checked="item.inStoreOnly">
            In Store Only
        </label>
    </div>
  </div>
</template>

<script lang="ts">
import axios, { AxiosResponse } from "axios";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { APIConfig } from "@/utils/api.utils";
import { iItem } from "@/models/item.interface";

const STATUS_INITIAL = 0;
const STATUS_SAVING = 1;
const STATUS_SUCCESS = 2;
const STATUS_FAILED = 3;

@Component
export default class AddNewProduct extends Vue {
  fileCount: number = 0;
  currentStatus: number | null = null;
  uploadError: string | null = null;
  uploadedFile: any = null;

  item: iItem = {
    name: "",
    description: "",
    price: 0.0,
    imageUrls: "",
    stockCount: 0,
    tags: "",
    inStoreOnly: undefined
  };

  upload(formData: FormData) {
    if (this.item) {
      const url = `${APIConfig.url}/users/${this.item.id}`;
      return axios
        .post(url, formData, {
          headers: { token: this.$store.state.userToken }
        })
        .then((res: AxiosResponse<{ user: iItem }>) => {
          this.$store.dispatch("fetchUser", { userid: res.data.user.id });
        });
    }
    return Promise.reject({ response: "no user logged in" });
  }

  save(formData: FormData) {
    // upload data to the server
    this.currentStatus = STATUS_SAVING;
    this.upload(formData)
      .then(() => {
        this.currentStatus = STATUS_SUCCESS;
      })
      .catch(err => {
        this.uploadError = err.response;
        this.currentStatus = STATUS_FAILED;
      });
  }

  filesChanged(event: any) {
    const name = event.target.name;
    const files = event.target.files;
    this.fileCount = event.target.files.length;
    // handle file changes
    const formData = new FormData();

    if (!files.length) return;

    // append the files to FormData
    Array.from(Array(files.length).keys()).map(x => {
      formData.append(name, files[x], files[x].name);
    });

    // save it
    this.save(formData);
  }

  reset() {
    // reset form to initial state
    this.currentStatus = STATUS_INITIAL;
    this.uploadError = null;
  }

  mounted() {
    this.reset();
  }

  //computed
  get isInitial() {
    return this.currentStatus === STATUS_INITIAL;
  }

  get isSaving() {
    return this.currentStatus === STATUS_SAVING;
  }

  get isSuccess() {
    return this.currentStatus === STATUS_SUCCESS;
  }

  get isFailed() {
    return this.currentStatus === STATUS_FAILED;
  }

  get profileUrl(): string {
    if (this.item) {
      return APIConfig.buildUrl(`/${this.item.imageUrls}`);
    }
    return "";
  }
}
</script>
<style scoped>
</style>
