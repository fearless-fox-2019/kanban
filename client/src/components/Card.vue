<template>
  <div class="card cursor-pointer" style="width: 15rem; margin-bottom: 30px;">
    <ul class="list-group list-group-flush">
      <div style="border-bottom: 1px solid #DFDFDF; margin-bottom: 10px">
        <li
          class="list-group-item"
          style="text-align: left; background-color: #3B4043; color: white; padding: 10px;"
          @click="$bvModal.show(taskDetail)"
        >{{task.title}}</li>
      </div>
      <li
        class="list-group-item"
        style="text-align: left"
        @click="$bvModal.show(taskDetail)"
      >Point: {{task.point}}</li>
      <li
        class="list-group-item"
        style="text-align: left"
        @click="$bvModal.show(taskDetail)"
      >Assigned To: {{task.assignedTo}}</li>
    </ul>
    <div class="d-flex justify-content-end" style="padding: 5px">
      <a href="#" @click.prevent="deleteArticle" class="iconku" style="text-decoration: none">
        <i class="fas fa-trash" style="margin-right: 5px"></i>
      </a>
    </div>
    <b-modal :id="taskDetail" title="Detail task" ok-title="Update" @ok="submitUpdate">
      Title:
      <b-form-input
        id="input-1"
        type="text"
        required
        placeholder="Title"
        style="margin-bottom: 30px"
        v-model="task.title"
      ></b-form-input>Description:
      <b-form-textarea
        id="textarea"
        placeholder="Description"
        rows="3"
        max-rows="6"
        style="margin-bottom: 30px; height: 100px"
        v-model="task.description"
      ></b-form-textarea>Point:
      <b-form-input
        id="input-1"
        type="number"
        required
        placeholder="Point"
        style="margin-bottom: 30px"
        v-model="task.point"
      ></b-form-input>Assigned To:
      <div class="d-flex flex-column">
        <b-form-input
          id="input-1"
          type="text"
          required
          placeholder="Assigned To"
          style="margin-bottom: 30px"
          v-model="task.assignedTo"
        ></b-form-input>
        Detail Task: {{task.status}}
      </div>
    </b-modal>
  </div>
</template>

<script>
import db from "../../apis/firebase";

export default {
  props: {
    task: Object,
    taskDetail: String
  },
  methods: {
    submitUpdate() {
      db.collection("todos")
        .doc(this.task.id)
        .set(this.task)
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    },

    deleteArticle() {
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.$swal("Deleted!", "Your file has been deleted.", "success");
          db.collection("todos")
            .doc(this.task.id)
            .delete()
            .then(function() {
              console.log("Document successfully deleted!");
            })
            .catch(function(error) {
              console.error("Error removing document: ", error);
            });
        }
      });
    }
  }
};
</script>

<style scoped>
ul li.list-group-item {
  border: none;
  padding: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>
