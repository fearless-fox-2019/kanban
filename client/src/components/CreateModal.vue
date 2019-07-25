
<template>
  <v-layout justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn  dark v-on="on">Create Task</v-btn>
      </template>
       <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Name*" required v-model="name"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Point*" type="text" required v-model="point"></v-text-field>
              </v-flex>
              <v-flex x12>
                <v-text-field label="Assigned To*" type="text" required v-model="assignedTo">
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="addData">Submit</v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>
  </v-layout>
</template>

<script>
import db from '@/apis/firebase.js'
export default {
  data: () => ({
    dialog: false,
    name: '',
    assignedTo: '',
    point: ''
  }),
  methods: {
    addData () {
      db.collection('TodoKanban').doc().set({
        name: this.name,
        assignedTo: this.assignedTo,
        point: this.point,
        status: 'backlog'
      })
        .then((data) => {
          this.dialog = false
          this.name = ''
          this.assignedTo = ''
          this.point = ''
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style>

</style>
