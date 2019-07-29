<template>
  <v-card width="300" height="auto" class="mx-auto">
    <v-card-title>{{ dataTodo.title }}</v-card-title>

    <v-divider></v-divider>

    <v-card-text >
      <h3>Point : {{ dataTodo.point }}</h3>
    </v-card-text>
    <v-card-text >
      <h3>Assigned-To : {{ dataTodo.assignedTo }}</h3>
    </v-card-text>
    <v-card-actions>
      <modalDetail :detail="dataTodo" />
    </v-card-actions>
  </v-card>
</template>

<script>
import modalDetail from '../components/modalDetail'
export default {
  name: 'cardContent',
  props: ['dataTodo'],
  components: {
    modalDetail
  },
  data () {
    return {}
  }
}
</script>

<style scoped>
* {
  font-family: "Varela Round", sans-serif;
  font-family: "Exo 2", sans-serif;
  color : black;
}
</style>
