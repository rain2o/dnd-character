<template>
  <router-link
    v-if="link"
    :to="link"
    :event="disabled ? '' : 'click'"
    :disabled="disabled"
    class="button font-semibold block py-3 px-4 w-auto text-center sm:max-w-xl"
    :class="sticky ? stickyClass : standardClass"
  >
    <slot />
  </router-link>
  <button
    v-else
    :disabled="disabled"
    class="button font-semibold block py-3 px-4 w-auto text-center sm:max-w-xl"
    :class="sticky ? stickyClass : standardClass"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Button',
  props: {
    link: {
      type: String,
      required: false,
      default: null,
    },
    sticky: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    secondary: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      disabledClass: 'bg-red-200 text-gray-600 ',
      primaryClass: 'bg-red-600 hover:bg-red-800 focus:bg-red-600 text-white ',
      secondaryClass:
        'bg-white hover:bg-red-200 focus:bg-white text-black border-red-800 border ',
    };
  },
  computed: {
    enabledClass(): string {
      return (this.secondary) ? this.secondaryClass : this.primaryClass;
    },
    baseClass(): string {
      return (this.disabled)
        ? this.disabledClass
        : this.enabledClass;
    },
    stickyClass(): string {
      let classes = this.baseClass;
      classes += 'sticky bottom-0 sm:relative rounded-none sm:rounded-lg';
      return classes;
    },
    standardClass(): string {
      let classes = this.baseClass;
      classes += 'rounded-lg shadow-md';
      return classes;
    },
  },
});
</script>

<style scoped>
.button {
  transition: background-color .15s ease;
}
</style>
