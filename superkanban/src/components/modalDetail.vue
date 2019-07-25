<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on">DETAIL</v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>{{ detail.title }}</v-card-title>

        <v-divider></v-divider>

        <v-card-text>{{ detail.description }}</v-card-text>
        <v-card-text>Point : {{ detail.point }}</v-card-text>
        <v-card-text>Status : {{ detail.status }}</v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">CLOSE</v-btn>
          <v-btn color="primary" text @click="deleteData">DELETE</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import db from '../apis/firebase'
export default {
  name: 'modalDetail',
  props: ['detail'],
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    deleteData () {
      console.log(this.detail.id)
      db.collection('kanban')
        .doc(this.detail.id)
        .delete()
        .then(() => {
          console.log('Document successfully deleted!')
        })
        .catch((error) => {
          console.error('Error removing document: ', error)
        })
      this.dialog = false
      // db.collection("kanban")
      //   .doc(this.detail.id)
      //   .delete()
      //   .then(() => {
      //     console.log("Document successfully deleted!");
      //   })
      //   .catch((error) => {
      //     console.error("Error removing document: ", error);
      //   });
    }
  }
}
</script>

<style>
</style>
