const STORAGE_KEY = 'formula9.language';
const DEFAULT_LANGUAGE = 'ru';
const SUPPORTED_LANGUAGES = ['ru', 'en', 'et'];

const LANGUAGE_OPTIONS = [
  { value: 'et', label: 'Eesti', flagSrc: 'assets/flags/ee.svg', flagAlt: 'Estonia' },
  { value: 'en', label: 'English', flagSrc: 'assets/flags/gb.svg', flagAlt: 'United Kingdom' },
  { value: 'ru', label: 'Русский', flagSrc: 'assets/flags/ru.svg', flagAlt: 'Russia' },
];

const UI_STRINGS = {
  ru: {
    documentTitle: 'Formula9 — Math Trainer',
    homeSubtitle: 'Тренажёр формул · 9 класс',
    homeStatWithTotal: 'правильных ответов из {total}',
    homeStatNoData: 'правильных ответов — начните тренировку',
    homeStart: 'Начать тренировку',
    homeStats: 'Статистика',
    homeLanguageLabel: 'Язык',
    taskLoading: 'Загрузка задания…',
    choicePrompt: 'Выбери правильную формулу:',
    blocksPrompt: 'Собери формулу из блоков:',
    inputPrompt: 'Введи формулу с помощью клавиатуры ↓',
    check: 'Проверить',
    next: 'Далее →',
    inputVarsLabel: 'Обозначения:',
    inputCorrectAnswer: 'Правильный ответ: ',
    resultCorrect: 'Верно!',
    resultWrong: 'Неверно',
    resultNextTask: 'Следующее задание',
    goHome: 'На главную',
    statsTitle: 'Статистика',
    statsOverallLabel: '{correct} правильных из {total} заданий',
    statsByTopic: 'По разделам',
    statsWeak: 'Слабые места',
    statsWeakNone: 'Отличная работа — слабых мест нет!',
    statsNoData: 'Пока нет данных',
    statsWeakErrors: '{errors} ош.',
    statsReset: 'Сбросить прогресс',
    topics: {
      geometry_2d: 'Планиметрия',
      geometry_3d: 'Стереометрия',
      circles: 'Окружности',
      algebra_identities: 'Алгебраические тождества',
      equations_quadratic: 'Квадратные уравнения',
      powers: 'Степени и корни',
    },
  },
  en: {
    documentTitle: 'Formula9 — Math Trainer',
    homeSubtitle: 'Formula trainer · Grade 9',
    homeStatWithTotal: 'correct answers out of {total}',
    homeStatNoData: 'correct answers — start training',
    homeStart: 'Start Training',
    homeStats: 'Statistics',
    homeLanguageLabel: 'Language',
    taskLoading: 'Loading task…',
    choicePrompt: 'Choose the correct formula:',
    blocksPrompt: 'Build the formula from blocks:',
    inputPrompt: 'Enter the formula using the keyboard ↓',
    check: 'Check',
    next: 'Next →',
    inputVarsLabel: 'Symbols:',
    inputCorrectAnswer: 'Correct answer: ',
    resultCorrect: 'Correct!',
    resultWrong: 'Incorrect',
    resultNextTask: 'Next Task',
    goHome: 'Home',
    statsTitle: 'Statistics',
    statsOverallLabel: '{correct} correct out of {total} tasks',
    statsByTopic: 'By Topic',
    statsWeak: 'Weak Spots',
    statsWeakNone: 'Great work — no weak spots!',
    statsNoData: 'No data yet',
    statsWeakErrors: '{errors} errors',
    statsReset: 'Reset Progress',
    topics: {
      geometry_2d: 'Plane Geometry',
      geometry_3d: 'Solid Geometry',
      circles: 'Circles',
      algebra_identities: 'Algebraic Identities',
      equations_quadratic: 'Quadratic Equations',
      powers: 'Powers and Roots',
    },
  },
  et: {
    documentTitle: 'Formula9 — Matemaatikavalemite treener',
    homeSubtitle: 'Valemite treener · 9. klass',
    homeStatWithTotal: '{total} ülesande põhjal õigete vastuste osakaal',
    homeStatNoData: 'õigete vastuste osakaal — alusta harjutamist',
    homeStart: 'Alusta harjutamist',
    homeStats: 'Statistika',
    homeLanguageLabel: 'Keel',
    taskLoading: 'Ülesande laadimine…',
    choicePrompt: 'Vali õige valem:',
    blocksPrompt: 'Pane valem plokkidest kokku:',
    inputPrompt: 'Sisesta valem klaviatuuri abil ↓',
    check: 'Kontrolli',
    next: 'Järgmine →',
    inputVarsLabel: 'Tähised:',
    inputCorrectAnswer: 'Õige vastus: ',
    resultCorrect: 'Õige!',
    resultWrong: 'Vale',
    resultNextTask: 'Järgmine ülesanne',
    goHome: 'Avalehele',
    statsTitle: 'Statistika',
    statsOverallLabel: '{correct} õiget vastust {total} ülesandest',
    statsByTopic: 'Teemade kaupa',
    statsWeak: 'Nõrgad kohad',
    statsWeakNone: 'Väga hea töö — nõrku kohti ei ole!',
    statsNoData: 'Andmed puuduvad',
    statsWeakErrors: '{errors} viga',
    statsReset: 'Lähtesta edenemine',
    topics: {
      geometry_2d: 'Tasandigeomeetria',
      geometry_3d: 'Ruumigeomeetria',
      circles: 'Ringjoon',
      algebra_identities: 'Algebralised identiteedid',
      equations_quadratic: 'Ruutvõrrandid',
      powers: 'Astmed ja juured',
    },
  },
};

const LATEX_TEXT_REPLACEMENTS = {
  en: {
    '\\text{осн}': '\\text{base}',
    '\\text{бок}': '\\text{lateral}',
  },
  et: {
    '\\text{осн}': '\\text{alus}',
    '\\text{бок}': '\\text{külg}',
  },
};

const FORMULA_TRANSLATIONS = {
  en: {
    area_trapezoid: {
      name: 'Area of a Trapezoid',
      hint: 'Half the sum of the bases times the height',
      variables: ['area', 'lower base', 'upper base', 'height'],
    },
    area_rectangle: {
      name: 'Area of a Rectangle',
      hint: 'The product of two sides',
      variables: ['area', 'length', 'width'],
    },
    area_triangle: {
      name: 'Area of a Triangle',
      hint: 'Base times height divided by 2',
      variables: ['area', 'base', 'height'],
    },
    area_circle: {
      name: 'Area of a Circle',
      hint: 'Pi times the square of the radius',
      variables: ['area', 'radius', 'pi ≈ 3.14'],
    },
    circumference: {
      name: 'Circumference',
      hint: 'Two pi times the radius (or pi times the diameter)',
      variables: ['circumference', 'radius', 'pi ≈ 3.14'],
    },
    volume_prism: {
      name: 'Volume of a Prism',
      hint: 'Base area times height',
      variables: ['volume', 'base area', 'height'],
    },
    volume_pyramid: {
      name: 'Volume of a Pyramid',
      hint: 'One third of base area times height',
      variables: ['volume', 'base area', 'height'],
    },
    volume_parallelepiped: {
      name: 'Volume of a Parallelepiped',
      hint: 'The product of three dimensions',
      variables: ['volume', 'length', 'width', 'height'],
    },
    volume_cube: {
      name: 'Volume of a Cube',
      hint: 'Edge length cubed',
      variables: ['volume', 'cube edge'],
    },
    surface_cube: {
      name: 'Total Surface Area of a Cube',
      hint: 'Six square faces',
      variables: ['total surface area', 'cube edge'],
    },
    volume_cylinder: {
      name: 'Volume of a Cylinder',
      hint: 'Area of the circular base times height',
      variables: ['volume', 'base radius', 'height', 'pi ≈ 3.14'],
    },
    surface_lateral_cylinder: {
      name: 'Lateral Surface Area of a Cylinder',
      hint: 'Circumference times height',
      variables: ['lateral surface area', 'base radius', 'height', 'pi ≈ 3.14'],
    },
    volume_cone: {
      name: 'Volume of a Cone',
      hint: 'One third of the cylinder volume',
      variables: ['volume', 'base radius', 'height', 'pi ≈ 3.14'],
    },
    surface_lateral_cone: {
      name: 'Lateral Surface Area of a Cone',
      hint: 'Pi times radius times slant height',
      variables: ['lateral surface area', 'base radius', 'slant height', 'pi ≈ 3.14'],
    },
    volume_sphere: {
      name: 'Volume of a Sphere',
      hint: 'Four thirds pi times radius cubed',
      variables: ['volume', 'radius', 'pi ≈ 3.14'],
    },
    surface_sphere: {
      name: 'Surface Area of a Sphere',
      hint: 'Four circle areas with the same radius',
      variables: ['surface area', 'radius', 'pi ≈ 3.14'],
    },
    surface_lateral_prism: {
      name: 'Lateral Surface Area of a Prism',
      hint: 'Perimeter of the base times height',
      variables: ['lateral surface area', 'base perimeter', 'height'],
    },
    square_sum: {
      name: 'Square of a Sum',
      hint: 'Do not forget the doubled product in the middle',
      variables: ['first term', 'second term'],
    },
    square_diff: {
      name: 'Square of a Difference',
      hint: 'The middle term is negative, the outer ones are positive',
      variables: ['minuend', 'subtrahend'],
    },
    diff_squares: {
      name: 'Difference of Squares',
      hint: 'Product of the sum and the difference',
      variables: ['first number', 'second number'],
    },
    discriminant: {
      name: 'Discriminant',
      hint: 'b squared minus four ac',
      variables: ['discriminant', 'coefficient of x²', 'coefficient of x', 'constant term'],
    },
    quadratic_roots: {
      name: 'Roots of a Quadratic Equation',
      hint: 'Minus b plus or minus the square root of D, all divided by 2a',
      variables: ['equation roots', 'discriminant', 'coefficient of x²', 'coefficient of x'],
    },
    power_product: {
      name: 'Product of Powers (Same Base)',
      hint: 'When multiplying, add the exponents',
      variables: ['base', 'first exponent', 'second exponent'],
    },
    power_quotient: {
      name: 'Quotient of Powers (Same Base)',
      hint: 'When dividing, subtract the exponents',
      variables: ['base', 'dividend exponent', 'divisor exponent'],
    },
    power_of_power: {
      name: 'Power of a Power',
      hint: 'Multiply the exponents',
      variables: ['base', 'inner exponent', 'outer exponent'],
    },
    power_zero: {
      name: 'Zero Power',
      hint: 'Any non-zero number to the power of 0 equals 1',
      variables: ['base (x ≠ 0)'],
    },
    power_negative: {
      name: 'Negative Power',
      hint: 'A negative power is one divided by the corresponding positive power',
      variables: ['base (x ≠ 0)', 'exponent'],
    },
  },
  et: {
    area_trapezoid: {
      name: 'Trapetsi Pindala',
      hint: 'Aluste poolsumma korrutatuna kõrgusega',
      variables: ['pindala', 'alumine alus', 'ülemine alus', 'kõrgus'],
    },
    area_rectangle: {
      name: 'Ristküliku Pindala',
      hint: 'Kahe külje korrutis',
      variables: ['pindala', 'pikkus', 'laius'],
    },
    area_triangle: {
      name: 'Kolmnurga Pindala',
      hint: 'Alus korda kõrgus, jagatud kahega',
      variables: ['pindala', 'alus', 'kõrgus'],
    },
    area_circle: {
      name: 'Ringi Pindala',
      hint: 'Pii korda raadiuse ruut',
      variables: ['pindala', 'raadius', 'pii arv ≈ 3,14'],
    },
    circumference: {
      name: 'Ringjoone Pikkus',
      hint: 'Kaks pii korda raadius või pii korda diameeter',
      variables: ['ringjoone pikkus', 'raadius', 'pii arv ≈ 3,14'],
    },
    volume_prism: {
      name: 'Prisma Ruumala',
      hint: 'Põhja pindala korda kõrgus',
      variables: ['ruumala', 'põhja pindala', 'kõrgus'],
    },
    volume_pyramid: {
      name: 'Püramiidi Ruumala',
      hint: 'Kolmandik põhja pindala ja kõrguse korrutisest',
      variables: ['ruumala', 'põhja pindala', 'kõrgus'],
    },
    volume_parallelepiped: {
      name: 'Rööptahuka Ruumala',
      hint: 'Kolme mõõtme korrutis',
      variables: ['ruumala', 'pikkus', 'laius', 'kõrgus'],
    },
    volume_cube: {
      name: 'Kuubi Ruumala',
      hint: 'Servi kuup',
      variables: ['ruumala', 'kuubi serv'],
    },
    surface_cube: {
      name: 'Kuubi Täispindala',
      hint: 'Kuus ruudukujulist tahku',
      variables: ['täispindala', 'kuubi serv'],
    },
    volume_cylinder: {
      name: 'Silindri Ruumala',
      hint: 'Ringikujulise põhja pindala korda kõrgus',
      variables: ['ruumala', 'põhja raadius', 'kõrgus', 'pii arv ≈ 3,14'],
    },
    surface_lateral_cylinder: {
      name: 'Silindri Külgpindala',
      hint: 'Ringjoone pikkus korda kõrgus',
      variables: ['külgpindala', 'põhja raadius', 'kõrgus', 'pii arv ≈ 3,14'],
    },
    volume_cone: {
      name: 'Koonuse Ruumala',
      hint: 'Kolmandik silindri ruumalast',
      variables: ['ruumala', 'põhja raadius', 'kõrgus', 'pii arv ≈ 3,14'],
    },
    surface_lateral_cone: {
      name: 'Koonuse Külgpindala',
      hint: 'Pii korda raadius korda moodustaja',
      variables: ['külgpindala', 'põhja raadius', 'moodustaja', 'pii arv ≈ 3,14'],
    },
    volume_sphere: {
      name: 'Kera Ruumala',
      hint: 'Neli kolmandikku pii korda raadiuse kuup',
      variables: ['ruumala', 'raadius', 'pii arv ≈ 3,14'],
    },
    surface_sphere: {
      name: 'Kera Pindala',
      hint: 'Neli sama raadiusega ringi pindala',
      variables: ['pindala', 'raadius', 'pii arv ≈ 3,14'],
    },
    surface_lateral_prism: {
      name: 'Prisma Külgpindala',
      hint: 'Põhja ümbermõõt korda kõrgus',
      variables: ['külgpindala', 'põhja ümbermõõt', 'kõrgus'],
    },
    square_sum: {
      name: 'Summa Ruut',
      hint: 'Ära unusta keskel kahekordset korrutist',
      variables: ['esimene liidetav', 'teine liidetav'],
    },
    square_diff: {
      name: 'Vahe Ruut',
      hint: 'Keskmine liige on negatiivne, äärmised positiivsed',
      variables: ['vähendatav', 'vähendaja'],
    },
    diff_squares: {
      name: 'Ruutude Vahe',
      hint: 'Summa ja vahe korrutis',
      variables: ['esimene arv', 'teine arv'],
    },
    discriminant: {
      name: 'Diskriminant',
      hint: 'b ruudus miinus neli ac',
      variables: ['diskriminant', 'x² kordaja', 'x kordaja', 'vabaliige'],
    },
    quadratic_roots: {
      name: 'Ruutvõrrandi Juured',
      hint: 'Miinus b pluss-miinus D ruutjuur, kõik jagatud 2a-ga',
      variables: ['võrrandi juured', 'diskriminant', 'x² kordaja', 'x kordaja'],
    },
    power_product: {
      name: 'Astmete Korrutis (Sama Alus)',
      hint: 'Korrutamisel astendajad liituvad',
      variables: ['alus', 'esimene astendaja', 'teine astendaja'],
    },
    power_quotient: {
      name: 'Astmete Jagatis (Sama Alus)',
      hint: 'Jagamisel astendajad lahutatakse',
      variables: ['alus', 'jagatava astendaja', 'jagaja astendaja'],
    },
    power_of_power: {
      name: 'Astme Aste',
      hint: 'Astendajad korrutatakse omavahel',
      variables: ['alus', 'sisemine astendaja', 'välimine astendaja'],
    },
    power_zero: {
      name: 'Nullaste',
      hint: 'Iga nullist erinev arv astmes 0 võrdub 1-ga',
      variables: ['alus (x ≠ 0)'],
    },
    power_negative: {
      name: 'Negatiivne Aste',
      hint: 'Negatiivne aste tähendab ühte jagatud vastava positiivse astmega',
      variables: ['alus (x ≠ 0)', 'astendaja'],
    },
  },
};

function safeStorageGet(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeStorageSet(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // ignore storage failures and keep app functional
  }
}

function interpolate(template, params) {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(params[key] ?? ''));
}

function localizeLatexString(value, language) {
  if (typeof value !== 'string') return value;

  const replacements = LATEX_TEXT_REPLACEMENTS[language];
  if (!replacements) return value;

  let localized = value;
  for (const [from, to] of Object.entries(replacements)) {
    localized = localized.replaceAll(from, to);
  }
  return localized;
}

export function getLanguage() {
  const stored = safeStorageGet(STORAGE_KEY);
  return SUPPORTED_LANGUAGES.includes(stored) ? stored : DEFAULT_LANGUAGE;
}

export function setLanguage(language) {
  const nextLanguage = SUPPORTED_LANGUAGES.includes(language) ? language : DEFAULT_LANGUAGE;
  safeStorageSet(STORAGE_KEY, nextLanguage);
  document.documentElement.lang = nextLanguage;
  document.title = UI_STRINGS[nextLanguage].documentTitle;
  return nextLanguage;
}

export function getLanguageOptions() {
  return LANGUAGE_OPTIONS;
}

export function t(key, params = {}) {
  const language = getLanguage();
  const value = UI_STRINGS[language][key];
  if (typeof value !== 'string') return key;
  return interpolate(value, params);
}

export function getTopicName(topic) {
  const language = getLanguage();
  return UI_STRINGS[language].topics[topic] ?? topic;
}

export function localizeFormula(formula) {
  const language = getLanguage();
  const translation = FORMULA_TRANSLATIONS[language]?.[formula.id];

  return {
    ...formula,
    name: translation?.name ?? formula.name,
    hint: translation?.hint ?? formula.hint,
    correct_latex: localizeLatexString(formula.correct_latex, language),
    alt_forms: (formula.alt_forms ?? []).map(value => localizeLatexString(value, language)),
    wrong_options: (formula.wrong_options ?? []).map(value => localizeLatexString(value, language)),
    blocks: (formula.blocks ?? []).map(value => localizeLatexString(value, language)),
    correct_blocks: localizeLatexString(formula.correct_blocks, language),
    variables: (formula.variables ?? []).map((variable, index) => ({
      ...variable,
      symbol: localizeLatexString(variable.symbol, language),
      meaning: translation?.variables?.[index] ?? variable.meaning,
    })),
  };
}
