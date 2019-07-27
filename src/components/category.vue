<template>
  <div class="drag-container" v-drag-and-drop:options="options">
    <div class="drag-list">
      <b-card :header="status" class="card-kanban d-flex">
        <draggable v-model="items"  :group="{name:'task'}" :sortable="false" @add="addEvent">
          
            <taskTodo
              class="drag-item"
              v-for="item in items"
              :key="item.id"
              :datatask="item"
            />

        </draggable>
      </b-card>
    </div>
  </div>
</template>

<script>
import taskTodo from "@/components/task.vue";
import db from "../../config/firebase";
import draggable from 'vuedraggable';

export default {
  name: "category",
  props: ["status","items"],
  components: {
    taskTodo,draggable
  },
  methods: {
    addEvent (evt) {
        db.collection("Task").doc(evt.item._underlying_vm_.id).update({ status: this.status })
        .then(() => {
          console.log('update successfully')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
};
</script>

<style>
.card-kanban {
  width: 16rem;
  margin: 1rem;
}
</style>
