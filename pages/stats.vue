<template>
  <div v-if="!loading">
    <div v-if="doc">
      <pre>{{ doc }}</pre>
    </div>
    <div v-else>Loading ...</div>
  </div>
</template>

<script setup>
const loading = ref(true);
const router = useRouter();
// router.push("/wuzzle");

loading.value = false;

const query = router.currentRoute.value.query;
const doc = ref();

onMounted(async () => {
  console.log(router.currentRoute.value.query);
  const data = await $fetch(`/api/yroc/user?col=dev&id=${query.id}&key=yroc`);
  doc.value = data;
});
</script>

<style scoped>
.card {
  width: 300px;
}
</style>
