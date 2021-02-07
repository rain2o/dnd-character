<template>
  <div class="survey">
    <ProgressBar :percentage="percentageComplete" />
    <div class="px-5">
      <p class="text-center my-2">page {{ currentPage }} of {{ pages }}</p>
      <div class="questions">
        <QuestionComponent
          v-for="question in currentQuestions"
          :key="question.index"
          :question="question"
          :index="question.index"
          @modify="updateModifiers(question.index, $event)"
        />
      </div>
    </div>
    <div class="sticky bottom-0 w-full">
      <router-link
        class="bg-primary text-background inline-block w-1/2 py-3 font-bold text-center
               border-r-2 border-secondary"
        :to="previous"
      >{{ previousText }}</router-link>
      <router-link
        class="bg-primary text-background inline-block w-1/2 py-3 font-bold text-center
               border-l-2 border-secondary"
        :to="next"
      >{{ nextText }}</router-link>
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
import QuestionComponent from '../components/Question.vue';
import ProgressBar from '../components/ProgressBar.vue';
import { extractAspects } from '../helpers';

/** map index to question object */
const allQuestions = questions.map((current, index) => {
  const question: Question = Object.assign(current, { index });
  return question;
});

export default Vue.extend({
  name: 'Survey',
  components: {
    ProgressBar,
    QuestionComponent,
  },
  data() {
    return {
      // currentPage: 1,
      perPage: 10,
      pages: 0,
      scores: new Array(allQuestions.length) as Array<Modifier>[],
    };
  },
  computed: {
    currentPage(): number {
      let page = 1;
      if (this.$route.params && this.$route.params.p) {
        page = Number.parseInt(this.$route.params.p, 10);
      }
      return page;
    },
    currentQuestions(): Question[] {
      const start = (this.currentPage - 1) * this.perPage;
      return allQuestions.slice(start, start + this.perPage);
    },
    finalScores(): Scores {
      const modifiers = this.scores.flat();
      return extractAspects(modifiers);
    },
    percentageComplete(): number {
      const scores = this.scores.filter((score) => score !== undefined);
      // return Math.round((this.currentPage / this.pages) * 100);
      return Math.round((scores.length / allQuestions.length) * 100);
    },
    previous(): string {
      if (this.currentPage > 1) {
        const prevPage = this.currentPage - 1;
        return `/survey/${prevPage}`;
      }
      return '/';
    },
    previousText(): string {
      if (this.currentPage > 1) {
        return '< Previous';
      }
      return 'Home';
    },
    next(): string {
      if (this.currentPage === this.pages) {
        return '/character';
      }
      const nextPage = this.currentPage + 1;
      return `/survey/${nextPage}`;
    },
    nextText(): string {
      if (this.currentPage === this.pages) {
        return 'See Results';
      }
      return 'Next >';
    },
  },
  methods: {
    updateModifiers(index: number, modifiers: Modifier[]) {
      this.$set(this.scores, index, modifiers);
    },
  },
  mounted() {
    this.pages = allQuestions.length / this.perPage;
  },
});
</script>
