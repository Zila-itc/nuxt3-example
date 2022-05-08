<template>
  <div class="card p-4 mt-4 has-background-light">
    <p class="mb-2 has-text-weight-bold is-size-5">Your Game Stats</p>
    <div class="block m-0 mb-2">
      <span class="tag has-background-success mx-3 has-text-dark is-size-6"
        >Wins: {{ gameStats?.wins }}</span
      >
      <span class="tag is-danger mx-3 is-size-6"
        >Loses: {{ gameStats?.loses }}</span
      >
    </div>
    <p v-if="gameStats.wins < gameStats.loses" class="is-size-6">
      Looks like you need to try harder :)
    </p>
    <p v-else class="is-size-6">Becoming the Master of Your Own Wuzzle.</p>
  </div>
</template>

<script setup>
const props = defineProps({
  gameStats: {},
});
</script>

<style scoped>
</style>
