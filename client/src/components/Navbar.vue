<template>
  <div>
    <nav class="navbar navbar-light my-nav my-nav--fixed white">
      <a href="#" class="nav-plus" v-b-modal.modal-1>
        <i class="fas fa-plus"></i>
      </a>
      <a href="#">
        <span
          class="navbar-brand mb-0 h1 sharea"
          style="margin: 0px; font-size: 30px; color: white"
        >Kanban</span>
      </a>
      <div class="d-flex">
        <div class="dropdown mr-1">
          <a
            href="#"
            class="nav-plus"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            data-offset="10,200"
          >
            <i class="fas fa-chevron-down"></i>
          </a>
          <div
            class="dropdown-menu"
            aria-labelledby="dropdownMenuOffset"
            style="margin-left: -140px;"
          >
            <span class="dropdown-item" href="#" style="padding-left: 10px; padding-right: 10px">
            </span>
            <a
              class="dropdown-item"
              href="#"
              style="padding-left: 10px; padding-right: 10px"
            >New Articles</a>
            <a
              class="dropdown-item"
              href="#"
              style="padding-left: 10px; padding-right: 10px"
            >My Articles</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" style="padding-left: 10px; padding-right: 10px">Logout</a>
          </div>
        </div>
      </div>
    </nav>

    <b-modal id="modal-1" title="Add new task" @ok="submitCreate" @hidden="resetModal">
      <form @submit="submitCreate">
        <b-form-input
          id="input-1"
          type="text"
          required
          placeholder="Title"
          style="margin-bottom: 30px"
          v-model="task.title"
        ></b-form-input>
        <b-form-textarea
          id="textarea"
          placeholder="Description"
          rows="3"
          max-rows="6"
          style="margin-bottom: 30px; height: 100px"
          v-model="task.description"
        ></b-form-textarea>
        <b-form-input
          id="input-1"
          type="number"
          required
          placeholder="Point"
          style="margin-bottom: 30px"
          v-model="task.point"
        ></b-form-input>
        <b-form-input
          id="input-1"
          type="text"
          required
          placeholder="Assigned To"
          style="margin-bottom: 30px"
          v-model="task.assignedTo"
        ></b-form-input>
      </form>
    </b-modal>
  </div>
</template>

<script>

import db from "../../apis/firebase";

export default {
  data() {
    return {
      task: {
        title: "",
        description: "",
        point: "",
        assignedTo: "",
        status: 'Back-Log'
      }
    };
  },
  methods: {
    submitCreate() {
      let { title, description, assignedTo } = this.task;
      db.collection("todos")
        .add({ title, description, point: +this.task.point, assignedTo, status: this.task.status })
        .then(docRef => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },

    resetModal() {
      this.task = {};
    }
  }
};
</script>

<style>
</style>
