<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Navbar></Navbar>
    <div class="row">
      <div class="col-sm-3">
        <h3>BACKLOG</h3>
      </div>
      <div class="col-sm-3">
        <h3>TODO</h3>
      </div>
      <div class="col-sm-3">
        <h3>DOING</h3>
      </div>
      <div class="col-sm-3">
        <h3>DONE</h3>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-3" >
        <Card v-for="backlog in backlogData" :key="backlog.id" :task="backlog"></Card>
        
      </div>
      <div class="col-sm-3">
        <Card v-for="todo in todoData" :key="todo.id" :task="todo"></Card>
      </div>
      <div class="col-sm-3">
        <Card v-for="doing in doingData" :key="doing.id" :task="doing" ></Card>
      </div>
      <div class="col-sm-3">
        <Card v-for="done in doneData" :key="done.id" :task="done"></Card>
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import db from '../api/firebase'

export default {
  name: 'home',
  components: {
    HelloWorld, Navbar,
    Card
  },
  data(){
    return {
      backlogData: [
      ],
      todoData: [],
      doingData: [],
      doneData: []
    }
  },
  created (){
    
    let query = db.collection('data');

    let observer = query.onSnapshot(querySnapshot => {
      let backlogData = []
      let todoData = []
      let doingData = []
      let doneData = []
      console.log(`Received query snapshot of size ${querySnapshot.size}`);
      querySnapshot.forEach(function(doc){
        // console.log(doc.data().status)
        if (doc.data().status === 'backlog'){
          backlogData.push({id: doc.id, ...doc.data()})
        } else if (doc.data().status === 'todo'){
          todoData.push({id: doc.id, ...doc.data()})
        } else if (doc.data().status === 'doing'){
          doingData.push({id: doc.id, ...doc.data()})
        } else if (doc.data().status === 'done'){
          doneData.push({id: doc.id, ...doc.data()})
        }
      });

      this.backlogData = backlogData
      this.todoData = todoData
      this.doingData = doingData
      this.doneData = doneData

    }, err => {
      console.log(`Encountered error: ${err}`);
    });

  }
}
</script>
