<template>
  <v-container class="d-flex content__container">
    <v-snackbar
      :value="showSnack"
      :color="snackType"
      absolute
      rounded="pill"
      top
    >
      {{ snackMessage }}
    </v-snackbar>
    <v-row class="text-center">
      <v-col class="mb-5">
        <div class="content__langs">
          <v-select :items="langs" v-model="$i18n.locale"> </v-select>
        </div>
        <h2 class="headline font-weight-bold mb-5">
          {{ charging ? $t("stopCharging") : $t("startCharging") }}
        </h2>
        <template v-if="!charging">
          <Dialog />
        </template>
        <v-btn
          v-else-if="charging"
          x-large
          color="error"
          dark
          @click="stopCharging()"
        >
          {{ $t("stop") }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { RootActions } from "@/store/actions";
import { NotificationActions } from "@/store/notification/actions";
import { NotificationState } from "@/store/notification/interfaces";
import Vue from "vue";
import Dialog from "../charge/dialog/ChargeDialog.vue";
export default Vue.extend({
  components: { Dialog },
  name: "Content",
  data() {
    return {
      showSnack: false,
      snackMessage: "",
      snackType: "",
      snackTimer: 0,
      langs: ["en", "sk"],
    };
  },
  computed: {
    charging: {
      get(): boolean {
        return this.$store.getters.getIsCharging;
      },
    },
    notification: {
      get(): NotificationState {
        return this.$store.getters.getNotificationState;
      },
    },
  },
  methods: {
    stopCharging() {
      this.$store.dispatch(RootActions.SET_CHARGING, false);
    },
    showSnackbar(value: NotificationState) {
      this.snackMessage = value.message;
      this.snackType = value.type;
      this.showSnack = true;

      clearTimeout(this.snackTimer);
      this.snackTimer = setTimeout(() => {
        this.showSnack = false;
      }, value.timeout);
    },
  },
  watch: {
    charging: function (value: boolean) {
      if (value) {
        this.$store.dispatch(NotificationActions.SET_NOTIFICATION, {
          message: this.$t("chargingStarted"),
        });
      } else {
        this.$store.dispatch(NotificationActions.SET_NOTIFICATION, {
          message: this.$t("chargingStopped"),
        });
      }
    },
    notification: function (value: NotificationState) {
      this.showSnackbar(value);
    },
  },
});
</script>

<style lang="scss">
.content__container {
  height: 100%;
  align-items: center;
}

.content__langs {
  position: absolute;
  width: $gutter * 10;
  top: $gutter;
  right: $gutter;
}
</style>
