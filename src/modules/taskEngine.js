import { formulas } from '../data/formulas.js';

const MODES = ['choice', 'blocks', 'input'];

function weightedRandom(items, weightFn) {
  const weights = items.map(weightFn);
  const total = weights.reduce((s, w) => s + w, 0);
  let r = Math.random() * total;
  for (let i = 0; i < items.length; i++) {
    r -= weights[i];
    if (r <= 0) return items[i];
  }
  return items[items.length - 1];
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function getNextTask(history = [], weights = {}) {
  const lastEntry = history[history.length - 1];
  const lastMode = lastEntry?.mode ?? null;
  const lastId = lastEntry?.formula_id ?? null;

  const formula = weightedRandom(formulas, f => weights[f.id] ?? 1.0);

  const availableModes = MODES.filter(m => m !== lastMode);
  const modeWeights = availableModes.map(m => {
    // slightly prefer modes not recently used
    const recentUse = history.slice(-6).filter(h => h.mode === m).length;
    return Math.max(1, 3 - recentUse);
  });

  const totalModeWeight = modeWeights.reduce((s, w) => s + w, 0);
  let r = Math.random() * totalModeWeight;
  let mode = availableModes[availableModes.length - 1];
  for (let i = 0; i < availableModes.length; i++) {
    r -= modeWeights[i];
    if (r <= 0) { mode = availableModes[i]; break; }
  }

  return { formula, mode };
}

export function buildChoiceTask(formula) {
  const pool = formula.wrong_options ?? [];
  const wrongs = shuffle(pool).slice(0, 3);

  // pad with placeholders if not enough wrong options
  while (wrongs.length < 3) {
    wrongs.push(`${formula.correct_latex} + 1`);
  }

  const correctPos = Math.floor(Math.random() * 4);
  const options = [...wrongs];
  options.splice(correctPos, 0, formula.correct_latex);

  return {
    question: formula.name,
    options,
    correct_index: correctPos,
  };
}

export function buildBlocksTask(formula) {
  const blocks = shuffle(formula.blocks ?? []);
  return {
    question: formula.name,
    blocks,
  };
}

export function buildInputTask(formula) {
  return {
    question: formula.name,
  };
}
