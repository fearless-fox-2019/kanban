  <template>
  <div class="home d-flex row">
    
    <div class="list backlog col-3 d-flex flex-column align-items-center">
      <h1>Backlog</h1>
      <div class="list-backlog">
        <TaskCard
          v-for="task in backlog"
          :key="task.id"
          :id="task.id"
          :title="task.title"
          :description="task.description"
          :points="task.points"
          :assignedTo="task.assignedTo"
          :status="task.status"
        ></TaskCard>
      </div>
    </div>
    <div class="list todo col-3 d-flex flex-column align-items-center">
      <h1>To-Do</h1>
      <div class="list-todo">
        <TaskCard
          v-for="task in todo"
          :key="task.id"
          :id="task.id"
          :title="task.title"
          :description="task.description"
          :points="task.points"
          :assignedTo="task.assignedTo"
          :status="task.status"
        ></TaskCard>
      </div>
    </div>
    <div class="list doing col-3 d-flex flex-column align-items-center">
      <h1>Doing</h1>
      <div class="list-do">
        <TaskCard
          v-for="task in doing"
          :key="task.id"
          :id="task.id"
          :title="task.title"
          :description="task.description"
          :points="task.points"
          :assignedTo="task.assignedTo"
          :status="task.status"
        ></TaskCard>
      </div>
    </div>
    <div class="list done col-3 d-flex flex-column align-items-center">
      <h1>Done</h1>
      <div class="list-done">
        <TaskCard
          v-for="task in done"
          :key="task.id"
          :id="task.id"
          :title="task.title"
          :description="task.description"
          :points="task.points"
          :assignedTo="task.assignedTo"
          :status="task.status"
        ></TaskCard>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TaskCard from "@/components/TaskCard.vue";
import db from "@/apis/firebase.js";

export default {
  name: "home",
  components: {
    TaskCard
  },
  data() {
    return {
      backlog: [],
      todo: [],
      doing: [],
      done: []
    };
  },
  methods: {
    getAllTask() {
      db.collection("tasks").onSnapshot(querySnapshot => {
        this.backlog = [];
        this.todo = [];
        this.doing = [];
        this.done = [];
        querySnapshot.forEach(doc => {
          let data = {
            id: doc.id,
            title: doc.data().title,
            description: doc.data().description,
            points: doc.data().points,
            assignedTo: doc.data().assignedTo,
            status: doc.data().status
          };

          if (data.status == "backlog") {
            this.backlog.push(data);
          } else if (data.status == "todo") {
            this.todo.push(data);
          } else if (data.status == "doing") {
            this.doing.push(data);
          } else {
            this.done.push(data);
          }
        });
      });
      // console.log(this.backlog);
    }
  },
  created: function() {
    this.getAllTask();
  }
};
</script>

<style scoped>
div.list {
  padding: 20px 0;
}

h1 {
  margin-bottom: 40px;
  font-family: "Oswald";
}

.backlog h1 {
  color: red;
}

.todo h1 {
  color: orange;
}

.doing h1 {
  color: skyblue;
}

.done h1 {
  color: greenyellow;
}

/* div.backlog {
  border: 1px solid black;
}

div.todo {
  border: 1px solid black;
}

div.doing {
  border: 1px solid black;
}

div.done {
  border: 1px solid black;
} */
</style>

