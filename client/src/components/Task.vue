<template>
    <v-layout column align-center class="my-2">
        <v-card class="my-2" v-for="task in tasks" :key="task.id">
            <v-card-title :class="color" class="text-uppercase font-weight-bold">{{task.title}}</v-card-title>
            <v-card-text>
                <p>Assigned to <span class="text-uppercase font-weight-bold">{{task.assigned_to}}</span></p>
                <p>Points {{task.points}}</p>
            </v-card-text>
            <v-card-actions class="py-2">
                <Modal 
                :details="task" 
                @statusWasChanged="changeStatus"
                 />
            </v-card-actions>
        </v-card>
    </v-layout>
</template>

<script>
import Modal from '@/components/Modal.vue'
import db from '../../apis/firebase'
export default {
    props: ['tasks'],
    data() {
        return {
            color: ''
        }
    },
    methods: {
        getColor() {
            this.tasks.forEach(task => {
                if (task.status === "back_log") {
                    this.color = "body-2 red lighten-3"
                }else if (task.status === "todo") {
                    this.color = "body-2 orange lighten-3"
                }else if (task.status === "doing") {
                    this.color = "body-2 primary lighten-3"
                }else {
                    this.color = "body-2 success lighten-3"
                }
            })
        },
        changeStatus(data) {
            let [id, status] = data
            console.log(status)
            db.collection('Tasks')
                .doc(id)
                .update({
                    status
                })
                .then(success => {
                    console.log(success)
                })
                .catch(console.log)
        }
    },
    updated: function() {
        this.getColor()
    },
    components: {
        Modal
    }
}
</script>

<style>

</style>
