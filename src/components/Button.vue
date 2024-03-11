<template>
  <router-link
    v-if="link && !external"
    :to="link"
    :disabled="disabled"
    class="button font-semibold block py-6 md:py-3 px-4 w-auto text-center sm:max-w-xl"
    :class="sticky ? stickyClass : standardClass"
    custom
    v-slot="{ navigate }"
  >
    <a
      :disabled="disabled"
      class="button font-semibold block py-6 md:py-3 px-4 w-auto text-center sm:max-w-xl"
      :class="sticky ? stickyClass : standardClass"
      :href="link"
      @click="navigate"
    >
      <slot />
    </a>
  </router-link>

  <a
    v-else-if="link && external"
    target="blank"
    rel="noopener noreferrer"
    :href="link"
    class="button font-semibold block py-3 px-4 w-auto text-center sm:max-w-xl"
    :class="sticky ? stickyClass : standardClass"
    :data-splitbee-event="event"
    :data-splitbee-event-destination="destination || link"
  >
    <slot />
  </a>

  <button
    v-else
    :disabled="disabled"
    class="button font-semibold block py-6 md:py-3 px-4 w-auto text-center sm:max-w-xl"
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
    external: {
      type: Boolean,
      required: false,
      default: false,
    },
    event: {
      type: String,
      required: false,
      default: 'External Link',
    },
    destination: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      disabledClass: 'bg-red-200 text-gray-600 ',
      primaryClass: 'bg-red-600 hover:bg-red-800 focus:bg-red-600 text-white ',
      // WIP: theme
      // disabledClass: 'bg-dnd-light text-dnd-black bg-opacity-50 cursor-default ',
      // primaryClass: 'bg-dnd-red hover:bg-magic-brand-red focus:bg-magic-brand-red text-dnd-lighter ',
      // TODO: new classes
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
