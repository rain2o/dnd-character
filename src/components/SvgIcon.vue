<template>
  <div
    v-html="require(`../assets/icons/${name}.svg`)"
    class="icon-container fill-current"
  />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
});
</script>
