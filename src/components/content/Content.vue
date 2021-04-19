<template>
  <v-container class="d-flex content__container">
    <v-row class="text-center">
      <v-col class="mb-5">
        <h2 class="headline font-weight-bold mb-5">Start charging</h2>
        <Dialog />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Dialog from "../charge/dialog/ChargeDialog.vue";
export default Vue.extend({
  components: { Dialog },
  name: "Content",
});
</script>

<style lang="scss">
.content__container {
  height: 100%;
  align-items: center;
}
</style>
