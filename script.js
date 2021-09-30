const gameContainer = document.getElementById("game");
localStorage.setItem("score", Infinity);
let clkCards = [];
let moves = 0;
let score = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "black",
  "black"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color in colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(colorArray[color]);
    newDiv.setAttribute("id", color);
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
  document.querySelector(".score").innerHTML = `<h3>MOVE: 0</h3><br/><h3>SCORE: 0</h3>`;

  // const newDiv = document.createElement("div");
  // newDiv.classList.add("scoreCard");
  // gameContainer.prepend(newDiv);

}

// TODO: Implement this function!

function handleCardClick(event) {

  clkCards.push(event.target);

  const numOfCards = clkCards.length;
  if (numOfCards <= 2) {

    const eventId = clkCards[numOfCards - 1].getAttribute("id");
    const eventClass = clkCards[numOfCards - 1].getAttribute("class");
    document.getElementById(eventId).style.backgroundColor = eventClass;
    moves++;
    document.querySelector(".score").innerHTML = `<h3>MOVE: ${moves}</h3><br/><h3>SCORE: ${score}</h3>`;

    // console.log(eventId)
    event.target.classList.toggle("flip");

  }

  if (numOfCards == 2) {
    // console.log(clkCards);

    const isSameCard = clkCards[0].getAttribute("id") === clkCards[1].getAttribute("id");

    if (!isSameCard) {

      const card1 = clkCards[0].getAttribute("class");
      const card2 = clkCards[1].getAttribute("class");

      console.log("match", moves);

      if (card1 === card2) {
        score++;
        document.querySelector(".score").innerHTML = `<h3>MOVE: ${moves}</h3><br/><h3>SCORE: ${score}</h3>`;

        clkCards[0].removeEventListener("click", handleCardClick);
        clkCards[1].removeEventListener("click", handleCardClick)
        clkCards = [];
      }
      else {
        setTimeout(() => {
          clkCards[0].classList.toggle("flip");
          clkCards[1].classList.toggle("flip");

          let eventId = clkCards[0].getAttribute("id");
          document.getElementById(eventId).style.backgroundColor = "white";
          console.log(clkCards)
          eventId = clkCards[1].getAttribute("id");
          document.getElementById(eventId).style.backgroundColor = "white";
          console.log(clkCards)
          clkCards = [];
          console.log("done")
        }, 1000)
      }
    }
    else {
      clkCards.shift(1);
      console.log(clkCards);
    }

  }

  if (score === COLORS.length / 2) {
    document.querySelector(".backDrop").style.display = "flex";
    checkScore(moves);
  }

}

function startGame() {
  document.querySelector(".backDrop").style.display = "none";
  const container = document.querySelector('#game');
  removeAllChildNodes(container);
  moves = 0;
  score = 0;
  createDivsForColors(shuffledColors);
  document.querySelector("#game").style.left = "0";
}

// when the DOM loads
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function checkScore(moves) {
  const bestScore = localStorage.getItem("score");
  if (bestScore > moves) {
    localStorage.setItem("score", moves);
  }
  document.querySelector("h1").innerText = "Congratulations";
  document.querySelector(".finalScore").innerHTML = `Best score: ${localStorage.getItem("score")}<br/>Your score: ${moves}`;
  document.querySelector("#main-btn").innerText = "RESET";
}