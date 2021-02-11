<template>
  <div class="character">
    <div v-if="scores.length > 0" class="pt-10 px-4">
      <h1 class="text-2xl font-bold text-primary text-center mb-2">
        Welcome adventurer!
      </h1>
      <h2 class="text-lg font-bold text-secondary text-center mb-4">
        Let's have a look at you...
      </h2>
      <hr class="border border-secondary w-full my-4" />

      <CharacterSheet :scores="finalScores" />
    </div>

    <NoResults v-else />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { extractAspects } from '@/helpers';
import { Modifier, Scores } from '@/types';
import CharacterSheet from '../components/CharacterSheet.vue';
import NoResults from '../components/NoResults.vue';

export default Vue.extend({
  name: 'Character',
  components: {
    CharacterSheet,
    NoResults,
  },
  data() {
    return {
      scores: [] as Array<Modifier>[],
    };
  },
  computed: {
    finalScores(): Scores {
      const modifiers = this.scores.flat().filter(Boolean);
      return extractAspects(modifiers);
    },
  },
  beforeMount() {
    // load saved scores if there are any
    const savedScores = localStorage.getItem('scores');
    if (savedScores) {
      try {
        this.scores = JSON.parse(savedScores) as Array<Modifier>[];
      } catch (e) {
        // invalid data, remove it
        localStorage.removeItem('scores');
      }
    }
  },
});
</script>
