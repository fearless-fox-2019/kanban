<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import db from "@/apis/firebase.js";

export default {
  components: {
    Navbar
  }
};
</script>

<style scoped>
div.app {
  height: 100%;
}
</style>
