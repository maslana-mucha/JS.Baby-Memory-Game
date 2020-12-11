const cards = document.querySelectorAll('.card');
const time = document.querySelector('.timer');

let activeCard = '';
const activeCards = [];
let gameResult = 0;
let seconds = 0;
let minutes = 0;

function timer() {
  const start = () => {
    seconds++;
    console.log(seconds);
    if (seconds == 60) {
      minutes++;
      seconds = 0;
    } else if (minutes == 60) {
      minutes = 0;
      seconds = 0;
    }

    time.textContent = `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
  };

  id = setInterval(start, 1000);
}

function matchCards() {
  let isMatched = activeCards[0].dataset.name === activeCards[1].dataset.name;
  if (!isMatched) {
    activeCards.forEach((card) => card.classList.remove('flip'));
    console.log('nie ma pary!');
  } else if (isMatched) {
    console.log('trafiony-zatopiony');
    gameResult++;
  }

  activeCard = '';
  activeCards.length = 0;
  cards.forEach((card) => card.addEventListener('click', showCards));

  if (gameResult === 8) {
    finishGame();
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

  setTimeout(matchCards, 1200);
}

const finishGame = () => {
  console.log('skończyłeś grę');
  document.querySelector('.result').classList.add('active');
};

cards.forEach((card) => card.addEventListener('click', showCards));

document.addEventListener(
  'click',
  (event) => {
    console.log(event);
    if (event.target.matches('.back')) {
      timer();
    }
  },
  {
    once: true,
  }
);
