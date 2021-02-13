<template>
  <div class="share">
    <div v-if="canUseShareApi">
      <Button @click="share">Share</Button>
    </div>
    <div v-else class="flex justify-center items-center">
      <Button :link="facebookUrl" :external="true" class="mx-4">Share on Facebook</Button>
      <Button :link="twitterUrl" :external="true" class="mx-4">Share on Twitter</Button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Character } from '@/types';
import Button from './Button.vue';
import {
  alignment as alignmentDetails,
  race as raceDetails,
  class as classDetails,
} from '../details.json';

export default Vue.extend({
  name: 'Share',
  components: {
    Button,
  },
  props: {
    character: {
      type: Object as () => Character,
      required: true,
    },
  },
  computed: {
    canUseShareApi(): boolean {
      return typeof navigator.share !== 'undefined';
    },
    description(): string {
      const classes = this.character.class;
      const classNames = classes.map((className) => classDetails[className].name);
      const { level, alignment, race } = this.character;
      let description = `I am a level ${level} ${alignmentDetails[alignment].name}`;
      description += ` ${raceDetails[race].name} ${classNames.join('/')}!`;
      description += ' Find out what kind of D&D character you would be!';
      return description;
    },
    facebookUrl(): string {
      let url = 'https://www.facebook.com/sharer.php?u=';
      url += encodeURI(process.env.VUE_APP_BASE_URL);
      // url += encodeURI('https://dnd-character.netlify.app/');
      return url;
    },
    twitterUrl(): string {
      let url = 'https://twitter.com/intent/tweet?url=';
      url += encodeURI(process.env.VUE_APP_BASE_URL);
      // url += encodeURI('https://dnd-character.netlify.app/');
      url += `&text=${encodeURIComponent(this.description)}`;
      url += '&hashtags=dnd,dungeonsanddragons,dndcharacter,dndnme';
      return url;
    },
  },
  methods: {
    share() {
      try {
        navigator.share({
          title: 'What D&D character are you? | D&D & Me',
          text: this.description,
          // title: this.description,
          // url: 'https://dnd-character.netlify.app/',
          url: window.location.href,
        }).then(() => {
          // should we do something here?
        }).catch((error) => {
          console.error(error);
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
});
</script>
