<template>
  <div class="new">
    <div class="container">
      <div class="columns">
        <div class="column-9" id="newTask">
          <section>
            <b-field label="Title">
                <b-input v-model="form.title" type="text" placeholder="Input Title" required></b-input>
            </b-field>

            <b-field label="Point"
               >
                <b-input v-model="form.point" type="Number" min=0 value="0" required>
                </b-input>
            </b-field>

            <b-field label="Assigned To"
               >
                <b-input v-model="form.assign" type="text" placeholder="Input Assignment" required></b-input>
            </b-field>

            <b-field label="Description">
                <b-input type="textarea" v-model="form.description" placeholder="Input Description" cols="30" required></b-input>
            </b-field>

            <b-button @click="newTask">SUBMIT</b-button>
          </section>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>

import db from '../firebase/firebase'

export default {
  data(){
    return {
      form : {
        title : '',
        point : 0,
        assign : '',
        description : '',
        status : 'back-log'
      }
    }
  },
  methods: {
    newTask(){
      let {title, assign, description} = this.form
      if(!title || !assign || !description){
        this.danger('all field are required')
        
      } else {
        db.collection('kanbans').add(this.form)
        this.success('new task created !')
        this.$router.push('/')
      }
    },
    danger(msg) {
      this.$toast.open({
        message: msg,
        position: 'is-top-right',
        type: 'is-danger',
        queue: false
      })
    },
    success(msg) {
      this.$toast.open({
        message: msg,
        position: 'is-top-right',
        type: 'is-success',
        queue: false
      })
    },
  }
}
</script>


<style scoped>
.columns{
  justify-content: center;
  margin-top: 5px;
}
#newTask{
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50px;
}
</style>

