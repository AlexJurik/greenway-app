<template>
  <v-text-field
    v-model="q"
    @update="searchItems()"
    outlined
    label="Search"
    prepend-inner-icon="mdi-magnify"
  ></v-text-field>
</template>

<script lang="ts">
import { ItemsType } from "@/lib/global";
import Vue, { PropType } from "vue";
import { search } from "../../lib/helpers/search";
export default Vue.extend({
  name: "Search",
  data(): { q: string; itemsCopy: ItemsType } {
    return {
      q: "",
      itemsCopy: [],
    };
  },
  props: {
    target: {
      type: Array as PropType<ItemsType>,
    },
    searchKey: {
      type: String,
      default: "",
    },
  },
  mounted() {
    this.itemsCopy = [...this.target];
  },
  watch: {
    q: function (value: string) {
      const filtered = search(this.target, this.searchKey, value);

      if (!this.q) {
        this.$emit("filtered", null);
        return;
      }

      if (filtered.length) {
        this.$emit("filtered", filtered);
      } else {
        this.$emit("filtered", []);
      }
    },
  },
});
</script>