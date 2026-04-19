import { initDB, getStats, saveResult, getWeights, clearProgress } from './progress.js';
import { formulas } from '../data/formulas.js';
import { getNextTask, buildChoiceTask, buildBlocksTask, buildInputTask } from './taskEngine.js';
import { checkChoice, checkBlocks, checkInput } from './checker.js';
import { getLanguage, getLanguageOptions, getTopicName, localizeFormula, setLanguage, t } from './i18n.js';

function track(event, params = {}) {
  if (typeof gtag === 'function') gtag('event', event, params);
}

const app = document.getElementById('app');
let currentScreen = null;
let cleanupScreen = null;
const history = [];
const HISTORY_MAX = 10;
const BRAND_TEXT_CODES = [80, 114, 111, 100, 117, 99, 101, 100, 32, 98, 121, 32, 114, 117, 116, 97, 114];
const BRAND_AUTHOR_CODES = [114, 117, 116, 97, 114];

function decodeCharCodes(codes) {
  return String.fromCharCode(...codes);
}

function applyBranding() {
  const brandText = decodeCharCodes(BRAND_TEXT_CODES);
  const brandEl = document.querySelector('.site-brand');
  if (brandEl) {
    brandEl.textContent = brandText;
    brandEl.setAttribute('aria-label', brandText);
    brandEl.removeAttribute('aria-hidden');
  }

  const authorMeta = document.querySelector('meta[name="author"]');
  if (authorMeta) {
    authorMeta.setAttribute('content', decodeCharCodes(BRAND_AUTHOR_CODES));
  }
}

function isTouchDevice() {
  return window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0;
}

function runScreenCleanup() {
  if (!cleanupScreen) return;
  cleanupScreen();
  cleanupScreen = null;
}

export async function init() {
  await initDB();
  applyBranding();
  setLanguage(getLanguage());
  navigate('home');
}

export function navigate(screen, data = {}) {
  runScreenCleanup();
  currentScreen = screen;
  app.innerHTML = '';

  switch (screen) {
    case 'home':   renderHome();         break;
    case 'task':   renderTask();         break;
    case 'result': renderResult(data);   break;
    case 'stats':  renderStats();        break;
    default:       renderHome();
  }
}

async function renderHome() {
  const stats = await getStats(formulas);
  const statLabel = stats.total ? t('homeStatWithTotal', { total: stats.total }) : t('homeStatNoData');
  const currentLanguage = getLanguage();
  const currentOption = getLanguageOptions().find(({ value }) => value === currentLanguage) ?? getLanguageOptions()[0];
  const languageOptions = getLanguageOptions()
    .map(({ value, label, flagSrc, flagAlt }) => `
      <button type="button" class="language-option" data-language="${value}">
        <img class="language-flag" src="${flagSrc}" alt="${flagAlt}" />
        <span>${label}</span>
      </button>
    `)
    .join('');

  const el = document.createElement('div');
  el.className = 'screen screen-home';
  el.innerHTML = `
    <div class="home-header">
      <h1 class="home-title">Formula9</h1>
      <p class="home-subtitle">${t('homeSubtitle')}</p>
    </div>
    <details class="language-picker">
      <summary class="language-trigger">
        <span class="language-trigger__label">${t('homeLanguageLabel')}</span>
        <span class="language-trigger__value">
          <img class="language-flag" src="${currentOption.flagSrc}" alt="${currentOption.flagAlt}" />
          <span>${currentOption.label}</span>
        </span>
      </summary>
      <div class="language-menu">${languageOptions}</div>
    </details>
    <div class="home-stat">
      <span class="stat-percent">${stats.percent}%</span>
      <span class="stat-label">${statLabel}</span>
    </div>
    <div class="home-actions">
      <button class="btn btn-primary" id="btn-start">${t('homeStart')}</button>
      <button class="btn btn-secondary" id="btn-stats">${t('homeStats')}</button>
    </div>
  `;

  app.appendChild(el);

  el.querySelectorAll('.language-option').forEach((button) => {
    button.addEventListener('click', () => {
      setLanguage(button.dataset.language);
      navigate('home');
    });
  });
  el.querySelector('#btn-start').addEventListener('click', () => navigate('task'));
  el.querySelector('#btn-stats').addEventListener('click', () => navigate('stats'));
}

async function renderTask() {
  const placeholder = document.createElement('div');
  placeholder.className = 'screen screen-task';
  placeholder.innerHTML = `<p class="task-loading">${t('taskLoading')}</p>`;
  app.appendChild(placeholder);

  const weights = await getWeights(formulas);
  const { formula: rawFormula, mode } = getNextTask(history, weights);
  const formula = localizeFormula(rawFormula);
  track('task_started', { formula_id: formula.id, mode });

  app.innerHTML = '';
  if (mode === 'blocks') {
    renderBlocksTask(formula);
  } else if (mode === 'input') {
    renderInputTask(formula);
  } else {
    renderChoiceTask(formula);
  }
}

function renderChoiceTask(formula) {
  const task = buildChoiceTask(formula);
  const startTime = Date.now();

  const el = document.createElement('div');
  el.className = 'screen screen-task';

  const header = document.createElement('div');
  header.className = 'task-header';

  const title = document.createElement('h2');
  title.className = 'task-title';
  title.textContent = formula.name;

  const prompt = document.createElement('p');
  prompt.className = 'task-prompt';
  prompt.textContent = t('choicePrompt');

  header.appendChild(title);
  header.appendChild(prompt);

  const grid = document.createElement('div');
  grid.className = 'choice-grid';

  const footer = document.createElement('div');
  footer.className = 'task-footer task-footer--hidden';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'btn btn-primary';
  nextBtn.textContent = t('next');
  footer.appendChild(nextBtn);

  el.appendChild(header);
  el.appendChild(grid);
  el.appendChild(footer);
  app.appendChild(el);

  let answered = false;
  let wasCorrect = false;

  task.options.forEach((latex, i) => {
    const btn = document.createElement('button');
    btn.className = 'btn choice-btn';

    try {
      btn.innerHTML = katex.renderToString(latex, { throwOnError: false });
    } catch {
      btn.textContent = latex;
    }

    btn.addEventListener('click', () => {
      if (answered) return;
      answered = true;

      const { correct } = checkChoice(i, task.correct_index);
      wasCorrect = correct;
      track(correct ? 'task_correct' : 'task_wrong', { formula_id: formula.id, mode: 'choice' });

      grid.querySelectorAll('.choice-btn').forEach((b, j) => {
        b.disabled = true;
        if (j === task.correct_index) {
          b.classList.add('choice-correct');
        } else if (j === i) {
          b.classList.add('choice-wrong');
        }
      });

      footer.classList.remove('task-footer--hidden');
    });

    grid.appendChild(btn);
  });

  nextBtn.addEventListener('click', async () => {
    const timeMs = Date.now() - startTime;

    history.push({ formula_id: formula.id, mode: 'choice' });
    if (history.length > HISTORY_MAX) history.shift();

    await saveResult({ formula_id: formula.id, topic: formula.topic, mode: 'choice', correct: wasCorrect, time_ms: timeMs });
    navigate('result', { correct: wasCorrect, formula });
  });
}

function renderBlocksTask(formula) {
  const task = buildBlocksTask(formula);
  const startTime = Date.now();

  const answerBlocks = [];
  const bottomBlocks = [...task.blocks];

  const el = document.createElement('div');
  el.className = 'screen screen-task';

  const header = document.createElement('div');
  header.className = 'task-header';

  const title = document.createElement('h2');
  title.className = 'task-title';
  title.textContent = formula.name;

  const prompt = document.createElement('p');
  prompt.className = 'task-prompt';
  prompt.textContent = t('blocksPrompt');

  header.appendChild(title);
  header.appendChild(prompt);

  const answerZone = document.createElement('div');
  answerZone.className = 'blocks-answer';

  const blocksArea = document.createElement('div');
  blocksArea.className = 'blocks-source';

  const checkBtn = document.createElement('button');
  checkBtn.className = 'btn btn-primary';
  checkBtn.textContent = t('check');
  checkBtn.disabled = true;

  const footer = document.createElement('div');
  footer.className = 'task-footer task-footer--hidden';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'btn btn-primary';
  nextBtn.textContent = t('next');
  footer.appendChild(nextBtn);

  el.appendChild(header);
  el.appendChild(answerZone);
  el.appendChild(blocksArea);
  el.appendChild(checkBtn);
  el.appendChild(footer);
  app.appendChild(el);

  let checked = false;
  let wasCorrect = false;

  function renderToken(token, onClick) {
    const btn = document.createElement('button');
    btn.className = 'block-token';
    try {
      btn.innerHTML = katex.renderToString(token, { throwOnError: false });
    } catch {
      btn.textContent = token;
    }
    btn.addEventListener('click', onClick);
    return btn;
  }

  function renderAnswerZone() {
    answerZone.innerHTML = '';
    answerBlocks.forEach((token, i) => {
      const btn = renderToken(token, () => {
        answerBlocks.splice(i, 1);
        bottomBlocks.push(token);
        renderAnswerZone();
        renderBottomBlocks();
        checkBtn.disabled = answerBlocks.length === 0;
      });
      answerZone.appendChild(btn);
    });
    if (checked) {
      answerZone.classList.toggle('blocks-answer--correct', wasCorrect);
      answerZone.classList.toggle('blocks-answer--wrong', !wasCorrect);
    }
  }

  function renderBottomBlocks() {
    blocksArea.innerHTML = '';
    bottomBlocks.forEach((token, i) => {
      const btn = renderToken(token, () => {
        bottomBlocks.splice(i, 1);
        answerBlocks.push(token);
        renderAnswerZone();
        renderBottomBlocks();
        checkBtn.disabled = answerBlocks.length === 0;
      });
      blocksArea.appendChild(btn);
    });
  }

  checkBtn.addEventListener('click', () => {
    checked = true;
    const { correct } = checkBlocks(answerBlocks, formula);
    wasCorrect = correct;
    track(correct ? 'task_correct' : 'task_wrong', { formula_id: formula.id, mode: 'blocks' });

    checkBtn.style.display = 'none';
    answerZone.querySelectorAll('.block-token').forEach(b => { b.disabled = true; });
    blocksArea.querySelectorAll('.block-token').forEach(b => { b.disabled = true; });
    answerZone.classList.add(correct ? 'blocks-answer--correct' : 'blocks-answer--wrong');

    footer.classList.remove('task-footer--hidden');
  });

  nextBtn.addEventListener('click', async () => {
    const timeMs = Date.now() - startTime;
    history.push({ formula_id: formula.id, mode: 'blocks' });
    if (history.length > HISTORY_MAX) history.shift();
    await saveResult({ formula_id: formula.id, topic: formula.topic, mode: 'blocks', correct: wasCorrect, time_ms: timeMs });
    navigate('result', { correct: wasCorrect, formula });
  });

  renderAnswerZone();
  renderBottomBlocks();
}

function buildVarsHint(formula) {
  if (!formula.variables || formula.variables.length === 0) return null;

  const box = document.createElement('div');
  box.className = 'vars-hint';

  const label = document.createElement('span');
  label.className = 'vars-hint__label';
  label.textContent = t('inputVarsLabel');
  box.appendChild(label);

  const list = document.createElement('div');
  list.className = 'vars-hint__list';

  for (const { symbol, meaning } of formula.variables) {
    const item = document.createElement('span');
    item.className = 'vars-hint__item';

    const sym = document.createElement('span');
    sym.className = 'vars-hint__symbol';
    try {
      sym.innerHTML = katex.renderToString(symbol, { throwOnError: false });
    } catch {
      sym.textContent = symbol;
    }

    const dash = document.createTextNode('\u00a0— ');
    const desc = document.createTextNode(meaning);

    item.appendChild(sym);
    item.appendChild(dash);
    item.appendChild(desc);
    list.appendChild(item);
  }

  box.appendChild(list);
  return box;
}

function getQuickInsertTokens(formula) {
  const matches = formula.correct_latex.matchAll(/\\text\{([^}]+)\}/g);
  return [...new Set(Array.from(matches, ([, value]) => value).filter(Boolean))];
}

function renderInputTask(formula) {
  buildInputTask(formula);
  const startTime = Date.now();

  const el = document.createElement('div');
  el.className = 'screen screen-task';

  const header = document.createElement('div');
  header.className = 'task-header';

  const title = document.createElement('h2');
  title.className = 'task-title';
  title.textContent = formula.name;

  const prompt = document.createElement('p');
  prompt.className = 'task-prompt';
  prompt.textContent = t('inputPrompt');

  header.appendChild(title);
  header.appendChild(prompt);

  const varsHint = buildVarsHint(formula);
  const quickInsertTokens = getQuickInsertTokens(formula);

  const mf = document.createElement('math-field');
  mf.id = 'mf';
  mf.className = 'math-input';
  mf.mathVirtualKeyboardPolicy = 'manual';

  let quickInsertBar = null;
  if (quickInsertTokens.length > 0) {
    quickInsertBar = document.createElement('div');
    quickInsertBar.className = 'quick-insert-bar';

    for (const token of quickInsertTokens) {
      const button = document.createElement('button');
      button.className = 'quick-insert-btn';
      button.textContent = `_{${token}}`;
      button.setAttribute('aria-label', `Insert _{${token}}`);

      button.addEventListener('pointerdown', event => {
        event.preventDefault();
      });

      button.addEventListener('click', () => {
        mf.executeCommand(['insert', `_{\\text{${token}}}`]);
        mf.focus();
      });

      quickInsertBar.appendChild(button);
    }
  }

  const checkBtn = document.createElement('button');
  checkBtn.className = 'btn btn-primary';
  checkBtn.textContent = t('check');
  checkBtn.disabled = true;

  const feedback = document.createElement('div');
  feedback.className = 'input-feedback';
  feedback.style.display = 'none';

  const footer = document.createElement('div');
  footer.className = 'task-footer task-footer--hidden';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'btn btn-primary';
  nextBtn.textContent = t('next');
  footer.appendChild(nextBtn);

  el.appendChild(header);
  if (varsHint) el.appendChild(varsHint);
  if (quickInsertBar) el.appendChild(quickInsertBar);
  el.appendChild(mf);
  el.appendChild(checkBtn);
  el.appendChild(feedback);
  el.appendChild(footer);
  app.appendChild(el);

  const touchDevice = isTouchDevice();
  const virtualKeyboard = window.mathVirtualKeyboard;

  const syncKeyboardInset = () => {
    if (!touchDevice || !virtualKeyboard) {
      el.style.paddingBottom = '';
      return;
    }

    const keyboardHeight = Math.max(0, Math.round(virtualKeyboard.boundingRect?.height ?? 0));
    el.style.paddingBottom = keyboardHeight > 0 ? `${keyboardHeight + 16}px` : '';

    if (keyboardHeight > 0) {
      requestAnimationFrame(() => {
        checkBtn.scrollIntoView({ block: 'nearest', inline: 'nearest' });
      });
    }
  };

  const showKeyboard = () => {
    if (!touchDevice || !virtualKeyboard || checked) return;
    virtualKeyboard.show({ animate: true });
    syncKeyboardInset();
  };

  const hideKeyboard = () => {
    if (!virtualKeyboard) return;
    virtualKeyboard.hide({ animate: true });
    el.style.paddingBottom = '';
  };

  const handleGeometryChange = () => {
    syncKeyboardInset();
  };

  mf.addEventListener('focusin', showKeyboard);
  mf.addEventListener('focusout', hideKeyboard);
  virtualKeyboard?.addEventListener('geometrychange', handleGeometryChange);

  cleanupScreen = () => {
    mf.removeEventListener('focusin', showKeyboard);
    mf.removeEventListener('focusout', hideKeyboard);
    virtualKeyboard?.removeEventListener('geometrychange', handleGeometryChange);
    virtualKeyboard?.hide({ animate: false });
  };

  mf.addEventListener('input', () => {
    checkBtn.disabled = mf.value.trim() === '';
    syncKeyboardInset();
  });

  let wasCorrect = false;
  let checked = false;

  checkBtn.addEventListener('click', () => {
    if (checked) return;
    checked = true;

    const { correct } = checkInput(mf.value, formula);
    wasCorrect = correct;
    track(correct ? 'task_correct' : 'task_wrong', { formula_id: formula.id, mode: 'input' });

    hideKeyboard();
    mf.blur();
    mf.style.border = `2px solid ${correct ? '#4CAF50' : '#e53935'}`;
    mf.readOnly = true;
    checkBtn.style.display = 'none';

    if (!correct) {
      feedback.style.display = 'block';
      feedback.replaceChildren(document.createTextNode(t('inputCorrectAnswer')));
      const katexSpan = document.createElement('span');
      try {
        katexSpan.innerHTML = katex.renderToString(formula.correct_latex, { throwOnError: false, displayMode: false });
      } catch {
        katexSpan.textContent = formula.correct_latex;
      }
      feedback.appendChild(katexSpan);
    }

    footer.classList.remove('task-footer--hidden');
  });

  nextBtn.addEventListener('click', async () => {
    const timeMs = Date.now() - startTime;
    history.push({ formula_id: formula.id, mode: 'input' });
    if (history.length > HISTORY_MAX) history.shift();
    await saveResult({ formula_id: formula.id, topic: formula.topic, mode: 'input', correct: wasCorrect, time_ms: timeMs });
    navigate('result', { correct: wasCorrect, formula });
  });

  requestAnimationFrame(() => mf.focus());
}

function renderResult({ correct, formula }) {
  const el = document.createElement('div');
  el.className = 'screen screen-result';

  const icon = document.createElement('div');
  icon.className = 'result-icon';
  icon.textContent = correct ? '✅' : '❌';

  const heading = document.createElement('h2');
  heading.className = 'result-heading';
  heading.textContent = correct ? t('resultCorrect') : t('resultWrong');

  const formulaDiv = document.createElement('div');
  formulaDiv.className = 'result-formula';
  try {
    formulaDiv.innerHTML = katex.renderToString(formula.correct_latex, {
      throwOnError: false,
      displayMode: true,
    });
  } catch {
    formulaDiv.textContent = formula.correct_latex;
  }

  const hint = document.createElement('p');
  hint.className = 'result-hint';
  hint.textContent = formula.hint;

  const actions = document.createElement('div');
  actions.className = 'result-actions';

  const nextTaskBtn = document.createElement('button');
  nextTaskBtn.className = 'btn btn-primary';
  nextTaskBtn.textContent = t('resultNextTask');

  const homeBtn = document.createElement('button');
  homeBtn.className = 'btn btn-secondary';
  homeBtn.textContent = t('goHome');

  actions.appendChild(nextTaskBtn);
  actions.appendChild(homeBtn);

  el.appendChild(icon);
  el.appendChild(heading);
  el.appendChild(formulaDiv);
  el.appendChild(hint);
  el.appendChild(actions);
  app.appendChild(el);

  nextTaskBtn.addEventListener('click', () => navigate('task'));
  homeBtn.addEventListener('click', () => navigate('home'));
}

async function renderStats() {
  const stats = await getStats(formulas);
  const formulaMap = Object.fromEntries(formulas.map(f => [f.id, localizeFormula(f)]));

  const el = document.createElement('div');
  el.className = 'screen screen-stats';

  const heading = document.createElement('h1');
  heading.className = 'stats-heading';
  heading.textContent = t('statsTitle');
  el.appendChild(heading);

  const overall = document.createElement('div');
  overall.className = 'stats-overall';
  overall.innerHTML = `
    <div class="stats-percent">${stats.percent}%</div>
    <div class="stats-overall-label">${t('statsOverallLabel', { correct: stats.correct, total: stats.total })}</div>
  `;
  el.appendChild(overall);

  const topicsSection = document.createElement('div');
  topicsSection.className = 'stats-section';

  const topicsHeading = document.createElement('h2');
  topicsHeading.className = 'stats-section-heading';
  topicsHeading.textContent = t('statsByTopic');
  topicsSection.appendChild(topicsHeading);

  for (const topic of ['geometry_2d', 'geometry_3d', 'circles', 'algebra_identities', 'equations_quadratic', 'powers']) {
    const t = stats.byTopic[topic] || { total: 0, correct: 0 };
    const pct = t.total ? Math.round((t.correct / t.total) * 100) : 0;

    const row = document.createElement('div');
    row.className = 'stats-topic-row';
    row.innerHTML = `
      <div class="stats-topic-name">${getTopicName(topic)}</div>
      <div class="stats-topic-bar-wrap">
        <div class="stats-topic-bar" style="width:${pct}%"></div>
      </div>
      <div class="stats-topic-count">${t.correct} / ${t.total}</div>
    `;
    row.addEventListener('click', () => track('topic_selected', { topic }));
    topicsSection.appendChild(row);
  }
  el.appendChild(topicsSection);

  const weakSection = document.createElement('div');
  weakSection.className = 'stats-section';

  const weakHeading = document.createElement('h2');
  weakHeading.className = 'stats-section-heading';
  weakHeading.textContent = t('statsWeak');
  weakSection.appendChild(weakHeading);

  const weak = stats.weakFormulas.filter(w => w.errors > 0);
  if (weak.length === 0) {
    const none = document.createElement('p');
    none.className = 'stats-weak-none';
    none.textContent = stats.total ? t('statsWeakNone') : t('statsNoData');
    weakSection.appendChild(none);
  } else {
    for (const { formula_id, errors } of weak) {
      const f = formulaMap[formula_id];
      const item = document.createElement('div');
      item.className = 'stats-weak-item';
      item.innerHTML = `
        <span class="stats-weak-name">${f ? f.name : formula_id}</span>
        <span class="stats-weak-errors">${t('statsWeakErrors', { errors })}</span>
      `;
      weakSection.appendChild(item);
    }
  }
  el.appendChild(weakSection);

  const actions = document.createElement('div');
  actions.className = 'stats-actions';

  const clearBtn = document.createElement('button');
  clearBtn.className = 'btn btn-danger';
  clearBtn.textContent = t('statsReset');

  const homeBtn = document.createElement('button');
  homeBtn.className = 'btn btn-secondary';
  homeBtn.textContent = t('goHome');

  actions.appendChild(clearBtn);
  actions.appendChild(homeBtn);
  el.appendChild(actions);

  app.appendChild(el);

  clearBtn.addEventListener('click', async () => {
    await clearProgress();
    navigate('stats');
  });
  homeBtn.addEventListener('click', () => navigate('home'));
}

init();
