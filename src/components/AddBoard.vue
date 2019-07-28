<template>
    <div>
        <b-modal
            id="modal-add-board"
            ref="modal"
            title="Add Board"
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
                    id="title-input"
                    ref="boardInput"
                    v-model="title"
                    type="text"
                    :state="titleState"
                    required
                ></b-form-input>

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

  data() {
    return {
      title: '',
      titleState: null,
      color: '',
      colorState: null,
    };
  },
  methods: {
    checkFormValidity() {
      const titleValid = this.$refs.boardInput.checkValidity();
      const colorValid = this.$refs.colorInput.checkValidity();
      const valid = this.$refs.form.checkValidity();

      this.titleState = titleValid ? 'valid' : 'invalid';
      this.colorState = colorValid ? 'valid' : 'invalid';
      return valid;
    },
    resetModal() {
      this.title = '';
      this.titleState = null;
      this.color = '';
      this.colorState = null;
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
      console.log(this.title);
      console.log(this.color);

      db.collection('boards').add({
        title: this.title,
        color: this.color,
        createdAt: Date(),
      })
        .then(() => {
          console.log('SUCCEED');

          this.$nextTick(() => {
            this.$refs.modal.hide();
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style>

</style>
