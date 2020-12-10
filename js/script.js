const cards = document.querySelectorAll('.card');

let activeCard = '';
const activeCards = [];

function matchCards() {
  console.log('wywolana');
  let isMatched = activeCards[0].dataset.name === activeCards[1].dataset.name;
  if (!isMatched) {
    activeCards.forEach((card) => card.classList.remove('flip'));
    console.log('nie ma pary!');
  } else if (isMatched) {
    console.log('trafiony-zatopiony');
  }

  activeCard = '';
  activeCards.length = 0;
  cards.forEach((card) => card.addEventListener('click', showCards));
}

function showCards() {
  activeCard = this;
  activeCard.classList.add('flip');

  if (activeCard == activeCards[0]) {
    return;
  }

  if (activeCards.length === 0) {
    console.log('first card');
    activeCards[0] = activeCard;
    return;
  } else {
    console.log('second card');
    cards.forEach((card) => card.removeEventListener('click', showCards));
    activeCards[1] = activeCard;
  }

  setTimeout(matchCards, 1500);
}

cards.forEach((card) => card.addEventListener('click', showCards));
