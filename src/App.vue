<template>
  <div id="app">
    <div id="overApp">
      <div id="nav">
        

        <strike @click="noNewTask" style="cursor:pointer"><b>KAN-BANNED</b></strike>
        <br>
        <small v-if="!isNew"><a @click="newTask" class="button is-small is-rounded">+ Task</a></small>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>



export default {
  props : ['isNew'],
  data(){
    return {
      // isNew : false
    }
  },
  methods : {
    newTask(){
      // this.isNew = true,
      this.$router.push('/new')
      console.log(this.isNew)
    },
    noNewTask(){
      // this.isNew = false,
      this.$router.push('/')
      console.log(this.isNew)

    }
  }
}
</script>


<style scoped>
#overApp{
  background-color: rgba(0, 0, 0, 0.3);
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  /* background-image: url('https://upload.wikimedia.org/wikipedia/commons/1/1d/BlankMap-World-WWII.PNG'); */
  background-image: url('https://cdn.pixabay.com/photo/2017/08/04/10/36/background-2579719_960_720.jpg');
  background-size: cover;
  overflow: hidden;
}
#nav {
  font-family: 'Courier New', Courier, monospace;
  padding: 3px;
  background-color: rgba(212, 214, 241, 0.657)
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  margin: 0;
  /* padding: 5px; */
  /* padding-bottom: 2px; */
  border: 1px black solid;
  /* border-radius: 20pc; */
  background-color: rgba(0, 0, 0, 0.6);
  color: rgba(1, 250, 237, 1);

}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
