<template>
    <v-container class="my-5">
        <v-layout row justify-space-between>
            <v-flex xs12 sm12 md3>
                <v-card width="80%" class="pb-2">
                    <v-card-title center class="red">Back-log</v-card-title>
                    <Task :tasks="task.back_log"/>
                </v-card>
            </v-flex>
            <v-flex xs12 sm12 md3>
                <v-card width="80%" class="pb-2">
                    <v-card-title class="orange">Todo</v-card-title>
                    <Task :tasks="task.todo"/>
                </v-card>
            </v-flex>
            <v-flex xs12 sm12 md3>
                <v-card width="80%" class="pb-2">
                    <v-card-title class="primary">Doing</v-card-title>
                    <Task :tasks="task.doing"/>
                </v-card>
            </v-flex>
            <v-flex xs12 sm12 md3>
                <v-card width="80%" class="pb-2">
                    <v-card-title class="success">Done</v-card-title>
                    <Task :tasks="task.done"/>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import db from '../../apis/firebase'
import Task from '@/components/Task.vue'
export default {
    data(){
        return {
            task: {
                back_log: [],
                todo: [],
                doing: [],
                done: []
            }
        }
    },
    methods: {
        getTask(){
            db
                .collection('Tasks')
                .onSnapshot((snapshot) => {
                    let temp = []
                    snapshot.forEach(task => {
                        let newTask = {
                            id: task.id,
                            ...task.data()
                        }
                        temp.push(newTask)
                    })

                    this.task.back_log = temp.filter(task => task.status === 'back_log')
                    this.task.todo = temp.filter(task => task.status === 'todo')
                    this.task.doing = temp.filter(task => task.status === 'doing')
                    this.task.done = temp.filter(task => task.status === 'done')
                })
        }
    },
    created: function() {
        this.getTask()
    },
    components: {
        Task
    }
}
</script>

<style>

</style>
