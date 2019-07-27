<template>
  <div id="app">
    <div class="container">
      <div class="text-left">
      <h2 style="color: maroon">Hey! Say! Kanban!</h2> <h4>かんばんボード</h4> <small style="color: pink">by Vuety Tiadita</small>
      <h5>try drag and drop</h5>
      </div>
      <div class="row">
        <div class="col-md-12 d-flex justify-content-center">
          <button
            class="btn btn-danger btn-block my-4"
            id="new"
            type="submit"
            v-b-modal.modal-prevent-closing
          >create new task</button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 col-sm-12 d-flex">
          <div class="d-flex" v-for="task in tasks" :key="task.id">
            <category :status="task.status" :items="task.items" v-bind:style="task.style" />
          </div>
        </div>
      </div>
    </div>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="New Task"
      @show="resetModal"
      @hidden="resetModal"
      @ok="addNewData"
    >
      <form>
        <b-form-input id="name-input" v-model="title" placeholder="enter title"></b-form-input><br>
        <b-form-textarea id="name-input" v-model="desc" placeholder="enter description"></b-form-textarea><br>
        <b-form-input
          id="name-input"
          type="number"
          v-model="point"
          placeholder="enter point 10-100"
        ></b-form-input><br>
        <b-form-input id="name-input" v-model="assignedTo" placeholder="enter assigned to who "></b-form-input><br>
      </form>
    </b-modal>
  </div>
</template>

<script>
import category from "@/components/category.vue";
import db from "../config/firebase";

export default {
  name: "app",
  components: {
    category
  },
  data() {
    return {
      title: "",
      desc: "",
      point: "",
      assignedTo: "",
      status: "back-log",
      tasks: [
        {
          status : 'back-log',
          style: {backgroundColor: 'red', color: 'red'},
          items: []
        },
        {
          status : 'todo',
          style: {backgroundColor: 'blue', color: 'blue'},
          items: []
        },
                {
          status : 'doing',
          style: {backgroundColor: 'coral', color: 'coral'},
          items: []
        },
                {
          status : 'done',
          style: {backgroundColor: 'green', color: 'green'},
          items: []
        },
      ]
    };
  },
  methods: {
    addNewData() {
      db.collection("Task")
        .add({
          title: this.title,
          description: this.desc,
          point: this.point,
          assignedTo: this.assignedTo,
          status: "back-log",
          createdAt: new Date()
        })
        .then(function(doc) {
          console.log("Document successfully written!", doc);
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    },
    resetModal() {
      this.title = "";
      (this.desc = ""), (this.point = ""), (this.assignedTo = "");
    },
    readData(){
       db.collection("Task")
      .orderBy("createdAt","asc")
      .onSnapshot(querySnapshot => {
        for (let task of this.tasks) {
            task.items = []
          }
        querySnapshot.forEach(doc => {
          let data = { ...doc.data(), id: doc.id }
          switch (data.status) {
              case 'back-log': this.tasks[0].items.push(data); break
              case 'todo': this.tasks[1].items.push(data); break
              case 'doing': this.tasks[2].items.push(data); break
              case 'done': this.tasks[3].items.push(data); break
                            
            }
        });

      });
    }
  },
  created(){
    this.readData()
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#new {
  width: 10rem;
}

.container {
  justify-content: center;
}
</style>