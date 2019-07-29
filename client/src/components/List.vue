<template>
  <div>
    <div>
      <li @click.prevent="getJob(job.id)">{{job.title}}</li>
    </div>
    <div v-show="idJob==job.id">
      <form ref="form" @submit.prevent="handleSubmit()">
        <b-form-select v-model="selected" :options="options"></b-form-select>
        <div class="mt-3">
          Selected:
          <strong>{{ selected }}</strong>
        </div>
        <button type="submit" class="btn btn-primary">Change</button>
      </form>
      <button @click.prevent="deleteData(job.id)" class="btn btn-danger">Delete</button>
    </div>
  </div>
</template>

<script>
import db from "@/apis/firebase.js";
export default {
  props: ["job"],
  methods: {
    getJob(id) {
      console.log(id);
      this.idJob = id;
    },
    handleSubmit() {
      console.log(this.idJob, "handle");
      let docRef = db.collection("cards").doc(this.idJob);
      return docRef
        .update({
          jenis: this.selected
        })
        .then(function() {
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },
    deleteData(id) {
      console.log(id);
      db.collection("cards")
        .doc(id)
        .delete()
        .then(function() {
          console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
    }
  },
  data() {
    return {
      selected: null,
      options: [
        { value: "backlog", text: "Backlog" },
        { value: "to-do", text: "To-do list" },
        { value: "doing", text: "Doing" },
        { value: "done", text: "Done" }
      ],
      idJob: null
    };
  }
};
</script>

<style scoped>
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
