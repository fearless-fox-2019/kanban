<template>
  <div id="app">
    <navbar-page></navbar-page>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <!-- <router-view/> -->
    <!-- <card-list></card-list> -->
    <div class="display-card">
      <list-category :status="'Back-Log'" style="margin-right: 10px;"></list-category>
      <list-category :status="'To-Do'" style="margin-right: 10px;"></list-category>
      <list-category :status="'Doing'" style="margin-right: 10px;"></list-category>
      <list-category :status="'Done'"/>
    </div>
  </div>
</template>

<script>

import navbarPage from '@/components/navbar.vue'
import listCategory from '@/components/category.vue'

export default {
  components: {
    navbarPage,
    listCategory
  }
}
</script>

<style>
#app {
  background-color: #FFC857;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100;
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
.display-card{
  display: flex;
  /* align-items: center; */
  justify-content: center;
  padding: 3%;
  margin-top: 30px;
}
</style>
