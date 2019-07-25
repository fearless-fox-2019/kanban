<template>
  <div class="category">
    <div class="card">
      <h4 class="header-kanban" v-if="status == 'Back-Log'" style="background-color: red;">{{status}}</h4>
      <h4 class="header-kanban" v-if="status == 'To-Do'" style="background-color: blue;">{{status}}</h4>
      <h4 class="header-kanban" v-if="status == 'Doing'" style="background-color: yellow;">{{status}}</h4>
      <h4 class="header-kanban" v-if="status == 'Done'" style="background-color: green;">{{status}}</h4>
      <div v-if="status == 'Back-Log'">
        <task-card class="cards" v-for="(todo, index) in listBackLog" :key="index" :detailTodo="todo"></task-card>
      </div>

      <div v-if="status == 'To-Do'">
        <task-card class="cards" v-for="(todo, index) in listTodo" :key="index" :detailTodo="todo"></task-card>
      </div>

      <div v-if="status == 'Doing'">
        <task-card class="cards" v-for="(todo, index) in listDoing" :key="index" :detailTodo="todo"></task-card>
      </div>

      <div v-if="status == 'Done'">
        <task-card class="cards" v-for="(todo, index) in listDone" :key="index" :detailTodo="todo"></task-card>
      </div>
    </div>
  </div>
</template>

<script>
import taskCard from './taskCard'
import db from '../../config/firebase.js'

export default {
  props: ['status'],
  components: {
    taskCard
  },
  data () {
    return {
      allTodo: [],
      listBackLog: [],
      listTodo: [],
      listDoing: [],
      listDone: []
    }
  },
  created () {
    db.collection('Todo').onSnapshot(querySnapshot => {
      let backLog = []
      let todo = []
      let doing = []
      let done = []
      querySnapshot.forEach(doc => {
        let allTodo = []
        console.log(doc.data(), 'ini datanya ')

        allTodo.push(doc.data())
        if (doc.data().status === 'Back-Log') {
          backLog.push({
            id: doc.id,
            ...doc.data()
          })
        } else if (doc.data().status === 'To-Do') {
          todo.push({
            id: doc.id,
            ...doc.data()
          })
        } else if (doc.data().status === 'Doing') {
          doing.push({
            id: doc.id,
            ...doc.data()
          })
        } else if (doc.data().status === 'Done') {
          done.push({
            id: doc.id,
            ...doc.data()
          })
        }
      })
      this.listBackLog = backLog
      this.listTodo = todo
      this.listDone = done
      this.listDoing = doing
      let parsing = JSON.stringify(backLog)
      console.log(JSON.parse(parsing), 'parsing')

      console.log(backLog, 'ini backlog 1')
    })
  }
}
</script>

<style>
.category {
    display: block;
    width: 600px;
    height: 80%;
    background-color: blue;
	box-shadow: 0 12px 12px rgba(0,0,0,0.3);
	padding: 2em;
	background: #fff;
	border-radius: 4px;
}
.cards{
  border: 1px solid grey;
  border-radius: 4px;
  margin-bottom: 10px;
}
.header-kanban{
    display: flex;
    align-items: center;
    justify-content: center;
    height : 50px;
    color: black;
}
</style>
