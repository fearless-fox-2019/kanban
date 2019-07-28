<template>
    <div class="card">
        <header v-if="pagecard == 'BACK-LOG'" class="card-header" style="background-color: grey; text-color: yellow;">
            <p class="card-header-title"><font color="pink">{{pagecard}}</font></p>
        </header>
        <header v-if="pagecard == 'TODO'" class="card-header" style="background-color: pink; text-color: yellow">
            <p class="card-header-title"><font color="yellow">{{pagecard}}</font></p>
        </header>
        <header v-if="pagecard == 'DOING'" class="card-header" style="background-color: Yellow; text-color: blue">
            <p class="card-header-title"><font color="blue">{{pagecard}}</font></p>
        </header>
        <header v-if="pagecard == 'DONE'" class="card-header" style="background-color: white; text-color: pink">
            <p class="card-header-title"><font color="grey">{{pagecard}}</font></p>
        </header>
        <div class="card-content" style="padding-bottom: 20px; position: relative;">
            <div class="content" >
                <Card :page="page" :datas="data"></Card>
            </div>
        </div>
    </div>
</template>

<script>
import Card from '@/components/Card.vue'
export default {
    props: ['data','pagecard', 'page'],
    components: {Card},
    methods:{
    }
}
</script>

<style scoped>
    .card{
        background-color: transparent;
    }
</style>
