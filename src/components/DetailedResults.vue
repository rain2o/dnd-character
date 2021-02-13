<template>
  <div class="detailed-results">
    <p
      class="text-red-800 text-2xl font-bold mb-4 cursor-pointer flex items-center"
      @click="isContentVisible = !isContentVisible"
    >
      <span>Detailed Results</span>
      <SvgIcon
        name="cheveron-down"
        class="w-10 h-10 inline-block transform transition ease-linear duration-100"
        :class="isContentVisible ? 'rotate-180' : ''"
      />
    </p>

    <div v-show="isContentVisible">
      <DetailedResult title="Alignment" :results="alignments" />
      <div class="w-2/3 mx-auto py-2"><Separator /></div>
      <DetailedResult title="Race" :results="races" />
      <div class="w-2/3 mx-auto py-2"><Separator /></div>
      <DetailedResult title="Class" :results="classes" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Alignment,
  Character,
  ClassName,
  Race,
  ScoreDetails,
  Scores,
  Stat,
  StatDetails,
  StatScores,
} from '@/types';
import {
  alignment as alignmentDetails,
  race as raceDetails,
  class as classDetails,
} from '../details.json';
import DetailedResult from './DetailedResult.vue';
import Separator from './Separator.vue';
import SvgIcon from './SvgIcon.vue';

const statDetails: StatDetails = {
  ...alignmentDetails,
  ...raceDetails,
  ...classDetails,
};

export default Vue.extend({
  name: 'DetailedResults',
  components: {
    DetailedResult,
    Separator,
    SvgIcon,
  },
  props: {
    scores: {
      type: Object as () => Scores,
      required: true,
    },
    character: {
      type: Object as () => Character,
      required: true,
    },
  },
  data() {
    return {
      isContentVisible: false,
    };
  },
  computed: {
    alignments(): ScoreDetails[] {
      const { alignments } = this.scores;
      const alignmentScore = alignments[this.character.alignment];
      const alignmentKeys = Object.keys(alignments) as Alignment[];
      return this.mapDetails(alignments, alignmentKeys, alignmentScore);
    },
    races(): ScoreDetails[] {
      const { races } = this.scores;
      const raceScore = races[this.character.race];
      const raceNames = Object.keys(races) as Race[];
      return this.mapDetails(races, raceNames, raceScore);
    },
    classes(): ScoreDetails[] {
      const { classes } = this.scores;
      const classScore = classes[this.character.class[0]];
      const classNames = Object.keys(classes) as ClassName[];
      return this.mapDetails(classes, classNames, classScore);
    },
  },
  methods: {
    /**
     * Map the provided scores to an array of details
     */
    mapDetails(scores: StatScores, keys: Stat[], topScore: number): ScoreDetails[] {
      return keys.map((key) => {
        // because props are optional, we need a fallback
        const score = scores[key] || 0;
        const title = statDetails[key]?.name || key;
        const percentage = Math.round((score / topScore) * 100);
        const color = (percentage === 100) ? 'green' : 'red';
        return {
          key,
          title,
          score,
          percentage,
          color,
        };
      });
    },
  },
});
</script>
