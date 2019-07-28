<template>
    <div>
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center" :style="{backgroundColor: board.color}">
                <span class="board-title">{{ board.title }}</span>
                <span>
                    <b-button variant="danger" style="border: solid gray 2px;" v-b-modal="'confirm-board-delete'+board.id">Delete</b-button>
                </span>
            </div>

            <drop class="card-body" @drop="handleDrop">
                <div class="d-flex justify-content-end" style="margin-bottom: 20px;">
                    <b-button class="btn-add-task" variant="primary" v-b-modal="'modal-add-task-'+board.id">
                        Add New Task
                    </b-button>
                </div>

                <drag v-for="task in tasks" :key="task.id" :transfer-data="task" class="task" :style="{backgroundColor: task.color}">
                    <div class="title">
                        {{ task.title }}
                    </div>
                    <div class="description">
                        <p style="word-break: break-all; white-space:normal;">
                        	{{ task.description }}
                        </p>
                    </div>

                    <div>
                        <a href="" @click.prevent="" class="btn-delete-task" v-b-modal="'confirm-task-delete'+task.id" title="Delete Task"><font-awesome-icon icon="trash"></font-awesome-icon></a>
                    </div>

                    <confirmation-modal :id="'task-delete'+task.id" :info="{title: 'Delete Task', message: `Are you sure to delete ${task.title} task?`}" @execute="deleteTask(task.id)">
                    </confirmation-modal>
                </drag>

            </drop>
        </div>

        <add-task :board="board"></add-task>

        <confirmation-modal :id="'board-delete'+board.id" :info="{title: 'Delete Board', message: `Are you sure to delete ${board.title} board?`}" @execute="deleteBoard">
        </confirmation-modal>


    </div>
</template>

<script>
import AddTask from '@/components/AddTask.vue';
import { db } from '../main';
import ConfirmationModal from '@/components/ConfirmationModal.vue';

export default {
  created() {
    this.fetchTask();
  },
  data() {
    return {
      tasks: [],
    };
  },
  props: ['board'],
  methods: {
    deleteBoard() {
      db.collection('boards').doc(this.board.id).delete().then(() => {
        // console.log('Document successfully deleted!');
      })
        .catch((error) => {
        //   console.error('Error removing document: ', error);
        });
    },
    showModal(board) {
      this.$bvModal.msgBoxConfirm(`Are you sure to delete ${board.title} bord?`, {
        title: 'Delete Board',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true,
      })
        .then((value) => {
          if (value == true) {
            this.deleteBoard(board.id);
          }
        })
        .catch((err) => {
        //   console.log(err);
        });
    },
    handleDrop(data, event) {
      db.collection('tasks').doc(data.id).update({
        boardId: this.board.id,
      });
    },
    fetchTask() {
      db.collection('tasks').where('boardId', '==', this.board.id).orderBy('createdAt', 'desc')
        .onSnapshot((querySnapshot) => {
          const newTasks = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            newTasks.push({
              id: doc.id, title: data.title, description: data.description, color: data.color,
            });
          });
          this.tasks = newTasks;
        });
    },
    deleteTask(id) {
      db.collection('tasks').doc(id).delete()
        .then(() => {
          // console.log('Document successfully deleted!');
        })
        .catch((error) => {
          // console.error('Error removing document: ', error);
        });
    },
  },
  components: {
    AddTask, ConfirmationModal,
  },
};

</script>

<style scoped>
    .card{
        height: 80vh;
        width: 400px;
    }

    .task{
        text-align: left;
        border: solid black 1px;
        border-radius: 5px;
        padding: 5px;
        margin: 20px 5px;
    }

    .task .title{
        font-size: 22pt;
        text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
        font-weight: bolder;
    }

    .task .description{
        font-size: 14pt;
        background-color: aliceblue;
        padding: 5px;
        border-radius: 5px;
        margin: 0px 5px;
    }

    .btn-delete-task{
        padding: 5px;
        margin: 5px;
        font-size: 16pt;
        font-weight: bolder;
        color:#dc3545;
    }

    .board-title{
        font-size: 25pt;
        font-weight: bold;
    }

    .card-body{
        overflow: auto;
    }


</style>
