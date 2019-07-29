<template>
    <div>
        <h1>Data</h1>
        <ul>
            <li v-for="task in doTasks" :key="task.id">{{ task.task }}</li>
        </ul>
    </div>
</template>

<script>
import db from '../main'
export default {
  data () {
    return {
      tasks: []
    }
  },
  created () {
    db.collection('tasks')
      .onSnapshot((querySnapshot) => {
        let newTasks = []
        querySnapshot.forEach((doc) => {
          let { task } = doc.data()
          let newTask = { task, id: doc.id }
          newTasks.push(newTask)
        })
        this.tasks = newTasks
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error)
      })
  }
}
</script>

<style>

</style>
