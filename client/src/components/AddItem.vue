<template>
  <modal v-bind:is-showing="isShowing" title="Add Item" success-button="Add Item  " v-on:success="success" v-on:cancel="cancel">
    <form >
      <!--<form  v-on:submit.prevent="onSubmit">-->
      <p v-if="error">{{ error }}</p>
      <div class="field">
        <label class="label">Item</label>
        <div class="control">
          <input class="input" type="text" id="n" placeholder="what do you need to do?" v-model="add_item.name"/>
        </div>
      </div>
      <div class="field">
        <label class="label">Due Date</label>
        <div class="control">
          <input class="input" type="date" id="d" placeholder="yyyy-MM-dd" v-model="add_item.duedate"/>
        </div>
      </div>
    </form>
  </modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Modal from "./Modal.vue";

@Component({
  components: {
    Modal
  }
})
export default class Add_Item extends Vue {
  add_item: ToDo = {
    name: "",
    duedate: new Date()
  };

  error: string | boolean = false;
  @Prop(Boolean) isShowing: boolean = false;

  success() {
    this.error = false; 
    //console.log("adding item: " + this.add_item.name +", due: " + this.add_item.duedate);
    this.$emit("success",this.add_item);
    this.clearForm();
  }

  cancel() {
    //console.log("cancel add item");
    this.$emit("cancel");
    this.clearForm();
  }

  clearForm(){
    this.add_item.name="";
    this.add_item.duedate = new Date();
  }
}

interface ToDo {
  name: string;
  duedate: Date;
}
</script>
