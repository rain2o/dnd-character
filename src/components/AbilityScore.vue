<template>
  <div class="ability-score">
    <div
      class="border-red-700 border-2 rounded-xl text-center p-1 bg-white
            md:bg-red-50 shadow-sm"
    >
      <p class="mb-2">{{ name }}</p>
      <p class="text-lg font-semibold relative -bottom-1">{{ score }}</p>
      <p
        class="text-sm border rounded-full border-red-700 w-10 mx-auto
              -bottom-4 relative bg-white md:bg-red-100 py-1 shadow-sm"
        :class="modifier < 0 ? 'text-red-700' : ''"
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
