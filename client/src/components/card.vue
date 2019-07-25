<template>
    <div>
        <div class="tile is-ancestor" style="margin: 5%; margin-top: -2%;">
            <article class="tile is-child box" style="padding: 5%;">
                <p style="font-size: 25px; font-weight: bold;"> {{data.title}} </p>
                <p style="font-size: 14px;"> {{data.description}} </p>
                <p style="font-size: 14px;" v-show="data.assign"> assign: {{data.assign}} </p>
                <hr>
                <div style="margin-top: 5%;">
                    <a v-if="data.status != 0" class="button is-info is-outlined" style="width: 20%; margin-right: 10%; border-radius: 25px;">
                        <span class="icon is-small">
                            <i class="fas fa-chevron-left" @click="updatePrev({data})"></i>
                        </span>
                    </a>
                    <a class="button is-danger is-outlined" style="width: 40%;">
                        <span class="icon is-small">
                            <i class="fas fa-trash" @click="deleteTask(data.id)"></i>
                        </span>
                    </a>
                    <a v-if="data.status != 3" class="button is-success is-outlined" style="width: 20%; margin-left: 10%; border-radius: 25px;">
                        <span class="icon is-small">
                            <i class="fas fa-chevron-right" @click="updateNext({data})"></i>
                        </span>
                    </a>
                </div>
            </article>
        </div>
    </div>
</template>

<script>
import db from '../config/firebase'
export default {
  props: ['data'],
  data () {
    return {
    }
  },
  methods: {
    deleteTask (id) {
      db.collection('tasks').doc(`${id}`).delete().then(function () {
        console.log('Document successfully deleted!')
      }).catch(function (error) {
        console.error('Error removing document: ', error)
      })
    },
    updatePrev (data) {
      console.log(data)
      if (data.data.status !== 0) {
        let current = data.data.status - 1
        db.collection('tasks')
          .doc(data.data.id).update({
            status: current
          })
          .then(function () {
            console.log('Document successfully updated!')
          })
          .catch(function (error) {
            console.error('Error updating document: ', error)
          })
      }
    },
    updateNext (data) {
      if (data.data.status !== 3) {
        let current = data.data.status + 1
        db.collection('tasks')
          .doc(`${data.data.id}`).update({
            status: current
          })
          .then(function () {
            console.log('Document successfully updated!')
          })
          .catch(function (error) {
            console.error('Error updating document: ', error)
          })
      }
    }
  }
}
</script>
