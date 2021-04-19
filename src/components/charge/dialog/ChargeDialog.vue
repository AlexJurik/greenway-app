<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600px">
      <template #activator="{ on, attrs }">
        <v-btn x-large color="success" dark v-bind="attrs" v-on="on">
          Start
        </v-btn>
      </template>
      <v-card class="charge__content">
        <div v-if="step !== 4" class="charge__title-container" align-center>
          <h2 class="mr-2 font-weight-medium font-weight-medium">
            Start charging
          </h2>
          <v-checkbox
            label="My locations"
            color="success"
            value="success"
            hide-details
          ></v-checkbox>
        </div>

        <template v-if="step === 1 || step === 2 || step === 3">
          <Items :items="data" :step="step" />
        </template>
        <template v-else>
          <Confirm @on-cancel="cancel()" />
        </template>

        <v-card-actions v-if="step !== 4">
          <v-layout justify-end class="mt-5">
            <v-btn
              class="mr-3"
              x-large
              v-if="step !== 1"
              color="success"
              text
              @click="step--"
            >
              Back
            </v-btn>
            <v-btn x-large color="success" @click="step++"> Next </v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import { DialogDataInterface, StepComponentEnum } from "./interfaces";
import Items from "../items/Items.vue";
import Confirm from "../confirm/Confirm.vue";
import { LocationInterface } from "@/lib/location";
import { ChargerInterface } from "@/lib/charger";
import { ConnectorInterface } from "@/lib/connector";

export default Vue.extend({
  name: "ChargeDialog",
  components: { Items, Confirm },
  data(): DialogDataInterface {
    return {
      data: { locations: [], chargers: [], connectors: [] },
      dialog: false,
      step: 1,
      stepComponent: StepComponentEnum.Location,
    };
  },
  mounted() {
    Promise.all([
      this.$http.get(`/charge/locations`),
      this.$http.get(`/charge/chargers`),
      this.$http.get(`/charge/connectors`),
    ]).then(([locations, chargers, connectors]) => {
      this.data.locations = [...locations.data] as LocationInterface[];
      this.data.chargers = [...chargers.data] as ChargerInterface[];
      this.data.connectors = [...connectors.data] as ConnectorInterface[];
    });
  },
  methods: {
    cancel() {
      this.dialog = false;
      setTimeout(() => (this.step = 1), 100);
    },
  },
});
</script>

<style lang="scss">
@import "src/scss/variables.scss";

.charge__content {
  padding: $gutter * 4;
}

.charge__title-container {
  display: flex;
  align-items: center;
  margin: $gutter * 6 0 $gutter * 8;
}

.v-input--selection-controls {
  margin: 0 !important;
}

.v-dialog {
  min-width: 360px;
}

.v-messages {
  min-height: 0;
}

.step__content-container {
  height: $gutter * 40;
  overflow: auto;
}

.step__fallback-text {
  font-size: $gutter * 3;
  text-align: center;
  opacity: 0.56;
}
</style>