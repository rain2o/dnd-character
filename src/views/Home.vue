<template>
  <div class="home">
    <div class="content px-5 py-4">
      <h1 class="text-2xl font-bold text-primary text-center mb-2">
        What Kind of D&amp;D Character Would You Be?
      </h1>
      <h3 class="text-lg text-center mb-2">
        Based on
        <a
          href="http://easydamus.com/character.html"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary underline hover:text-secondary"
        >easydamus's version</a>
      </h3>
      <p class="text-justify mb-2">
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
      <p class="text-justify mb-2">
      Once you have finished answering all of the questions, submit your responses using the button
      at the bottom of this page. The results page will display all of your basic character
      information and the details of your alignment, race, and class. Also, HTML code that can be
      used to display the results on your own site and a detailed breakdown of your scores in
      various categories will be shown if you leave the option boxes checked.
      </p>
    </div>
    <router-link
      class="sticky bottom-0 w-full bg-primary text-background py-3 font-bold block text-center"
      to="/survey"
    >
      Start Survey Now!
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>
