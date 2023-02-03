<template>
  <div id="app" class="bg-red-50 text-secondaryrelative min-h-screen antialiased">
    <router-view/>
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
    splitbee.init({
      disableCookie: true,
      scriptUrl: '/survival.js',
      apiUrl: '/roll-for-survival',
    });
  },
});
</script>
