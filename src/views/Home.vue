<template>
  <el-container class="home">
    <el-header>
      <h1 class="bigest" @click="signOut">Hello kanban</h1>
    </el-header>
    <el-main>
      <el-button type="primary" v-if="!isForm" @click="changetoform">+ Add Task</el-button>
      <formData v-if="isForm" @submitTask="createTask"></formData>
    </el-main>
    <el-row :gutter="20" class="board">
      <el-col :span="6" v-for="(kanban,i) in kanbanlist" :key="i">
        <div :class="kanban.name">
          <div class="title">{{kanban.name}}</div>
          <div class="content" v-for="(data, i) in kanban.data" :key="i">
            <!-- <el-input placeholder="title here.."></el-input> -->
            <p class="tasktitle">{{data.title}}</p>
            <p class="taskdescription">{{data.description}}</p>
            <div class="taskassign">
              <p>Assigned to:</p>
              <p>{{data.assign}}</p>
            </div>
            <div class="op">
              <el-button-group>
                <el-button
                  v-if="kanban.name !== 'prelog'"
                  icon="el-icon-caret-left"
                  @click="changeLeftPos({class: data.class,id: data.id})"
                ></el-button>
                <el-button type="primary" icon="el-icon-edit" @click="editTask(data)"></el-button>
                <el-button type="danger" icon="el-icon-delete" @click="deleteTask(data.id)"></el-button>
                <el-button
                  v-if="kanban.name !== 'done'"
                  icon="el-icon-caret-right"
                  @click="changeRightPos({class: data.class,id: data.id})"
                ></el-button>
              </el-button-group>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import db from "../config/firebase";
import formData from "@/components/form.vue";

export default {
  name: "home",
  components: {
    formData
  },
  data() {
    return {
      isForm: false,
      kanbanlist: [],
      visible: false,
      editcontent: false,
      updateForm: {}
    };
  },
  methods: {
    createTask() {
      this.isForm = false;
    },
    changetoform() {
      this.isForm = true;
    },
    sendMessage() {
      console.log("beda lagi");
    },
    changeLeftPos(input) {
      console.log("pindah dari", input.class, "mau ke kiri", input.id);
      let updateValue = {
        class: ""
      };
      if (input.class === "todo") updateValue.class = "prelog";
      else if (input.class === "onprocess") updateValue.class = "todo";
      else if (input.class === "done") updateValue.class = "onprocess";
      console.log(updateValue, "updatevaluenya");
      db.collection("thingtodo")
        .doc(input.id)
        .update(updateValue);
    },
    changeRightPos(input) {
      console.log("pindah dari", input.class, "mau ke kanan", input.id);
      let updateValue = {
        class: ""
      };
      if (input.class === "prelog") updateValue.class = "todo";
      else if (input.class === "todo") updateValue.class = "onprocess";
      else if (input.class === "onprocess") updateValue.class = "done";
      console.log(updateValue, "ini update valuenya");
      db.collection("thingtodo")
        .doc(input.id)
        .update(updateValue);
    },
    editTask(input) {
      console.log(input, "ini edit idnya");
      this.$prompt("just enter if you don`t want to edit this field", "Title", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel"
      })
        .then(({ value }) => {
          console.log(value, "ini value pertama");
          if (value === null) {
            this.updateForm.title = input.title;
          } else {
            this.updateForm.title = value;
          }
          this.$prompt(
            "just enter if you don`t want to edit this field",
            "Description",
            {
              confirmButtonText: "OK",
              cancelButtonText: "Cancel"
            }
          )
            .then(({ value }) => {
              console.log(value, "ini value kedua");
              if (value === null) {
                this.updateForm.description = input.description;
              } else {
                this.updateForm.description = value;
              }
              this.$prompt(
                "just enter if you don`t want to edit this field",
                "Assign to",
                {
                  confirmButtonText: "OK",
                  cancelButtonText: "Cancel"
                }
              )
                .then(({ value }) => {
                  console.log(value, "ini value ketiga");
                  if (value === null) {
                    this.updateForm.assign = input.assign;
                  } else {
                    this.updateForm.assign = value;
                  }

                  db.collection('thingtodo')
                    .doc(input.id)
                    .update(this.updateForm)

                  this.$message({
                    type: "success",
                    message: "Successfully update"
                  });
                })
                .catch(() => {
                  this.$message({
                    type: "info",
                    message: "Input canceled"
                  });
                });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "Input canceled"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Input canceled"
          });
        });
    },
    deleteTask(id) {
      this.$confirm(
        "This will permanently delete the file. Continue?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning"
        }
      )
        .then(() => {
          console.log(id, "ini delet idnya");
          db.collection("thingtodo")
            .doc(id)
            .delete();
          this.$message({
            type: "success",
            message: "Delete completed"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled"
          });
        });
    },
    signOut(){
      localStorage.removeItem('kanban_name')
      this.$emit('changepage',true)
    }
  },
  created() {
    db.collection("thingtodo").onSnapshot(querySnapshot => {
      let todolist = [];
      querySnapshot.forEach(doc => {
        todolist.push({
          id: doc.id,
          ...doc.data()
        });
      });

      const prelog = { name: "prelog", data: [] };
      const todo = { name: "todo", data: [] };
      const onprocess = { name: "onprocess", data: [] };
      const done = { name: "done", data: [] };

      const board = [prelog, todo, onprocess, done];

      todolist.forEach(el => {
        // console.log(el.class,'ini milik el class')
        board.forEach(bord => {
          // console.log(bord.name,'ini dari bord data')
          // console.log(bord.data,'ini dari bord data')
          if (el.class === bord.name) {
            bord.data.push(el);
          }
        });
      });
      console.log(board, "ini hasilnya");
      this.kanbanlist = board;
    });
  }
};
</script>



<style scoped>
@import url("https://fonts.googleapis.com/css?family=Righteous&display=swap");
@import url('https://fonts.googleapis.com/css?family=Raleway:400,700i&display=swap');

.bigest{
  cursor: pointer;
}
h1 {
  font-family: "Righteous", cursive;
  color: white;
  font-size: 60px;
  padding-top: -10px;
  margin-top: 10px;
}
el-main {
  border: 1px solid black;
}
.el-col.el-col-6 {
  max-height: 450px;
}
.content {
  min-height: 100px;
  border: 2px solid white;
  border-radius: 10px;
  margin: 10px 5px;
  padding: 10px;
}
.el-col {
  overflow: auto;
  min-height: 600px;
}
.title {
  font-size: 30px;
  font-weight: 600;
  color: whitesmoke;
  text-transform: capitalize;
}
.tasktitle {
  color: whitesmoke;
  font-size: 30px;
  font-weight: 800;
  margin: 15px 0px;
  padding: 0px;
  text-transform: capitalize;
  font-family: 'Raleway', sans-serif;
}
.taskdescription {
  color: whitesmoke;
  font-size: 18px;
  font-weight: 500px;
  border: 1px solid whitesmoke;
  border-radius: 6px;
  margin: 0px 8px;
  padding: 10px 0px;
}
.taskassign {
  color: whitesmoke;
  font-size: 16px;
  display: flex;
  justify-content: space-evenly;
}
</style>

