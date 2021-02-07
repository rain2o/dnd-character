<template>
  <div class="character">
    <div class="ability-scores" v-if="abilityScores">
      <p v-for="score in abilityScores" :key="score.key">
        {{ score.label }}: {{ score.score }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import {
  AbilityScore,
  ResultScore,
  Scores,
} from '@/types';
import Vue from 'vue';

export default Vue.extend({
  name: 'Character',
  props: {
    scores: {
      type: Object as () => Scores,
      required: true,
    },
  },
  computed: {
    abilityScores(): ResultScore[] {
      const { abilityScores } = this.scores;
      const abilityScoreKeys = Object.keys(abilityScores) as AbilityScore[];
      return abilityScoreKeys.map((key) => ({
        key,
        score: abilityScores[key],
        label: key.toUpperCase(),
      }));
    },
  },
});
</script>
