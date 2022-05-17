<template>
  <p
    class="letter box title p-2 m-1 is-uppercase has-text-centered has-text-white is-size-1"
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
