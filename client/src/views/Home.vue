<template>
  <v-content>
      <v-container
        fluid
      >
        <v-layout text-center justify-center>
          <v-flex>
              <h1 style="background-color: red;"> BackLog</h1>
               <draggable v-model="backLogs" group="TodoKanban">
                  <v-card
                  max-width="344"
                  class="mx-auto"

                  v-for="test in backLogs" :key="test.id"
                  >
                    <CardsList :data="test"></CardsList>
                  </v-card>
                </draggable>
            </v-flex>

            <v-flex>
              <h1 style="background-color: yellow;">ToDo</h1>

              <draggable v-model="todos" group="TodoKanban">
                  <v-card
                  max-width="344"
                  class="mx-auto"

                  v-for="test in todos" :key="test.id"
                  >
                    <CardsList :data="test"></CardsList>
                  </v-card>
                </draggable>

            </v-flex>

            <v-flex>
              <h1 style="background-color: pink;">OnProgress</h1>

                 <draggable v-model="ongoing" group="TodoKanban">
                  <v-card
                  max-width="344"
                  class="mx-auto"

                  v-for="test in ongoing" :key="test.id"
                  >
                    <CardsList :data="test"></CardsList>
                  </v-card>
                </draggable>
            </v-flex>

            <v-flex>
              <h1 style="background-color: orange;">Done</h1>

                <draggable v-model="done" group="TodoKanban">
                  <v-card
                  max-width="344"
                  class="mx-auto"

                  v-for="test in done" :key="test.id"
                  >
                    <CardsList :data="test"></CardsList>
                  </v-card>
                </draggable>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
</template>

<script>
import db from '@/apis/firebase.js'
import draggable from 'vuedraggable'
import CardsList from '../components/CardsList'

export default {
  data () {
    return {
      backLogs: [],
      todos: [],
      ongoing: [],
      done: []
    }
  },
  watch: {
    backLogs: function () {
      this.backLogs.forEach((data) => {
        if (data.status !== 'backlog') {
          const backLogUpdate = db.collection('TodoKanban').doc(data.id)
          return backLogUpdate.update({
            status: 'backlog'
          })
            .then(() => {
              console.log('document successfully updated')
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
    },
    todos: function () {
      this.todos.forEach((data) => {
        if (data.status !== 'todo') {
          const todoUpdate = db.collection('TodoKanban').doc(data.id)
          return todoUpdate.update({
            status: 'todo'
          })
            .then(() => {
              console.log('document successfully updated')
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
    },
    ongoing: function () {
      this.ongoing.forEach((data) => {
        if (data.status !== 'ongoing') {
          const ongoingUpdate = db.collection('TodoKanban').doc(data.id)
          return ongoingUpdate.update({
            status: 'ongoing'
          })
            .then(() => {
              console.log('document successfully updated')
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
    },
    done: function () {
      this.done.forEach((data) => {
        if (data.status !== 'done') {
          const doneUpdate = db.collection('TodoKanban').doc(data.id)
          return doneUpdate.update({
            status: 'done'
          })
            .then(() => {
              console.log('document successfully updated')
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
    }
  },
  components: {
    draggable,
    CardsList
  },
  created () {
    this.getAllData()
  },
  methods: {
    getAllData () {
      db.collection('TodoKanban')
        .onSnapshot((querySnapshot) => {
          let tempBackLog = []
          let tempToDo = []
          let tempOnGoing = []
          let tempDone = []
          querySnapshot.forEach((doc) => {
            if (doc.data().status == 'backlog') {
              let obj = {
                id: doc.id,
                name: doc.data().name,
                point: doc.data().point,
                assignedTo: doc.data().assignedTo,
                status: doc.data().status
              }
              tempBackLog.push(obj)
            } else if (doc.data().status == 'todo') {
              let obj = {
                id: doc.id,
                name: doc.data().name,
                point: doc.data().point,
                assignedTo: doc.data().assignedTo,
                status: doc.data().status
              }
              tempToDo.push(obj)
            } else if (doc.data().status == 'ongoing') {
              let obj = {
                id: doc.id,
                name: doc.data().name,
                point: doc.data().point,
                assignedTo: doc.data().assignedTo,
                status: doc.data().status
              }
              tempOnGoing.push(obj)
            } else if (doc.data().status == 'done') {
              let obj = {
                id: doc.id,
                name: doc.data().name,
                point: doc.data().point,
                assignedTo: doc.data().assignedTo,
                status: doc.data().status
              }
              tempDone.push(obj)
            }
          })
          this.backLogs = tempBackLog
          this.todos = tempToDo
          this.ongoing = tempOnGoing
          this.done = tempDone
        })
    },
    checkDataChanged () {
      // console.log(this.backLogs, ' ini backlogs')
      // console.log(this.todos, 'ini todos')
      // console.log(this.ongoing, 'ini ongoing')
      // console.log(this.done, 'ini done')
    }
  }
}

</script>

<style scoped>
.v-card {
  margin-top: 10px;
  margin-bottom: 10px;
}

.v-card__actions {
  justify-content: center;
}

h1 {
  font-family: 'Oswald', sans-serif;
  font-size: 30px;
  text-transform: uppercase
}
</style>
