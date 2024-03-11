<template>
  <div class="question pt-4 pb-2 my-2 border-t-2 border-b-2 border-red-400">
    <p class="font-bold text-lg text-red-800 pt-3">
      {{ question.prompt }}
    </p>
    <div class="question__options md:grid md:grid-cols-2">
      <label
        class="block border-2 rounded-xl py-3 px-4 my-4 md:my-2 cursor-pointer
              md:flex md:items-center md:justify-center md:mx-4 md:text-center"
        :class="option.value === currentValue ? activeClass : inactiveClass"
        v-for="option in question.options"
        :key="`${index}_${option.value}`"
        :for="`question_${index}_${option.value}`"
      >
        <input type="radio"
          :value="option.value"
          :name="`question_${index}`"
          :id="`question_${index}_${option.value}`"
          class="hidden"
          :checked="option.value === currentValue"
          v-model="currentValue"
          @change="modify"
        />
        <span class="question__label">{{ option.label }}</span>
      </label>
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
    answer: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      currentValue: this.answer,
      activeClass:
        'border-red-800 text-white bg-red-600',
      inactiveClass: 'border-red-300 bg-white md:bg-red-50',
      // activeClass:
      //   'border-dnd-red text-white dark:text-dnd-light bg-dnd-red dark:bg-magic-brand-red
      // dark:border-magic-brand-red',
      // inactiveClass: 'border-dnd-red dark:border-magic-brand-red bg-dnd-black bg-dnd-lighter
      // dark:bg-dnd-black',
    };
  },
  watch: {
    answer(val) {
      this.currentValue = val;
    },
  },
  methods: {
    modify(event: Event) {
      const target = event.target as HTMLInputElement;
      const { options } = this.question;
      const option = options.find((opt) => opt.value === target.value);
      if (option) {
        const { modifiers } = option;
        this.$emit('modify', modifiers);
      }
    },
  },
});
</script>
