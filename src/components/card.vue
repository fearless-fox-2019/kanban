<template>
  <div class="card first">
    <header class="card-header">
      <p class="card-header-title">{{title.toUpperCase()}}</p>
    </header>
    <div class="card-content">
      <div v-if="!isLoadFetchData" class="content">
        <div class="lds-hourglass"></div>
      </div>
      <div v-if="isLoadFetchData">
        <div v-if="datas.length !== 0">
          <div class="content" v-for="(data, i) in datas" :key="i">
            <b-collapse aria-id="contentIdForA11y2" class="panel" :open.sync="isOpen">
              <div
                slot="trigger"
                class="panel-heading"
                role="button"
                aria-controls="contentIdForA11y2"
              >
                <strong>{{(data.title).toUpperCase()}}</strong>
              </div>
              <div class="panel-block">
                <p>
                  Points : {{data.point}}
                  <br />
                  Assigned To : {{data.assign}}
                  <br />
                  {{data.description}}
                </p>
              </div>
              <a v-if="title === 'to-do'" @click.prevent="updateDoc(data.id, 'back-log')" style="margin-right:5px">
                <i class="fas fa-arrow-circle-left"></i>
              </a>
              <a v-if="title === 'doing'" @click.prevent="updateDoc(data.id, 'to-do')" style="margin-right:5px">
                <i class="fas fa-arrow-circle-left"></i>
              </a>
              <a v-if="title === 'done'" @click.prevent="updateDoc(data.id, 'doing')" style="margin-right:5px">
                <i class="fas fa-arrow-circle-left"></i>
              </a>
              <button
                @click.prevent="deleteDoc(data.id)"
                style="margin-left:20px;margin-right:20px"
              >
                <i class="fas fa-trash"></i> delete
              </button>
              <a v-if="title === 'back-log'" @click.prevent="updateDoc(data.id, 'to-do')" style="margin-left:5px">
                <i class="fas fa-arrow-circle-right"></i>
              </a>
              <a v-if="title === 'to-do'" @click.prevent="updateDoc(data.id, 'doing')" style="margin-left:5px">
                <i class="fas fa-arrow-circle-right"></i>
              </a>
              <a v-if="title === 'doing'" @click.prevent="updateDoc(data.id, 'done')" style="margin-left:5px">
                <i class="fas fa-arrow-circle-right"></i>
              </a>
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
</template>

<script>
import { mapState } from 'vuex';
export default {
  props: ["title", "datas"],
  computed: {
    ...mapState(['isLoadFetchData'])
  },
  methods: {
    updateDoc(id, direction){
      this.$emit('updateDoc', [id, direction])
    },
    deleteDoc(id){
      this.$emit('updateDoc', id)
    }
  }
};
</script>

<style>
</style>
