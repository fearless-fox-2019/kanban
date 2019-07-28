<template>
    <div>
        <b-modal :id="'confirm-'+id" :title="info.title" @ok="sendConfirmation">
            <p class="my-4">{{ info.message }}</p>
        </b-modal>
    </div>
</template>

<script>
export default {
  props: ['id', 'info'],
  created() {
  },
  methods: {
    sendConfirmation() {
      this.$emit('execute');
    },
  },
};
</script>

<style>

</style>
