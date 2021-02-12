<template>
  <div class="details text-secondary font-medium">
    <p class="text-red-800 text-lg font-semibold mb-2">{{ name }}</p>
    <span class="font-semibold">{{ stat.name }}</span> - {{ stat.details }}
  </div>
</template>

<script lang="ts">
import { Details } from '@/types';
import Vue from 'vue';

export default Vue.extend({
  name: 'StatDetails',
  props: {
    name: {
      type: String,
      required: true,
    },
    stat: {
      type: Object as () => Details,
      required: true,
    },
  },
});
</script>
