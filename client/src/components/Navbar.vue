<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light d-flex">
    <a class="navbar-brand col-2" href="#">Kanban For You</a>

    <div class="collapse navbar-collapse col-8" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#"></a>
        </li>
      </ul>
    </div>

    <div class="add-task col-2">
      <button class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">Add Task</button>
    </div>
    <div
      class="modal fade"
      id="exampleModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Add new Task</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form action>
            <div class="modal-body d-flex flex-column">
              <input type="text" placeholder="Title.." v-model="formNewTask.title" required />
              <input
                type="text"
                placeholder="Description.."
                v-model="formNewTask.description"
                required
              />
              <input type="number" placeholder="Points.." v-model="formNewTask.points" required />
              <input
                type="text"
                placeholder="Assigned To.."
                v-model="formNewTask.assignedTo"
                required
              />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button
                type="submit"
                class="btn btn-primary"
                @click.prevent="addTask"
                :data-dismiss="dimiss"
              >Add New Task</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import db from "@/apis/firebase.js";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      formNewTask: {
        title: "",
        description: "",
        points: "",
        assignedTo: "",
        status: "backlog"
      },
      dimiss: "modal"
    };
  },
  methods: {
    addTask() {
      db.collection("tasks")
        .add({
          title: this.formNewTask.title,
          description: this.formNewTask.description,
          points: this.formNewTask.points,
          assignedTo: this.formNewTask.assignedTo,
          status: this.formNewTask.status
        })
        .then(function(docRef) {
          Swal.fire({
            type: "success",
            title: "Success!",
            text: "You have created a new task!"
          });
          console.log(`new document id: ${docRef.id}`);
        })
        .catch(err => {
          // console.log(err.message, "<<<<<<<<<<<<<<<<<<<<<<");
          Swal.fire({
            type: "error",
            title: "Missing column",
            text: "Please input all column"
          });
        });
    }
  }
};
</script>

<style scoped>
input {
  background-color: transparent;
  outline: none;
  border: none;
  border-bottom: 1px solid rgb(112, 112, 112);
  margin-bottom: 10px;
}
</style>
