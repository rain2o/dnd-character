<template>
  <div class="character">
    <div v-if="this.scores.length > 0" class="character-details pt-10 px-4">
      <h1 class="text-2xl font-bold text-primary text-center mb-2">
        Welcome adventurer!
      </h1>
      <h2 class="text-lg font-bold text-secondary text-center mb-4">
        Let's have a look at you...
      </h2>

      <hr class="border border-secondary w-full my-4" />

      <p class="character-class text-secondary capitalize text-center mb-3 text-lg font-semibold">
        <span>{{ race }}</span> | <span class="text-primary">{{ primaryClass }}</span>
      </p>
      <AbilityScores :abilities="finalScores.abilityScores" />
    </div>

    <div v-else class="no-results pt-10 px-4">
      <h1 class="text-2xl font-bold text-primary text-center mb-2">
        Looks like that's a natural 1!
      </h1>
      <h2 class="text-lg font-bold text-secondary text-center mb-4">
        We can't find your answers...
      </h2>
      <router-link
        class="bg-primary text-background block mx-auto py-3 font-bold text-center w-auto"
        to="/survey"
      >Take the survey</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { extractAspects } from '@/helpers';
import {
  ClassName,
  Modifier,
  Race,
  Scores,
} from '@/types';
import AbilityScores from '../components/AbilityScores.vue';

export default Vue.extend({
  name: 'Character',
  components: {
    AbilityScores,
  },
  data() {
    return {
      scores: [] as Array<Modifier>[],
      defaultClass: 'fighter' as ClassName,
      defaultRace: 'human' as Race,
    };
  },
  computed: {
    finalScores(): Scores {
      const modifiers = this.scores.flat().filter(Boolean);
      return extractAspects(modifiers);
    },
    race(): Race {
      const raceScores = this.finalScores.races;
      const races = (Object.keys(raceScores) as Race[])
        .filter((race: Race) => raceScores[race] > 0);
      return races.length ? races.reduce(this.raceReducer) : this.defaultRace;
    },
    filteredClasses(): ClassName[] {
      const scores = this.finalScores;
      const classes = Object.keys(scores.classes) as ClassName[];
      return classes
        .filter((className: ClassName) => scores.classes[className] > 0);
    },
    primaryClass(): ClassName {
      const classes = this.filteredClasses;
      return classes.length ? classes.reduce(this.classReducer) : this.defaultClass;
    },
  },
  methods: {
    classReducer(firstClass: ClassName, secondClass: ClassName) {
      const { classes } = this.finalScores;
      return classes[firstClass] > classes[secondClass] ? firstClass : secondClass;
    },
    raceReducer(firstRace: Race, secondRace: Race) {
      const { races } = this.finalScores;
      return races[firstRace] > races[secondRace] ? firstRace : secondRace;
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
