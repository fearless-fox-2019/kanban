<template>
  <div id="app">
    <Navigation></Navigation>
    <v-container>
      <AddnewTask></AddnewTask>
    </v-container>
    <v-layout style="margin:20px" justify-space-between>
      <CardContainer :backgroundcolor="`background-color:red`" :name="`Back-Log`" :data="backlog"></CardContainer>
      <CardContainer :backgroundcolor="`background-color:orange`" :name="`To-Do`" :data="todo"></CardContainer>
      <CardContainer :backgroundcolor="`background-color:blue`" :name="`Doing`" :data="doing"></CardContainer>
      <CardContainer :backgroundcolor="`background-color:green`" :name="`Done`" :data="done"></CardContainer>
    </v-layout>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Navigation from "./components/Navbar";
import CardContainer from "./components/TodoCard";
import AddnewTask from "./components/ModalForm";
import draggable from "vuedraggable";
import db from "../src/config/firebase";
export default {
  name: "app",
  data() {
    return {
      backlog: [],
      todo: [],
      doing: [],
      done: []
    };
  },
  components: {
    HelloWorld,
    Navigation,
    CardContainer,
    AddnewTask,
    draggable
  },
  created: function() {
    let data = db.collection("todos").orderBy("date");
    data.onSnapshot(querySnapshot => {
      let backlog = [];
      let todo = [];
      let doing = [];
      let done = [];
      querySnapshot.forEach(doc => {
        let newData = {
          id: doc.id,
          AssignTo: doc.data().AssignTo,
          Status: doc.data().Status,
          description: doc.data().description,
          name: doc.data().name,
          point: doc.data().point,
          date: doc.data().date
        };
        if (newData.Status == "Back Log") {
          backlog.unshift(newData);
        } else if (newData.Status == "To Do") {
          todo.unshift(newData);
        } else if (newData.Status == "Doing") {
          doing.unshift(newData);
        } else if (newData.Status == "Done") {
          done.unshift(newData);
        }
      });
      this.backlog = backlog;
      this.todo = todo;
      this.doing = doing;
      this.done = done;
    });

    // db.collection("todos")
    // .onSnapshot(function(querySnapshot) {
    //   querySnapshot.forEach(function(doc) {
    //         console.log(doc.data());
    //     });
    //     // console.log("Current data: ", doc.data());
    // });
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

Navigation {
  top: 0;
  position: fixed;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
