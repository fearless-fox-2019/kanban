<template>
  <v-app-bar app color="cyan" dark>
    <v-layout justify-center align-center>
      <v-toolbar-title style="font-weight : bold; padding-left : 55px;" id="logo">SuperKanban</v-toolbar-title>
    </v-layout>
    <div class="my-2">
      <modalAdd />
    </div>
  </v-app-bar>
</template>

<script>
import modalAdd from './modalAddTodo'
export default {
  name: 'navbar',
  components: {
    modalAdd
  },
  data () {
    return {}
  }
}
</script>

<style scoped>
#logo {
  font-family: "Varela Round", sans-serif;
  font-family: "Exo 2", sans-serif;
  font-family: "Russo One", sans-serif;
  font-size: 30px;
}
</style>
