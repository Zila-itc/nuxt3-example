<template>
  <div>
    <section class="hero has-background-black is-fullheight">
      <div
        class="hero-body is-flex-direction-column is-align-items-center has-text-centered"
      >
        <NuxtLink to="/wuzzle">
          <img src="~/assets/images/wuzzle-3.png" alt="Wuzzle.me" />
        </NuxtLink>

        <NuxtLink to="/wuzzle"> <TheOneLiner class="oneliner my-6 mb-5" /></NuxtLink>


        <NuxtLink to="/wuzzle" class="mt-3">
          <img src="~/assets/images/lets-play.png" alt="Wuzzle.me"
        /></NuxtLink>

        <p class="slogan has-text-white is-size-3 mb-6">Four Letter Fun</p>
        <div class="quote mb-6 mt-1">
          <blockquote class="is-size-4 has-text-white has-background-black">
            "Took me 6 games to get 1 win. <br />
            It's harder than Wordle and certainly has a different challenge to
            it! <br />I'm impressed!"
          </blockquote>
        </div>

        <!-- <TheStats :gameStats="gameStats" class="stats" /> -->
      </div>
    </section>
  </div>
</template>

<script setup>
import { v4 as uuidv4 } from "uuid";
const oneLiner = useOneLiner();

const gameStats = useCookie("gameStats");
if (!gameStats.value) {
  gameStats.value = {
    wins: 0,
    loses: 0,
    tokens: 17,
  };
}

// console.log(gameStats.value);

if (gameStats.value?.tokens < 1) {
  gameStats.value.tokens = 17;
}

// console.log(gameStats.value);

// const oneLiner = ref();
const userId = useCookie("userId");
if (!userId.value) {
  userId.value = uuidv4();
}

onMounted(async () => {
  const data = await $fetch("/oneliners?take=1");
  if (data.length > 0) {
    oneLiner.value = data[0];
  }
});
</script>

<style scoped>
.oneliner {
  /* max-width: 300px;
  min-width: 250px;
  width: 100%; */
  font-family: Itim;
}

.stats {
  max-width: 300px;
  min-width: 250px;
  width: 100%;
}

.quote {
  max-width: 400px;
  min-width: 250px;
  width: 100%;
  font-family: Itim;
}

.slogan {
  font-family: Itim;
}
</style>
