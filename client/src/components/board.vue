<template>
    <div class="is-parent" style="max-height: 490px; overflow: scroll; margin-left: 2%; margin-right: 2%; max-width: 100%; width: 25%">
        <article class="tile is-child box" style="max-height: 450px; overflow: scroll;" :style="color">
            <p class="title" style="text-align: center;">{{title}}</p>
            <hr>
            <card v-for="todo in task" :key="todo.id" :data="todo" />
        </article>
    </div>
</template>

<script>
import Card from './card'
export default {
  name: 'board',
  components: {
    Card
  },
  data () {
    return {
      color: `background-color: ${this.bgcolor}`
    }
  },
  props: ['title', 'task', 'bgcolor']
}
</script>

<style>
</style>
