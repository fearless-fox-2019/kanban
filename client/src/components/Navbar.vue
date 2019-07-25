<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark" class="mb-3">
      <b-navbar-brand>My Kanban</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav>
            <b-nav-item v-b-modal.modal-newTask style="color:white">Add New Task</b-nav-item>
            
              <AddTask></AddTask>
       
          </b-navbar-nav>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import db from '../api/firebase'
import AddTask from '../components/AddTask'

export default {
  components:{
    AddTask
  },
  methods: {

  }
}
</script>

<style>

</style>
