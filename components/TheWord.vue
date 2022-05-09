<template>
  <div>
    <div v-if="guessCount == 5 && wordPosition == 5" class="card p-2 my-2 has-background-warning has-text-weight-bold">
      Looks like you need a Bonus try!
    </div>

    <div class="is-flex" v-if="guessNumber <= guessCount">
      <template v-for="index in chars.length" :key="index - 1">
        <TheLetterAndroid
          :position="index - 1"
          @letterChange="handleLetterChange"
          :chars="chars"
          :disabled="isDisabled"
          :currentPosition="currentPosition"
          :wordPosition="wordPosition"
          class="letterInput"
          :charsRemaining="charsRemaining"
          :charsGuessed="charsGuessed"
        />
      </template>
    </div>

    <div
      v-if="
        (guessCount <= guessNumber + 1 || guessCount == guessNumber + 1) &&
        wordComplete &&
        result.includes(false) &&
        guessCount < 5
      "
    >
      <p v-for="message in messages1" :key="message">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  chars: Array,
  guessNumber: Number,
  isDisabled: Boolean,
  wordPosition: Number,
  charsRemaining: Array,
  charsGuessed: Array,
});

const currentPosition = ref(0);

const guessCount = useState("guesses");

const emits = defineEmits(["result", "letterChange", "completedWord"]);

const result = ref([]);
const chars1 = ref([]);

const wordComplete = computed(() => {
  const completed = props.chars.length == chars1.value.length;
  if (completed) {
    emits("completedWord", chars1.value, props.guessNumber);
  }
  return completed;
});

onMounted(() => {
  result.value = new Array(props.chars.length).fill(false);
});

const handleLetterChange = (letter, position, id) => {
  currentPosition.value = position + 1;
  chars1.value[position] = letter;
  handleKeyup();
  emits("letterChange", letter, position, id);
};

const messages1 = computed(() => {
  if (wordComplete.value) {
    return getMessages1();
  }
});

const messages2 = computed(() => {
  if (wordComplete.value) {
    return getMessages2();
  }
});

const getMessages1 = () => {
  const messages = new Set();
  return messages;

  //messages remove from game May 5, 2022
  lettersExist1.value.forEach((value, index) => {
    if (value > 1) {
      messages.add(
        `Letter "${chars1.value[
          index
        ]?.toUpperCase()}" contained in word ${value} times`
      );
    } else if (value == 1) {
      messages.add(
        `Letter "${chars1.value[
          index
        ]?.toUpperCase()}" contained in word ${value} time`
      );
    }
  });

  return messages;
};

const lettersExist1 = computed(() => {
  const letterExits = [];

  chars1.value.forEach((char) => {
    letterExits.push(doesLetterExist(char));
  });

  return letterExits;
});

const handleKeyup = () => {
  result.value = new Array(props.chars.length).fill(false);
  chars1.value.forEach((char, index) => {
    result.value[index] = isLetterPosition(char, index);
  });
  emits("result", result.value);
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

<style scoped></style>
