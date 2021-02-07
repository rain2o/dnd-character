<template>
  <div id="app" class="bg-background text-secondary relative">
    <router-view/>
  </div>
</template>

<!-- script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Survey from './components/Survey.vue';
import '@/assets/css/tailwind.css';

@Component({
  components: {
    Survey,
  },
})
export default class App extends Vue {}
</script-->

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
