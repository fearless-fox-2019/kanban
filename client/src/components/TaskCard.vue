<template>
  <div class="card-title">
    <h3>{{title}}</h3>
    <p>desc: {{description}}</p>
    <p>points: {{points}}</p>
    <p>Assigned To: {{assignedTo}}</p>
    <div class="options d-flex justify-content-between">
      <button
        class="btn btn-primary"
        @click.prevent="updateStatusBackward(id,status)"
        v-if="status != 'backlog'"
      >Prev</button>
      <button class="btn btn-danger" @click.prevent="deleteTask(id)">
        <img src="https://i.ibb.co/crBmLyq/round-delete-forever-black-18dp.png" alt="delete" />
      </button>
      <button
        class="btn btn-primary"
        @click.prevent="updateStatusForward(id, status)"
        v-if="status != 'done'"
      >Next</button>
    </div>
  </div>
</template>

<script>
import db from "@/apis/firebase.js";
import Swal from "sweetalert2";

export default {
  props: ["id", "title", "description", "points", "assignedTo", "status"],
  methods: {
    deleteTask(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          db.collection("tasks")
            .doc(id)
            .delete()
            .then(function() {
              console.log("Document Successfuly deleted!");
              this.$emit("delete-task");
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    updateStatusForward(id, status) {
      let newStatus = "";
      if (status == "backlog") {
        newStatus = "todo";
      } else if (status == "todo") {
        newStatus = "doing";
      } else if (status == "doing") {
        newStatus = "done";
      }

      db.collection("tasks")
        .doc(id)
        .update({
          status: newStatus
        })
        .then(function() {
          console.log(`Document Successfuly updated!`);
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateStatusBackward(id, status) {
      let newStatus = "";
      if (status == "todo") {
        newStatus = "backlog";
      } else if (status == "doing") {
        newStatus = "todo";
      } else if (status == "done") {
        newStatus = "doing";
      }

      db.collection("tasks")
        .doc(id)
        .update({
          status: newStatus
        })
        .then(function() {
          console.log(`Document Successfuly updated!`);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
h3 {
  font-size: 20px;
}

p {
  font-size: 13px;
  margin-bottom: 5px;
}

img {
  filter: invert(100%);
}

div.card-title {
  width: 280px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.479);
  padding: 10px;
  border-radius: 5px;
}
</style>
