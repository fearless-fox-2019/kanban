<template>
    <div style="display: inline-block;">
      <b-card no-body id="task-list">
          <b-row align-h="between">
            <b-col cols="6">
              <b-card-text class="ml-2 my-1">
                <b>{{ board }}</b>
              </b-card-text>
            </b-col>
            <b-col cols="3" class="text-right">
              <b-card-text class="mr-2">
                <!-- <b>...</b> -->
              </b-card-text>
            </b-col>
          </b-row>
        <Card v-for="card in cards" :key="card.id" :task="card"></Card>
        <b-card no-body v-if="board == 'Back-Log'" id="add-task" class="mx-2 mb-2" style="background-color: #dfe1e6; color: #8b8b8b; border: 0;">
          <b-card-text v-if="!addingTask" class="mx-2 my-1" @click="addingTask = true">
            <i class="material-icons mr-1" style="font-size: 16px; vertical-align: middle;">add_circle_outline</i>Add task...
          </b-card-text>
          <b-form v-if="addingTask"  @submit.prevent="addBacklogTask">
            <label>Task</label>
            <b-form-input v-model="inputTitle" size="sm" type="text" placeholder="Task"></b-form-input>
            <label class="mt-2 mb-0">Due Date</label>
            <b-form-input v-model="inputDueDate" size="sm" type="date" placeholder="Due Date"></b-form-input>
            <b-button size="sm" type="submit" variant="primary" class="mt-2 mr-2">Add Task</b-button>
            <b-button size="sm" @click="addingTask = false" variant="danger" class="mt-2">Cancel</b-button>
          </b-form>
        </b-card>
      </b-card>
    </div>
</template>

<script>
import Card from './Card.vue'
import db from '../main'
export default {
  name: 'CardList',
  data () {
    return {
      cards: [],
      addingTask: false,
      message: 'This is Card List',
      inputTitle: '',
      inputDueDate: ''
    }
  },
  components: {
    Card
  },
  props: ['board'],
  methods: {
    addBacklogTask () {
      let input = {}
      input.title = this.inputTitle
      input.status = 'Back-Log'
      if (this.inputDueDate) {
        input.due_date = this.inputDueDate
      }
      this.addingTask = false
      db.collection('tasks').add(input)
    }
  },
  created () {
    db.collection('tasks').where('status', '==', this.board)
      .onSnapshot(snapshot => {
        let tasks = []
        snapshot.forEach(doc => {
          tasks.push({ ...doc.data(), id: doc.id })
        })
        this.cards = tasks
      })
  }
}
</script>

<style>
#task-list {
  width: 20rem;
  background-color:#dfe1e6;
  margin: 0.4rem 0.2rem;
}
</style>
