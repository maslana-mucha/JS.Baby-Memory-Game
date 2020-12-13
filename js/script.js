const cards = document.querySelectorAll('.card');

let activeCard = '';
const activeCards = [];
let gameResult = 0;

let intervalIndex;
let seconds = 0;
let minutes = 0;

const timer = () => {
  const start = () => {
    seconds++;
    if (seconds == 60) {
      minutes++;
      seconds = 0;
    } else if (minutes == 60) {
      minutes = 0;
      seconds = 0;
    }

    document.querySelector('.timer').textContent = `${
      minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  intervalIndex = setInterval(start, 1200);
};

function matchCards() {
  let isMatched = activeCards[0].dataset.name === activeCards[1].dataset.name;
  isMatched
    ? gameResult++
    : activeCards.forEach((card) => card.classList.remove('flip'));

  activeCard = '';
  activeCards.length = 0;
  cards.forEach((card) => card.addEventListener('click', showCards));

  if (gameResult === 8) {
    clearInterval(intervalIndex);
    document.querySelector('.result').classList.add('active');
    document.querySelector('.player-time').textContent = `${
      minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
    const btnRestart = document.querySelector('.restart');
  }
}

function showCards() {
  activeCard = this;
  activeCard.classList.add('flip');

  if (activeCard == activeCards[0]) {
    return;
  }

  if (activeCards.length === 0) {
    activeCards[0] = activeCard;
    return;
  } else {
    cards.forEach((card) => card.removeEventListener('click', showCards));
    activeCards[1] = activeCard;
  }

  setTimeout(matchCards, 1000);
}

cards.forEach((card) => card.addEventListener('click', showCards));

function shuffle() {
  cards.forEach((card) => {
    let position = Math.floor(Math.random() * 16);
    card.style.order = position;
  });
}

shuffle();

document.querySelector('.restart').addEventListener('click', () => {
  window.location.reload(true);
});

document.addEventListener(
  'click',
  (event) => {
    // console.log(event);
    if (event.target.matches('.back')) {
      timer();
    }
  },
  {
    once: true,
  }
);
