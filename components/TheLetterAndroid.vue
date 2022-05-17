<template>
  <div>
    <input
      ref="inputRef"
      :id="id"
      :value="letter.char"
      type="text"
      class="letter title p-3 m-1 is-uppercase has-text-centered"
      :class="background"
      @input="(e) => handleChange(e)"
      :disabled="currentPosition != position || disabled"
      autocomplete="false"
      required
    />
  </div>
</template>

<script setup>
const props = defineProps({
  position: Number,
  chars: Array,
  currentPosition: Number,
  wordPosition: Number,
  charsRemaining: Array,
  charsGuessed: Array,
});
const emits = defineEmits(["letterChange"]);
const letter = reactive({ char: "" });
const disabled = ref(false);
const background = ref();
const inputRef = ref();
const correctLetter = ref(false);

const reactiveChars = useReactiveChars;

const current = ref();

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

const allowedChars = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const handleChange = (e) => {
  letter.char = e.target.value?.toUpperCase();
  // console.log(e);
  if (letter.char.length > 1 || letter.char.length < 1) {
    const element = document.getElementById(id.value);
    element.value = null;
    letter.char = "";
    return;
  }

  if (allowedChars.indexOf(letter.char.toLowerCase()) < 0) {
    const element = document.getElementById(id.value);
    element.value = null;
    letter.char = "";
    return;
  }

  current.value = e?.data;
  reactiveChars.push(e?.data?.toUpperCase());

  emits("letterChange", e.data?.toUpperCase(), props.position, id);

  disabled.value = true;
  background.value = getBackground();

  if (background.value === "has-background-primary-dark") {
    correctLetter.value = true;
  }
};

const getBackground = () => {
  if (props.position < props.chars.length) {
    return props.chars[props.position].toUpperCase() !==
      letter.char.toUpperCase()
      ? doesLetterExist(letter.char.toUpperCase()) > 0 &&
        !isLetterPosition(letter.char.toUpperCase(), props.position)
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
