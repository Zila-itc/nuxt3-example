<template>
  <div>
    <pre>{{ user }}</pre>
    <pre>{{ userData }}</pre>
    <img src="~/assets/letters/green/A-Green.png" alt="Wuzzle.me" />
    <img src="~/assets/letters/green/B-Green.png" alt="Wuzzle.me" />
    <img src="~/assets/letters/green/C-Green.png" alt="Wuzzle.me" />
    <img src="~/assets/letters/green/D-Green.png" alt="Wuzzle.me" />
    <img src="~/assets/letters/green/E-Green.png" alt="Wuzzle.me" />
  </div>
</template>

<script setup>
const router = useRouter();
// router.push("/wuzzle");

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
