<template>
  <div>
    <b-modal id="modal-newTask" centered title="Login" hide-footer ref="my-modal">
    <b-form @reset="onReset" v-if="show">
      <b-form-group id="input-group-2" label="Title:" label-for="input-2">
        <b-form-input
          v-model="form.title"
          required
          placeholder="Enter title"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Description:" label-for="input-2">
        <b-form-input
          v-model="form.description"
          placeholder="Enter description"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Status:" label-for="input-3">
        <b-form-select
          v-model="form.status"
          :options="status"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-3" label="Score:" label-for="input-3">
        <b-form-input
          v-model="form.score"
          placeholder="Enter score"
        ></b-form-input>
      </b-form-group>

      <b-button @click="onSubmit" type="button" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </b-modal>
  </div>
</template>

<script>
import db from '../api/firebase'

export default {
  data() {
    return {
      form: {
        title: '',
        description: '',
        score: null,
        status: ''
      },
      status: [{ text: 'Select One', value: null }, 'backlog', 'todo', 'doing', 'done'],
      show: true
    }
  },
  methods: {
    onSubmit() {
      // evt.preventDefault()
      console.log('klik submit')
      // alert(JSON.stringify(this.form))
      let data = {
        title: this.form.title,
        description: this.form. description,
        score: this.form.score,
        status: this.form.status
      }
      // let setDoc = db.collection('data').set(data);
      let addDoc = db.collection('data').add(data).then(ref => {
        console.log('Added document with ID: ', ref.id);
      });
        this.$refs['my-modal'].hide()

    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.title = ''
      this.form.description = ''
      this.score = ''
      this.status = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }

}
</script>

<style>

</style>
