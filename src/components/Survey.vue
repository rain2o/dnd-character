<template>
  <div class="survey">
    <h1>Survey says...</h1>
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
import { extractAspects } from '../helpers';

export default Vue.extend({
  name: 'Survey',
  components: {
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
