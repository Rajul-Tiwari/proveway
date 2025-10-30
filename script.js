// keep it simple and readable
const priceByUnits = { 1: 10, 2: 18, 3: 24 };

const formEl = document.getElementById('bogoForm');
const totalEl = document.getElementById('totalPrice');
const addBtn = document.getElementById('addToCart');
const cards = Array.from(document.querySelectorAll('.card'));

function money(n){
  return `$${n.toFixed(2)} USD`;
}

function updateTotal(){
  const checked = formEl.querySelector('input[name="plan"]:checked');
  if (!checked) {
    totalEl.textContent = '';
    return;
  }
  const units = checked ? Number(checked.value) : 2;
  totalEl.textContent = money(priceByUnits[units]);
}

function openCard(card){
  cards.forEach(c => c.classList.toggle('open', c === card));
}

// open and update when plan changes
formEl.addEventListener('change', (e) => {
  if(e.target && e.target.matches('input[name="plan"]')){
    openCard(e.target.closest('.card'));
    updateTotal();
  }
});

// clicking anywhere on the label should open that card
cards.forEach((card) => {
  card.addEventListener('click', () => {
    const radio = card.querySelector('input[type="radio"]');
    if(radio){ openCard(card); }
  });
});

addBtn.addEventListener('click', () => {
  const checked = formEl.querySelector('input[name="plan"]:checked');
  const units = checked ? Number(checked.value) : 2;
  alert(`Added ${units} unit(s) — Total ${money(priceByUnits[units])}`);
});

function readCurrentSelections(){
  const currentCard = formEl.querySelector('.card.open');
  if(!currentCard) return [];
  const rows = currentCard.querySelectorAll('.variants-row');
  return Array.from(rows).map((row, i) => {
    const size = row.querySelector('select[id^="size-"]');
    const color = row.querySelector('select[id^="color-"]');
    return { index: i + 1, size: size ? size.value : null, color: color ? color.value : null };
  });
}

// set initial UI: nothing selected, nothing open
cards.forEach(card => card.classList.remove('open'));
updateTotal();


