<template>
  <div class="no-results pt-5 px-4">
    <h1 class="text-2xl font-bold text-primary text-center mb-2">
      Looks like that's a natural 1!
    </h1>
    <h2 class="text-lg font-bold text-secondary text-center mb-4">
      We can't find your answers...
    </h2>
    <router-link
      class="bg-primary text-background block mx-auto py-3 font-bold text-center w-auto"
      to="/survey"
    >Take the survey</router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'NoResults',
});
</script>
