<template>
    <div id="header">
      <div class="d-flex">
        <h2>Kanban Board</h2>
        <button id="logout-btn" class="btn btn-warning btn-sm ml-auto" @click="logout">
            <i class="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>
        <a href="" @click="showAdd=true" data-toggle="modal" data-target="#myModal">
            <i class="fas fa-plus-circle"></i><span> Add Task</span>
        </a>
        <formAddTask :show="showAdd" />
    </div>
</template>

<script>
import firebase from 'firebase'
import formAddTask from '@/components/formAddTask.vue'

export default {
  data () {
    return {
      showAdd: false
    }
  },
  components: {
    formAddTask
  },
  methods: {
    change () {
      this.showAdd = true
    },
    logout () {
      localStorage.clear()
      firebase.auth().signOut()
        .then(() => {
          this.$router.push('/')
        })
        .catch(error => {
          console.log('eror logout')
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
    a{
        text-align: center;
        font-size: 20px;
        font-family: 'Varela Round', sans-serif;
        color: lightgreen
    }

    a:hover{
        color: lightcoral;
        font-weight: bold;
    }

    h2 {
        font-size: 45px;
        text-align: center;
        margin-top: 20px;
        margin-left: 40%;
        font-family: 'Lobster', cursive;
        color: goldenrod
    }

    #logout-btn{
      height: 30px;
      margin-top:15px;
      margin-right: 20px;
    }

</style>
