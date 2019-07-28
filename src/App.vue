<template>
  <div id="app">
    <landing v-show="isLanding" @changepage="changePage" />
    <router-view v-show="!isLanding" @changepage="changePage" />
  </div>
</template>
<script>
import landing from "@/views/landing";

export default {
  components: {
    landing
  },
  data() {
    return {
      isLanding: true
    };
  },
  methods: {
    changePage(value) {
      this.isLanding = value;
      if (value) {
        this.$message({
          message: "Goodbye, have a nice day.",
          type: "info"
        });
      } else {
        this.$message({
          message: "Welcome " + localStorage.getItem("kanban_name"),
          type: "success"
        });
      }
    }
  },
  mounted() {
    console.log(localStorage.getItem("kanban_name"));
    if (localStorage.getItem("kanban_name")) {
      this.isLanding = false;
    }
  }
};
</script>

<style>
html {
  background: #373b44;
  background: -webkit-linear-gradient(to bottom, #4286f4, #373b44);
  background: linear-gradient(to bottom, #4286f4, #373b44);
  height: 100%;
  background-size: cover;
  overflow: hidden;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
