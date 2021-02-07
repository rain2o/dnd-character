<template>
  <div class="question">
    <p class="question__text">
      {{ question.prompt }}
    </p>
    <div class="question__options">
      <div
        class="question__option"
        v-for="option in question.options"
        :key="`${index}_${option.value}`"
      >
        <input type="radio"
          :value="option.value"
          :name="`question_${index}`"
          @change="modify"
        />
        <span class="question__label">{{ option.label }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Question } from '../types';

export default Vue.extend({
  name: 'Question',
  props: {
    question: {
      type: Object as () => Question,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  methods: {
    modify(event: Event) {
      const target = event.target as HTMLInputElement;
      const { options } = this.question;
      const option = options.find((opt) => opt.value.toString() === target.value);
      if (option) {
        const { modifiers } = option;
        this.$emit('modify', modifiers);
      }
    },
  },
});
</script>
