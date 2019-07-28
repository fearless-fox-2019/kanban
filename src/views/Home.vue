<template>
  <div class="home">
    <!-- <section class="hero is-link is-fullheight-with-navbar">
      <div class="hero-body">
        
      </div>
    </section> -->
    <div class="container is-fullhd">
      <p>{{error}}</p>
        <div class="columns">
          <div class="col-3" v-for="(title, i) in titles" :key="i">
            <card @deleteDoc="deleteDoc" @updateDoc="updateDoc" v-if="title === 'back-log'" :title="title" :datas="dataBL"></card>
            <card @deleteDoc="deleteDoc" @updateDoc="updateDoc" v-if="title === 'to-do'" :title="title" :datas="dataTD"></card>
            <card @deleteDoc="deleteDoc" @updateDoc="updateDoc" v-if="title === 'doing'" :title="title" :datas="dataDG"></card>
            <card @deleteDoc="deleteDoc" @updateDoc="updateDoc" v-if="title === 'done'" :title="title" :datas="dataDN"></card>
          </div>
          <!-- back-log -->
          <!-- <div class="col-3">
            <div class="card first">
              <header class="card-header">
                <p class="card-header-title">
                  BACK-LOG
                </p>
              </header>
              <div class="card-content">
                <div v-if="!isLoadFetchData" class="content">
                  <div class="lds-hourglass"></div>
                </div>
                <div v-if="isLoadFetchData">
                  <div v-if="dataBL.length !== 0">
                    <div class="content" v-for="(data, i) in dataBL"
                      :key="i">
                      <b-collapse
                      aria-id="contentIdForA11y2"
                      class="panel"
                      :open.sync="isOpen">
                        <div
                          slot="trigger"
                          class="panel-heading"
                          role="button"
                          aria-controls="contentIdForA11y2">
                          <strong>{{(data.title).toUpperCase()}}</strong>
                        </div>
                        <div class="panel-block">
                          <p>Points : {{data.point}}                          
                            <br>
                            Assigned To : {{data.assign}}
                            <br>
                            {{data.description}}
                          </p>
                        </div>
                        <button @click.prevent ="deleteDoc(data.id)" style="margin-left:20px;margin-right:20px"><i class="fas fa-trash"></i> delete</button>
                        <a @click.prevent ="updateDoc(data.id, 'to-do')" style="margin-left:5px"> <i class="fas fa-arrow-circle-right"></i></a>
                      </b-collapse>
                    </div>
                  </div>
                  <div v-else>
                    <div class="content">
                      <p>DATA EMPTY !</p>  
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
          <!-- to-do -->
          <!-- <div class="col-3">
            <div class="card first">
              <header class="card-header">
                <p class="card-header-title">
                  TO-DO
                </p>
              </header>
              <div class="card-content">
                <div v-if="!isLoadFetchData" class="content">
                  <div class="lds-hourglass"></div>
                </div>
                <div v-if="isLoadFetchData">
                  <div v-if="dataTD.length !== 0">
                    <div class="content" v-for="(data, i) in dataTD"
                      :key="i">
                      <b-collapse
                      aria-id="contentIdForA11y2"
                      class="panel"
                      :open.sync="isOpen">
                        <div
                          slot="trigger"
                          class="panel-heading"
                          role="button"
                          aria-controls="contentIdForA11y2">
                          <strong>
                            {{(data.title).toUpperCase()}}
                          </strong>
                        </div>
                        <div class="panel-block">
                          <p>Points : {{data.point}}                          
                            <br>
                            Assigned To : {{data.assign}}
                            <br>
                            {{data.description}}
                          </p>
                        </div>
                        <a @click.prevent ="updateDoc(data.id, 'back-log')" style="margin-right:5px"> <i class="fas fa-arrow-circle-left"></i></a>
                        <button @click.prevent ="deleteDoc(data.id)" style="margin-left:20px;margin-right:20px"><i class="fas fa-trash"></i> delete</button>
                        <a @click.prevent ="updateDoc(data.id, 'doing')" style="margin-left:5px"> <i class="fas fa-arrow-circle-right"></i></a>
                      </b-collapse>
                    </div>
                  </div>
                  <div v-else>
                    <div class="content">
                      <p>DATA EMPTY !</p>  
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
          <!-- doing -->
          <!-- <div class="col-3">
            <div class="card first">
              <header class="card-header">
                <p class="card-header-title">
                  DOING
                </p>
              </header>
              <div class="card-content">
                <div v-if="!isLoadFetchData" class="content">
                  <div class="lds-hourglass"></div>
                </div>
                <div v-if="isLoadFetchData">
                  <div v-if="dataDG.length !== 0">
                    <div class="content" v-for="(data, i) in dataDG"
                      :key="i">
                      <b-collapse
                      aria-id="contentIdForA11y2"
                      class="panel"
                      :open.sync="isOpen">
                        <div
                          slot="trigger"
                          class="panel-heading"
                          role="button"
                          aria-controls="contentIdForA11y2">
                          <strong>
                            {{(data.title).toUpperCase()}}
                          </strong>
                        </div>
                        <div class="panel-block">
                          <p>Points : {{data.point}}                          
                            <br>
                            Assigned To : {{data.assign}}
                            <br>
                            {{data.description}}
                          </p>
                        </div>
                          <a @click.prevent ="updateDoc(data.id, 'to-do')" style="margin-right:5px"> <i class="fas fa-arrow-circle-left"></i></a>
                        <button @click.prevent ="deleteDoc(data.id)" style="margin-left:20px;margin-right:20px"><i class="fas fa-trash"></i> delete</button>
                        <a @click.prevent ="updateDoc(data.id, 'done')" style="margin-left:5px"> <i class="fas fa-arrow-circle-right"></i></a>
                      </b-collapse>
                    </div>
                  </div>
                  <div v-else>
                    <div class="content">
                      <p>DATA EMPTY !</p>  
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
          <!-- done -->
          <!-- <div class="col-3">
            <div class="card first">
              <header class="card-header">
                <p class="card-header-title">
                  DONE
                </p>
              </header>
              <div class="card-content">
                <div v-if="!isLoadFetchData" class="content">
                  <div class="lds-hourglass"></div>
                </div>
                <div v-if="isLoadFetchData">
                  <div v-if="dataDN.length !== 0" style="padding">
                    <div class="content" v-for="(data, i) in dataDN"
                      :key="i">
                      <b-collapse
                      aria-id="contentIdForA11y2"
                      class="panel"
                      :open.sync="isOpen">
                        <div
                          slot="trigger"
                          class="panel-heading"
                          role="button"
                          aria-controls="contentIdForA11y2">
                          <strong>
                            {{(data.title).toUpperCase()}}
                            </strong>
                        </div>
                        <div class="panel-block">
                          <p>Points : {{data.point}}                          
                            <br>
                            Assigned To : {{data.assign}}
                            <br>
                            {{data.description}}
                          </p>
                        </div>
                        <a @click.prevent ="updateDoc(data.id, 'doing')" style="margin-right:5px"> <i class="fas fa-arrow-circle-left"></i></a>
                        <button @click.prevent ="deleteDoc(data.id)" style="margin-left:20px;margin-right:20px"><i class="fas fa-trash"></i> delete</button>
                      </b-collapse>
                    </div>
                  </div>
                  <div v-else>
                    <div class="content">
                      <p>DATA EMPTY !</p>  
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { mapState } from 'vuex'
import db from '../firebase/firebase'
import card from '../components/card.vue'

export default {
  name: 'home',
  components: {
    // HelloWorld
    card
  },
  data(){
    return {
      error : '',
      titles : ['back-log', 'to-do', 'doing', 'done']
    }
  },
  computed : {
    ...mapState(['allData', 'dataBL', 'dataTD', 'dataDG', 'dataDN', 'isLoadFetchData']),
  },
  mounted(){
    this.$store.dispatch('getAllData')

  },
  methods : {
    deleteDoc(id){
      
      db.collection('kanbans').doc(id).delete()
    },
    updateDoc(value){
      let id = value[0]
      let direction = value[1]
      db.collection('kanbans').doc(id).update({status : direction})
        .then(data => {
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
.hero {
  /* border: 3px solid red; */
  display: flex;
  align-content: flex-start;
  overflow: auto;
}
.columns{
  /* border: 3px solid blue; */
  /* height: 80vh; */
  margin : 5px;
  overflow: auto;
}
.col-3{
  /* border: 1px solid black; */
  height: 100%;
  width: 100%;
  margin: 5px;
  display: flex;
  justify-content: center;
  /* align-content: center; */
  overflow: auto;
  flex-wrap: wrap;
}
.card.first {
  width : 100%;
  background-color: rgba(236, 236, 236, 0.794);
  margin-top: 10px;
  
}
.panel {
  background-color: rgba(255, 255, 255, 0.7);
  
  
}
.card-header p{
  justify-content: center;
}
.panel-block {
  background-color: rgb(122, 97, 128);
  text-align: left;
  justify-content:left;
  color: white;
  overflow: auto;
  
}
/* loader */
.lds-hourglass {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-hourglass:after {
  content: " ";
  display: block;
  border-radius: 50%;
  width: 0;
  height: 0;
  margin: 6px;
  box-sizing: border-box;
  border: 26px solid rgb(1, 250, 237);
  border-color: rgb(1, 250, 237) transparent rgb(1, 250, 237) transparent;
  animation: lds-hourglass 1.2s infinite;
}
@keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
}
.card-content{
  overflow: auto;
  max-height: 75vh;
}

</style>
