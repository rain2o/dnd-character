<template>
  <div id="app" class="bg-background text-secondary relative">
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
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
