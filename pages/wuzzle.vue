<template>
  <div
    class="wrapper is-flex is-flex-direction-column is-justify-content-space-between is-align-items-center has-background-dark"
  >
    <div class="game my-3 is-flex is-justify-content-center has-background-white">
      <div class="is-flex is-flex-direction-column is-justify-content-space-between">
        <div
          v-if="!loading"
          class="page block p-3 pt-5 is-flex is-align-items-center is-flex-direction-column has-text-centered"
          :class="background"
        >
          <a href="/">
            <img src="~/assets/images/wuzzle-4x4.png" alt="Wuzzle.me" />
          </a>

          <div
            class="is-flex m-2"
            v-if="completedWords.length < guesses || !result.includes(false)"
          >
            <span v-for="(char, index) in chars" :key="index">
              <TheLetter
                :char="index < guess.length ? guess[index] : '?'"
                :position="index"
                :background="getBackground(index)"
              />
            </span>
          </div>
          <div
            class="is-flex m-2"
            v-if="result.includes(false) && completedWords.length == guesses"
          >
            <span v-for="(char, index) in chars" :key="index">
              <TheLetter
                :char="char"
                :position="index"
                :background="getBackground(index)"
              />
            </span>
          </div>

          <div v-if="!result.includes(false)" class="result">
            <h2
              class="card px-6 p-4 title is-3 has-text-black m-3 has-background-warning"
            >
              YOU WIN!
            </h2>
          </div>
          <div v-else-if="completedWords.length == guesses" class="result">
            <h2
              class="card px-6 p-4 title is-3 has-text-danger m-3 as-background-white"
            >
              YOU LOSE!
            </h2>
          </div>

          <div class="tag is-light is-large m-3">
            <span class="icon mr-3">
              <i class="fa-regular fa-clock"></i>
            </span>
            <span class="my-2">{{ elapsedTime }} seconds</span>
          </div>

          <!-- <div>{{ userData.tokens }} Tokens</div> -->

          <div v-if="chars.length">
            <TheWord
              v-for="index in guesses"
              :key="index"
              :chars="chars"
              @result="handleResult"
              @letterChange="handleLetterChange"
              @completedWord="handleCompletedWord"
              :guessNumber="index"
              :isDisabled="true"
              :wordPosition="index"
              :charsRemaining="charsRemaining"
              :charsGuessed="charsGuessed"
            />
          </div>

          <div
            class="mt-4 stats"
            v-if="completedWords.length == guesses || !result.includes(false)"
          >
            <a href="/wuzzle" class="button is-warning is-large my-2">
              <b>PLAY AGAIN</b>
            </a>

            <TheStats :gameStats="stats" />
          </div>
        </div>
        <div v-if="!loading"
          class="oneliner is-flex has-background-white is-justify-content-center"
        >
          <div >
            <TheOneLiner class="mt-4 mb-5" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { v4 as uuidv4 } from "uuid";

const userId = useCookie("userId");
let gameStats = useCookie("gameStats");

const stats = ref();

const word = ref("");
const guess = ref([]);
const chars = ref([]);
const result = ref([]);
const guesses = ref(4);
const length = ref(4);
const completedWords = ref([]);
const loading = ref(true);
const background = ref();
const gameId = uuidv4();
const charsRemaining = ref([]);
const charsGuessed = ref([]);

const guessCount = useState("guesses");
const userData = useState("userData");

const user = ref();

const bet = ref(1);

const init = async () => {
  background.value = "has-background-white";
  const data = await $fetch(`/word?length=${length.value}`);
  word.value = data.word.toUpperCase();
  result.value = new Array(word.value.length).fill(false);
  chars.value = [...word.value];
  userData.value.chars = chars.value;
  stats.value = gameStats.value;
  charsRemaining.value = [...chars.value];

  if (gameStats.value?.tokens) {
    userData.value.tokens = +gameStats.value.tokens;
  } else {
    userData.value.tokens = 17;
  }
};

const handleAgain = async () => {
  await init();
};

watchEffect(() => {
  if (
    completedWords.value.length == guesses.value &&
    result.value.includes(false)
  ) {
    // background.value = "has-background-danger-light";
    background.value = "has-background-white";
  }
});

const handleCompletedWord = (wordArray, guessNumber) => {
  if (guessNumber >= guessCount.value) {
    if (result.value.includes(false)) {
      guessCount.value = guessNumber + 1;
    }
    completedWords.value.push(wordArray);
  }
  userData.value.words = completedWords.value;
};

const handleLetterChange = (letter, position, id) => {
  guess.value[position] = chars.value[position] == letter ? letter : "?";
  if (id.value == "1x0") {
    startTimer();
  }
  // console.log(letter);
  // if (charsRemaining.value.includes(letter)) {
  //   const index = charsRemaining.value.indexOf(letter);
  //   charsRemaining.value.splice(index, 1);
  // }

  charsGuessed.value.push(letter);
};

const elapsedTime = ref(0);
let timer;

const startTimer = () => {
  timer = setInterval(() => {
    elapsedTime.value++;
  }, 1000);
};

const stopTimer = () => {
  clearInterval(timer);
};

const getBackground = (index) => {
  if (index < guess.value.length) {
    return guess.value[index] === "?"
      ? "has-background-grey-light"
      : "has-background-primary-dark";
  } else {
    return "has-background-grey-light	";
  }
};

const handleResult = async (e) => {
  result.value = e;
  // console.log(e)
};

onMounted(async () => {
  await init();

  const data = "";

  const d = new Date();

  user.value = {
    url: document.URL,
    date: d,
    userAgentData: navigator.userAgentData,
    language: navigator.language,
    // ip: data.ip,
    userId: userId.value,
    appVersion: navigator.appVersion,
    vendor: navigator.vendor,
  };

  const mount = {
    gameId: gameId,
    chars: [],
    words: [],
    user: user.value,
    action: "mount",
  };

  userData.value.gameId = gameId;
  userData.value.user = user.value;

  watchEffect(async () => {
    if (
      (completedWords.value.length == guesses.value &&
        result.value.includes(false)) ||
      (!result.value.includes(false) &&
        completedWords.value.length == guessCount.value)
    ) {
      stopTimer();

      userData.value.user = user;
      userData.value.words = completedWords.value;

      //calculate final winnings
      const correctLetters = result.value.filter((r) => r == true).length;
      // console.log(correctLetters, result.value);

      let winnings = 0;

      switch (correctLetters) {
        case 0:
          winnings = bet.value * -2;
          break;
        case 1:
          winnings = bet.value * -0.75;
          break;
        case 2:
          winnings = bet.value * -0.5;
          break;
        case 3:
          winnings = bet.value * -0.25;
          break;
        case 4:
          winnings = bet.value * 2;
        default:
          winnings = -bet.value;
      }

      // console.log(winnings, userData.value.tokens);
      userData.value.tokens += winnings;

      // console.log(userData.value.tokens);

      const words = completedWords.value.map((w) => {
        return w.join();
      });

      let wins = gameStats.value?.wins;
      let loses = gameStats.value?.loses;
      let tokens = userData.value?.tokens;

      if (result.value.includes(false)) {
        loses = gameStats.value.loses + 1;
      } else {
        wins = gameStats.value.wins + 1;
      }

      const newStats = {
        wins: wins,
        loses: loses,
        tokens: tokens,
      };

      // console.log(newStats);

      gameStats = useCookie("gameStats");
      gameStats.value = newStats;

      stats.value = newStats;

      const doc = {
        gameId: gameId,
        userId: userId.value,
        action: "complete",
        chars: chars.value,
        words: words,
        user: userData.value.user,
        result: result.value.includes(false) ? "lose" : "win",
        stats: stats.value,
        elapsedTime: elapsedTime.value,
      };

      const { id } = await $fetch("/api/firestore/add?col=dev", {
        method: "POST",
        body: doc,
      });
    }
  });

  loading.value = false;
});
</script>

<style scoped>
.wrapper {
  min-height: 100vh;
}

.game {
  min-height: 100%;
  flex-grow: 1;
  max-width: 400px;
  margin: 0 auto;
}

.stats .result {
  max-width: 300px;
  min-width: 260px;
  width: 100%;
}

.result {
  max-width: 300px;
  min-width: 260px;
  width: 100%;
}

.oneliner {
  max-width: 400px;
  width: 100%;
}

.page {
  max-width: 400px;
  width: 100%;
}
</style>
