<template>
  <div class="survey">
    <ProgressBar :percentage="percentageComplete" />
    <ResetModal :show="showModal" @confirm="resetAnswers" @cancel="showModal = false" />
    <div class="pt-0 md:pt-8 md:px-10 md:py-8">
      <div class="max-w-4xl mx-auto md:px-12 md:py-4 md:bg-white md:rounded-lg md:shadow-md">
        <div class="p-4">
          <p class="text-center mb-4">page {{ currentPage }} of {{ pages }}</p>
          <div class="questions">
            <QuestionComponent
              v-for="question in currentQuestions"
              :key="question.index"
              :question="question"
              :index="question.index"
              :answer="getSelectedAnswer(question)"
              @modify="updateModifiers(question.index, $event)"
            />
          </div>
        </div>
        <div class="sticky md:relative text-center bottom-0 w-full">
          <Button
            :link="previous"
            :sticky="true"
            class="inline-block w-1/3 sm:mx-2 sm:w-1/4 border-r border-black sm:border-none"
          >{{ previousText }}</Button>
          <Button
            :disabled="!scores.filter(Boolean).length"
            :sticky="true"
            class="inline-block w-1/3 sm:mx-2 sm:w-1/4"
            @click="showModal = true"
          >Reset</Button>
          <Button
            :link="next"
            :sticky="true"
            class="inline-block w-1/3 sm:mx-2 sm:w-1/4 border-l border-black sm:border-none"
          >{{ nextText }}</Button>
        </div>
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
import Button from '../components/Button.vue';
import QuestionComponent from '../components/Question.vue';
import ProgressBar from '../components/ProgressBar.vue';
import ResetModal from '../components/ResetModal.vue';
import { extractScores } from '../helpers/scores';

/** map index to question object */
const allQuestions = questions.map((current, index) => {
  const question: Question = Object.assign(current, { index });
  return question;
});

export default Vue.extend({
  name: 'Survey',
  components: {
    Button,
    ProgressBar,
    QuestionComponent,
    ResetModal,
  },
  data() {
    return {
      // currentPage: 1,
      perPage: 10,
      pages: 0,
      scores: new Array(allQuestions.length) as Array<Modifier>[],
      showModal: false,
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
      const modifiers = this.scores.flat().filter(Boolean);
      return extractScores(modifiers);
    },
    percentageComplete(): number {
      const scores = this.scores.filter(Boolean);
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
        return 'Previous';
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
      return 'Next';
    },
  },
  methods: {
    /**
     * Update the selected modifiers for the provided index
     */
    updateModifiers(index: number, modifiers: Modifier[]) {
      this.$set(this.scores, index, modifiers);
      this.saveScores();
    },
    /**
     * Save current scores in storage
     */
    saveScores() {
      const data = JSON.stringify(this.scores);
      localStorage.setItem('scores', data);
    },
    /**
     * Retrieve selected answer, if any, for
     * the provided question
     */
    getSelectedAnswer(question: Question): string {
      const modifiers = this.scores[question.index];
      if (modifiers) {
        const serializedModifiers = JSON.stringify(modifiers);
        const selectedOption = question.options
          .find((option) => JSON.stringify(option.modifiers) === serializedModifiers);
        return selectedOption ? selectedOption.value : '';
      }
      return '';
    },
    /**
     * Reset all saved answers
     */
    resetAnswers() {
      this.scores = new Array(allQuestions.length) as Array<Modifier>[];
      localStorage.removeItem('scores');
      this.showModal = false;
      // go back to page 1 if we're not
      if (this.currentPage > 1) {
        this.$router.push('/survey');
      }
    },
  },
  mounted() {
    this.pages = allQuestions.length / this.perPage;
  },
  beforeMount() {
    // load saved scores if there are any
    const savedScores = localStorage.getItem('scores');
    if (savedScores) {
      try {
        this.scores = JSON.parse(savedScores);
      } catch (e) {
        // invalid data, remove it
        localStorage.removeItem('scores');
      }
    }
  },
});
</script>
