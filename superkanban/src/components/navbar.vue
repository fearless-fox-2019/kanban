<template>
  <v-app-bar app color="cyan" dark>
    <v-layout justify-center align-center>
      <v-toolbar-title style="font-weight : bold; padding-left : 55px;">SuperKanban</v-toolbar-title>
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
    return {

    }
  }
}
</script>

<style>
</style>
