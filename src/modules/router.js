import { initDB, getStats, saveResult, getWeights, clearProgress } from './progress.js';
import { formulas } from '../data/formulas.js';
import { getNextTask, buildChoiceTask, buildBlocksTask, buildInputTask } from './taskEngine.js';
import { checkChoice, checkBlocks, checkInput } from './checker.js';

const app = document.getElementById('app');
let currentScreen = null;
const history = [];
const HISTORY_MAX = 10;

export async function init() {
  await initDB();
  navigate('home');
}

export function navigate(screen, data = {}) {
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

  const el = document.createElement('div');
  el.className = 'screen screen-home';
  el.innerHTML = `
    <div class="home-header">
      <h1 class="home-title">Formula9</h1>
      <p class="home-subtitle">Тренажёр формул · 9 класс</p>
    </div>
    <div class="home-stat">
      <span class="stat-percent">${stats.percent}%</span>
      <span class="stat-label">правильных ответов${stats.total ? ` из ${stats.total}` : ' — начните тренировку'}</span>
    </div>
    <div class="home-actions">
      <button class="btn btn-primary" id="btn-start">Начать тренировку</button>
      <button class="btn btn-secondary" id="btn-stats">Статистика</button>
    </div>
  `;

  app.appendChild(el);

  el.querySelector('#btn-start').addEventListener('click', () => navigate('task'));
  el.querySelector('#btn-stats').addEventListener('click', () => navigate('stats'));
}

async function renderTask() {
  const placeholder = document.createElement('div');
  placeholder.className = 'screen screen-task';
  placeholder.innerHTML = '<p class="task-loading">Загрузка задания…</p>';
  app.appendChild(placeholder);

  const weights = await getWeights(formulas);
  const { formula, mode } = getNextTask(history, weights);

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
  prompt.textContent = 'Выбери правильную формулу:';

  header.appendChild(title);
  header.appendChild(prompt);

  const grid = document.createElement('div');
  grid.className = 'choice-grid';

  const footer = document.createElement('div');
  footer.className = 'task-footer task-footer--hidden';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'btn btn-primary';
  nextBtn.textContent = 'Далее →';
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
  prompt.textContent = 'Собери формулу из блоков:';

  header.appendChild(title);
  header.appendChild(prompt);

  const answerZone = document.createElement('div');
  answerZone.className = 'blocks-answer';

  const blocksArea = document.createElement('div');
  blocksArea.className = 'blocks-source';

  const checkBtn = document.createElement('button');
  checkBtn.className = 'btn btn-primary';
  checkBtn.textContent = 'Проверить';
  checkBtn.disabled = true;

  const footer = document.createElement('div');
  footer.className = 'task-footer task-footer--hidden';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'btn btn-primary';
  nextBtn.textContent = 'Далее →';
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
  prompt.textContent = 'Введи формулу с помощью клавиатуры ↓';

  header.appendChild(title);
  header.appendChild(prompt);

  const mf = document.createElement('math-field');
  mf.id = 'mf';
  mf.style.cssText = 'width:100%;font-size:1.4em;padding:12px;border:2px solid #2E75B6;border-radius:8px;background:#0f1824;color:#e8edf5;display:block;box-sizing:border-box;';

  const checkBtn = document.createElement('button');
  checkBtn.className = 'btn btn-primary';
  checkBtn.textContent = 'Проверить';
  checkBtn.disabled = true;

  const feedback = document.createElement('div');
  feedback.className = 'input-feedback';
  feedback.style.display = 'none';

  const footer = document.createElement('div');
  footer.className = 'task-footer task-footer--hidden';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'btn btn-primary';
  nextBtn.textContent = 'Далее →';
  footer.appendChild(nextBtn);

  el.appendChild(header);
  el.appendChild(mf);
  el.appendChild(checkBtn);
  el.appendChild(feedback);
  el.appendChild(footer);
  app.appendChild(el);

  mf.addEventListener('input', () => {
    checkBtn.disabled = mf.value.trim() === '';
  });

  let wasCorrect = false;
  let checked = false;

  checkBtn.addEventListener('click', () => {
    if (checked) return;
    checked = true;

    const { correct } = checkInput(mf.value, formula);
    wasCorrect = correct;

    mf.style.border = `2px solid ${correct ? '#4CAF50' : '#e53935'}`;
    mf.readOnly = true;
    checkBtn.style.display = 'none';

    if (!correct) {
      feedback.style.display = 'block';
      feedback.innerHTML = 'Правильный ответ: ';
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
  heading.textContent = correct ? 'Верно!' : 'Неверно';

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
  nextTaskBtn.textContent = 'Следующее задание';

  const homeBtn = document.createElement('button');
  homeBtn.className = 'btn btn-secondary';
  homeBtn.textContent = 'На главную';

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
  const TOPIC_NAMES = {
    geometry_2d:          'Планиметрия',
    geometry_3d:          'Стереометрия',
    circles:              'Окружности',
    algebra_identities:   'Алгебраические тождества',
    equations_quadratic:  'Квадратные уравнения',
    powers:               'Степени и корни',
  };

  const stats = await getStats(formulas);
  const formulaMap = Object.fromEntries(formulas.map(f => [f.id, f]));

  const el = document.createElement('div');
  el.className = 'screen screen-stats';

  // 1. Заголовок
  const heading = document.createElement('h1');
  heading.className = 'stats-heading';
  heading.textContent = 'Статистика';
  el.appendChild(heading);

  // 2. Общий результат
  const overall = document.createElement('div');
  overall.className = 'stats-overall';
  overall.innerHTML = `
    <div class="stats-percent">${stats.percent}%</div>
    <div class="stats-overall-label">${stats.correct} правильных из ${stats.total} заданий</div>
  `;
  el.appendChild(overall);

  // 3. По разделам
  const topicsSection = document.createElement('div');
  topicsSection.className = 'stats-section';

  const topicsHeading = document.createElement('h2');
  topicsHeading.className = 'stats-section-heading';
  topicsHeading.textContent = 'По разделам';
  topicsSection.appendChild(topicsHeading);

  for (const [topic, label] of Object.entries(TOPIC_NAMES)) {
    const t = stats.byTopic[topic] || { total: 0, correct: 0 };
    const pct = t.total ? Math.round((t.correct / t.total) * 100) : 0;

    const row = document.createElement('div');
    row.className = 'stats-topic-row';
    row.innerHTML = `
      <div class="stats-topic-name">${label}</div>
      <div class="stats-topic-bar-wrap">
        <div class="stats-topic-bar" style="width:${pct}%"></div>
      </div>
      <div class="stats-topic-count">${t.correct} / ${t.total}</div>
    `;
    topicsSection.appendChild(row);
  }
  el.appendChild(topicsSection);

  // 4. Слабые формулы
  const weakSection = document.createElement('div');
  weakSection.className = 'stats-section';

  const weakHeading = document.createElement('h2');
  weakHeading.className = 'stats-section-heading';
  weakHeading.textContent = 'Слабые места';
  weakSection.appendChild(weakHeading);

  const weak = stats.weakFormulas.filter(w => w.errors > 0);
  if (weak.length === 0) {
    const none = document.createElement('p');
    none.className = 'stats-weak-none';
    none.textContent = stats.total ? 'Отличная работа — слабых мест нет!' : 'Пока нет данных';
    weakSection.appendChild(none);
  } else {
    for (const { formula_id, errors } of weak) {
      const f = formulaMap[formula_id];
      const item = document.createElement('div');
      item.className = 'stats-weak-item';
      item.innerHTML = `
        <span class="stats-weak-name">${f ? f.name : formula_id}</span>
        <span class="stats-weak-errors">${errors} ош.</span>
      `;
      weakSection.appendChild(item);
    }
  }
  el.appendChild(weakSection);

  // 5. Кнопки
  const actions = document.createElement('div');
  actions.className = 'stats-actions';

  const clearBtn = document.createElement('button');
  clearBtn.className = 'btn btn-danger';
  clearBtn.textContent = 'Сбросить прогресс';

  const homeBtn = document.createElement('button');
  homeBtn.className = 'btn btn-secondary';
  homeBtn.textContent = 'На главную';

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
