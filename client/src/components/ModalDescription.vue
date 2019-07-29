<template>
  <v-layout justify-center>
    <v-btn color="primary" dark @click.stop="dialog = true" width="250">Detail Card</v-btn>

    <v-dialog v-model="dialog" max-width="350">
      <v-card>
        <v-card-title class="headline">Description</v-card-title>

        <v-card-text>{{ (details != '') ? details : 'no description' }}</v-card-text>

        <v-card-actions>
          <v-btn
            color="green darken-1"
            text
            @click="updateLeft(alldata)"
            v-if="(alldata.Status == 'Done') || (alldata.Status == 'To Do') || (alldata.Status == 'Doing')"
          >{{ (alldata.Status == 'Back Log') ? "" : (alldata.Status == 'To Do') ? "Back Log" : (alldata.Status == 'Doing') ? "To Do" : (alldata.Status == 'Done') ? "Doing" : ''}}</v-btn>

          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="updateRight(alldata)"
            v-if="(alldata.Status == 'Back Log') || (alldata.Status == 'To Do') || (alldata.Status == 'Doing')"
          >{{ (alldata.Status == 'Back Log') ? "To Do" : (alldata.Status == 'To Do') ? "Doing" : (alldata.Status == 'Doing') ? "Done" : ''}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import db from "../config/firebase";
export default {
  props: ["details", "alldata"],
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    updateLeft: function(param) {
      let doc = param.id
      if (param.Status == "To Do") {
        param.Status = "Back Log";
      } else if (param.Status == "Doing") {
        param.Status = "To Do";
      } else if (param.Status == "Done") {
        param.Status = "Doing";
      }
      param.date = new Date()
      delete param.id
      db.collection("todos")
        .doc(doc)
        .set(param)
        .then(() => {
          this.dialog = false
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    },
    updateRight:function(param) {
      let doc = param.id
      if (param.Status == "Back Log") {
        param.Status = "To Do";
      } else if (param.Status == "To Do") {
        param.Status = "Doing";
      } else if (param.Status == "Doing") {
        param.Status = "Done";
      }
      param.date = new Date()
      delete param.id
      db.collection("todos")
        .doc(doc)
        .set(param)
        .then(() => {
          this.dialog = false
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    }
  }
};
</script>