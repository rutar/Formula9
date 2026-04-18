const DB_NAME = 'formula9';
const DB_VERSION = 1;
const STORE = 'sessions';

export function initDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = e => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: 'id', autoIncrement: true });
        store.createIndex('formula_id', 'formula_id', { unique: false });
      }
    };

    req.onsuccess = e => resolve(e.target.result);
    req.onerror = e => reject(e.target.error);
  });
}

export function saveResult({ formula_id, mode, correct, time_ms }) {
  return initDB().then(db => new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).add({ formula_id, mode, correct, time_ms, timestamp: Date.now() });
    tx.oncomplete = () => resolve();
    tx.onerror = e => reject(e.target.error);
  }));
}

export function getStats(formulas = []) {
  return initDB().then(db => new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly');
    const req = tx.objectStore(STORE).getAll();

    req.onsuccess = () => {
      const records = req.result;
      const total = records.length;
      const correct = records.filter(r => r.correct).length;
      const percent = total ? Math.round((correct / total) * 100) : 0;

      const topicById = {};
      formulas.forEach(f => { topicById[f.id] = f.topic; });

      const byTopic = {};
      const errorCount = {};

      for (const r of records) {
        if (r.formula_id) {
          if (!errorCount[r.formula_id]) errorCount[r.formula_id] = 0;
          if (!r.correct) errorCount[r.formula_id]++;
        }

        const topic = topicById[r.formula_id];
        if (topic) {
          if (!byTopic[topic]) byTopic[topic] = { total: 0, correct: 0 };
          byTopic[topic].total++;
          if (r.correct) byTopic[topic].correct++;
        }
      }

      const weakFormulas = Object.entries(errorCount)
        .filter(([, errors]) => errors > 0)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([formula_id, errors]) => ({ formula_id, errors }));

      resolve({ total, correct, percent, byTopic, weakFormulas });
    };

    req.onerror = e => reject(e.target.error);
  }));
}

export function getWeights(formulas) {
  return initDB().then(db => new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly');
    const req = tx.objectStore(STORE).getAll();

    req.onsuccess = () => {
      const records = req.result;
      const weights = {};

      for (const f of formulas) {
        weights[f.id] = 1.0;
      }

      for (const r of records) {
        if (!(r.formula_id in weights)) continue;
        if (r.correct) {
          weights[r.formula_id] = Math.max(0.2, weights[r.formula_id] * 0.8);
        } else {
          weights[r.formula_id] = Math.min(5.0, weights[r.formula_id] * 1.5);
        }
      }

      resolve(weights);
    };

    req.onerror = e => reject(e.target.error);
  }));
}

export function clearProgress() {
  return initDB().then(db => new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).clear();
    tx.oncomplete = () => resolve();
    tx.onerror = e => reject(e.target.error);
  }));
}
