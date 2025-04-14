// Helper: Save and load from localStorage
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
function loadData(key, defaultVal) {
    return JSON.parse(localStorage.getItem(key)) || defaultVal;
}

function loadData(key, defaultVal) {
    try {
        const data = JSON.parse(localStorage.getItem(key));
        if (Array.isArray(data)) {
            return data;
        }
        return defaultVal;
    } catch {
        return defaultVal;
    }
}

// Schedule Table
const scheduleTable = document.querySelector('#schedule-table tbody');
let scheduleData = loadData('scheduleData', []);

function renderSchedule() {
    scheduleTable.innerHTML = '';
    scheduleData.forEach((row, rowIndex) => {
        const tr = document.createElement('tr');
        for (let i = 0; i < 8; i++) {
            const td = document.createElement('td');
            td.contentEditable = true;
            td.innerText = row[i] || '';
            td.oninput = () => {
                scheduleData[rowIndex][i] = td.innerText;
                saveData('scheduleData', scheduleData);
            };
            tr.appendChild(td);
        }
        scheduleTable.appendChild(tr);
    });
}
function addRow() {
    scheduleData.push(Array(8).fill(''));
    saveData('scheduleData', scheduleData);
    renderSchedule();
}
renderSchedule();

function removeLastRow() {
    if (scheduleData.length > 0) {
        scheduleData.pop();  // Remove last row
        saveData('scheduleData', scheduleData);
        renderSchedule();
    }
}



// Flightboard
let flightboardLinks = loadData('flightboardLinks', []);
function renderFlightboardLinks() {
    const container = document.getElementById('flightboard-links');
    container.innerHTML = '';
    flightboardLinks.forEach((item, i) => {
        const div = document.createElement('div');
        div.innerHTML = `<a href="${item}" target="_blank">${item}</a>
            <button onclick="editFlightboard(${i})">Edit</button>
            <button onclick="deleteFlightboard(${i})">Delete</button>`;
        container.appendChild(div);
    });
}
function addFlightboardLink() {
    const link = prompt('Enter Flightboard link:');
    if (link) {
        flightboardLinks.push(link);
        saveData('flightboardLinks', flightboardLinks);
        renderFlightboardLinks();
    }
}
function editFlightboard(index) {
    const link = prompt('Edit link:', flightboardLinks[index]);
    if (link) {
        flightboardLinks[index] = link;
        saveData('flightboardLinks', flightboardLinks);
        renderFlightboardLinks();
    }
}
function deleteFlightboard(index) {
    flightboardLinks.splice(index, 1);
    saveData('flightboardLinks', flightboardLinks);
    renderFlightboardLinks();
}
renderFlightboardLinks();

// Clusters
let clusters = loadData('clusters', []);
function renderClusters() {
    const container = document.getElementById('clusters-container');
    container.innerHTML = '';
    clusters.forEach((name, i) => {
        const div = document.createElement('div');
        div.className = 'cluster-card';
        div.innerHTML = `
    <span onclick="location.href='cluster.html?name=${encodeURIComponent(clusters[i].name)}'">${clusters[i].name}</span>
    <div>
        <button onclick="editCluster(${i})">Edit</button>
        <button onclick="deleteCluster(${i})">Delete</button>
    </div>`;

        container.appendChild(div);
    });
}



function addCluster() {
    const name = prompt('Enter Cluster Name:');
    if (name) {
        clusters.push(name);
        saveData('clusters', clusters);
        renderClusters();
        document.getElementById('clusters-section').scrollIntoView({ behavior: 'smooth' });

    }
}
function editCluster(i) {
    const newName = prompt('Edit Cluster Name:', clusters[i]);
    if (newName) {
        clusters[i] = newName;
        saveData('clusters', clusters);
        renderClusters();
    }
}
function deleteCluster(i) {
    clusters.splice(i, 1);
    saveData('clusters', clusters);
    renderClusters();
}


renderClusters();

// Clock Sheet
let clockLinks = loadData('clockLinks', []);
function renderClusters() {
    const container = document.getElementById('clusters-container');
    container.innerHTML = '';
    clusters.forEach((cluster, i) => {
        const div = document.createElement('div');
        div.className = 'cluster-card';
        div.innerHTML = `
            <span onclick="location.href='cluster.html?name=${encodeURIComponent(cluster.name)}'">${cluster.name}</span>
            <div>
                <button onclick="editCluster(${i})">Edit</button>
                <button onclick="deleteCluster(${i})">Delete</button>
            </div>`;
        container.appendChild(div);
    });
}

function addCluster() {
    const name = prompt('Enter Cluster Name:');
    if (name) {
        clusters.push({ name }); // ✅ store as object with name
        saveData('clusters', clusters);
        renderClusters();
    }
}
function editClock(i) {
    const newLink = prompt('Edit Clock Sheet link:', clockLinks[i]);
    if (newLink) {
        clockLinks[i] = newLink;
        saveData('clockLinks', clockLinks);
        renderClockLinks();
    }
}
