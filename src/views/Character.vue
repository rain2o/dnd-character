<template>
  <div class="pt-10 md:px-10 md:py-10">
    <div class="character py-4 max-w-4xl mx-auto md:p-12 md:bg-white md:rounded-lg md:shadow-md">
      <ResetModal :show="showModal" @confirm="resetAnswers" @cancel="showModal = false" />

      <div v-if="scores.length > 0" class="px-4">
        <h1 class="text-2xl font-bold text-red-800 text-center mb-2">
          Welcome adventurer!
        </h1>
        <h2 class="text-lg font-bold text-center mb-4">
          Let's have a look at you...
        </h2>
        <Separator />

        <CharacterSheet :scores="finalScores" />

        <Separator />
        <div class="actions">
          <Button class="mb-4 mx-auto" @click="showModal = true">Reset My Character</Button>
          <p class="text-center">Share coming soon...</p>
        </div>
      </div>

      <NoResults v-else />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { extractAspects } from '@/helpers';
import { Modifier, Scores } from '@/types';
import CharacterSheet from '../components/CharacterSheet.vue';
import NoResults from '../components/NoResults.vue';
import ResetModal from '../components/ResetModal.vue';
import Button from '../components/Button.vue';
import Separator from '../components/Separator.vue';

export default Vue.extend({
  name: 'Character',
  components: {
    CharacterSheet,
    Button,
    NoResults,
    ResetModal,
    Separator,
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
