<template>
  <div>
    <section class="hero has-background-success-dark is-fullheight">
      <div
        class="hero-body is-flex-direction-column is-justify-content-center is-align-items-center has-text-centered"
      >
        <a href="/">
          <img src="~/assets/images/wuzzle-4x4.png" alt="Wuzzle.me" />
        </a>
        <p class="has-text-white is-size-3 mb-6">Because it's Hard</p>

        <p class="card p-5 is-size-4 has-text-black has-background-light">
          Can you beat the <br />average {{ winRatio }}% win rate?
        </p>

        <NuxtLink
          to="/wuzzle"
          class="button is-warning is-large m-6 has-text-weight-bold"
          >PLAY NOW</NuxtLink
        >

        <pre class="card has-text-left">{{ gameStats }}</pre>
      </div>
    </section>
  </div>
</template>

<script setup>
const gameStats = ref();
const winRatio = ref();

onMounted(async () => {
  const data = {}; //await $fetch("/api/yroc/winratio?col=completed&key=winners");
  gameStats.value = data;
  winRatio.value = +(data.percentWinners).toFixed(2)
});
</script>

<style scoped>
.card {
  width: 300px;
}
</style>
