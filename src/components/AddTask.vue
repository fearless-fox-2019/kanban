<template>
    <div>
        <b-modal
            :id="'modal-add-task-'+board.id"
            ref="modal"
            title="Add Task"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
        >
        <form ref="form" @submit.stop.prevent="handleSubmit">

            <b-form-group :state="titleState"
                label="Title"
                label-for="title-input"
                invalid-feedback="Invalid title"
                >

                <b-form-input
                    id=""
                    ref="titleInput"
                    v-model="title"
                    type="text"
                    :state="titleState"
                    required
                ></b-form-input>

            </b-form-group>

            <b-form-group :state="descriptionState"
                label="Description"
                label-for="description-input"
                invalid-feedback="Description is required"
                >

                <b-form-textarea
                  id="description-input"
                  ref="descriptionInput"
                  v-model="description"
                  placeholder="Task Description"
                  rows="3"
                  max-rows="6"
                  required
                ></b-form-textarea>

            </b-form-group>

            <b-form-group :state="colorState"
                label="Color"
                label-for="color-input"
                invalid-feedback="Invalid color">

                <b-form-input
                    id="color-input"
                    ref="colorInput"
                    type="color"
                    minlength=3
                    v-model="color"
                    :state="colorState"
                    required></b-form-input>
            </b-form-group>

        </form>

        <div slot="modal-footer" slot-scope="{ ok }" class="w-100">
            <b-button
                variant="primary"
                size="sm"
                class="float-right"
                @click="ok()"
            >
                Add Board
            </b-button>
        </div>

        </b-modal>
  </div>
</template>

<script>

import { db } from '../main';

export default {
  props: ['board'],
  data() {
    return {
      title: '',
      titleState: null,
      description: '',
      descriptionState: null,
      color: '',
      colorState: null,
    };
  },
  methods: {
    checkFormValidity() {
      const titleValid = this.$refs.titleInput.checkValidity();
      const colorValid = this.$refs.colorInput.checkValidity();
      const descriptionValid = this.$refs.descriptionInput.checkValidity();
      const valid = this.$refs.form.checkValidity();

      this.titleState = titleValid ? 'valid' : 'invalid';
      this.colorState = colorValid ? 'valid' : 'invalid';
      this.descriptionState = descriptionValid ? 'valid' : 'invalid';
      return valid;
    },
    resetModal() {
      this.title = '';
      this.titleState = null;
      this.color = '';
      this.colorState = null;
      this.description = '';
      this.descriptionState = null;
    },
    handleOk(addBoardModal) {
      addBoardModal.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
      this.addBoard();
    },
    addBoard() {
      db.collection('tasks').add({
        boardId: this.board.id,
        title: this.title,
        description: this.description,
        color: this.color,
        createdAt: Date(),
      })
        .then(() => {
          // console.log('SUCCEED');

          this.$nextTick(() => {
            this.$refs.modal.hide();
          });
        })
        .catch((error) => {
          // console.error(error);
        });
    },
  },
};
</script>

<style>

</style>
