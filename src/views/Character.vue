<template>
  <div class="pt-10 md:px-10 md:py-10">
    <div class="character py-4 max-w-4xl mx-auto md:p-12 md:bg-white md:rounded-lg md:shadow-md">
      <ResetModal :show="showModal" @confirm="resetAnswers" @cancel="showModal = false" />

      <div v-if="scores.length > 0" class="px-2 sm:px-4">
        <h1 class="text-2xl font-bold text-red-800 text-center mb-2">
          Welcome adventurer!
        </h1>
        <h2 class="text-lg font-bold text-center mb-4">
          Let's have a look at you...
        </h2>
        <Separator />

        <CharacterSheet :character="character" />

        <Separator />
        <DetailedResults :scores="finalScores" :character="character" />

        <Separator />
        <Share :character="character" />
        <div class="actions mt-4">
          <Button class="mb-4 mx-auto" @click="showModal = true">Reset My Character</Button>
        </div>
      </div>

      <NoResults v-else />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { extractScores } from '@/helpers/scores';
import { buildCharacter } from '@/helpers/character';
import analytics from '@/helpers/analytics';
import { Character, Modifier, Scores } from '@/types';
import splitbee from '@splitbee/web';
import CharacterSheet from '../components/CharacterSheet.vue';
import DetailedResults from '../components/DetailedResults.vue';
import NoResults from '../components/NoResults.vue';
import ResetModal from '../components/ResetModal.vue';
import Button from '../components/Button.vue';
import Separator from '../components/Separator.vue';
import Share from '../components/Share.vue';

export default Vue.extend({
  name: 'Character',
  components: {
    CharacterSheet,
    DetailedResults,
    Button,
    NoResults,
    ResetModal,
    Separator,
    Share,
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
      return extractScores(modifiers);
    },
    character(): Character {
      return buildCharacter(this.finalScores);
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
  mounted() {
    // check if we have already sent this result
    if (this.scores) {
      const dispatched = localStorage.getItem('is-dispatched');
      if (dispatched === null) {
        // track all in a single event
        splitbee.track('Character', {
          race: this.character.race,
          class: this.character.class.join('/'),
          alignment: this.character.alignment,
        });

        // and track in separate events
        splitbee.track('Race', {
          value: this.character.race,
        });
        analytics({
          t: 'event',
          ec: 'Race',
          el: this.character.race,
          ea: 'character',
          ni: '1',
        });
        this.character.class.forEach((className) => {
          // eslint-disable-next-line no-undef
          splitbee.track('Class', {
            value: className,
          });
          analytics({
            t: 'event',
            ec: 'Class',
            el: className,
            ea: 'character',
            ni: '1',
          });
        });
        splitbee.track('Alignment', {
          value: this.character.alignment,
        });
        analytics({
          t: 'event',
          ec: 'Alignment',
          el: this.character.alignment,
          ea: 'character',
          ni: '1',
        });
        localStorage.setItem('is-dispatched', 'true');
      }
    }
  },
  metaInfo: {
    title: 'My Character | D&D & Me',
    meta: [
      { property: 'og:title', content: 'My Character | D&D & Me' },
      { property: 'twitter:title', content: 'My Character | D&D & Me' },
    ],
  },
});
</script>
