<template>
    <div class="header">
        <v-toolbar flat height="50" class="cyan lighten-4">
            <v-toolbar-title class="light-blue--text text--darken-3 display-1">kanban</v-toolbar-title>
            <v-spacer></v-spacer>
            <Form />
        </v-toolbar>
    </div>
</template>

<script>
import Form from '@/components/Form.vue'
export default {
    components: {
        Form
    }
}
</script>

<style>

</style>
