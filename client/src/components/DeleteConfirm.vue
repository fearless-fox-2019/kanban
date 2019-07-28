<template>
  <v-layout justify-center>
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on }">
        <v-btn color="error" dark v-on="on">Delete</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Are you sure?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="green darken-1" text @click="deleteTask">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import db from '../../apis/firebase'
  export default {
    props: ['taskId'],
    data () {
      return {
        dialog: false,
        message: ''
      }
    },
    methods: {
        deleteTask() {
            console.log(this.taskId)
            db.collection('Tasks')
                .doc(this.taskId)
                .delete()
                .then(() => {
                    this.message = 'berhasil menghapus task.'
                    this.dialog = false
                })
                .catch(console.log)
            this.dialog = false
        }
    }
  }
</script>

<style scoped>

</style>
