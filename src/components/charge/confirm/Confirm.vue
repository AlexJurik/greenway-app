<template>
  <div>
    <div class="text-center">
      <v-icon class="mb-5" x-large color="success">mdi-help-circle</v-icon>
      <h1 class="font-weight-light mb-5">{{ $t("doYouWantStart") }}</h1>
      <div class="d-flex flex-column">
        <span class="font-weight-bold mb-2 confirm__text-muted"
          >{{ $t("pricingInfo") }}*:</span
        >
        <span class="mb-2 confirm__text-muted"
          >{{ $t("consumedEnergy") }}:</span
        >
        <span class="mb-2 confirm__text-muted">0.25€ / kWh</span>
        <span class="mb-2 confirm__text-muted"
          >{{ $t("chargingTimeFee") }}:</span
        >
        <span class="mb-5 confirm__text-muted">0.1€ / min</span>
        <span class="mb-5 confirm__text-muted"
          >*{{ $t("discountsAreNotIncluded") }}</span
        >
      </div>
    </div>
    <v-card-actions>
      <v-layout justify-center>
        <v-btn
          class="mr-3"
          x-large
          color="success"
          text
          @click="$emit('on-cancel')"
        >
          {{ $t("cancel") }}
        </v-btn>
        <v-btn x-large color="success" @click="start()">{{
          $t("startCharging")
        }}</v-btn>
      </v-layout>
    </v-card-actions>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Confirm",
  methods: {
    start() {
      this.$emit("start-charging");
    },
  },
});
</script>

<style lang="scss">
.confirm__text-muted {
  opacity: 0.7;
}
</style>