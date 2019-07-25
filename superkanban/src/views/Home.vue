<template>
  <v-content>
    <v-layout id="content" justify-space-between row fill-height text-center style="width : 100%;">
      <v-flex xs3 class="px-1">
        <div id="backlog">
          <h4>Back Log</h4>
        </div>
        <draggable
          v-model="backLog"
          group="kanban"
          @start="dragging = true"
          @end="dragging = false"
        >
          <div v-for="(data, i) in backLog" :key="i" class="f1">
            <cardContainer :dataTodo="data" />
          </div>
        </draggable>
      </v-flex>
      <v-flex xs3 class="px-1">
        <div id="todo">
          <h4>To-Do</h4>
        </div>
        <draggable v-model="todo" group="kanban" @start="dragging = true" @end="dragging = false">
          <div v-for="(data, i) in todo" :key="i" class="f1">
            <cardContainer :dataTodo="data" />
          </div>
        </draggable>
      </v-flex>
      <v-flex xs3 class="px-1">
        <div id="doing">
          <h4>Doing</h4>
        </div>
        <draggable v-model="doing" group="kanban" @start="dragging = true" @end="dragging = false">
          <div v-for="(data, i) in doing" :key="i" class="f1">
            <cardContainer :dataTodo="data" />
          </div>
        </draggable>
      </v-flex>
      <v-flex xs3 class="px-1">
        <div id="done">
          <h4>Done</h4>
        </div>
        <draggable v-model="done" group="kanban" @start="dragging = true" @end="dragging = false">
          <div v-for="(data, i) in done" :key="i" class="f1">
            <cardContainer :dataTodo="data" />
          </div>
        </draggable>
      </v-flex>
    </v-layout>
  </v-content>
</template>
<script>
import db from "../apis/firebase";
import modalDetail from "../components/modalDetail";
import cardContainer from "../components/cardContent";
import draggable from "vuedraggable";
export default {
  props: {
    source: String
  },
  components: {
    modalDetail,
    draggable,
    cardContainer
  },
  data: () => ({
    drawer: null,
    dragging: false,
    enabled: true,
    backLog: [],
    todo: [],
    doing: [],
    done: []
  }),
  methods: {},
  created() {
    db.collection("kanban").onSnapshot(querySnapshot => {
      // var list = [];
      let tempBackLog = [];
      let tempTodo = [];
      let tempDoing = [];
      let tempDone = [];
      querySnapshot.forEach(doc => {
        let list = doc.data();
        if (doc.data().status === "Back Log") {
          tempBackLog.push({ id: doc.id, ...list });
        } else if (list.status === "To-Do") {
          tempTodo.push({ id: doc.id, ...list });
        } else if (list.status === "Doing") {
          tempDoing.push({ id: doc.id, ...list });
        } else if (list.status === "Done") {
          tempDone.push({ id: doc.id, ...list });
        }
      });
      this.backLog = tempBackLog;
      this.todo = tempTodo;
      this.doing = tempDoing;
      this.done = tempDone;
    });
  },
  watch: {
    backLog: function() {
      var newData = this.backLog.filter(task => task.status !== "Back Log");
      newData.forEach(task => {
        db.collection("kanban")
          .doc(task.id)
          .update({
            status: "Back Log"
          })
          .then(() => {
            task.status = "Back Log";
            console.log("document updated");
            console.log(newData);
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    todo: function() {
      var newData = this.todo.filter(task => task.status !== "To-Do");
      newData.forEach(task => {
        db.collection("kanban")
          .doc(task.id)
          .update({
            status: "To-Do"
          })
          .then(() => {
            task.status = "To-Do";
            console.log("document updated");
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    doing: function() {
      var newData = this.doing.filter(task => task.status !== "Doing");
      newData.forEach(task => {
        db.collection("kanban")
          .doc(task.id)
          .update({
            status: "Doing"
          })
          .then(() => {
            task.status = "Doing";
            console.log("document updated");
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    done: function() {
      var newData = this.done.filter(task => task.status !== "Done");
      newData.forEach(task => {
        db.collection("kanban")
          .doc(task.id)
          .update({
            status: "Done"
          })
          .then(() => {
            task.status = "Done";
            console.log("document updated");
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  }
};
</script>
<style scoped>
#content {
  margin-top: 30px;
  padding-left: 15px;
  padding-right: 15px;
}
.f1 {
  margin-top: 10px;
}
#backlog {
  height : 40px;
  background-color: #F50057;
}
#todo {
  height : 40px;
  background-color: #1976D2;
}
#doing {
  height : 40px;
  background-color: #EF6C00;
}
#done {
  height : 40px;
  background-color: #FFEA00;
}
</style>
