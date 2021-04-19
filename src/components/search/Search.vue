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
import Vue, { PropType } from "vue";
import { search } from "../../lib/helpers/search";
export default Vue.extend({
  name: "Search",
  data(): { q: string } {
    return {
      q: "",
    };
  },
  props: {
    target: {
      type: Array as PropType<Array<Record<string, unknown>>>,
      default: [],
    },
    searchKey: {
      type: String,
      default: "",
    },
  },
  watch: {
    q: function (value: string) {
      const filtered = search(this.target, this.searchKey, value);
      if (filtered.length) {
        this.$emit("filtered", filtered);
      } else {
        this.$emit("filtered", []);
      }
    },
  },
});
</script>