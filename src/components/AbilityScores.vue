<template>
  <div
  class="flex flex-wrap justify-evenly">
    <AbilityScore
      name="Strength"
      :score="abilities.strength"
      class="w-1/3 md:w-1/6 p-1 mb-3"
    />
    <AbilityScore
      name="Dexterity"
      :score="abilities.dexterity"
      class="w-1/3 md:w-1/6 p-1 mb-3"
    />
    <AbilityScore
      name="Constitution"
      :score="abilities.constitution"
      class="w-1/3 md:w-1/6 p-1 mb-3"
    />
    <AbilityScore
      name="Intelligence"
      :score="abilities.intelligence"
      class="w-1/3 md:w-1/6 p-1 mb-3"
    />
    <AbilityScore
      name="Wisdom"
      :score="abilities.wisdom"
      class="w-1/3 md:w-1/6 p-1 mb-3"
    />
    <AbilityScore
      name="Charisma"
      :score="abilities.charisma"
      class="w-1/3 md:w-1/6 p-1 mb-3"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { AbilityScoreScores } from '@/types';
import AbilityScore from './AbilityScore.vue';

export default Vue.extend({
  name: 'AbilityScores',
  components: {
    AbilityScore,
  },
  props: {
    abilities: {
      type: Object as () => AbilityScoreScores,
      required: true,
    },
  },
});
</script>
