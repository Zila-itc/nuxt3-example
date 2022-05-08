<template>
  <p
    class="letter box title p-3 m-1 is-uppercase has-text-centered has-text-white"
    :class="background"
  >
    {{ char }}
  </p>
</template>

<script setup>
const props = defineProps({
  char: String,
  background: String,
  position: Number,
});
</script>

<style scoped>
.letter {
  width: 4rem;
}
</style>
