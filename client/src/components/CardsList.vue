<template>
  <div>
      <v-card-text style="font-size: 20px;">
        Name: {{data.name}}
        <br>
        Assigned To: {{data.assignedTo}}
        <br>
        Point: {{data.point}}
      </v-card-text>
        <v-card-actions center>
        <v-btn @click="deleteData(data.id)">Delete</v-btn>
      </v-card-actions>

  </div>
</template>

<script>
import draggable from 'vuedraggable'
import db from '../apis/firebase.js'
export default {
  data () {
    return {

    }
  },
  components: {
    draggable
  },
  props: ['data'],
  created () {
    console.log(this.data)
  },
  methods: {
    deleteData (id) {
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
        .then((result) => {
          if (result.value) {
            this.$swal(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
          db.collection('TodoKanban').doc(id).delete()
        })
        .then((result) => {
          console.log('deleted')
        })
    }
  }

}
</script>

<style>

</style>
