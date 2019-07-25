<template>
  <v-layout justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Add New Task</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">New Task</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="form.name" label="Title*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  v-model="form.description"
                  label="Description"
                  name="input-7-1"
                  hint="Describe your job"
                ></v-textarea>
              </v-flex>
              <v-flex xs12>
                <v-text-field type="number" v-model="form.point" label="Point"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="form.AssignTo" label="Assigned To"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="saveData">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import db from "../config/firebase";
export default {
  data: () => ({
    dialog: false,
    form: {
      AssignTo: "",
      Status: "Back Log",
      description: "",
      name: "",
      point: 0,
      date : new Date()
    }
  }),
  methods: {
    saveData: function() {
      this.form.point = +this.form.point
      db.collection("todos")
        .add(this.form)
        .then((docRef) => {
          this.dialog = false
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    }
  }
};
</script>