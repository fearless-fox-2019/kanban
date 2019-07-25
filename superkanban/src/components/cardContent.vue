<template>
  <v-card
    max-width="344"
    class="mx-auto"
  >
    <v-card-title>{{ dataTodo.data.title }}</v-card-title>

    <v-divider></v-divider>

    <v-card-text><h3>Point : {{ dataTodo.data.point }}</h3></v-card-text>
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
    return {
    }
  }
}
</script>

<style>

</style>
