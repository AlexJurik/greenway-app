<template>
  <div id="app">
    <v-app>
      <v-main>
        <Content />
      </v-main>
    </v-app>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Content from "./components/content/Content.vue";

export default Vue.extend({
  name: "App",
  components: {
    Content,
  },
});
</script>

<style lang="scss">
#app {
  min-width: 360px;
}
</style>
