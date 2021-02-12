<template>
  <div class="character-sheet">
    <p class="capitalize text-center mb-1 text-lg font-semibold">
      {{ alignmentDetails[character.alignment].name }}
    </p>
    <p class="capitalize text-center mb-1 text-lg font-semibold">
      Level {{ character.level }}
    </p>
    <p class="capitalize text-center mb-3 text-lg font-semibold">
      <span>{{ character.race }}</span> |
      <span class="text-red-800">{{ primaryClass }}</span>
      <span v-if="secondaryClass" class="text-red-800">
          / {{ secondaryClass }}
      </span>
    </p>

    <AbilityScores :abilities="character.abilityScores" />

    <Separator />
    <StatDetails name="Alignment" :stat="alignmentDetails[character.alignment]" />
    <Separator />
    <StatDetails name="Race" :stat="raceDetails[character.race]" />
    <Separator />
    <StatDetails name="Class" :stat="classDetails[primaryClass]" />
    <template v-if="secondaryClass">
      <Separator />
      <StatDetails name="Secondary Class" :stat="classDetails[secondaryClass]" />
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Alignment,
  Character,
  ClassName,
  Details,
  Race,
} from '@/types';
import {
  alignment as alignmentDetails,
  race as raceDetails,
  class as classDetails,
} from '../details.json';
import AbilityScores from './AbilityScores.vue';
import Separator from './Separator.vue';
import StatDetails from './StatDetails.vue';

export default Vue.extend({
  name: 'CharacterSheet',
  components: {
    AbilityScores,
    Separator,
    StatDetails,
  },
  props: {
    character: {
      type: Object as () => Character,
      required: true,
    },
  },
  data() {
    return {
      alignmentDetails: alignmentDetails as {
        [key in Alignment]: Details
      },
      raceDetails: raceDetails as {
        [key in Race]: Details
      },
      classDetails: classDetails as {
        [key in ClassName]: Details
      },
    };
  },
  computed: {
    primaryClass(): ClassName {
      return this.character.class[0];
    },
    secondaryClass(): ClassName|null {
      const characterClass = this.character.class;
      return characterClass.length > 1 ? characterClass[1] : null;
    },
  },
});
</script>
