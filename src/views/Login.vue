<template>
    <div class="form-group" id="text-center">
        <span class="text">Please Login!</span>
        <br><br>
        <button class="social-button" @click="google">
            <img alt="Google Logo" src="https://image.flaticon.com/teams/slug/google.jpg">
        </button>
        <button class="social-button" @click="github">
            <img alt="Github Logo" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png">
        </button>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
  methods: {
    google () {
      const provider = new firebase.auth.GoogleAuthProvider()

      firebase.auth().signInWithPopup(provider)
        .then((result) => {
          localStorage.setItem('name', result.user.displayName)
          this.$router.push('/home')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    github () {
      const provider = new firebase.auth.GithubAuthProvider()

      firebase.auth().signInWithPopup(provider)
        .then((result) => {
          localStorage.setItem('name', result.user.displayName)
          this.$router.push('/home')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
#text-center  {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.text{
    font-family: 'Fascinate', cursive;
    font-size: 40px;
}

.social-button {
  width: 75px;
  background: white;
  padding: 10px;
  border-radius: 100%;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
  outline: 0;
  border: 0;
}

.social-button img{
  width: 100%;
}
</style>
