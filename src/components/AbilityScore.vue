<template>
  <div class="ability-score">
    <div class="border-secondary border-2 rounded-xl text-center p-1">
      <p class="text-gray-600 mb-2">{{ name }}</p>
      <p class="text-lg font-semibold text-secondary relative -bottom-1">{{ score }}</p>
      <p
        class="text-secondary text-sm border rounded-full border-secondary w-10 mx-auto
              -bottom-4 relative bg-background py-1"
      >
        {{ modifier }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AbilityScore',
  props: {
    name: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
  },
  computed: {
    modifier(): number {
      return Math.floor((this.score - 10) / 2);
    },
  },
});
</script>
