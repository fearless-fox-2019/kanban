<template>
  <div id="login-container">
      <div id="title">
          <h3>Welcome to Kanban Board</h3>
          <h6>Track your task with kanban board!</h6>
      </div>
      <hr><br>

      <h5 id="choose-txt">Choose Account For Login:</h5><br>
      <div class=" col-3 offset-4 d-flex justify-content-around" >
        <a @click="loginGoogle" href="#">
            <img src="@/assets/icon-google.svg" alt="Icon Google" >
        </a>
        <a @click="loginGithub" href="#">
            <img src="@/assets/github-logo.svg" alt="Icon Github">
        </a>
      </div>

  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'login',
  methods: {

    loginGoogle () {
      const provider = new firebase.auth.GoogleAuthProvider()
      provider.addScope('profile')
      provider.addScope('email')
      firebase.auth().signInWithPopup(provider)
        .then((result) => {
          console.log('sukses login', result)
          let token = result.credential.accessToken
          let user = result.user

          localStorage.setItem('token', token)
          localStorage.setItem('user', user)
          this.$router.push('/home')
        })
        .catch(err => {
          console.log('error login google')
          console.log(err)
        })
    },
    loginGithub () {
      const provider = new firebase.auth.GithubAuthProvider()
      provider.addScope('repo')
      firebase.auth().signInWithPopup(provider)
        .then((result) => {
          let token = result.credential.accessToken
          let user = result.user

          localStorage.setItem('token', token)
          localStorage.setItem('user', user)
          this.$router.push('/home')
        }).catch((error) => {
          let errorCode = error.code
          let errorMessage = error.message
          let email = error.email

          let credential = error.credential
          console.log('error login github', error)
          console.log('message:', errorCode, errorMessage)
          console.log('email', email)
          console.log('credential', credential)
        })
    }
  }
}
</script>

<style scoped>
    #login-container{
        background-color: transparent;
        padding: 10%
    }
    #title{
        margin-top: 3%;
        margin-bottom: 5%;
    }

    #title h3{
        font-size: 45px;
        font-family: 'Lobster', cursive;
    }

    #title h6{
        font-weight: bold;
        font-size: 20px;
        font-family: 'Varela Round', sans-serif;
    }

    #choose-txt {
        font-size: 18px;
        font-family: 'Varela Round', sans-serif;
        font-weight: bold
    }

    img{
        height: 70px;
        margin-left: 70%;
        box-shadow: 3px 3px 5px grey;
        border-radius: 50%;
    }

    img:hover{
        opacity: 0.8
    }

    hr {
        width: 500px;
        height: 3px;
        text-align: center;
        background-color:darkmagenta;
        margin-top: -15px;
    }

</style>
