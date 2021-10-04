const gameContainer = document.getElementById("game");
// localStorage.setItem("score", 0);
let clkCards = [];
let moves = 0;
let score = 0;
let cardsLength;

// const COLORS = [
//   "red",
//   "green",
//   "orange",
//   "purple",
//   "blue",
//   "black",
//   "white",
//   "grey"
// ];

const COLORS = [
  './gifs/1.gif',
  './gifs/2.gif',
  './gifs/3.gif',
  './gifs/4.gif',
  './gifs/5.gif',
  './gifs/6.gif',
  './gifs/7.gif',
  './gifs/8.gif',
  './gifs/9.gif',
  './gifs/10.gif',
  './gifs/11.gif',
  './gifs/12.gif'
]

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
    newDiv.style.backgroundSize = "cover";
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

  console.log("Cards length", cardsLength);
  clkCards.push(event.target);

  const numOfCards = clkCards.length;

  if (numOfCards <= 2) {

    const eventId = clkCards[numOfCards - 1].getAttribute("id");
    const eventClass = clkCards[numOfCards - 1].getAttribute("class");
    moves++;

    document.getElementById(eventId).style.backgroundImage = `url(${eventClass})`;
    document.getElementById(eventId).style.backgroundSize = "cover";

    document.querySelector(".score").innerHTML = `<h3>MOVE: ${moves}</h3><br/><h3>SCORE: ${score}</h3>`;

    event.target.classList.toggle("flip");
  }

  if (numOfCards == 2) {

    const isSameCard = clkCards[0].getAttribute("id") === clkCards[1].getAttribute("id");

    if (!isSameCard) {

      const card1 = clkCards[0].getAttribute("class");
      const card2 = clkCards[1].getAttribute("class");

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

          const card1 = clkCards[0].getAttribute("id");
          document.getElementById(card1).style.backgroundImage = " url('./img/joker1.jpg')";

          const card2 = clkCards[1].getAttribute("id");
          document.getElementById(card2).style.backgroundImage = " url('./img/joker1.jpg')";

          clkCards = [];
        }, 1000)
      }
    }
    else {
      clkCards.shift(1);
      console.log(clkCards);
    }

  }

  if (score === cardsLength / 2) {
    document.querySelector(".backDrop").style.display = "flex";
    checkScore(moves);
  }

}

// when the DOM loads
function startGame() {
  var level = document.getElementsByTagName('select')[0].value;

  document.querySelector(".backDrop").style.display = "none";

  const container = document.querySelector('#game');
  removeAllChildNodes(container);

  moves = 0;
  score = 0;

  const cards = selectLevel(level);
  let shuffledColors = shuffle(cards);
  createDivsForColors(shuffledColors);

  const bestscore=localStorage.getItem("score") ?? 0;
  document.querySelector(".bestScore").innerHTML = `<h2>BEST SCORE: ${bestscore}`;
  document.querySelector("#game").style.left = "0";
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function checkScore(moves) {
  const bestScore = localStorage.getItem("score");

  if (bestScore > moves || bestScore == "0") {
    localStorage.setItem("score", moves);
  }

  document.querySelector("h1").innerText = "Congratulations";
  document.querySelector(".finalScore").innerHTML = `Best score: ${localStorage.getItem("score")}<br/>Your score: ${moves}`;
  document.querySelector("select").style.display = "none";

  document.querySelector("#main-btn2").style.display = "block"
  document.querySelector("#main-btn2").innerText="LEVEL"
  document.querySelector("#main-btn2").setAttribute("onclick","location.reload()")
  document.querySelector("#main-btn").innerText = "RESTART";
}

function selectLevel(level) {
  let cards;
  if (level == 1) {
    let colors = COLORS.slice(0, 4);
    cards = colors.concat(colors);
    cardsLength = cards.length;
  }
  else if (level == 2) {
    let colors = COLORS.slice(0, 6);
    cards = colors.concat(colors);

  }
  else {
    let colors = COLORS.slice(0, 8);
    cards = colors.concat(colors);
  }

  console.log(cards)
  return cards;
}

function reset() {
  document.querySelector(".backDrop").style.display = "flex";
  document.querySelector("h1").innerText = "RESET";
  document.querySelector(".finalScore").innerHTML = `Do you want to reset<br><br>`;
  document.querySelector("select").style.display = "none";
  document.querySelector("#main-btn2").style.display = "block"
  document.querySelector("#main-btn2").innerText="CANCEL"
  document.querySelector("#main-btn2").setAttribute("onclick","cancel()")
  document.querySelector("#main-btn").innerText = "RESET";
}

function cancel(){
  document.querySelector(".backDrop").style.display = "none";
}