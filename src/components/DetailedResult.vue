<template>
  <div class="detailed-result">
    <p class="font-bold text-xl mb-2">{{ title }}</p>
    <div v-for="result in results" :key="result.key" class="result">
      <p><span class="font-semibold">{{ result.title }}</span> ({{ result.score }})</p>
      <div class="relative pt-1">
        <div
          class="overflow-hidden h-3 mb-4 text-xs flex rounded-lg"
          :class="(result.percentage === 100) ? 'bg-green-200' : 'bg-red-200'"
        >
          <div
            :style="`width: ${result.percentage}%`"
            class="shadow-none flex flex-col text-center whitespace-nowrap text-white
                    justify-center"
            :class="(result.percentage === 100) ? 'bg-green-500' : 'bg-red-500'"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ScoreDetails } from '@/types';
import Vue from 'vue';

export default Vue.extend({
  name: 'DetailedResult',
  props: {
    title: {
      type: String,
      required: true,
    },
    results: {
      type: Array as () => ScoreDetails[],
      required: true,
    },
  },
});
</script>
