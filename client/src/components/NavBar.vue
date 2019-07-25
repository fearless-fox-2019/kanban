<template>

      <v-app-bar
        app
        color="indigo"
        dark
      >
      <v-flex xs6>
          <v-img
              src="../../public/images/instrom.png"
              height="100"
              width="100"
              :contain=true
          ></v-img>
        </v-flex>
      <v-flex xs8>
        <v-layout>
          <v-toolbar-title>
            Instrom Kanban
          </v-toolbar-title>
        </v-layout>
      </v-flex>
      <v-flex xs2>
        <v-toolbar-title>
          <modalCreate></modalCreate>
        </v-toolbar-title>
      </v-flex>
      </v-app-bar>
</template>

<script>
import modalCreate from './CreateModal'
export default {
  data: () => ({
    dialog: false
  }),
  components: {
    modalCreate
  }
}
</script>

<style>

</style>
