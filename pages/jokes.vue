<template>
  <div>
    <section class="hero has-background-dark is-fullheight">
      <div
        class="hero-body is-flex-direction-column is-justify-content-center is-align-items-center has-text-centered"
      >
        <a href="/">
          <img src="~/assets/images/wuzzle-4x4.png" alt="Wuzzle.me" />
        </a>
        <div class="section" v-if="oneLiner">
          <p
            class="joke card m-2 p-5 is-size-4 has-text-black has-background-light"
          >
            {{ oneLiner }}
          </p>
        </div>
        <button class="button is-link is-large" @click="handleAnotherJoke">Just One More?</button>
        <NuxtLink
          to="/wuzzle"
          class="button is-warning is-large m-6 has-text-weight-bold"
          >PLAY NOW</NuxtLink
        >
      </div>
    </section>
  </div>
</template>

<script setup>
const oneLiner = ref();

onMounted(async () => {
  const data = await $fetch("/oneliners?take=1");
  if (data.length > 0) {
    oneLiner.value = data[0];
  }
});

const handleAnotherJoke = async () => {
  const data = await $fetch("/oneliners?take=1");
  if (data.length > 0) {
    oneLiner.value = data[0];
  }
}

</script>

<style scoped>
.joke {
  max-width: 500px;
}
</style>
