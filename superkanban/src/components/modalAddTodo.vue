<template>
  <v-layout justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="teal darken-3" dark v-on="on">ADD</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add Todo</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Title" v-model="inputTitle" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Description" v-model="inputDescription" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-overflow-btn
                  class="my-2"
                  :items="[1,2,3,4,5,6,7,8,9]"
                  v-model="inputPoint"
                  label="Point"
                ></v-overflow-btn>
              </v-flex>
              <v-flex xs12 sm6>
                <v-overflow-btn
                  class="my-2"
                  v-model="inputStatus"
                  :items="['Back Log', 'To-Do', 'Doing', 'Done']"
                  label="Status"
                ></v-overflow-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="create">SUBMIT</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import db from '../apis/firebase'
export default {
  name: 'modalAdd',
  data () {
    return {
      dialog: false,
      inputTitle: '',
      inputDescription: '',
      inputPoint: '',
      inputStatus: ''
    }
  },
  methods: {
    create () {
      let newData = {
        title: this.inputTitle,
        description: this.inputDescription,
        point: this.inputPoint,
        status: this.inputStatus
      }
      db.collection('kanban')
        .add(
          newData
        )
        .then((docRef) => {
          console.log('massssooooookkkkk')
          console.log('Document written with ID: ', docRef.id)
        })
        .catch((error) => {
          console.error('Error adding document: ', error)
        })
      this.dialog = false
    }
  }
}
</script>

<style>
</style>
