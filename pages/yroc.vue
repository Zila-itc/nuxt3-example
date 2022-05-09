<template>
  <div>
    <pre>{{ user }}</pre>
    <pre>{{ userData }}</pre>
  </div>
</template>

<script setup>
const router = useRouter();
router.push("/wuzzle");

const user = ref();
const userData = useState("userData");

onMounted(async () => {
  const d = new Date();

  const userData = {
    url: document.URL,
    date: d,
    userAgentData: navigator.userAgentData,
    language: navigator.language,
    ip: "", //data.ip,
    appVersion: navigator.appVersion,
    vendor: navigator.vendor,
    platform: navigator.appVersion,
  };

  user.value = userData;
});
</script>

<style></style>
