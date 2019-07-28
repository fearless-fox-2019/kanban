<template>
  <v-layout justify-center>
    <v-btn color="primary" small dark block @click.stop="dialog = true">Details</v-btn>

    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Task Description</v-card-title>

        <v-card-text>
          <p>Points : {{details.points}}</p>
          <p>description : {{details.description}}</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            ref="isNext"
            :color="btn.prev.color"
            @click="changeBtnPrev({id: details.id, status:details.status})"
            v-if="!btn.isBacklog"
          >
            {{btn.prev.text}}
          </v-btn>

          <DeleteConfirm :taskId="details.id"/>

          <v-btn
            ref="isNext"
            :color="btn.next.color"
            @click="changeBtnNext({id: details.id, status:details.status})"
            v-if="!btn.isDone"
          >
            {{btn.next.text}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import db from '../../apis/firebase'
import DeleteConfirm from '@/components/DeleteConfirm.vue'
export default {
    props: ['details'],
    data() {
        return {
            dialog: false,
            btn : {
              next:{
                text: '',
                color: ''
              },
              prev: {
                text: '',
                color: ''
              },
              isBacklog: false,
              isDone:false,
              isNext: true
            }
        }
    },
    methods: {
        changeBtnNext(data){
            let {id, status} = data
            if (status === 'back_log') {
              this.$emit('statusWasChanged', [id, 'todo'])
            }else if (status === 'todo') {
              this.$emit('statusWasChanged', [id, 'doing'])
            }else if (status === 'doing') {
              this.$emit('statusWasChanged', [id, 'done'])
            }

            this.dialog = false
        },
        changeBtnPrev(data) {
            let {id, status} = data
            if (status === 'todo') {
              this.$emit('statusWasChanged', [id, 'back_log'])
            }else if (status === 'doing') {
              this.$emit('statusWasChanged', [id, 'todo'])
            }else {
              this.$emit('statusWasChanged', [id, 'doing'])
            }

            this.dialog = false
        },
        displayButton() {
          if (this.details.status === 'back_log') {
              this.btn.next.text = 'todo'
              this.btn.next.color = 'warning'
              this.btn.isBacklog = true
          }else if(this.details.status === 'todo') {
              this.btn.next.text = 'doing'
              this.btn.next.color = 'primary'
              this.btn.prev.text = 'back log'
              this.btn.prev.color = 'secondary'
              this.isBacklog = false
          }else if (this.details.status === 'doing') {
              this.btn.next.text = 'done'
              this.btn.next.color = 'success'
              this.btn.prev.text = 'todo'
              this.btn.prev.color = 'warning'
              this.btn.isBacklog = false
          }else {
              this.btn.prev.text = 'doing'
              this.btn.prev.color = 'primary'
              this.btn.isDone = true
          }
        }
    },
    mounted: function() {
      this.displayButton()
    },
    components: {
      DeleteConfirm
    }
}
</script>

<style>

</style>
