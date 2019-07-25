<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Add Card</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Title">
          <b-input
            type="text"
            v-model="form.title"
            placeholder="Title"
            required>
          </b-input>
        </b-field>

        <b-field label="Descriptions">
          <b-input
            type="textarea"
            minlength="10"
            maxlength="100"
            v-model="form.descriptions"
            placeholder="Descriptions"
            required>
          </b-input>
        </b-field>

        <b-field label="Assignee">
          <b-input
            type="text"
            v-model="form.assignee"
            placeholder="Assignee"
            required>
          </b-input>
        </b-field>
        <div class="columns is-multiline">
          <div class="column is-half">
            <b-field label="Card Group">
              <b-select placeholder="Select a name" expanded v-model="form.progress">
                <option
                  v-for="(option, idx) in options"
                  :value="option"
                  :key="idx">
                  {{ option }}
                </option>
              </b-select>
            </b-field>
          </div>
          <div class="column is-half">
            <b-field label="Priority">
              <b-numberinput required type="is-info" min="1" max="4" v-model="form.priority"></b-numberinput>
            </b-field>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click.prevent="$parent.close()">Close</button>
        <button @click.prevent="create" class="button is-primary">Create Card</button>
      </footer>
    </div>
  </form>
</template>

<script>
const configFirebase = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: 'kanban-track',
};
export default {
  props : ['form', 'options'],
  data() {
    return {

    };
  },
  methods: {
    create() {
      if(!this.options.some(val => val === this.form.progress)) {
        this.$notification.open({
          duration: 5000,
          message: `Please Pick a Valid Board Progress`,
          position: 'is-top-right',
          type: 'is-danger',
          hasIcon: true
        })
      } else if(this.form.priority == null || undefined) {
        this.$notification.open({
          duration: 5000,
          message: `Please Choose Priority Scale`,
          position: 'is-top-right',
          type: 'is-danger',
          hasIcon: true
        })
      } else {
        const data = {
          title: this.form.title,
          descriptions: this.form.descriptions,
          priority: this.form.priority,
          progress: this.form.progress,
          assignee: this.form.assignee
        }
        console.log(data);
        this.$emit('taskadded', data)
      }
    }
  },
  watch: {
    form() {
      this.form
    }
  }
}
</script>

<style>

</style>
