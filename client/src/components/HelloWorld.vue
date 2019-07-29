<template>
  <section class="lists-container">
    <div class="list">
      <h3 class="list-title">backlog</h3>
      <ul class="list-items">
        <draggable
          v-model="backlogs"
          :options="{group:'people'}"
          @start="drag=true"
          @end="drag=false"
        >
          <List :job="job" v-for="job in backlogs" :key="job.id"></List>
        </draggable>
      </ul>

      <button class="add-card-btn btn" v-b-modal.card>Add a card</button>
    </div>

    <!-- <button class="add-list-btn btn">Add a list</button> -->
    <!-- <b-modal
      id="card"
      ref="modal"
      title="Submit Your Name"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit()">
        <b-form-group
          :state="nameState"
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
          <b-form-input id="name-input" v-model="name" :state="nameState" required></b-form-input>
        </b-form-group>
      </form>
    </b-modal>-->
    <div class="list">
      <h3 class="list-title">to-do</h3>

      <ul class="list-items">
        <draggable v-model="todos" :options="{group:'people'}" @start="drag=true" @end="drag=false">
          <List :job="job" :key="job.id" v-for="job in todos"></List>
        </draggable>
      </ul>

      <button class="add-card-btn btn" v-b-modal.card>Add a card</button>
    </div>

    <!-- <button class="add-list-btn btn">Add a list</button> -->
    <!-- <b-modal
      id="card"
      ref="modal"
      title="Submit Your Name"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit()">
        <b-form-group
          :state="nameState"
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
          <b-form-input id="name-input" v-model="name" :state="nameState" required></b-form-input>
        </b-form-group>
      </form>
    </b-modal>-->
    <div class="list">
      <h3 class="list-title">doing</h3>

      <ul class="list-items">
        <draggable
          v-model="doings"
          :options="{group:'people'}"
          @start="drag=true"
          @end="drag=false"
        >
          <List :job="job" :key="job.id" v-for="job in doings"></List>
        </draggable>
      </ul>

      <button class="add-card-btn btn" v-b-modal.card>Add a card</button>
    </div>

    <!-- <button class="add-list-btn btn">Add a list</button> -->
    <!-- <b-modal
      id="card"
      ref="modal"
      title="Submit Your Name"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit()">
        <b-form-group
          :state="nameState"
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
          <b-form-input id="name-input" v-model="name" :state="nameState" required></b-form-input>
        </b-form-group>
      </form>
    </b-modal>-->
    <div class="list">
      <h3 class="list-title">done</h3>

      <ul class="list-items">
        <draggable v-model="dones" :options="{group:'people'}" @start="drag=true" @end="drag=false">
          <List :job="job" :key="job.id" v-for="job in dones"></List>
        </draggable>
      </ul>

      <button class="add-card-btn btn" v-b-modal.card>Add a card</button>
    </div>

    <!-- <button class="add-list-btn btn">Add a list</button> -->
    <b-modal
      id="card"
      ref="modal"
      title="Submit Your Name"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit()">
        <b-form-group
          :state="nameState"
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
          <b-form-input id="name-input" v-model="name" :state="nameState" required></b-form-input>
        </b-form-group>
        <b-form-group label="Status" label-for="status" invalid-feedback="Status is required">
          <div>
            <b-form-select v-model="selected" :options="options"></b-form-select>
            <div class="mt-3">
              Selected:
              <strong>{{ selected }}</strong>
            </div>
          </div>
        </b-form-group>
      </form>
    </b-modal>
  </section>
</template>

<script>
import db from "@/apis/firebase.js";
import draggable from "vuedraggable";
import List from "@/components/List.vue";
export default {
  components: {
    List,
    draggable
  },
  name: "HelloWorld",
  watch: {
    backlogs: function(key) {
      // console.log(this.backlogs, "oi terus");
      // console.log(key, "backlogs");
      key.forEach(element => {
        if (element.jenis !== "backlog") {
          console.log(element, "wiu");
          let docRef = db.collection("cards").doc(element.id);
          return docRef
            .update({
              jenis: "backlog"
            })
            .then(function() {
              console.log("Document successfully updated!");
            })
            .catch(function(error) {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
            });
        }
      });
    },
    dones: function(key) {
      // console.log(this.backlogs, "oi terus");
      key.forEach(element => {
        if (element.jenis !== "done") {
          console.log(element, "wiu");
          let docRef = db.collection("cards").doc(element.id);
          return docRef
            .update({
              jenis: "done"
            })
            .then(function() {
              console.log("Document successfully updated!");
            })
            .catch(function(error) {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
            });
        }
      });
    },
    doings: function(key) {
      // console.log(this.backlogs, "oi terus");
      key.forEach(element => {
        if (element.jenis !== "doing") {
          console.log(element, "wiu");
          let docRef = db.collection("cards").doc(element.id);
          return docRef
            .update({
              jenis: "doing"
            })
            .then(function() {
              console.log("Document successfully updated!");
            })
            .catch(function(error) {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
            });
        }
      });
    },
    todos: function(key) {
      key.forEach(element => {
        if (element.jenis !== "to-do") {
          console.log(element, "wiu");
          let docRef = db.collection("cards").doc(element.id);
          return docRef
            .update({
              jenis: "to-do"
            })
            .then(function() {
              console.log("Document successfully updated!");
            })
            .catch(function(error) {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
            });
        }
      });
      // console.log(this.backlogs, "oi terus");
    }
    // lastName: function (val) {
    //   this.fullName = this.firstName + ' ' + val
    // }
  },
  data() {
    return {
      cards: [],
      name: "",
      nameState: null,
      submittedNames: [],
      idCard: "tes",
      backlogs: [],
      todos: [],
      dones: [],
      doings: [],
      selected: null,
      options: [
        { value: "backlog", text: "Backlog" },
        { value: "to-do", text: "To-do list" },
        { value: "doing", text: "Doing" },
        { value: "done", text: "Done" }
      ]
    };
  },
  props: {
    msg: String
  },
  created() {
    console.log("created");

    db.collection("cards").onSnapshot(querySnapshot => {
      var backlog = [];
      var todo = [];
      var doing = [];
      var done = [];
      querySnapshot.forEach(doc => {
        console.log(doc);
        let card = {
          id: doc.id,
          ...doc.data()
        };
        if (doc.data().jenis == "backlog") {
          backlog.push(card);
        } else if (doc.data().jenis == "to-do") {
          todo.push(card);
        } else if (doc.data().jenis == "doing") {
          doing.push(card);
        } else if (doc.data().jenis == "done") {
          done.push(card);
        }
      });
      this.todos = todo;
      this.backlogs = backlog;
      this.doings = doing;
      this.dones = done;
      console.log(this.dones, "oi");
    });
  },
  methods: {
    seeChanges(id) {
      console.log(id);
    },
    // getJob(index, id) {
    //   let docRef = db.collection("cards").doc(id);
    //   docRef
    //     .get()
    //     .then(function(doc) {
    //       if (doc.exists) {
    //         console.log(doc.data());
    //         let datas = doc.data().jobs;
    //         datas.splice(index, 1);
    //         return docRef
    //           .update({
    //             jobs: datas
    //           })
    //           .then(function() {
    //             console.log("Document successfully updated!");
    //           })
    //           .catch(function(error) {
    //             // The document probably doesn't exist.
    //             console.error("Error updating document: ", error);
    //           });
    //       } else {
    //         // doc.data() will be undefined in this case
    //         console.log("No such document!");
    //       }
    //     })
    //     .catch(function(error) {
    //       console.log("Error getting document:", error);
    //     });
    // },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid ? "valid" : "invalid";
      return valid;
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      let newArray = [];

      console.log(this.idCard);
      if (!this.checkFormValidity()) {
        return;
      }
      db.collection("cards")
        .add({
          title: this.name,
          jenis: this.selected
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
      // Hide the modal manually
      this.$nextTick(() => {
        this.$refs.modal.hide();
      });
    }
  }
};
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*

All grid code is placed in a 'supports' rule (feature query) at the bottom of the CSS (Line 320). 
            
The 'supports' rule will only run if your browser supports CSS grid.

Flexbox is used as a fallback so that browsers which don't support grid will still recieve an identical layout.

*/

/* Base styles */

/* Masthead */

/* Lists */

.lists-container::-webkit-scrollbar {
  height: 2.4rem;
}

.lists-container::-webkit-scrollbar-thumb {
  background-color: #42b983;
  border-top-width: 0;
}

.lists-container {
  display: flex;
  align-items: start;
  padding: 0 0.8rem 0.8rem;
  overflow-x: auto;
  height: calc(100vh - 8.6rem);
}

.list {
  flex: 0 0 27rem;
  display: flex;
  flex-direction: column;
  background-color: #e2e4e6;
  max-height: calc(100vh - 11.8rem);
  border-radius: 0.3rem;
  margin-right: 1rem;
}

.list:last-of-type {
  margin-right: 0;
}

.list-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #333;
  padding: 1rem;
}

.list-items {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-content: start;
  padding: 0 0.6rem 0.5rem;
  overflow-y: auto;
}

.list-items::-webkit-scrollbar {
  width: 1.6rem;
}

.list-items::-webkit-scrollbar-thumb {
  background-color: #c4c9cc;
  border-right: 0.6rem solid #e2e4e6;
}

.list-items li {
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.3;
  background-color: #fff;
  padding: 0.65rem 0.6rem;
  color: #4d4d4d;
  border-bottom: 0.1rem solid #ccc;
  border-radius: 0.3rem;
  margin-bottom: 0.6rem;
  word-wrap: break-word;
  cursor: pointer;
}

.list-items li:last-of-type {
  margin-bottom: 0;
}

.list-items li:hover {
  background-color: #eee;
}

.add-card-btn {
  display: block;
  font-size: 1.4rem;
  font-weight: 400;
  color: #838c91;
  padding: 1rem;
  text-align: left;
  cursor: pointer;
}

.add-card-btn:hover {
  background-color: #cdd2d4;
  color: #4d4d4d;
  text-decoration: underline;
}

.add-list-btn {
  flex: 0 0 27rem;
  display: block;
  font-size: 1.4rem;
  font-weight: 400;
  background-color: #006aa7;
  color: #a5cae0;
  padding: 1rem;
  border-radius: 0.3rem;
  cursor: pointer;
  transition: background-color 150ms;
  text-align: left;
}

.add-list-btn:hover {
  background-color: #005485;
}

.add-card-btn::after,
.add-list-btn::after {
  content: "...";
}

/*

The following rule will only run if your browser supports CSS grid.

Remove or comment-out the code block below to see how the browser will fall-back to flexbox styling. 

*/

@supports (display: grid) {
  body {
    display: grid;
    grid-template-rows: 4rem 3rem auto;
    grid-row-gap: 0.8rem;
  }

  .masthead {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-column-gap: 2rem;
  }

  .boards-menu {
    display: grid;
    grid-template-columns: 9rem 18rem;
    grid-column-gap: 0.8rem;
  }

  .user-settings {
    display: grid;
    grid-template-columns: repeat(4, auto);
    grid-column-gap: 0.8rem;
  }

  .board-controls {
    display: grid;
    grid-auto-flow: column;
    grid-column-gap: 1rem;
  }

  .lists-container {
    display: grid;
    grid-auto-columns: 27rem;
    grid-auto-flow: column;
    grid-column-gap: 1rem;
  }

  .list {
    display: grid;
    grid-template-rows: auto minmax(auto, 1fr) auto;
  }

  .list-items {
    display: grid;
    grid-row-gap: 0.6rem;
  }

  .logo,
  .list,
  .list-items li,
  .boards-btn,
  .board-info-bar,
  .board-controls .btn,
  .user-settings-btn {
    margin: 0;
  }
}
</style>
