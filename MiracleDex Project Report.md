# ✨ MiracleDex Project Report

**Student Name:** Eduardo Costa Martiniano
**Course:** CSCI 270 – Web/Mobile App Development  
**Project Title:** MiracleDex  
**Submission Date:** 6/3/2025
**GitHub Repo:** [Paste link here]  
**Live Site (GitHub Pages):** [Paste link here]  

---

## 🔷 Part 1 — HTML/CSS Layout and Responsive Design

### ✅ Requirements Addressed
- [x] Landing page created with heading and container
- [x] Used Flexbox or Grid layout
- [x] Mobile-friendly design with media queries
- [x] Elegant, reverent styling with a Google Font
- [x] External CSS file used

### 📸 Screenshots

>**Desktop View:**
![Desktop screenshot](assets/Screenshot1.png)

>**Mobile View:**
![Mobile screenshot](assets/Screenshot4.png)

### 🔍 Code Snippets
### `index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MiracleDex</title>
  <link rel="stylesheet" href="styles.css" />
  <link href="https://fonts.googleapis.com/css2?family=EB+Garamond&display=swap" rel="stylesheet">
</head>
<body>
  <header>
    <h1>MiracleDex</h1>
    <p class="subtitle">A catalog of miraculous signs throughout history.</p>
  </header>

  <main>
    <section class="card-grid">
      <!-- Miracle cards will be injected here by JavaScript -->
    </section>
  </main>
</body>
</html>
```

### `styles.css`
```css
body {
  font-family: 'EB Garamond', serif;
  margin: 0;
  padding: 0;
  background-color: #f8f5f0;
  color: #333;
}

header {
  text-align: center;
  padding: 2rem 1rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h1 {
  margin: 0;
  font-size: 2.5rem;
}

.subtitle {
  font-size: 1.25rem;
  margin-top: 0.5rem;
  color: #666;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
}

.card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 1rem;
}

@media (max-width: 600px) {
  h1 {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .card-grid {
    padding: 1rem;
    gap: 1rem;
  }
}
```

### 🖋️ Reflection
**What challenges did you face in designing a responsive layout? What did you learn about structuring HTML/CSS for real-world use?**
I did not face many challenges with the responsive layout since I have worked with HTML and CSS before. Using CSS Grid with `auto-fit` and `minmax()` made the layout flexible across screen sizes, and adding a media query for mobile was straightforward. This part of the project mostly reinforced best practices I have learned before.

---

## 🔷 Part 2 — JavaScript + DOM + JSON Integration

### ✅ Requirements Addressed
- [x] Fetched data from:  
  `https://gist.githubusercontent.com/trevortomesh/7bbf97b2fbae96639ebf1a254b6a7a70/raw/miracles.json`
- [x] Rendered miracle title, location, year, summary
- [x] Used `fetch()` and `async/await`
- [x] Implemented "Load More" or pagination
- [x] Added modal or expandable section with full miracle details

### 📸 Screenshots

>**Miracle Cards (initial view):**
![Miracle cards](assets/Screenshot3.png)

>**Modal View (expanded card):**
![Modal view](assets/Screenshot4.png)

### 🔍 Code Snippets
### `index.html`
```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MiracleDex</title>
  <link rel="stylesheet" href="styles.css" />
  <link href="https://fonts.googleapis.com/css2?family=EB+Garamond&display=swap" rel="stylesheet">
  <script src="script.js" defer></script>
</head>
```

### `syles.css`
```css
.load-more {
  display: block;
  margin: 2rem auto;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background-color: #ddd;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 600px;
  width: 90%;
  position: relative;
}

.close {
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  font-size: 1.5rem;
  cursor: pointer;
}
```

### `script.js`
```js
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
```

### 🖋️ Reflection
**What did you learn about asynchronous JavaScript? What debugging techniques did you use or discover?**
Since I’ve worked with asynchronous JavaScript before, most of this part was straightforward. I did run into an issue early on when I forgot to add `defer` to the script tag, so JavaScript tried to access `.card-grid` before it existed, which caused an error. Using the browser console helped me catch that quickly, and once I added `defer`, everything loaded in the right order and the fetch/render process worked smoothly. It was a good reminder of how small setup details can break otherwise solid code.

---

## 🔷 Part 3 — GitHub Repository and Documentation

### ✅ Requirements Addressed
- [x] GitHub repo created and pushed
- [x] GitHub Pages deployed
- [x] `README.md` contains project description, instructions, and screenshots

### 📎 Links
- **GitHub Repo:** [Paste link here]  
- **Live GitHub Pages Site:** [Paste link here]

### 🖋️ Reflection
How did using GitHub affect your development process? What new Git or GitHub skills did you gain?

---

## 🧠 Final Reflection

Imagine you're explaining this project to a friend who doesn’t code. What does your app do? What are you most proud of? What was the hardest part to get working?

Reflect on both the technical and the spiritual aspects of building a project about Catholic miracles.

---

