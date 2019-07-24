<template>
  <div>
    <b-container fluid class="card-list">
      <b-row>
        <b-col cols="3" class="back-log">
          <div class="outside-box">
            <div class="header-of-backlog">
              <h6>Back Log</h6>
            </div>
              <!-- cardnya -->
              <h3>{{listBackLog}}halooo</h3>
              <b-card
                v-for="(todo, index) in allTodo"
                :key = "index"
                header="halo"
                header-tag="header"
                title="Title"
              >
                <b-card-text>{{todo.name}}</b-card-text>
                <b-button href="#" variant="primary">Go somewhere</b-button>
              </b-card>
          </div>
        </b-col>

        <b-col cols="3" class="to-do">
          <div class="header-of-todo">
            <h6>To-Do</h6>
          </div>
        </b-col>

        <b-col cols="3" class="doing">
          <div class="header-of-doing">
            <h6>Doing</h6>
          </div>
        </b-col>

        <b-col cols="3" class="done">
          <div class="header-of-done">
            <h6>Done</h6>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import db from "../../config/firebase.js";

export default {
  data() {
    return {
      allTodo: [],
      listBackLog: [],
      listTodo: [],
      listDoing: [],
      listDone: []
    };
  },
  created() {
    console.log(this.listBackLog, "<<<<>>>>>");
    
    db.collection("Todo").onSnapshot(function(querySnapshot) {
      // console.log(doc.data(), "<<<<<<<<<<<<<<<<<<<<<<<<< test");
      // console.log("Current data: ", doc.data());
      this.allTodos = [];
      this.backLog = []
      querySnapshot.forEach(doc => {
        // let data = doc.data()
        console.log(doc.data());
        this.allTodos.push(doc.data());
        if(doc.data().status=="Back-Log"){
          this.backLog.push(doc.data())
        }
      });
       console.log(this.backLog, "ini backlog");
       this.listBackLog = this.backLog   
      // console.log(this.allTodo, "ini todoooo");
    this.listBackLog = this.backLog
    });
    this.allTodo = this.allTodos
    console.log(this.listBackLog, "<<<<<<<<<<<  <<<<<<<<<<");
    
  }
};
</script>

<style scoped>
/* .border{
        border: 1px solid grey
    } */

.header-of-backlog {
  height: 50px;
  color: #ffffff;
  background-color: red;
}
.header-of-todo {
  height: 50px;
  color: #ffffff;
  background-color: orange;
}
.header-of-doing {
  height: 50px;
  color: #ffffff;
  background-color: blue;
}
.header-of-done {
  height: 50px;
  color: #ffffff;
  background-color: green;
}
.outside-box {
  border: 2px solid grey;
}
.back-log {
  /* padding: 10px; */
  /* border: 1px solid grey; */
}
</style>
