<template>
  <v-app>
    <Header />
    <Content />
    <Form />
  </v-app>
</template>

<script>
import Header from './components/Header.vue';
import Content from '@/components/Content.vue';
export default {
  name: 'App',
  components: {
    Header,
    Content,
  },
  data(){
    return {
      
    }
  },
};
</script>
