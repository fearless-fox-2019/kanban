<template>
  <div id="app" style="padding: 0; margin: 0; background-color: #E5E6E7">
    <Navbar />
    <div class="d-flex" style="padding-left: 35px; padding-top: 15px">
      <small><i>**Drag task to change its status!</i></small>
    </div>
    <div
      class="d-flex flex-row justify-content-around"
      style="padding-top: 0px; padding-bottom: 100px"
    >
      <div class="my-card" style="width: 18rem; height: 100%;">
        <div
          class="list-group-item"
          style="padding: 10px; border: none; background-color: #FF0000;"
        >
          <p class="name-col my-card-header">Back-Log</p>
        </div>
        <div
          class="d-flex justify-content-center flex-column align-items-center border"
          style="padding: 15px; padding-top: 40px;"
        >
          <draggable tag="div" v-model="backlog" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
            <transition-group type="transition" :name="'flip-list'">
              <Card v-for="task in backlog" :key="task.id" :task="task" :taskDetail="task.id" />
            </transition-group>
          </draggable>
        </div>
      </div>

      <div class="my-card" style="width: 18rem; height: 100%; margin-bottom: 100px">
        <div
          class="list-group-item"
          style="padding: 10px; border: none; background-color: #FF9200;"
        >
          <p class="name-col my-card-header">To-Do</p>
        </div>
        <div
          class="d-flex justify-content-center flex-column align-items-center border"
          style="padding: 15px; padding-top: 40px;"
        >
          <draggable tag="div" v-model="todo" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
            <transition-group type="transition" :name="'flip-list'">
              <Card v-for="task in todo" :key="task.id" :task="task" :taskDetail="task.id" />
            </transition-group>
          </draggable>
        </div>
      </div>

      <div class="my-card" style="width: 18rem; height: 100%;">
        <div
          class="list-group-item"
          style="padding: 10px; border: none; background-color: #1E89F0;"
        >
          <p class="name-col my-card-header">Doing</p>
        </div>
        <div
          class="d-flex justify-content-center flex-column align-items-center border"
          style="padding: 15px; padding-top: 40px;"
        >
          <draggable tag="div" v-model="doing" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
            <transition-group type="transition" :name="'flip-list'">
              <Card v-for="task in doing" :key="task.id" :task="task" :taskDetail="task.id" />
            </transition-group>
          </draggable>
        </div>
      </div>

      <div class="my-card" style="width: 18rem; height: 100%;">
        <div
          class="list-group-item"
          style="padding: 10px; border: none; background-color: #00D968;"
        >
          <p class="name-col my-card-header">Done</p>
        </div>
        <div
          class="d-flex justify-content-center flex-column align-items-center border"
          style="padding: 15px; padding-top: 40px;"
        >
          <draggable tag="div" v-model="done" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
            <transition-group type="transition" :name="'flip-list'">
              <Card v-for="task in done" :key="task.id" :task="task" :taskDetail="task.id" />
            </transition-group>
          </draggable>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import draggable from "vuedraggable";
import db from "../apis/firebase";

export default {
  name: "app",
  data() {
    return {
      backlog: [],
      todo: [],
      doing: [],
      done: [],
      isDragging: false,
      delayedDragging: false
    };
  },
  components: {
    Navbar,
    Card,
    draggable
  },
  methods: {
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    },
    
  },
  computed: {
    dragOptions() {
      return {
        animation: 1,
        group: "description",
        ghostClass: "ghost"
      };
    }
  },
  watch: {
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
      });
    },
    backlog() {
      if (this.backlog.length) {
        let newTask = this.backlog.filter(task => task.status != "Back-Log")[0];
        if (newTask) {
          newTask.status = "Back-Log";
          db.collection("todos")
            .doc(newTask.id)
            .set(newTask)
            .then(function() {
              console.log("Document successfully written!");
            })
            .catch(function(error) {
              console.error("Error writing document: ", error);
            });
        }
      }
    },
    todo() {
      if (this.todo.length) {
        let newTask = this.todo.filter(task => task.status != "To-Do")[0];
        if (newTask) {
          newTask.status = "To-Do";
          db.collection("todos")
            .doc(newTask.id)
            .set(newTask)
            .then(function() {
              console.log("Document successfully written!");
            })
            .catch(function(error) {
              console.error("Error writing document: ", error);
            });
        }
      }
    },
    doing() {
      if (this.doing.length) {
        let newTask = this.doing.filter(task => task.status != "Doing")[0];
        if (newTask) {
          newTask.status = "Doing";
          db.collection("todos")
            .doc(newTask.id)
            .set(newTask)
            .then(function() {
              console.log("Document successfully written!");
            })
            .catch(function(error) {
              console.error("Error writing document: ", error);
            });
        }
      }
    },
    listDone() {
      if (this.done.length) {
        let newTask = this.done.filter(task => task.status != "Done")[0];
        if (newTask.status) {
          newTask.status = "Done";
          db.collection("todos")
            .doc(newTask.id)
            .set(newTask)
            .then(function() {
              console.log("Document successfully written!");
            })
            .catch(function(error) {
              console.error("Error writing document: ", error);
            });
        }
      }
    }
  },
  created() {
    db.collection("todos").onSnapshot(querySnapshot => {
      let backlogTask = [];
      let todoTask = [];
      let doingTask = [];
      let doneTask = [];
      querySnapshot.forEach(doc => {
        switch (doc.data().status) {
          case "Back-Log":
            backlogTask.push({ id: doc.id, ...doc.data() });
            break;
          case "To-Do":
            todoTask.push({ id: doc.id, ...doc.data() });
            break;
          case "Doing":
            doingTask.push({ id: doc.id, ...doc.data() });
            break;
          case "Done":
            doneTask.push({ id: doc.id, ...doc.data() });
            break;
        }
        this.backlog = backlogTask;
        this.todo = todoTask;
        this.doing = doingTask;
        this.done = doneTask;
      });
      console.log(this.backlog, "backlog");
      console.log(this.todo, "todo");
      console.log(this.doing, "doing");
      console.log(this.done, "done");
    });
  }
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.my-card-header {
  text-align: center;
}
</style>
