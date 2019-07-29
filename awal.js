<template>
  <section class="lists-container">
    <div class="list" v-for="(card,index) in cards" :key="index">
      <h3 class="list-title">{{card.title}}</h3>

      <ul class="list-items" :key="index" v-for="(job,index) in card.jobs">
        <li @click.prevent="getJob(index,card.id)">{{job}}</li>
      </ul>

      <button class="add-card-btn btn" @click.prevent="idCard=card.id" v-b-modal.card>Add a card</button>
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
      </form>
    </b-modal>
  </section>
</template>

<script>
import db from "@/apis/firebase.js";
export default {
  name: "HelloWorld",
  data() {
    return {
      cards: [],
      name: "",
      nameState: null,
      submittedNames: [],
      idCard: "tes"
    };
  },
  props: {
    msg: String
  },
  created() {
    console.log("created");

    db.collection("cards").onSnapshot(querySnapshot => {
      var carding = [];
      querySnapshot.forEach(doc => {
        console.log(doc);
        let card = {
          id: doc.id,
          title: doc.data().title,
          jobs: doc.data().jobs
        };
        carding.push(card);
      });
      this.cards = carding;
      console.log(this.cards, "oi");
    });
  },
  methods: {
    getJob(index, id) {
      let docRef = db.collection("cards").doc(id);
      docRef
        .get()
        .then(function(doc) {
          if (doc.exists) {
            console.log(doc.data());
            let datas = doc.data().jobs;
            datas.splice(index, 1);
            return docRef
              .update({
                jobs: datas
              })
              .then(function() {
                console.log("Document successfully updated!");
              })
              .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
              });
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    },
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
      let docRef = db.collection("cards").doc(this.idCard);
      docRef
        .get()
        .then(function(doc) {
          if (doc.exists) {
            doc.data().jobs.forEach(element => {
              newArray.unshift(element);
            });
            return docRef
              .update({
                jobs: newArray
              })
              .then(function() {
                console.log("Document successfully updated!");
              })
              .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
              });
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });

      // Push the name to submitted names
      newArray.push(this.name);
      console.log(newArray);
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
  background-color: #66a3c7;
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
