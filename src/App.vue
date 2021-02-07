<template>
  <div id="app">
    <Survey />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Survey from './components/Survey.vue';
import '@/assets/css/tailwind.css';

@Component({
  components: {
    Survey,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
