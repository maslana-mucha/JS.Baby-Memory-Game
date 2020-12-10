const cards = document.querySelectorAll('.card');
console.log(cards);

cards.forEach((card) => card.addEventListener('click', showCard));

function showCard() {
  const exact = this.querySelector('.front');
  console.log(exact);
}
