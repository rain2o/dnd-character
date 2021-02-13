<template>
  <div class="pt-10 md:px-10 md:py-10">
    <div class="max-w-4xl mx-auto md:p-12 md:bg-white md:rounded-lg md:shadow-md">
      <ResetModal :show="showModal" @confirm="resetAnswers" @cancel="showModal = false" />
      <div class="px-5 py-4 md:p-0">
        <h1 class="text-2xl font-bold text-red-800 text-center mb-2">
          What Kind of D&amp;D Character Would You Be?
        </h1>
        <p class="text-lg text-center mb-4">
          Based on
          <a
            href="http://easydamus.com/character.html"
            target="_blank"
            rel="noopener noreferrer"
            class="text-red-800 underline hover:text-secondary"
          >easydamus's version</a>
        </p>

        <h2 class="text-lg font-bold mb-2">Details</h2>
        <p class="text-justify mb-4">
        This survey will determine your ability scores, fantasy race, class, alignment, and
        character level describing what you would be if you were transformed into a Dungeons and
        Dragons character. This is a long survey, so set aside about 15 to 20 minutes to complete
        all 140 questions. Each question should be answered as accurately as possible by choosing
        the answer that either describes you the best or the answer with which you agree the most.
        The answers have been placed in random order, so read carefully. You must answer every
        question to get the best possible result. Given the range of ability scores and the number
        of race, class, alignment, and character level combinations, this survey can produce over
        1.5 TRILLION different results.
        </p>

        <h2 class="text-lg font-bold mb-2">Save as you level up</h2>
        <p class="text-justify mb-4">
        Your progress will be saved in your browser as you go. Don't worry, I don't store anything
        on my servers, it's all in your browser. So you can take a break, go grab a coffee or beer,
        and start back where you left off. There's a reset button if you want to delete your
        progress and start over.
        </p>
      </div>

      <div v-if="hasResults" class="sticky bottom-0 w-full text-center">
        <Button
          class="inline-block w-1/2 sm:w-1/3 sm:mx-2 border-r border-black sm:border-none"
          @click="showModal = true"
          :sticky="true"
        >
          Reset
        </Button>
        <Button
          class="inline-block w-1/2 sm:w-1/3 sm:mx-2 border-l border-black sm:border-none"
          link="/character"
          :sticky="true"
        >
          See Results
        </Button>
      </div>
      <Button v-else link="/survey" :sticky="true" class="w-full sm:w-auto sm:mx-auto lg:mt-10">
        Start Survey Now!
      </Button>
    </div>
  </div>
</template>

<script>
import Button from '../components/Button.vue';
import ResetModal from '../components/ResetModal.vue';

export default {
  name: 'Home',
  components: {
    Button,
    ResetModal,
  },
  data() {
    return {
      hasResults: false,
      showModal: false,
    };
  },
  methods: {
    /**
     * Reset all saved answers
     */
    resetAnswers() {
      localStorage.removeItem('scores');
      this.showModal = false;
      this.hasResults = false;
    },
  },
  beforeMount() {
    // if user has filled out the survey, show results button
    const savedScores = localStorage.getItem('scores');
    if (savedScores) {
      try {
        const parsedScores = JSON.parse(savedScores);
        const answers = parsedScores.filter(Boolean);
        if (parsedScores.length === answers.length) {
          this.hasResults = true;
        }
      } catch (e) {
        // invalid data, remove it
        localStorage.removeItem('scores');
      }
    }
  },
};
</script>
