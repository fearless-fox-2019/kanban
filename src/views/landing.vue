<template>
  <div class="landing">
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <div class="inputname">
          <h1>WELCOME TO HELLO KANBAN</h1>
          <el-form @submit.native.prevent="setName">
            <el-input placeholder="Your name here" autofocus="true" v-model="name"></el-input>
            <el-button type="primary" @click="setName">Submit</el-button>
          </el-form>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: ""
    };
  },
  methods: {
    setName() {
      console.log("heuheuheu");
      localStorage.setItem("kanban_name", this.name);
      this.name = ''
      this.$emit('changepage',false);
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat+Alternates:900&display=swap");

h1 {
  font-family: "Montserrat Alternates", sans-serif;
  color: whitesmoke;
  font-size: 40px;
}
.inputname {
  margin-top: 180px;
}
.el-button {
  margin: 20px;
}
</style>
