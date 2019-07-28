<template>
    <div>
        <div class="columns">
            <div class="column is-3">
                <div class="form-center" style="position: fixed;">
                    <img src="../assets/kanbann.png" alt="KANBAN" width="500" height="500">
                </div>
                <div class="form-center" style="position: fixed; padding-top: 200px; padding-left: 30px;">
                    <button @click="page = 'fill'" type="button" class="button is-warning">Add New Task</button>
                </div>
                <div v-if="page == 'fill'" class="form-center" style="padding-top: 250px; position: fixed; padding-left: 30px;">
                    <form>
                        <b-field label="Title">
                            <b-input maxlength="200" type="text" v-model="addTodo.title"></b-input>
                        </b-field>
                        <b-field label="Description">
                            <b-input maxlength="200" type="textarea" v-model="addTodo.description"></b-input>
                        </b-field>
                        <br><br>
                        <div style="display: flex; justify-content: space-around;">
                            <b-button type="is-danger"
                                outlined
                                @click="addData">
                                <i class="fas fa-trash-alt">plus</i>
                            </b-button>
                            <b-button type="is-primary"
                                style="padding-left: 5px;"
                                outlined
                                @click="page = ''">
                                close
                            </b-button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="column is-9 offset" style="padding-top: 200px;">
                <div class="container offset">
                    <div class="columns">
                        <div class="column is-3">
                            <Basekanban :pagecard="'BACK-LOG'" :data="backlog" :page="'backlog'"></Basekanban>
                        </div>
                        <div class="column is-3">
                            <Basekanban :pagecard="'TODO'" :data="todos" :page="'todo'"></Basekanban>
                        </div>
                        <div class="column is-3">
                            <Basekanban :pagecard="'DOING'" :data="doing" :page="'doing'"></Basekanban>
                        </div>
                        <div class="column is-3">
                            <Basekanban :pagecard="'DONE'" :data="done" :page="'done'"></Basekanban>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import db from '../../apis/firebase.js'

import Basekanban from '@/components/LongCard.vue'
import Card from '@/components/Card.vue'
import img from '@/assets/kanban.png'

export default {
    data(){
        return {
            fl: '',
            data: [],
            page: '',
            addTodo: {
                title: '',
                description: '',
                status: '',
                date: new Date()
            },
            todos: [],
            backlog: [],
            doing: [],
            done: [],
            query: []
        }
    },
    components:{
        Basekanban, img
    },
    created () {
        db.collection('todos')
        .onSnapshot(querySnapshot =>{
            let todos = []
            let backlog = []
            let doing = []
            let done = []
            querySnapshot.forEach((doc) => {
                const dt = doc.data()
                const data = {
                    id: doc.id,
                    title: dt.title,
                    description: dt.description,
                    status: dt.status
                }
                if(dt.status == 'todo'){
                    todos.push(data)
                }else if(dt.status == 'backlog' || dt.status == ''){
                    backlog.push(data)
                }else if(dt.status == 'doing'){
                    doing.push(data)
                }else if(dt.status == 'done'){
                    done.push(data)
                }
            })
            this.backlog = backlog
            this.todos = todos
            this.doing = doing
            this.done = done
        })
    },
    methods: {
        fi(val){
            console.log('masuk button new task')
            this.fl = val
        },
        addData(){
            db.collection("todos")
            .add(this.addTodo)
            .then(function(docRef) {
                console.log(docRef)
                console.log("Document written with ID: ", docRef.id);
                this.addTodo.title = ''
                this.addTodo.description = ''
                this.addTodo.status = ''
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        }
    }
}
</script>

<style >
 .form-center{
     display: flex;
     align-items: center;
     justify-content: center;
 }
</style>
