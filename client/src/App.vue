<template>
<v-app>
  <NavBar></NavBar>
   <router-view>

   </router-view>
</v-app>

</template>

<script>
import HelloWorld from './components/HelloWorld'
import NavBar from './components/NavBar'

export default {
  name: 'App',
  components: {
    HelloWorld,
    NavBar
  },
  data: () => ({
    //
  })
}
</script>
