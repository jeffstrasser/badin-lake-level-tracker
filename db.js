// db.js

// Open (or create) the database
const request = indexedDB.open('LakeLevelDB', 1);

request.onupgradeneeded = function(event) {
    const db = event.target.result;
    // Create an object store for lake level history
    const objectStore = db.createObjectStore('levels', { keyPath: 'id', autoIncrement: true });
    objectStore.createIndex('date', 'date', { unique: false });
};

request.onsuccess = function(event) {
    const db = event.target.result;
    console.log('Database opened successfully');
};

request.onerror = function(event) {
    console.error('Database error: ', event.target.error);
};

// Function to add a new lake level record
function addLakeLevel(level, date) {
    const dbRequest = indexedDB.open('LakeLevelDB', 1);
    dbRequest.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(['levels'], 'readwrite');
        const objectStore = transaction.objectStore('levels');
        const record = { level: level, date: date };
        objectStore.add(record);
    };
}

// Example usage
addLakeLevel(3.5, '2026-02-28 03:50:27');