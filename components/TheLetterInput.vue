<template>
  <div>
    <input
      ref="inputRef"
      :id="id"
      type="text"
      class="letter title p-3 m-1 is-uppercase has-text-centered"
      :class="[background, foreground]"
      @keyup.prevent="handleChange($event)"
      :disabled="currentPosition != position || disabled"
      v-model="letter"
      autocomplete="false"
    />
    <br />
  </div>
</template>

<script setup>
//https://github.com/vuejs/vue/issues/8231
const props = defineProps({
  position: Number,
  chars: Array,
  currentPosition: Number,
  wordPosition: Number,
  charsRemaining: Array,
  charsGuessed: Array,
});
const emits = defineEmits(["letterChange"]);
const letter = ref("");
const disabled = ref(false);
const background = ref();
const foreground = ref();
const inputRef = ref();

const id = computed(() => {
  return `${props.wordPosition}x${props.position}`;
});

onMounted(() => {
  if (props.position == 0) {
    const element = document.getElementById(id.value);
    if (element) {
      nextTick(() => {
        element.focus();
      });
    }
  }
});

watchEffect(() => {
  if (props.currentPosition == props.position) {
    const element = document.getElementById(id.value);
    if (element) {
      nextTick(() => {
        element.focus();
      });
    }
  }
});

const handleChange = (e) => {
  if (letter.value.length > 1 || letter.value.length < 1) {
    const element = document.getElementById(id.value);
    element.value = null;
    letter.value = "";
    return;
  }

  if (e.keyCode < 65 || e.keyCode > 90) {
    const element = document.getElementById(id.value);
    element.value = null;
    letter.value = "";
    return;
  }
  emits("letterChange", letter.value.toUpperCase(), props.position, id);
  disabled.value = true;
  background.value = getBackground();
  foreground.value =
    background.value === "has-background-primary-dark"
      ? "has-text-white"
      : "has-text-dark";

  // console.log(letter);
  // if (props.charsRemaining.includes(letter.value.toUpperCase())) {
  //   const index = props.charsRemaining.indexOf(letter.value.toUpperCase());
  //   props.charsRemaining.splice(index, 1);
  // }
};

const getBackground = () => {
  // console.log(props.charsRemaining);
  if (doesLetterExist(letter.value.toUpperCase()) > 0) {
    if (!props.charsRemaining.includes(letter.value.toUpperCase())) {
      return "has-background-danger";
    }
  }

  if (props.position < props.chars.length) {
    return props.chars[props.position].toUpperCase() !==
      letter.value.toUpperCase()
      ? doesLetterExist(letter.value.toUpperCase()) > 0 &&
        !isLetterPosition(letter.value.toUpperCase(), props.position)
        ? "has-background-warning"
        : "has-background-danger-light"
      : "has-background-primary-dark";
  }
};

const doesLetterExist = (targetChar) => {
  let found = 0;
  props.chars.forEach((char) => {
    if (char === targetChar) {
      found++;
    }
  });
  return found;
};

const isLetterPosition = (targetChar, position) => {
  return props.chars[position] === targetChar;
};
</script>

<style>
.letter {
  width: 4rem;
}
</style>
