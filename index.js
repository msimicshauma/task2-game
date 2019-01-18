const button = document.getElementById("start");
const currentNumber = document.getElementById("current-number");
const letterInput = document.getElementById("letter-input");
const easy = document.getElementById("easy");
const medium = document.getElementById("medium");
const hard = document.getElementById("hard");
const letters = document.querySelectorAll(".letter");
const hit = document.getElementById("hit");
const miss = document.getElementById("miss");
const left = document.getElementById("left");

letterInput.disabled = true;

let random; //Stores current random number
let pastNumbers = []; //Stores the numbers that were generated
let counter = 0; //Used for pastNumbers array
let timer; //Stores the randomNumber function, used for clearInterval()
let isActive = 0; //USED FOR CHECKING IF THE GAME IS ACTIVE (0 or 1)
let difficulty = 5000; //Default difficulty level in ms
let hitCounter = 0; //Number of guessed letters
let missCounter = 0; //Number of missed letters
let leftCounter = 26; //Letters left

//Object with alphabet
const alphabet = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26
};

//Array with letters, used in checkGuess method
const alphabetArray = Object.keys(alphabet);

//Check if the number had already appeared
const checkDouble = random => {
  if (pastNumbers.length === 26) return 1;

  for (let i = 0; i < pastNumbers.length; i++)
    if (pastNumbers[i] === random) return true;

  pastNumbers[counter++] = random;
  return false;
};

//Generates random number, changes DOM, fires checkDouble method
const randomNumber = () => {
  random = Math.floor(Math.random() * 26 + 1);

  if (!checkDouble(random)) {
    currentNumber.innerHTML = random;

    if (letterInput.value === "") {
      const letter = document.getElementById(random.toString());
      letter.style.color = "#d91e18";
    }

    leftCounter--;
    left.innerHTML = leftCounter;
    missCounter = 26 - (leftCounter + hitCounter);
    miss.innerHTML = missCounter;
    letterInput.disabled = false;
    letterInput.focus();
  } else if (checkDouble(random) === 1) {
    letterInput.disabled = true;
    clearInterval(timer);
  } else randomNumber();
};

//Checks if the input matches random number
//Called on input (keyup)
const checkGuess = input => {
  let guessNumber = 0;
  for (let i = 0; i < alphabetArray.length; i++) {
    if (alphabetArray[i] === input) {
      guessNumber = alphabet[input];
      const letter = document.getElementById(random.toString());
      if (guessNumber === random) {
        letter.style.color = "#26c281";
        hitCounter++;
        hit.innerHTML = hitCounter;
        missCounter = 26 - (leftCounter + hitCounter);
        miss.innerHTML = missCounter;
      }
    }
  }
};

//SETTINGS
const resetColors = () => {
  for (let i = 0; i < letters.length; i++) letters[i].style.color = "#888";
};

const resetCounters = () => {
  hitCounter = 0;
  hit.innerHTML = 0;
  missCounter = 0;
  miss.innerHTML = 0;
  leftCounter = 26;
  left.innerHTML = 26;
};

const disableRadio = () => {
  easy.disabled = true;
  medium.disabled = true;
  hard.disabled = true;
};

const enableRadio = () => {
  easy.disabled = false;
  medium.disabled = false;
  hard.disabled = false;
  letterInput.disabled = true; //Disable input before game start
};

easy.addEventListener("click", () => {
  difficulty = 5000;
});

medium.addEventListener("click", () => {
  difficulty = 3500;
});

hard.addEventListener("click", () => {
  difficulty = 2000;
});

//FIRES RANDOM NUMBER FUNCTION ON FIRST CLICK
//OTHER ACTIVITY IS CHANGING THE DOM ACCORDINGLY
button.addEventListener("click", () => {
  if (isActive === 0) {
    isActive = 1;
    button.innerHTML = "Stop";
    disableRadio();
    letterInput.focus();
    letterInput.placeholder = "";
    randomNumber();
    timer = setInterval(randomNumber, difficulty);
  } else {
    clearInterval(timer);
    isActive = 0;
    button.innerHTML = "Start";
    enableRadio();
    resetColors();
    resetCounters();
    letterInput.placeholder = "Input Letter";
    currentNumber.innerHTML = "0";
    pastNumbers = [];
    counter = 0;
  }
});

letterInput.addEventListener("keyup", () => {
  const input = letterInput.value.toLowerCase();
  letterInput.disabled = true;
  checkGuess(input);
  letterInput.value = "";
});
