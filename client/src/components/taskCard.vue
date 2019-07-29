<template>
  <div>
    <div class="card-body">
      <b-card-title>{{detailTodo.name}}</b-card-title>
      <b-card-text>{{detailTodo.description}}</b-card-text>
      <b-card-text>Point : {{detailTodo.point}}</b-card-text>
      <b-card-text>{{detailTodo.assignedto}}</b-card-text>
      <!-- <b-button>New Task</b-button> -->
      <b-button v-if="detailTodo.status !== 'Back-Log'" @click="backtoTodo(detailTodo)" style="border:none; margin-right: 10px; width:70px;">Back</b-button>
      <b-button v-if="detailTodo.status == 'Back-Log'"  @click="updatetoTodo(detailTodo)" style="background-color: blue; border:none; margin-right: 10px;width:70px">To-Do</b-button>
      <b-button v-if="detailTodo.status == 'To-Do'" @click="updatetoTodo(detailTodo)" style="background-color: yellow;color:black; border:none; margin-right: 10px; width:70px">Doing</b-button>
      <b-button v-if="detailTodo.status == 'Doing'" @click="updatetoTodo(detailTodo)" style="background-color: green; border:none; margin-right: 10px; width:70px">Done</b-button>
      <b-button class="button-delete" @click="deleteTodo(detailTodo.id)" style="background-color: red; border:none;"><i class="fa fa-trash"></i></b-button>
    </div>
  </div>
</template>

<script>

import db from '../../config/firebase.js'

export default {
  props: ['detailTodo'],
  data () {
    return {
      todoDetail: {
        name: '',
        decription: '',
        point: '',
        assignedto: '',
        status: ''
      }
    }
  },
  methods: {
    detail (todo) {
      this.todoDetail = todo
    },
    updatetoTodo (todo) {
      let id = todo.id
      const docRef = db.collection('Todo').doc(id)
      let nextStatus

      if (todo.status === 'Back-Log') {
        nextStatus = 'To-Do'
      } else if (todo.status === 'To-Do') nextStatus = 'Doing'
      else if (todo.status === 'Doing') nextStatus = 'Done'

      console.log(nextStatus)

      return db.runTransaction(transaction => transaction.get(docRef).then((doc) => {
        if (!doc.exists) {
          console.log('Document not exist!')
        }
        transaction.update(docRef, { status: nextStatus })
      }))
        .then(() => {
          console.log('Success Updated!')
          this.$refs.modal.hide()
        })
        .catch((error) => {
          console.log('Transaction error:', error)
        })
    },
    backtoTodo (todo) {
      const docRef = db.collection('Todo').doc(todo.id)
      let prefStatus

      if (todo.status === 'Back-Log') {
        prefStatus = 'Back-Log'
      } else if (todo.status === 'To-Do') prefStatus = 'Back-Log'
      else if (todo.status === 'Doing') prefStatus = 'To-Do'
      else if (todo.status === 'Done') prefStatus = 'Doing'

      console.log(prefStatus)

      return db.runTransaction(transaction => transaction.get(docRef).then((doc) => {
        if (!doc.exists) {
          console.log('Document not exist!')
        }
        transaction.update(docRef, { status: prefStatus })
      }))
        .then(() => {
          console.log('Transaction commited')
        })
        .catch((error) => {
          console.log('Transaction error:', error)
        })
    },
    deleteTodo (id) {
      db.collection('Todo').doc(id)
        .delete()
        .then(() => {
          console.log('Success deleted!')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
.card-body{
  padding: 1%;
}
.button-prev{
  background-color : white;
  border-radius: 50%;
  font-size: 40px;
}
</style>
