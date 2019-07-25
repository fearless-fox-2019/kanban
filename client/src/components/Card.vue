<template>
  <div>
    <b-card-group deck class="m-2">
      <b-card header-tag="header" footer-tag="footer">
        <h6 slot="header" class="mb-0"><strong>{{ task.title }}</strong></h6>
        <b-card-text>{{ task.description }}</b-card-text>
        <b-card-text>Score: {{ task.score }}</b-card-text>
        <b-button v-if="task.status !== 'backlog'" @click="moveBelow(task.id, task.status)" variant="primary" class="m-2">Prev</b-button>
        <b-button v-if="task.status !== 'done'" @click="moveAbove(task.id, task.status)" variant="primary" class="m-2">Next</b-button>
        <em slot="footer">
          <b-button @click="deleteData(task.id)" variant="danger" class="m-1">Delete</b-button>
        </em>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import db from '../api/firebase'

export default {
  props: ["task"],
  data(){
    return {

    }
  },
  methods: {
    deleteData(id){
      console.log('masuk delete', id)
      let deleteDoc = db.collection('data').doc(`${id}`).delete();
    },
    moveBelow(id,status){
      console.log('move to below status')
      let statusRef = db.collection('data').doc(`${id}`);
      if (status === 'done'){
        let updateSingle = statusRef.update({status: 'doing'});
      } else if (status === 'doing'){
        let updateSingle = statusRef.update({status: 'todo'});
      } else if (status === 'todo'){
        let updateSingle = statusRef.update({status: 'backlog'});
      }
    },
    moveAbove(id, status){
      console.log('move to above status', id, status)
      let statusRef = db.collection('data').doc(`${id}`);
      if (status === 'backlog'){
        let updateSingle = statusRef.update({status: 'todo'});
      } else if (status === 'todo'){
        let updateSingle = statusRef.update({status: 'doing'});
      } else if (status === 'doing'){
        let updateSingle = statusRef.update({status: 'done'});
      }
    }
  }
}
</script>

<style>

</style>
