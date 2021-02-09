<template>
  <div class="home">
    <ResetModal :show="showModal" @confirm="resetAnswers" @cancel="showModal = false" />
    <div class="content px-5 py-4 max-w-2xl mx-auto">
      <h1 class="text-2xl font-bold text-primary text-center mb-2">
        What Kind of D&amp;D Character Would You Be?
      </h1>
      <p class="text-lg text-center mb-4">
        Based on
        <a
          href="http://easydamus.com/character.html"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary underline hover:text-secondary"
        >easydamus's version</a>
      </p>

      <h2 class="text-lg font-bold mb-2">Details</h2>
      <p class="text-justify mb-4">
      This survey will determine your ability scores, fantasy race, class, alignment, and character
      level describing what you would be if you were transformed into a Dungeons and Dragons
      character. This is a long survey, so set aside about 15 to 20 minutes to complete all 140
      questions. Each question should be answered as accurately as possible by choosing the answer
      that either describes you the best or the answer with which you agree the most. The answers
      have been placed in random order, so read carefully. You must answer every question to get
      the best possible result. Given the range of ability scores and the number of race, class,
      alignment, and character level combinations, this survey can produce over 1.5 TRILLION
      different results.
      </p>

      <h2 class="text-lg font-bold mb-2">Save as you level up</h2>
      <p class="text-justify mb-4">
      Your progress will be saved in your browser as you go. Don't worry, I don't store anything on
      my servers, it's all in your browser. So you can take a break, go grab a coffee or beer, and
      start back where you left off. There's a reset button if you want to delete your progress and
      start over.
      </p>
    </div>

    <div v-if="hasResults" class="sticky bottom-0 w-full">
      <router-link
        class="bg-primary text-background inline-block w-1/2 py-3 font-bold text-center
               border-r-2 border-secondary"
        to="/results"
      >See Results</router-link>
      <button
        class="bg-primary text-background inline-block w-1/2 py-3 font-bold text-center"
        @click="showModal = true"
      >Reset</button>
    </div>
    <router-link
      v-else
      class="sticky bottom-0 w-full bg-primary text-background py-3 font-bold block text-center
             lg:max-w-xl lg:relate lg:mx-auto"
      to="/survey"
    >
      Start Survey Now!
    </router-link>
  </div>
</template>

<script>
import ResetModal from '../components/ResetModal.vue';

export default {
  name: 'Home',
  components: {
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
