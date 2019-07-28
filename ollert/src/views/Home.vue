<template>
  <div class="home">
    <!-- Modal -->
    <b-modal :active.sync="showForm" has-modal-card>
      <ModalForm :form="form" :options="options" @taskadded="sendTask"></ModalForm>
    </b-modal>
    <!-- Selected -->
    <b-modal :active.sync="selectedShow" has-modal-card class="details">
      <CardDetail :selected="selected" @deleted="deleteArticle"></CardDetail>
    </b-modal>
    <!-- Body -->
    <div class="columns nav">
      <div class="column is-10">
        <div class="logo is-pulled-left">
          <img src="../assets/ollert-logo.png" alt="Ollert Kanban">
        </div>
      </div>
      <div class="column is-2">
        <b-button class="right" 
        @click="showForm = true"
        type="is-success"
        icon-pack="far" icon-left="edit">Add Card</b-button>
      </div>
    </div>
    <!-- Card List -->
    <div class="columns is-multiline is-mobile" style="margin : 0 0.75em">
      <div class="column is-3">
        <div class="box log">
          <h2>Back-Log</h2>
          <draggable v-model="tasks.backlog" group="task">
            <div v-for="task in tasks.backlog" :key="task.id" class="card-task">
              <h4>{{task.title}}
                <a @click.prevent="selectedShow = true; selectCard(task.id)">
                  <b-icon
                    pack="fas"
                    icon="external-link-alt"
                    style="margin-left: 5px; opacity: 0.2; color: #000"
                    size="is-small">
                  </b-icon>
                </a>
              </h4>
              <p>{{task.descriptions}}</p>
              <div class="columns is-multiline">
                <div class="column">
                  <b-tag type="is-primary" style="margin-left: 15px; margin-top: 10px;">Back-Log</b-tag>
                </div>
                <div class="column">
                  <b-tag type="is-info" style="margin-top: 10px;">{{getPriority(task.priority)}}</b-tag>
                </div>
                <div class="column"></div>
              </div>
              <div class="assignee">
                <p style="font-size: 12px;"><strong>Assign To :</strong></p>
                <p style="margin-top: 0; padding-bottom: 5px;">{{task.assignee}}</p>
              </div>
            </div>
          </draggable>
        </div>
      </div>
      <div class="column is-3">
        <div class="box log">
          <h2>To-Do</h2>
          <draggable v-model="tasks.todo" group="task">
            <div v-for="task in tasks.todo" :key="task.id" class="card-task">
              <h4>{{task.title}}
                <a @click.prevent="selectedShow = true; selectCard(task.id)">
                  <b-icon
                    pack="fas"
                    icon="external-link-alt"
                    style="margin-left: 5px; opacity: 0.2; color: #000"
                    size="is-small">
                  </b-icon>
                </a>
              </h4>
              <p>{{task.descriptions}}</p>
              <div class="columns is-multiline">
                <div class="column">
                  <b-tag type="is-info" style="margin-left: 15px; margin-top: 10px;">To-Do's</b-tag>
                </div>
                <div class="column">
                  <b-tag type="is-info" style="margin-top: 10px;">{{getPriority(task.priority)}}</b-tag>
                </div>
                <div class="column"></div>
              </div>
              <div class="assignee">
                <p style="font-size: 12px;"><strong>Assign To :</strong></p>
                <p style="margin-top: 0; padding-bottom: 5px;">{{task.assignee}}</p>
              </div>
            </div>
          </draggable>
        </div>
      </div>
      <div class="column is-3">
        <div class="box log">
          <h2>In Progress</h2>
          <draggable v-model="tasks.inprogress" group="task">
            <div v-for="task in tasks.inprogress" :key="task.id" class="card-task">
              <h4>{{task.title}}
                <a @click.prevent="selectedShow = true; selectCard(task.id)">
                  <b-icon
                    pack="fas"
                    icon="external-link-alt"
                    style="margin-left: 5px; opacity: 0.2; color: #000"
                    size="is-small">
                  </b-icon>
                </a>
              </h4>
              <p>{{task.descriptions}}</p>
              <div class="columns is-multiline">
                <div class="column">
                  <b-tag type="is-warning" style="margin-left: 15px; margin-top: 10px;">In Progress</b-tag>
                </div>
                <div class="column">
                  <b-tag type="is-info" style="margin-top: 10px;">{{getPriority(task.priority)}}</b-tag>
                </div>
                <div class="column"></div>
              </div>
              <div class="assignee">
                <p style="font-size: 12px;"><strong>Assign To :</strong></p>
                <p style="margin-top: 0; padding-bottom: 5px;">{{task.assignee}}</p>
              </div>
            </div>
          </draggable>
        </div>
      </div>
      <div class="column is-3">
        <div class="box log">
          <h2>Done</h2>
          <draggable v-model="tasks.done" group="task">
            <div v-for="task in tasks.done" :key="task.id" class="card-task">
              <h4>{{task.title}}
                <a @click.prevent="selectedShow = true; selectCard(task.id)">
                  <b-icon
                    pack="fas"
                    icon="external-link-alt"
                    style="margin-left: 5px; opacity: 0.2; color: #000"
                    size="is-small">
                  </b-icon>
                </a>
              </h4>
              <p>{{task.descriptions}}</p>
              <div class="columns is-multiline">
                <div class="column">
                  <b-tag type="is-success" style="margin-left: 15px; margin-top: 10px;">Done</b-tag>
                </div>
                <div class="column">
                  <b-tag type="is-info" style="margin-top: 10px;">{{getPriority(task.priority)}}</b-tag>
                </div>
                <div class="column"></div>
              </div>
              <div class="assignee">
                <p style="font-size: 12px;"><strong>Assign To :</strong></p>
                <p style="margin-top: 0; padding-bottom: 5px;">{{task.assignee}}</p>
              </div>
            </div>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import firebase, { functions } from 'firebase/app';
import 'firebase/firestore';
import ModalForm from '../components/Form';
import CardDetail from '../components/Selected';
import draggable from 'vuedraggable';



const configFirebase = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: 'kanban-track',
};

firebase.initializeApp(configFirebase);

const db = firebase.firestore();
export default {
  created() {
    db.collection('task')
      .onSnapshot((querySnapshot) => {
        var taskBacklog = [];
        let taskTodo = [];
        let taskInprogress = [];
        let taskDone = [];
        let taskAll = []
        querySnapshot.forEach((doc) => {
          const { title, descriptions, priority, progress, assignee } = doc.data();
          const task = {
            id: doc.id,
            title,
            descriptions,
            priority,
            progress,
            assignee,
          };
          taskAll.push(task)
          switch (doc.data().progress) {
            case 'backlog':
              taskBacklog.unshift(task)
              break;
            case 'todo':
              taskTodo.unshift(task);
              break;
            case 'inprogress':
              taskInprogress.unshift(task);
              break;
            case 'done':
              taskDone.unshift(task);
              break;
          }
        })
        this.tasks.all = taskAll
        this.tasks.backlog = taskBacklog;
        this.tasks.todo = taskTodo;
        this.tasks.inprogress = taskInprogress;
        this.tasks.done = taskDone;
      })
  },
  name: 'home',
  data() {
    return {
      showForm : false,
      tasks: {
        backlog: [],
        todo: [],
        inprogress: [],
        done: [],
        all: [],
      },
      options: [`backlog`, `todo`, `inprogress`, `done`],
      form: {
        title: null,
        descriptions: null,
        priority: null,
        progress: null,
        assignee: null,
      },
      selected: {},
      selectedShow: false,
    };
  },
  methods : {
    sendTask(input) {
      this.showForm = false
      this.$notification.open({
        duration: 5000,
        message: `Task ${this.form.title} Added !`,
        position: 'is-top-right',
        type: 'is-success',
        hasIcon: true
      })
      db.collection("task")
        .doc()
        .set(input)
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });

    },
    selectCard(input) {
      let selected = this.tasks.all.filter(val => val.id == input)
      this.selected = selected[0]
    },
    deleteArticle(input) {
      this.selectedShow = false
      db.collection("task")
        .doc(input)
        .delete()
        .then(function() {
          console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });

    },
    getPriority(input) {
      if (input == 1) {
        return 'Low Priority'
      } else if (input == 2) {
        return  'Medium Priority'
      } else if (input == 3) {
        return 'High Priority'
      } else if (input == 4) {
        return 'Urgent'
      }
    }
  },
  watch : {
    selectedShow() {
      this.selectedShow
    },
    'tasks.backlog': function() {
      let backlogUpdated = this.tasks.backlog.filter(val => val.progress !== 'backlog')
      backlogUpdated.forEach(val => {
        db.collection('task')
          .doc(val.id)
          .update({
            progress : 'backlog'
          })
        .then(() => {
          val.progress = 'backlog'
          console.log('Updated Backlog');
        })
        .catch((err) => {
          console.log('Something Happened in FireBase DB');
          console.log(err);
        })
      })
    },
    'tasks.todo': function() {
      let todoUpdated = this.tasks.todo.filter(val => val.progress !== 'todo')
      todoUpdated.forEach(val => {
        db.collection('task')
          .doc(val.id)
          .update({
            progress : 'todo'
          })
        .then(() => {
          val.progress = 'todo'
          console.log('Updated Todo');

        })
        .catch((err) => {
          console.log('Something Happened in FireBase DB');
          console.log(err);
        })        
      })
    },
    'tasks.inprogress': function() {
      let inprogressUpdated = this.tasks.inprogress.filter(val => val.progress !== 'inprogress')
      inprogressUpdated.forEach(val => {
        db.collection('task')
          .doc(val.id)
          .update({
            progress : 'inprogress'
          })
        .then(() => {
          val.progress = 'inprogress'
          console.log('Updated In-Progress');

        })
        .catch((err) => {
          console.log('Something Happened in FireBase DB');
          console.log(err);
        })
      })
    },
    'tasks.done': function() {
      let doneUpdated = this.tasks.done.filter(val => val.progress !== 'done')
      doneUpdated.forEach(val => {
        db.collection('task')
          .doc(val.id)
          .update({
            progress : 'done'
          })
        .then(() => {
          val.progress = 'done'
          console.log('Updated Done');

        })
        .catch((err) => {
          console.log('Something Happened in FireBase DB');
          console.log(err);
        })
      })
    },
  },
  components : {
    ModalForm,
    CardDetail,
    draggable,
  }
};
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  .logo img {
    width: 250px;
    height:auto;
    margin-left: 2.5vw
  }

  .columns.nav {
    padding-top: 10vh;
  }

  .button.is-success {
    font-weight: 600;
  }

  .home {
    min-height : 100vh;
    background: linear-gradient(#3EB9DE, #3A80DE);
      background-color: rgba(0, 0, 0, 0);
      background-image: linear-gradient(rgb(62, 185, 222), rgb(58, 128, 222));
      background-size: auto;
      background-origin: padding-box;
      background-clip: border-box;
  }

  .box.log {
    margin-top: 5vh;
    background-color: #E5EFF5 !important;
  }

  .card-task {
    background-color: #fff;
    margin-top: 2.5vh;
    padding: 5vh 2.5px;
    border-radius: 5px;
  }

  .card-task h4 {
    text-align: start;
    font-weight: 600;
    padding: 0 15px;
  }

  .card-task p {
    padding: 0 15px;
    margin-top: 10px;
    text-align: start;
  }

  .box h2 {
    text-align: start;
    font-weight: 600;
  }

  .modal .animation-content {
    width: 50vw;
    z-index: 10;
  }

  .assignee {
    margin: 0 15px;
    padding: 5px 2.5px;
    background-color: #E5EFF5;
    border-radius: 5px;
  }
</style>
