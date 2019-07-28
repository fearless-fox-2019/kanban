<template>
  <div>
    <div>
      <b-card bg-variant="light" text-variant="black" :header="datatask.title" class="text-center">
        <!-- {{datatask}} -->
        <b-card-text class="text-left">
          <p>Description: {{datatask.description}}</p>
          <p>assignedTo: {{datatask.assignedTo}}</p>
        </b-card-text>
        <span v-show="!toLeft" @click="revertProgress(datatask)">
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/ed/Green_Arrow_Left.svg" height="25" width="25" />
        </span>
        <span @click="deleteTask">
          <img src="https://previews.123rf.com/images/arcady31/arcady311712/arcady31171200107/92284665-big-green-trash-can-vector-icon.jpg" height="60" width="60" />
        </span>
        <span v-show="!toRight" @click="updateProgress(datatask)">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVsPUB-6ZM94ro7cqwSuPsibYy0j1K_Z2tUhTpelyfV5HBz-gq" height="25" width="25" />
        </span>
      </b-card>
    </div>
  </div>
</template>

<script>
import db from "../../config/firebase";
import Swal from 'sweetalert2'

export default {
  props: ["datatask", "id","toRight","toLeft"],
  data() {
    return {
    };
  },
  methods: {
    updateProgress(Task) {
      // console.log(Task,'======')
        if(Task.status!= 4){
            db.collection("Task").doc(this.id).update({status : Task.status+1})
            .then(function() {
            console.log("Document successfully updated!");
          })
          .catch(function(error) {
            console.error("Error updating document: ", error);
          })
        }
    },
    revertProgress(Task) {
        if(Task.status!= 1){
        // console.log(Task,'++++++++++++')
            db.collection("Task").doc(this.id).update({status : Task.status-1})
            .then(function() {
            console.log("Document successfully updated!");
          })
          .catch(function(error) {
            console.error("Error updating document: ", error);
          });
        }
    },
    deleteTask() {
      // console.log(Task)
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this task if deleted!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Deleted!',
            'Task has been deleted.',
            'success'
          )
          db.collection("Task").doc(this.id).delete()
          console.log("Document successfully deleted!");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your task is safe :)',
          'error'
        )}
      })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
    }
  }
};
</script>

<style>
.text-center {
  margin-bottom: 2rem;
}
</style>
