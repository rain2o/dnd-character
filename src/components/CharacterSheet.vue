<template>
  <div class="character-sheet">
    <div
      class="flex mx-auto w-auto justify-around align-middle items-center"
      :class="secondaryClass ? 'flex-col sm:flex-row' : 'flex-row'"
    >
      <div class="text-center">
        <p class="capitalize text-center mb-1 text-lg font-semibold lg:inline-block">
          {{ alignmentDetails[character.alignment].name }}
        </p>
        <p class="capitalize text-center mb-1 text-lg font-semibold lg:inline-block lg:ml-2 lg:pl-2
                  lg:border-l-2 lg:border-black">
          Level {{ character.level }}
        </p>
        <p class="capitalize text-center mb-3 text-lg font-semibold">
          <span>{{ character.race }}</span> |
          <span class="text-red-800">{{ primaryClass }}</span>
          <span v-if="secondaryClass" class="text-red-800">
              / {{ secondaryClass }}
          </span>
        </p>
      </div>

      <!-- Show both class icons if secondary class exists -->
      <div v-if="secondaryClass" class="flex justify-evenly mb-4">
        <SvgIcon :name="primaryClass" class="w-16 h-16 text-red-800 lg:mt-2 lg:mb-6 mx-2" />
        <SvgIcon
          v-if="secondaryClass"
          :name="secondaryClass"
          class="w-16 h-16 text-red-800 lg:mt-2 lg:mb-6 mx-2"
        />
      </div>
      <SvgIcon v-else :name="primaryClass" class="w-16 h-16 text-red-800 lg:mt-2 lg:mb-6" />
    </div>

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
import SvgIcon from './SvgIcon.vue';
import Separator from './Separator.vue';
import StatDetails from './StatDetails.vue';

export default Vue.extend({
  name: 'CharacterSheet',
  components: {
    AbilityScores,
    SvgIcon,
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
