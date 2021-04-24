<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600px">
      <template #activator="{ on, attrs }">
        <v-btn
          x-large
          color="success"
          dark
          :disabled="disableOpenButton"
          v-bind="attrs"
          v-on="on"
        >
          {{ $t("start") }}
        </v-btn>
      </template>
      <v-card class="charge__content">
        <div v-if="step !== 4" class="charge__title-container" align-center>
          <h2 class="mr-2 font-weight-medium font-weight-medium">
            {{ $t("startCharging") }}
          </h2>

          <v-checkbox
            v-if="step === 1"
            v-model="filtered"
            :label="$t('myLocations')"
            color="success"
            hide-details
          ></v-checkbox>
        </div>

        <div v-if="step !== 4" class="charge__subtitle">
          <span>{{ subtitle }}</span>
        </div>
        <template v-if="step === 1 || step === 2 || step === 3">
          <Items
            :items="data"
            :step="step"
            :filter="filtered"
            @selectedValues="setValues($event)"
          />
        </template>
        <template v-else>
          <Confirm @on-cancel="hideDialog()" @start-charging="setCharging()" />
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
              {{ $t("back") }}
            </v-btn>
            <v-btn
              x-large
              color="success"
              :disabled="validateForm(step)"
              @click="step++"
            >
              {{ $t("next") }}
            </v-btn>
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
import { FormInterface } from "../items/interfaces";
import { RootActions } from "@/store/actions";
import { NotificationActions } from "@/store/notification/actions";

export default Vue.extend({
  name: "ChargeDialog",
  components: { Items, Confirm },
  data(): DialogDataInterface {
    return {
      data: {
        saved_locations: [],
        locations: [],
        chargers: [],
        connectors: [],
      },
      form: {
        location: undefined,
        charger: undefined,
        connector: undefined,
      },
      subtitle: "",
      dialog: false,
      filtered: false,
      disableOpenButton: false,
      step: 1,
      stepComponent: StepComponentEnum.Location,
    };
  },
  mounted() {
    this.disableOpenButton = true;
    Promise.all([
      this.$http.get(`/charge/saved-locations`),
      this.$http.get(`/charge/locations`),
      this.$http.get(`/charge/chargers`),
      this.$http.get(`/charge/connectors`),
    ]).then(
      ([saved_locations, locations, chargers, connectors]) => {
        this.data.saved_locations = [
          ...saved_locations.data,
        ] as LocationInterface[];
        this.data.locations = [...locations.data] as LocationInterface[];
        this.data.chargers = [...chargers.data] as ChargerInterface[];
        this.data.connectors = [...connectors.data] as ConnectorInterface[];
        this.disableOpenButton = false;
      },
      (err) => {
        this.$store.dispatch(NotificationActions.SET_NOTIFICATION, {
          message: err.message,
          type: "error",
        });
      }
    );
  },
  methods: {
    hideDialog() {
      this.dialog = false;
      this.resetStep();
    },
    resetStep() {
      setTimeout(() => {
        this.step = 1;
        this.form.location = undefined;
        this.form.charger = undefined;
        this.form.connector = undefined;
      }, 300);
    },
    setValues(form: FormInterface) {
      this.form = form;
      this.makeSubtitle();
    },
    validateForm(step: number) {
      switch (step) {
        case 1:
          return !this.form.location;
        case 2:
          return !this.form.charger;
        case 3:
          return !this.form.connector;
      }
    },
    makeSubtitle() {
      const formArray = [this.form.location?.name];

      if (this.form.charger) {
        formArray.push(this.form.charger?.name);
      }

      if (this.form.connector) {
        formArray.push(this.form.connector?.name);
      }

      this.subtitle = formArray.join(" - ");
    },
    setCharging() {
      this.$store.dispatch(RootActions.SET_CHARGING, true);
      this.hideDialog();
    },
  },
  watch: {
    dialog: function (value: boolean) {
      if (!value) {
        this.resetStep();
      }
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
  margin: $gutter * 6 0 $gutter * 3;
}

.charge__subtitle {
  opacity: 0.56;
  margin-bottom: $gutter * 3;
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