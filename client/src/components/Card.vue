<template>
    <div id="card">
        <div v-for="data in datas" :key="data._id" class="card">
            <header v-if="page == 'backlog'" class="card-header" style="background-color: grey; text-color: yellow;">
                <p class="card-header-title">
                <font color="pink">{{data.title}}</font>
                </p>
            </header>
            <header v-if="page == 'todo'" class="card-header" style="background-color: pink; text-color: yellow;">
                <p class="card-header-title">
                <font color="yellow">{{data.title}}</font>
                </p>
            </header>
            <header v-if="page == 'doing'" class="card-header" style="background-color: Yellow; text-color: blue;">
                <p class="card-header-title">
                <font color="blue">{{data.title}}</font>
                </p>
            </header>
            <header v-if="page == 'done'" class="card-header" style="background-color: white; text-color: pink;">
                <p class="card-header-title">
                <font color="grey">{{data.title}}</font>
                </p>
            </header>
            <div class="card-content">
                <div class="content">
                    <p>Description : </p>
                    <strong>{{data.description}}</strong>
                </div>
            </div>
            <div v-if="page == 'backlog'" style="display: flex; justify-content: space-around;">
                <b-button type="is-danger"
                    outlined
                    @click="deleted(data.id)">
                    <i class="fas fa-trash-alt"></i>
                </b-button>
                <b-button type="is-info"
                    outlined
                    @click="toTodo(data.id)">
                    TODO
                </b-button>
            </div>
            <div v-if="page == 'todo'" style="display: flex; justify-content: space-around;">
                <b-button type="is-dark"
                    outlined
                    @click="toBackLog(data.id)">
                    BACK-LOG
                </b-button>
                <b-button type="is-danger"
                    outlined
                    @click="deleted(data.id)">
                    <i class="fas fa-trash-alt"></i>
                </b-button>
                <b-button type="is-warning"
                    outlined
                    @click="toDoing(data.id)">
                    DOING
                </b-button>
            </div>
             <div v-if="page == 'doing'" style="display: flex; justify-content: space-around;">
                <b-button type="is-info"
                    outlined
                    @click="toDone(data.id)">
                    TODO
                </b-button>
                <b-button type="is-danger"
                    outlined
                    @click="deleted(data.id)">
                    <i class="fas fa-trash-alt"></i>
                </b-button>
                <b-button type="is-success"
                    outlined
                    @click="toDone(data.id)">
                    DONE
                </b-button>
            </div>
             <div v-if="page == 'done'" style="display: flex; justify-content: space-around;">
                <b-button type="is-dark"
                    outlined
                    @click="toDoing(data.id)">
                    DOING
                </b-button>
                <b-button type="is-danger"
                    outlined
                    @click="deleted(data.id)">
                    <i class="fas fa-trash-alt"></i>
                </b-button>
                <b-button type="is-dark"
                    outlined
                    @click="toBackLog(data.id)">
                    BACK-LOG
                </b-button>
            </div>
            <br>
        </div>
    </div>
</template>

<script>
import db from '../../apis/firebase.js'
export default {
    props: ['datas', 'page'],
    methods:{
        deleted(id){
            console.log('masuk delete')
            console.log(id)
            db.collection("todos")
            .doc(id)
            .delete()
            .then(function() {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
        },
        toBackLog(id){
            console.log(this.addTodo, 'ini')
            let data = {}
            const docRef = db.collection("todos").doc(id);
            docRef.get().then(function(doc) {
                console.log("Document data:", doc.data());
                let dt = doc.data()
                data = {
                    title: dt.title,
                    description: dt.description,
                    status: 'backlog'
                }
                db.collection("todos")
                .doc(id)
                .delete()
                .then(function() {
                    console.log("Document successfully deleted!");
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
                db.collection("todos")
                .add(data)
                .then(function(docRef) {
                    console.log(docRef)
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        },
        toTodo(id){
            let data = {}
            const docRef = db.collection("todos").doc(id);
            docRef.get().then(function(doc) {
                console.log("Document data:", doc.data());
                let dt = doc.data()
                data = {
                    title: dt.title,
                    description: dt.description,
                    status: 'todo'
                }
                db.collection("todos")
                .doc(id)
                .delete()
                .then(function() {
                    console.log("Document successfully deleted!");
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
                db.collection("todos")
                .add(data)
                .then(function(docRef) {
                    console.log(docRef)
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        },
        toDoing(id){
            let data = {}
            const docRef = db.collection("todos").doc(id);
            docRef.get().then(function(doc) {
                console.log("Document data:", doc.data());
                let dt = doc.data()
                data = {
                    title: dt.title,
                    description: dt.description,
                    status: 'doing'
                }
                db.collection("todos")
                .doc(id)
                .delete()
                .then(function() {
                    console.log("Document successfully deleted!");
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
                db.collection("todos")
                .add(data)
                .then(function(docRef) {
                    console.log(docRef)
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        },
        toDone(id){
            let data = {}
            const docRef = db.collection("todos").doc(id);
            docRef.get().then(function(doc) {
                console.log("Document data:", doc.data());
                let dt = doc.data()
                data = {
                    title: dt.title,
                    description: dt.description,
                    status: 'done'
                }
                db.collection("todos")
                .doc(id)
                .delete()
                .then(function() {
                    console.log("Document successfully deleted!");
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
                db.collection("todos")
                .add(data)
                .then(function(docRef) {
                    console.log(docRef)
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        },
    }
}
</script>

<style scoped>
    .card{
        /* background-color: pink; */
        border-color:pink;
        border: none;
    }

</style>
