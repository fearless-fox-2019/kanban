<template>
    <div>
        <div v-if="show" class="tile is-ancestor">
            <div class="tile is-parent">
                <article class="tile is-child box">
                    <b-field label="Title :">
                        <b-input placeholder="Input Title" v-model="title" maxlength="15"></b-input>
                    </b-field>
                    <b-field label="Assigned To :">
                        <b-input placeholder="Assign this task" v-model="assign" maxlength="10"></b-input>
                    </b-field>
                </article>
            </div>
            <div class="tile is-parent">
                <article class="tile is-child box">
                    <b-field label="Description"
                        :label-position="labelPosition">
                        <b-input v-model="description" placeholder="Specify the task" maxlength="20" type="textarea"></b-input>
                    </b-field>
                </article>
            </div>
        </div>
        <div class="tile is-parent" style="display: inline-block">
            <b-button v-if="!show" @click="showForm" type="is-info" style="width: 100%; margin-top: -2%; margin-bottom: 2%;">Add Task</b-button>
        </div>
        <div class="tile is-parent">
            <b-button v-if="show" @click="addTask" type="is-success" style="width: 100%; margin-top: -2%; margin-bottom: 2%;">Add Task</b-button>
        </div>
        <div class="tile is-parent">
            <b-button v-if="show" @click="hideForm" type="is-danger" style="width: 100%; margin-top: -2%; margin-bottom: 2%;">Cancel</b-button>
        </div>
    </div>
</template>
<script>
    import db from '../config/firebase'
    export default {
        data() {
            return {
                show: false,
                title: '',
                description: '',
                assign: ''
            }
        },
        methods: {
            addTask() {
                db.collection("tasks").add({
                    title: this.title,
                    description: this.description,
                    status: 0,
                    assign: this.assign
                })
                .then(function(docRef) {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
                this.title = ''
                this.description = ''
                this. assign = ''
                this.show = false
            },
            showForm(){
                this.show = true
            },
            hideForm(){
                this.show = false
            }
        }
    }
</script>