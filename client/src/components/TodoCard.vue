<template>
  <v-card width="300" class="mx-auto">
    <v-system-bar color="pink darken-2"></v-system-bar>

    <v-app-bar dark color="pink" :style="backgroundcolor">
      <v-layout justify-center>
        <v-flex>
          <v-toolbar-title>
            <strong>{{ name }}</strong>
          </v-toolbar-title>
        </v-flex>
      </v-layout>
    </v-app-bar>

    <v-container class="pa-2" fluid grid-list-md>
      <v-layout column>
        <draggable>
          <transition-group>
            <v-flex v-for="(card, i) in data" :key="i">
          <v-card>
            <v-list-item three-line>
              <v-list-item-content class="align-self-start">
                <v-list-item-title style="font-size:30px;margin-bottom:10px">{{ card.name }}</v-list-item-title>
                <v-list-item-subtitle>Assigned To : {{ (card.AssignTo) ? card.AssignTo : 'no one'}}</v-list-item-subtitle>
                <v-list-item-subtitle v-text="`Point : ` + card.point"></v-list-item-subtitle>
                <v-list-item>
                  <detail-button :details="card.description" :alldata="card"></detail-button>
                </v-list-item>
              </v-list-item-content>
            </v-list-item>
            <i @click="deleteData(card)" class="fas fa-trash-alt"></i>
          </v-card>
        </v-flex>
          </transition-group>
        </draggable>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import detailButton from "./ModalDescription";
import db from "../config/firebase";
import draggable from "vuedraggable";
export default {
  props: ["backgroundcolor", "name", "data"],
  components: {
    detailButton,
    draggable
  },
  data: () => ({}),
  methods: {
    deleteData: function(param) {
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          db.collection("todos")
            .doc(param.id)
            .delete()
            .then(() => {
              this.$swal("Deleted!", "Your file has been deleted.", "success");
            })
            .catch(function(error) {
              console.error("Error removing document: ", error);
            });
        }
      });
    }
  }
};
</script>

<style>
i:hover {
  cursor: pointer;
}
</style>
