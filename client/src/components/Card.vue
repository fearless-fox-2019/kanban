<template>
    <div>
      <b-card no-body id="task-card" class="mx-2 mb-2">
        <b-card-text class="mx-2 my-1">
            <b-row align-h="between">
              <b-col cols="9">
                <b-card-text>
                  {{ task.title }}
                </b-card-text>
              </b-col>
              <b-col cols="3" class="text-right">
                <b-card-text>
                  <i v-b-modal="'modal-edit-' + task.id" class="material-icons mr-1" style="font-size: 14px; vertical-align: middle; color: #aeaeae;">edit</i>
                </b-card-text>
              </b-col>
            </b-row>
          <b-btn v-if="task.due_date" id="due" size="sm"><i class="material-icons mr-1" style="font-size: 14px; vertical-align: middle;">access_time</i>{{ task.due_date }}</b-btn>
        </b-card-text>
      </b-card>

      <b-modal :id="'modal-edit-' + task.id" ref="modal-edit" title="Edit Task">
      <label>Move To</label>
      <b-button-group class="ml-2 mb-2">
        <b-button v-for="(status, i) in statusList" :key="i" size="sm" @click="changeStatus(status)">{{ status }}</b-button>
      </b-button-group>
      <b-form id="form-edit" @submit.prevent="editTask">
        <label>Task</label>
        <b-form-input v-model="editTitle" size="sm" type="text" :placeholder="task.title"></b-form-input>
        <label class="mt-2 mb-0">Due Date</label>
        <b-form-input v-model="editDueDate" size="sm" type="date" placeholder="Due Date"></b-form-input>
      </b-form>
        <div slot="modal-footer">
          <b-button size="sm" form="form-edit" type="submit" variant="primary" class="mt-2 mr-2">Edit Task</b-button>
          <b-button size="sm" @click="deleteTask" variant="danger" class="mt-2">Delete Task</b-button>
        </div>
      </b-modal>
    </div>
</template>

<script>
import db from '../main'
export default {
  name: 'Card',
  data () {
    return {
      message: 'Ok',
      editTitle: '',
      editDueDate: ''
    }
  },
  props: ['task'],
  methods: {
    deleteTask () {
      db.collection('tasks')
        .doc(this.task.id)
        .delete()
    },
    editTask () {
      let input = {}
      if (this.editTitle) {
        input.title = this.editTitle
      }
      if (this.editDueDate) {
        input.due_date = this.editDueDate
      }
      db.collection('tasks')
        .doc(this.task.id)
        .set(input, { merge: true })
        .then(() => {
          this.$refs['modal-edit'].hide()
        })
    },
    changeStatus (status) {
      db.collection('tasks')
        .doc(this.task.id)
        .set({ status }, { merge: true })
    }
  },
  computed: {
    statusList () {
      let list = []
      for (let i of ['Back-Log', 'To Do', 'Doing', 'Done']) {
        if (this.task.status !== i) {
          list.push(i)
        }
      }
      return list
    }
  }
}
</script>

<style>
#task-card {
  background-color: #ffffff;
  border: 0;
  -webkit-box-shadow: 0px 2px 1px 0px rgba(0,0,0,0.2);
  -moz-box-shadow: 0px 2px 1px 0px rgba(0,0,0,0.2);
  box-shadow: 0px 2px 1px 0px rgba(0,0,0,0.2);
}

#due {
  padding: 0.1rem 0.2rem;
  background-color: #5aa072;
  border: 0;
}
</style>
