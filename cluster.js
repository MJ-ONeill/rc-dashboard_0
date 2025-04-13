// cluster.js

const params = new URLSearchParams(window.location.search);
const clusterName = params.get('name');

function goHome() {
    window.location.href = 'index.html';
}

if (clusterName) {
    document.title = `${clusterName} - Cluster Dashboard`;
    document.getElementById('cluster-title').innerText = `Control Center For: ${clusterName}`;
}

// Unique keys for storing cluster-specific data
const clusterKey = (key) => `${clusterName}_${key}`;

// Utility functions
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadData(key, defaultVal) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultVal;
}

// ---- Links ----
let links = loadData(clusterKey('links'), []);

function renderLinks() {
    const container = document.getElementById('link-list');
    container.innerHTML = '';
    links.forEach((link, i) => {
        const div = document.createElement('div');
        div.className = 'link-item';
        div.innerHTML = `
            <a href="${link.url}" target="_blank">${link.title}</a>
            <div class="card-actions">
                <button onclick="editLink(${i})">Edit</button>
                <button onclick="deleteLink(${i})">Delete</button>
            </div>
        `;
        container.appendChild(div);
    });
}

function addLink() {
    const url = prompt('Enter a link URL:');
    const title = prompt('Enter a title for this link:');
    if (url && title) {
        links.push({ url, title });
        saveData(clusterKey('links'), links);
        renderLinks();
    }
}

function editLink(index) {
    const link = links[index];
    const newUrl = prompt('Edit the link URL:', link.url);
    const newTitle = prompt('Edit the link title:', link.title);
    if (newUrl && newTitle) {
        links[index] = { url: newUrl, title: newTitle };
        saveData(clusterKey('links'), links);
        renderLinks();
    }
}

function deleteLink(index) {
    links.splice(index, 1);
    saveData(clusterKey('links'), links);
    renderLinks();
}

renderLinks();

// ---- Notes ----
let notes = loadData(clusterKey('notes'), []);

function renderNotes() {
    const container = document.getElementById('note-grid');
    container.innerHTML = '';
    notes.forEach((note, i) => {
        const div = document.createElement('div');
        div.className = 'note-card';

        const formattedContent = note
            .split('\n')
            .map(line => `<li>${line}</li>`)  // Show as list
            .join('');

        div.innerHTML = `
            <ul>${formattedContent}</ul>
            <div class="card-actions">
                <button data-index="${i}" class="edit-note">Edit</button>
                <button data-index="${i}" class="delete-note">Delete</button>
            </div>
        `;
        container.appendChild(div);
    });

    document.querySelectorAll('.edit-note').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            editNote(index);
        });
    });

    document.querySelectorAll('.delete-note').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            deleteNote(index);
        });
    });
}

function addNote() {
    const container = document.getElementById('note-grid');

    const wrapper = document.createElement('div');
    const textarea = document.createElement('textarea');
    const saveBtn = document.createElement('button');

    textarea.placeholder = 'Enter your note (each line becomes a list item)';
    saveBtn.innerText = 'Save Note';

    wrapper.className = 'note-input-wrapper';
    wrapper.appendChild(textarea);
    wrapper.appendChild(saveBtn);

    container.prepend(wrapper); // 👈 puts the form at the top of the notes section
    textarea.focus();

    saveBtn.addEventListener('click', () => {
        const note = textarea.value.trim();
        if (note) {
            notes.push(note);
            saveData(clusterKey('notes'), notes);
            renderNotes();
        }
        wrapper.remove();
    });
}


function editNote(index) {
    const updated = prompt('Edit Note (use Enter for new lines):', notes[index]);
    if (updated !== null) {
        notes[index] = updated;
        saveData(clusterKey('notes'), notes);
        renderNotes();
    }
}

function deleteNote(index) {
    notes.splice(index, 1);
    saveData(clusterKey('notes'), notes);
    renderNotes();
}

renderNotes();

// ---- Cards ----
let cards = loadData(clusterKey('cards'), []);

function renderCards() {
    const container = document.getElementById('card-grid');
    container.innerHTML = '';
    cards.forEach((card, i) => {
        const div = document.createElement('div');
        div.className = 'card';
        const contentLines = card.content.split('\n').map(line => `<li>${line}</li>`).join('');
        div.innerHTML = `
            <div class="card-title">${card.title}</div>
            <ul class="card-content">${contentLines}</ul>
            <div class="card-actions">
                <button data-index="${i}" class="edit-card">Edit</button>
                <button data-index="${i}" class="delete-card">Delete</button>
            </div>
        `;
        container.appendChild(div);
    });

    document.querySelectorAll('.edit-card').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            editCard(index);
        });
    });

    document.querySelectorAll('.delete-card').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            deleteCard(index);
        });
    });
}

function addCard() {
    const container = document.getElementById('card-grid');

    const wrapper = document.createElement('div');
    const titleInput = document.createElement('input');
    const textarea = document.createElement('textarea');
    const saveBtn = document.createElement('button');

    titleInput.placeholder = 'Card title';
    textarea.placeholder = 'Enter card content (each line becomes a list item)';
    saveBtn.innerText = 'Save Card';

    wrapper.className = 'card-input-wrapper';
    wrapper.appendChild(titleInput);
    wrapper.appendChild(textarea);
    wrapper.appendChild(saveBtn);

    container.prepend(wrapper); // 👈 puts the form inside card section
    titleInput.focus();

    saveBtn.addEventListener('click', () => {
        const title = titleInput.value.trim();
        const content = textarea.value.trim();
        if (title && content) {
            cards.push({ title, content });
            saveData(clusterKey('cards'), cards);
            renderCards();
        }
        wrapper.remove();
    });
}

function editCard(index) {
    const card = cards[index];
    const newTitle = prompt('Edit title:', card.title);
    const newContent = prompt('Edit content (use Enter for new lines):', card.content);
    if (newTitle && newContent) {
        cards[index] = { title: newTitle, content: newContent };
        saveData(clusterKey('cards'), cards);
        renderCards();
    }
}

function deleteCard(index) {
    cards.splice(index, 1);
    saveData(clusterKey('cards'), cards);
    renderCards();
}

renderCards();
