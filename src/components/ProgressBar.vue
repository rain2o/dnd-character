<template>
  <div class="w-full bg-background sticky top-0 overflow-hidden h-5 shadow">
    <div
      class="h-full w-full progress-bar text-center"
      :style="barStyle"
    >
      <div class="text-sm font-bold text-primary percentage">
        {{ percentage }}%
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ProgressBar',
  props: {
    percentage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    barStyle() {
      const color = `var(--color-primary) ${this.percentage}%`;
      return `background: linear-gradient(to right, ${color}, var(--color-background) 0);`;
    },
  },
});
</script>

<style scoped>
.progress-bar {
  transition: width 0.25s ease;
}
.percentage {
  filter: invert(1);
  mix-blend-mode: difference;
}
</style>
