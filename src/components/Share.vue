<template>
  <div class="share pt-4">
    <!-- Use Share API if supported -->
    <div v-if="canUseShareApi">
      <Button @click="share" class="pt-2 pb-2 mx-auto">
        Share your results
        <SvgIcon name="share" class="block mx-auto w-8 h-8 align-middle" />
      </Button>
    </div>

    <!-- If not, use platform-specific share buttons -->
    <div v-else class="flex justify-center items-center">
      <Button
        :link="facebookUrl"
        :external="true"
        class="facebook mx-4 text-center"
        event="Share"
        destination="Facebook"
      >
        Share on Facebook
        <SvgIcon name="facebook" class="w-20 h-20 my-4 mx-auto" />
      </Button>
      <Button
        :link="twitterUrl"
        :external="true"
        class="twitter mx-4 text-center"
        event="Share"
        destination="Twitter"
      >
        Share on Twitter
        <SvgIcon name="twitter" class="w-20 h-20 my-4 mx-auto" />
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Character } from '@/types';
import Button from './Button.vue';
import SvgIcon from './SvgIcon.vue';
import {
  alignment as alignmentDetails,
  race as raceDetails,
  class as classDetails,
} from '../details.json';

export default Vue.extend({
  name: 'Share',
  components: {
    Button,
    SvgIcon,
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
    shareUrl(): string {
      return encodeURI(process.env.VUE_APP_BASE_URL);
    },
    facebookUrl(): string {
      return `https://www.facebook.com/sharer.php?u=${this.shareUrl}`;
    },
    twitterUrl(): string {
      let url = `https://twitter.com/intent/tweet?url=${this.shareUrl}`;
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
          url: process.env.VUE_APP_BASE_URL,
        }).then(() => {
          // should we do something here?
        }).catch(() => {
          // do nothing...
        });
      } catch (_error) {
        // do nothing...
      }
    },
  },
});
</script>

<style lang="postcss" scoped>
.twitter {
  background-color: rgb(29, 161, 242);
}

.twitter:hover {
  background-color: rgb(26, 145, 218);
}

.facebook {
  background-color: rgb(24, 119, 242);
}

.facebook:hover {
  background-color: rgb(24, 119, 242);
  opacity: .85;
}
</style>
