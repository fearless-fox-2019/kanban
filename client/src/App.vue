<template>
  <div id="app">
    <div class="container">
      <h1>Kanban Board</h1>
      <div class="row">
        <div class="col d-flex justify-content-center">
          <button class="btn btn-success btn-block my-4" id="new" type="submit" 
          v-b-modal.modal-prevent-closing>Add new task</button>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="d-flex">
            <category :status="1" v-bind:style="{backgroundColor: '#C70039', opacity: 0.92}" />
            <category :status="2" v-bind:style="{backgroundColor: '#FFC300', opacity: 0.92}" />
            <category :status="3" v-bind:style="{backgroundColor: 'green', opacity: 0.92}" />
            <category :status="4" v-bind:style="{backgroundColor: 'teal', opacity: 0.92}" />
          </div>
        </div>
      </div>
    </div>
    <b-modal id="modal-prevent-closing" ref="modal" title="Task" @show="emptyField" @hidden="emptyField" @ok="addNewData">
      <form>
        <b-form-input id="name-input" v-model="title" placeholder="Input Task Title here"></b-form-input>
        <b-form-textarea id="name-input" v-model="description" placeholder="Input Task Description here"></b-form-textarea>
        <b-form-input id="name-input" v-model="assignedTo" placeholder="Input Task Assigned To : "></b-form-input>
      </form>
    </b-modal>
  </div>
</template>

<script>
import category from "@/components/category.vue";
import Swal from 'sweetalert2'
import db from "../config/firebase";

export default {
  name: "app",
  components: {
    category
  },
  data() {
    return {
      title: "",
      description: "",
      assignedTo: "",
      status: 1

    };
  },
  methods: {
    addNewData() {
      db.collection("Task")
        .add({
          title: this.title,
          description: this.description,
          assignedTo: this.assignedTo,
          status: 1,
          createdAt: new Date()
        })
        .then(function(doc) {
          console.log("Document successfully written!", doc);
          Swal.fire(
          'Task Successfully Created!',
          'Added to Backlog',
          'success'
        )
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    },
    emptyField() {
      this.title = "";
      this.description = ""; 
      this.assignedTo = "";
    }
  }
};
</script>

<style>
#app { 
  background-image: url('https://cdn2.vectorstock.com/i/1000x1000/62/51/gold-star-isolated-on-transparent-background-vector-11866251.jpg');
  background-size: 100%;
  background-repeat: inherit;
  text-align: center;
  color: #023a72;
  font-family: 'Permanent Marker', cursive;
}

#new {
  width: 16rem;
  height : 3rem;
  font-size : 25px;
}

.container {
  justify-content: center;
}

h1{
  color: white;
}

</style>
