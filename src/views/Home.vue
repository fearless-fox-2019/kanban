<template>
    <div id="page-container">

        <h1 id="web-title">KAN BAN TE!!!</h1>

        <b-button id="btn-add-board" variant="info" v-b-modal.modal-add-board>Add Board</b-button>

        <div id="board-container">
          <board v-for="board in boards" :key="board.id" :board="board" class="board">
          </board>
        </div>

        <add-board></add-board>
    </div>
</template>

<script>

import { db } from '../main';
import Board from '@/components/Board.vue';
import AddBoard from '@/components/AddBoard.vue';

export default {
  created() {
    db.collection('boards').orderBy('createdAt', 'asc')
      .onSnapshot((querySnapshot) => {
        const newBoard = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          newBoard.push({ id: doc.id, title: data.title, color: data.color });
        });
        this.boards = newBoard;
        console.log(this.boards);
      });
  },
  data() {
    return {
      boards: [],
    };
  },
  name: 'kanban',
  components: {
    Board, AddBoard,
  },
};
</script>

<style scoped>
    #board-container{
      overflow-x: scroll;
      overflow-y: hidden;
      white-space: nowrap;

    }

    .board {
      display: inline-block;
      margin: 20px;
      border: solid gray 2px;
      border-radius: 5px;
    }

    #page-container{
      padding: 1%;
    }

    #web-title{
      font-weight: bolder;
      -webkit-text-stroke: 1px white;
    }
</style>
