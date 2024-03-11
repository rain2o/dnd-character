<template>
  <!-- <div
    id="app"
    class="bg-dnd-light dark:bg-black text-dnd-black dark:text-dnd-lighter
    relative min-h-screen antialiased"
  > -->
  <div id="app" class="bg-red-50 relative min-h-screen antialiased">
    <router-view />

    <footer class="flex flex-col items-center justify-center gap-6 pt-10 pb-6">
      <p>Made with ❤️ by <a href="https://linktr.ee/joel.rainwater" target="_blank"
          rel="noopener noreferrer"
          class="text-primary underline hover:text-black"
          data-splitbee-event="External Link"
          data-splitbee-event-destination="Linktree">Joel Rainwater</a>.</p>
      <div class="flex flex-col items-center justify-center gap-4">
        <p>Support my projects</p>
        <div class="flex gap-4">
          <a
            href="https://www.buymeacoffee.com/joelrainwater"
            target="_blank"
            rel="noopener noreferrer"
            data-splitbee-event="External Link"
            data-splitbee-event-destination="buymeacoffee"
            class="flex items-center py-2 px-4 w-auto text-center rounded-lg
            shadow-md bg-bmac hover:bg-opacity-70 text-black"
          >
            <div
              v-html="require(`./assets/icons/buymeacoffee.svg`)"
              class="fill-white mr-2"
            />
            Buy me a coffee
          </a>
          <a href="https://ko-fi.com/joelrainwater" target="_blank" rel="noopener noreferrer"
            data-splitbee-event="External Link" data-splitbee-event-destination="ko-fi"
            class="flex items-center py-2 px-4 w-auto text-center rounded-lg shadow-md
            bg-red-600 hover:bg-red-800 focus:bg-red-600 text-white"
          >
            <img src='https://storage.ko-fi.com/cdn/nav-logo-stroke.png' alt="Ko-fi" class="w-6 mr-2"
            /> Ko-fi
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { MetaInfo } from 'vue-meta';
import splitbee from '@splitbee/web';

export default Vue.extend({
  name: 'App',
  metaInfo(): MetaInfo {
    return {
      title: 'D&D & Me | What D&D Character are you?',
      meta: [
        { property: 'og:title', content: 'D&D & Me | What D&D Character are you?' },
        { property: 'twitter:title', content: 'D&D & Me | What D&D Character are you?' },
        {
          name: 'description',
          content:
            'Take the survey to find out what kind of D&D character you would be in real life!',
        },
        {
          property: 'og:description',
          content:
            'Take the survey to find out what kind of D&D character you would be in real life!',
        },
        {
          property: 'twitter:description',
          content:
            'Take the survey to find out what kind of D&D character you would be in real life!',
        },
        { property: 'og:url', content: `${window.location}` },
        { property: 'twitter:url', content: `${window.location}` },
      ],
    };
  },
  mounted() {
    splitbee.init({ disableCookie: true });
  },
});
</script>
