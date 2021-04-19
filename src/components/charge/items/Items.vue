<template>
  <div>
    <h2 class="mr-2 mb-5 font-weight-medium">Select {{ title }}</h2>
    <Search
      v-if="workingItems"
      :target="workingItems"
      :searchKey="'name'"
      @filtered="filterWorkingItems($event)"
    />
    <v-divider></v-divider>
    <v-card-text class="step__content-container">
      <v-radio-group v-if="workingItems && workingItems.length" column>
        <v-radio
          color="success"
          v-for="(item, index) in workingItems"
          :label="item.name"
          :value="item.id"
          :key="index"
        ></v-radio>
      </v-radio-group>
      <p class="step__fallback-text" v-else>No data</p>
    </v-card-text>
    <v-divider></v-divider>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import Search from "@/components/search/Search.vue";
import { ItemsInterface, ItemsType } from "@/lib/global";
import { StepComponentEnum } from "../dialog/interfaces";
export default Vue.extend({
  name: "Items",
  components: { Search },
  data(): {
    title: string;
    itemsCopy: ItemsInterface;
    workingItems?: ItemsType;
  } {
    return {
      title: StepComponentEnum.Location.toLowerCase(),
      itemsCopy: {
        locations: [],
        connectors: [],
        chargers: [],
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
  },
  mounted() {
    this.itemsCopy = {
      locations: [...this.items.locations],
      chargers: [...this.items.chargers],
      connectors: [...this.items.connectors],
    };
    this.switchWorkingItem();
  },
  watch: {
    step: function (step: number) {
      this.switchWorkingItem();
    },
  },
  methods: {
    switchWorkingItem() {
      switch (this.step) {
        case 1:
          this.workingItems = this.itemsCopy.locations;
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
      this.workingItems = items;
    },
  },
});
</script>