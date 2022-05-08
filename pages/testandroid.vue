<template>
  <div class="section">
    <input
      type="text"
      :value="theInput"
      @input="(e) => (theInput = e.target.value)"
      class="input"
    />
    <p class="box my-3">{{ theInput }}</p>
  </div>
</template>

<script setup>
const theInput = ref();

watchEffect(() => {
  console.log(theInput.value);
});
</script>

<style></style>
