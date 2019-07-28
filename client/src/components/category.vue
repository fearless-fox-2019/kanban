<template>
  <div>
    <div>
      <b-card class="task-card">
        <blockquote class="blockwxquote mb-0">
          <div v-if="status == 1">
            <h4>Backlog</h4>
            <!-- <h1>test masuk status 1</h1> -->
            <taskTodo
              v-for="backlog in backlogs" :key="backlog.id" :datatask="backlog" :id="backlog.id" :toLeft="true"
              :toRight="false"/>
          </div>
          <div v-if="status == 2">
            <h4>Todo</h4>
            <!-- <h1>test masuk status 2</h1> -->
            <taskTodo v-for="todo in todos" :key="todo.id" :datatask="todo" :id="todo.id" :toLeft="false"
              :toRight="false"/>
          </div>
          <div v-if="status == 3">
            <h4>Doing</h4>
            <taskTodo v-for="doing in doings" :key="doing.id" :datatask="doing" :id="doing.id" :toLeft="false"
              :toRight="false"/>
          </div>
          <div v-if="status == 4">
            <h4>Done</h4>
            <taskTodo v-for="done in dones" :key="done.id" :datatask="done" :id="done.id" :toLeft="false"
              :toRight="true"/>
          </div>
        </blockquote>
      </b-card>
    </div>
  </div>
</template>

<script>
import taskTodo from "@/components/task.vue";
import db from "../../config/firebase";

export default {
  name: "category",
  props: ["status"],
  components: {
    taskTodo
  },
  data() {
    return {
      backlogs: [],
      todos: [],
      doings: [],
      dones: [],
      tasks: []
    };
  },
  created() {
    // console.log('masuk ke created')
    db.collection("Task").where("status", "==", 1).orderBy("createdAt").onSnapshot(querySnapshot => {
        console.log('masuk ke status 1?')
        this.backlogs = [];
        querySnapshot.forEach(doc => {
          // console.log(doc.data())
          this.backlogs.push({
            id: doc.id,
            ...doc.data()
          });
        });
      });

    db.collection("Task").where("status", "==", 2).orderBy("createdAt").onSnapshot((querySnapshot) => {
         this.todos = []
        querySnapshot.forEach(doc => {
          this.todos.push({
            id: doc.id,
            ...doc.data()
          });
        });
      });

    db.collection("Task").where("status", "==", 3).orderBy("createdAt").onSnapshot((querySnapshot) => {
         this.doings = []
        querySnapshot.forEach(doc => {
          this.doings.push({
            id: doc.id,
            ...doc.data()
          });
        });
      });

    db.collection("Task").where("status", "==", 4).orderBy("createdAt").onSnapshot((querySnapshot) => {
        this.dones = []
        querySnapshot.forEach(doc => {
          this.dones.push({
            id: doc.id,
            ...doc.data()
          });
        });
      });
  }
};
</script>

<style>
.task-card{
  width: 15rem;
  margin: 1rem;
}
</style>
