<template>
  <div class="no-results pt-5 px-4">
    <h1 class="text-2xl font-bold text-red-800 text-center mb-2">
      Looks like that's a natural 1!
    </h1>
    <h2 class="text-lg font-bold text-center mb-4">
      We can't find your answers...
    </h2>
    <Button link="/survey" class="mx-auto">Take the survey</Button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Button from './Button.vue';

export default Vue.extend({
  name: 'NoResults',
  components: {
    Button,
  },
});
</script>
