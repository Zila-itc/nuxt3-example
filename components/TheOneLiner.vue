<template>
  <div>
    <p class="joke card p-5 is-size-5 has-text-black has-background-light has-text-centered">
      {{ oneLiner ? oneLiner : "Thinking ..." }}
    </p>
  </div>
</template>

<script setup>
const oneLiner = useOneLiner();

onMounted(async () => {
  const data = await $fetch("/oneliners?take=1");
  if (data.length > 0) {
    oneLiner.value = data[0];
  }
});
</script>

<style scoped>
.joke {
  max-width: 300px;
  min-width: 250px;
  width: 100%;
}
</style>
