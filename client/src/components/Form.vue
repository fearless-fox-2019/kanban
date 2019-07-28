<template>
  <v-layout justify-end>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">New Task</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">New Task</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Title*" required v-model="tasks.title"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea hint="short task description" label="Description*" type="text" required v-model="tasks.description"></v-textarea>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Points*" type="text" required v-model="tasks.points"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Assigned to*" type="text" required v-model="tasks.assigned_to"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="createTask">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import db from '../../apis/firebase'
export default {
    data() {
        return {
            dialog: false,
            tasks: {
                title: '',
                description: '',
                points: 0,
                assigned_to: '',
                status: 'back_log'
            },
            message: ''
        }
    },
    methods: {
        createTask() {
            let newTask = {
                title: this.tasks.title,
                description: this.tasks.description,
                points: this.tasks.points,
                assigned_to: this.tasks.assigned_to,
                status: this.tasks.status
            }

            db
                .collection('Tasks')
                .add(newTask)
                .then(docRef => {
                    this.message = 'berhasil menambah task:)'
                    console.log(this.message)
                })
                .catch(console.log)

            this.dialog = false
        }
    }
}
</script>

<style>

</style>
