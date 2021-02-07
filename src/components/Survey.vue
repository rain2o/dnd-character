<template>
  <div class="survey">
    <ProgressBar :percentage="percentageComplete" />
    <div class="px-5">
      <h1 class="text-primary">Survey says...</h1>
      <p>
        {{ currentPage }} out of {{ pages }} pages
      </p>
      <div class="questions">
        <QuestionComponent
          v-for="(question, index) in currentQuestions"
          :key="index"
          :question="question"
          :index="index"
          @modify="updateModifiers(index, $event)"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import {
  Modifier,
  Question,
  Scores,
} from '../types';
import questions from '../questions.json';
import QuestionComponent from './Question.vue';
import ProgressBar from './ProgressBar.vue';
import { extractAspects } from '../helpers';

export default Vue.extend({
  name: 'Survey',
  components: {
    ProgressBar,
    QuestionComponent,
  },
  data() {
    return {
      currentPage: 1,
      perPage: 10,
      pages: 0,
      scores: new Array(questions.length) as Array<Modifier>[],
    };
  },
  computed: {
    currentQuestions(): Question[] {
      const start = (this.currentPage - 1) * this.perPage;
      return questions.slice(start, start + this.perPage);
    },
    finalScores(): Scores {
      const modifiers = this.scores.flat();
      return extractAspects(modifiers);
    },
    percentageComplete(): number {
      const scores = this.scores.filter((score) => score !== undefined);
      // return Math.round((this.currentPage / this.pages) * 100);
      return Math.round((scores.length / questions.length) * 100);
    },
  },
  methods: {
    updateModifiers(index: number, modifiers: Modifier[]) {
      this.$set(this.scores, index, modifiers);
    },
  },
  mounted() {
    this.pages = questions.length / this.perPage;
  },
});
</script>
