<template>
  <div class="navbar-page">
    <div>
      <b-navbar variant="faded" type="light">
        <b-navbar-brand href="#">
          <img src="https://placekitten.com/g/30/30" class="d-inline-block align-top" alt="Kitten" />
          BootstrapVue
        </b-navbar-brand>

        <b-navbar-nav class="ml-auto">
          <b-button v-b-modal.modal-add-new-task>New Task</b-button>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <div class="modal-new-task">
      <b-modal
        id="modal-add-new-task"
        ref="modal"
        title="New Task"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            :state="nameState"
            label="Title"
            label-for="name-input"
            invalid-feedback="Task Title is required"
          >
            <b-form-input
              id="name-input"
              v-model="newTask.name"
              :state="nameState"
              placeholder="Task Title"
              required
            ></b-form-input>
          </b-form-group>

          <label for>Description</label>
          <b-form-textarea
            id="textarea"
            label="Description"
            v-model="newTask.description"
            placeholder="Enter something..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>

          <b-form-group :state="nameState" label="Point" label-for="name-input">
            <b-form-input id="point-input" v-model="newTask.point" :state="nameState" placeholder="0"></b-form-input>
          </b-form-group>

          <b-form-group :state="nameState" label="Assigned to" label-for="name-input">
            <b-form-input id="name-input" v-model="newTask.assignedto" :state="nameState" placeholder="Type a name"></b-form-input>
          </b-form-group>
        </form>
      </b-modal>
    </div>
  </div>
</template>


<script>

import db from '../../config/firebase.js'

export default {
  data() {
    return {
      newTask : {
          name : "",
          description : "",
          point : "",
          assignedto : ""
      },
      nameState: null,
      submittedNames: []
    };
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid ? "valid" : "invalid";
      return valid;
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      this.newTask.status = 'Back-Log'
     db.collection('Todo').add(this.newTask)
      .then(ref => {
        console.log(ref, "hihihiwww");
        console.log('Added document with ID: ', ref.id);
      });
    }
  }
};
</script>

<style>
</style>
