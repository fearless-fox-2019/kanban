<template>
  <v-app id="inspire">
    <navbar />
    <home />
    <v-footer color="cyan" app>
      <v-spacer></v-spacer>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import home from './views/Home'
import navbar from './components/navbar'
export default {
  name: 'App',
  components: {
    home,
    navbar
  },
  data: () => ({
    //
  })
}
</script>
