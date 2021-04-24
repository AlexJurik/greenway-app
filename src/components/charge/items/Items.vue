<template>
  <div>
    <h2 class="mr-2 mb-5 font-weight-medium">
      {{ $t("selectItem", { item: $t(`${title}`) }) }}
    </h2>
    <Search
      v-if="workingItems"
      :target="workingItems"
      :searchKey="'name'"
      @filtered="filterWorkingItems($event)"
    />
    <v-divider></v-divider>
    <v-card-text class="step__content-container">
      <v-radio-group
        v-model="form[title]"
        @change="emitForm()"
        v-if="workingItems && workingItems.length"
        column
      >
        <v-radio
          color="success"
          v-for="(item, index) in workingItems"
          :label="item.name"
          :value="item"
          :key="index"
        ></v-radio>
      </v-radio-group>
      <p class="step__fallback-text" v-else>{{ $t("noData") }}</p>
    </v-card-text>
    <v-divider></v-divider>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import Search from "@/components/search/Search.vue";
import { ItemsInterface, ItemsType } from "@/lib/global";
import { StepComponentEnum } from "../dialog/interfaces";
import { ItemsDataInterface } from "./interfaces";
export default Vue.extend({
  name: "Items",
  components: { Search },
  data(): ItemsDataInterface {
    return {
      title: StepComponentEnum.Location.toLowerCase(),
      itemsCopy: {
        saved_locations: [],
        locations: [],
        connectors: [],
        chargers: [],
      },
      form: {
        location: undefined,
        charger: undefined,
        connector: undefined,
      },
      workingItems: undefined,
    };
  },
  props: {
    step: {
      type: Number as PropType<1 | 2 | 3>,
    },
    items: {
      type: Object as PropType<ItemsInterface>,
    },
    filter: {
      type: Boolean,
    },
  },
  mounted() {
    this.itemsCopy = {
      saved_locations: [...this.items.saved_locations],
      locations: [...this.items.locations],
      chargers: [...this.items.chargers],
      connectors: [...this.items.connectors],
    };
    this.switchWorkingItem();
  },
  watch: {
    step: function () {
      this.switchWorkingItem();
    },
    filter: function () {
      this.switchWorkingItem();
    },
  },
  methods: {
    switchWorkingItem() {
      switch (this.step) {
        case 1:
          this.workingItems = this.filter
            ? this.itemsCopy.saved_locations
            : this.itemsCopy.locations;
          this.title = StepComponentEnum.Location.toLowerCase();
          break;
        case 2:
          this.workingItems = this.itemsCopy.chargers;
          this.title = StepComponentEnum.Charger.toLowerCase();
          break;
        case 3:
          this.workingItems = this.itemsCopy.connectors;
          this.title = StepComponentEnum.Connector.toLowerCase();
          break;
      }
    },
    filterWorkingItems(items: ItemsType) {
      if (items === null) {
        this.switchWorkingItem();
      } else {
        this.workingItems = items;
      }
    },
    emitForm() {
      this.$emit("selectedValues", this.form);
    },
  },
});
</script>