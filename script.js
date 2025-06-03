const cardGrid = document.querySelector('.card-grid');
const loadMoreBtn = document.createElement('button');
loadMoreBtn.textContent = "Load More";
loadMoreBtn.className = "load-more";
document.body.appendChild(loadMoreBtn);

let allMiracles = [];
let visibleCount = 0;
const batchSize = 6;

async function loadMiracles() {
  const res = await fetch("https://gist.githubusercontent.com/trevortomesh/7bbf97b2fbae96639ebf1a254b6a7a70/raw/miracles.json");
  const data = await res.json();
  allMiracles = data;
  showNextBatch();
}

function showNextBatch() {
  const next = allMiracles.slice(visibleCount, visibleCount + batchSize);
  next.forEach(renderMiracleCard);
  visibleCount += batchSize;

  if (visibleCount >= allMiracles.length) {
    loadMoreBtn.style.display = 'none';
  }
}

function renderMiracleCard(miracle) {
  const card = document.createElement('div');
  card.classList.add('card');

  const title = document.createElement('h3');
  title.textContent = miracle.title;

  const location = document.createElement('p');
  location.textContent = `📍 ${miracle.location}`;

  const year = document.createElement('p');
  year.textContent = `🗓️ ${miracle.year}`;

  const summary = document.createElement('p');
  summary.textContent = miracle.summary;

  card.appendChild(title);
  card.appendChild(location);
  card.appendChild(year);
  card.appendChild(summary);

  card.addEventListener('click', () => showModal(miracle));
  cardGrid.appendChild(card);
}

function showModal(miracle) {
  const modal = document.createElement('div');
  modal.classList.add('modal');

  const content = document.createElement('div');
  content.classList.add('modal-content');

  const close = document.createElement('span');
  close.classList.add('close');
  close.textContent = "×";
  close.onclick = () => modal.remove();

  const details = `
    <h2>${miracle.title}</h2>
    <p><strong>Location:</strong> ${miracle.location}</p>
    <p><strong>Year:</strong> ${miracle.year}</p>
    <p><strong>Category:</strong> ${miracle.category}</p>
    <p><strong>Type:</strong> ${miracle.type}</p>
    <p>${miracle.details}</p>
  `;

  content.innerHTML = details;
  content.prepend(close);
  modal.appendChild(content);
  document.body.appendChild(modal);
}

loadMoreBtn.addEventListener('click', showNextBatch);
loadMiracles();