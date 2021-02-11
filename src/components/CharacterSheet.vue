<template>
  <div class="character-sheet">
    <p class="text-secondary capitalize text-center mb-1 text-lg font-semibold">
      <span>{{ race }}</span> |
      <span class="text-primary">{{ primaryClass }}</span>
      <span v-if="secondaryClass" class="text-primary">
          / {{ secondaryClass }}
      </span>
    </p>
    <p class="text-secondary capitalize text-center mb-3 text-lg font-semibold">
      Level {{ scores.level }}
    </p>

    <AbilityScores :abilities="scores.abilityScores" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  ClassName,
  Race,
  Scores,
} from '@/types';
import AbilityScores from './AbilityScores.vue';

export default Vue.extend({
  name: 'CharacterSheet',
  components: {
    AbilityScores,
  },
  props: {
    scores: {
      type: Object as () => Scores,
      required: true,
    },
  },
  data() {
    return {
      defaultClass: 'fighter' as ClassName,
      defaultRace: 'human' as Race,
    };
  },
  computed: {
    race(): Race {
      const raceScores = this.scores.races;
      const races = (Object.keys(raceScores) as Race[])
        .filter((race: Race) => raceScores[race] > 0);
      return races.length ? races.reduce(this.raceReducer) : this.defaultRace;
    },
    filteredClasses(): ClassName[] {
      const classes = Object.keys(this.scores.classes) as ClassName[];
      return classes
        .filter((className: ClassName) => this.scores.classes[className] > 0);
    },
    primaryClass(): ClassName {
      const classes = this.filteredClasses;
      return classes.length ? classes.reduce(this.classReducer) : this.defaultClass;
    },
    secondaryClass(): ClassName|null {
      const classes = this.filteredClasses
        .filter((className: ClassName) => className !== this.primaryClass);
      return classes.length ? classes.reduce(this.classReducer) : null;
    },
  },
  methods: {
    classReducer(firstClass: ClassName, secondClass: ClassName) {
      const { classes } = this.scores;
      return classes[firstClass] > classes[secondClass] ? firstClass : secondClass;
    },
    raceReducer(firstRace: Race, secondRace: Race) {
      const { races } = this.scores;
      return races[firstRace] > races[secondRace] ? firstRace : secondRace;
    },
  },
});
</script>
