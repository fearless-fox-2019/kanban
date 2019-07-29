<template>
  <div class="form">
    <el-form :inline="true" class="demo-form-inline">
      <div>
        <el-form-item>
          <el-input placeholder="Title Here" v-model="taskForm.title" autofocus="true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="Message" v-model="taskForm.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="Assigned to" v-model="taskForm.assign"></el-input>
        </el-form-item>
      </div>
      <el-form-item style="margin-top: -15px;">
        <el-button type="primary" @click="submit">Create</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import db from "../config/firebase";

export default {
  data() {
    return {
      taskForm: {
        title: "",
        description: "",
        assign: "",
        class: "prelog"
      }
    };
  },
  methods: {
    submit() {
      console.log(this.taskForm, "initaskdorm");
      if (
        this.taskForm.title !== "" &&
        this.taskForm.description !== "" &&
        this.taskForm.assign !== ""
      ) {
        db.collection("thingtodo")
          .add(this.taskForm)
          .then(docRef => {
            console.log(docRef, "ini adalah docrefnya");
            this.$emit("submitTask");
            this.clearfield();
          })
          .catch(error => {});
      } else {
          this.$notify.error({
          title: 'Error',
          message: 'Cannot input empty field'
        });
        console.log("cannotbe an empty field");
      }
    },
    clearfield() {
      this.taskForm = {
        title: "",
        description: "",
        assign: "",
        status: "prelog"
      };
    }
  }
};
</script>

<style scoped>
.el-input {
  width: 300px;
}
.form{
    margin-top: 10px;
}
</style>
