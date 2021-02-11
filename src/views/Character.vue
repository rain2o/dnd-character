<template>
  <div class="character py-4 max-w-2xl mx-auto">
    <ResetModal :show="showModal" @confirm="resetAnswers" @cancel="showModal = false" />

    <div v-if="scores.length > 0" class="px-4">
      <h1 class="text-2xl font-bold text-primary text-center mb-2">
        Welcome adventurer!
      </h1>
      <h2 class="text-lg font-bold text-secondary text-center mb-4">
        Let's have a look at you...
      </h2>
      <hr class="border border-secondary w-full my-4" />

      <CharacterSheet :scores="finalScores" />

      <hr class="border border-secondary w-full my-4" />
      <div class="actions">
        <button
          class="bg-primary text-background block w-auto py-2 px-4 font-bold text-center
                 mx-auto my-4"
          @click="showModal = true"
        >Reset My Character</button>

        <p class="text-secondary text-center">Share coming soon...</p>
      </div>
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
import ResetModal from '../components/ResetModal.vue';

export default Vue.extend({
  name: 'Character',
  components: {
    CharacterSheet,
    NoResults,
    ResetModal,
  },
  data() {
    return {
      scores: [] as Array<Modifier>[],
      showModal: false,
    };
  },
  computed: {
    finalScores(): Scores {
      const modifiers = this.scores.flat().filter(Boolean);
      return extractAspects(modifiers);
    },
  },
  methods: {
    /**
     * Reset all saved answers
     */
    resetAnswers() {
      localStorage.removeItem('scores');
      this.showModal = false;
      this.scores = [] as Array<Modifier>[];
      // this.$router.push('/');
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
