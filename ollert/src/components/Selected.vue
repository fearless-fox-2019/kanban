<template>
  <div class="box details">
    <h1>{{selected.title}}</h1>
    <div class="details-task">
      <p>{{selected.descriptions}}</p>
      <div class="columns is-multiline">
        <div class="column is-8">
          <div class="assignee-detail">
            <p style="font-size: 12px;"><strong>Assign To :</strong></p>
            <p style="margin-top: 0; padding-bottom: 5px;">{{selected.assignee}}</p>
          </div>
        </div>
        <div class="column is-2">
          <div class="tags">
            <b-tag
              rounded
              type="is-info"
              size="is-medium"
              style="text-transform: capitalize">
              On : {{selected.progress}}'s Card
            </b-tag>
          </div>
        </div>
      </div>
    </div>
    <div class="control-task">
      <button @click.prevent="deleteArticle" class="button is-danger">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  props : ['selected'],
  methods : {
    deleteArticle() {
      this.$emit('deleted', this.selected.id)
      this.$notification.open({
        duration: 2000,
        message: `Task Deleted`,
        position: 'is-top-right',
        type: 'is-success',
        hasIcon: true
      })
    }
  }
}
</script>

<style>

  .box.details {
    padding: 2.5vh 2.5vw;
  }
  .box.details h1 {
    font-weight: 600;
    font-size: 2.25em;
    text-align: start
  }

  .box.details p {
    margin-top: 1.5vh;
    font-size: 1.25em;
    text-align: start
  }

  .assignee-detail {
    margin: 15px 0;
    padding: 5px 17.5px;
    background-color: #E5EFF5;
    border-radius: 5px;
  }

  .tags {
    margin: 15px 0;
  }
</style>
