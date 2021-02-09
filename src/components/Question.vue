<template>
  <div class="question py-3 my-2 border-t-2 border-secondary">
    <p class="font-bold text-primary pt-3">
      {{ question.prompt }}
    </p>
    <div class="question__options">
      <label
        class="block border-2 rounded-md py-3 px-2 my-4 cursor-pointer"
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
      activeClass: 'border-primary bg-primary text-background',
      inactiveClass: 'border-secondary bg-background',
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
