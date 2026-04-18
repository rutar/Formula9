const STORAGE_KEY = 'formula9.language';
const DEFAULT_LANGUAGE = 'ru';
const SUPPORTED_LANGUAGES = ['ru', 'en', 'et', 'tr', 'ja', 'uk'];

const LANGUAGE_OPTIONS = [
  { value: 'et', label: 'Eesti', flagSrc: 'assets/flags/ee.svg', flagAlt: 'Estonia' },
  { value: 'en', label: 'English', flagSrc: 'assets/flags/gb.svg', flagAlt: 'United Kingdom' },
  { value: 'tr', label: 'Turkce', flagSrc: 'assets/flags/tr.svg', flagAlt: 'Turkey' },
  { value: 'ja', label: '日本語', flagSrc: 'assets/flags/jp.svg', flagAlt: 'Japan' },
  { value: 'uk', label: 'Українська', flagSrc: 'assets/flags/ua.svg', flagAlt: 'Ukraine' },
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
  tr: {
    documentTitle: 'Formula9 — Formul Alistiricisi',
    homeSubtitle: 'Formul alistiricisi · 9. sinif',
    homeStatWithTotal: '{total} sorudan dogru cevap',
    homeStatNoData: 'dogru cevap — alistirmaya basla',
    homeStart: 'Alistirmaya Basla',
    homeStats: 'Istatistik',
    homeLanguageLabel: 'Dil',
    taskLoading: 'Soru yukleniyor…',
    choicePrompt: 'Dogru formulu sec:',
    blocksPrompt: 'Formulu bloklardan olustur:',
    inputPrompt: 'Formulu klavye ile gir ↓',
    check: 'Kontrol Et',
    next: 'Sonraki →',
    inputVarsLabel: 'Semboller:',
    inputCorrectAnswer: 'Dogru cevap: ',
    resultCorrect: 'Dogru!',
    resultWrong: 'Yanlis',
    resultNextTask: 'Sonraki Soru',
    goHome: 'Ana Sayfa',
    statsTitle: 'Istatistik',
    statsOverallLabel: '{total} sorudan {correct} dogru',
    statsByTopic: 'Konulara Gore',
    statsWeak: 'Zayif Noktalar',
    statsWeakNone: 'Harika is — zayif nokta yok!',
    statsNoData: 'Henuz veri yok',
    statsWeakErrors: '{errors} hata',
    statsReset: 'Ilerlemeyi Sifirla',
    topics: {
      geometry_2d: 'Duzlem Geometri',
      geometry_3d: 'Uzay Geometri',
      circles: 'Cemberler',
      algebra_identities: 'Cebirsel Ozdeslikler',
      equations_quadratic: 'Ikinci Dereceden Denklemler',
      powers: 'Usler ve Kokler',
    },
  },
  ja: {
    documentTitle: 'Formula9 — 数式トレーナー',
    homeSubtitle: '数式トレーナー · 9年生',
    homeStatWithTotal: '{total}問中の正解数',
    homeStatNoData: '正解数 — トレーニングを始めてください',
    homeStart: 'トレーニング開始',
    homeStats: '統計',
    homeLanguageLabel: '言語',
    taskLoading: '問題を読み込み中…',
    choicePrompt: '正しい公式を選んでください:',
    blocksPrompt: 'ブロックから公式を組み立ててください:',
    inputPrompt: 'キーボードで公式を入力してください ↓',
    check: '確認',
    next: '次へ →',
    inputVarsLabel: '記号:',
    inputCorrectAnswer: '正しい答え: ',
    resultCorrect: '正解!',
    resultWrong: '不正解',
    resultNextTask: '次の問題',
    goHome: 'ホームへ',
    statsTitle: '統計',
    statsOverallLabel: '{total}問中{correct}問正解',
    statsByTopic: '分野別',
    statsWeak: '苦手分野',
    statsWeakNone: '素晴らしいです — 苦手分野はありません!',
    statsNoData: 'まだデータがありません',
    statsWeakErrors: '{errors}回ミス',
    statsReset: '進捗をリセット',
    topics: {
      geometry_2d: '平面幾何',
      geometry_3d: '立体幾何',
      circles: '円',
      algebra_identities: '代数恒等式',
      equations_quadratic: '二次方程式',
      powers: 'べきと根',
    },
  },
  uk: {
    documentTitle: 'Formula9 — Тренажер формул',
    homeSubtitle: 'Тренажер формул · 9 клас',
    homeStatWithTotal: 'правильних відповідей із {total}',
    homeStatNoData: 'правильних відповідей — почніть тренування',
    homeStart: 'Почати тренування',
    homeStats: 'Статистика',
    homeLanguageLabel: 'Мова',
    taskLoading: 'Завантаження завдання…',
    choicePrompt: 'Вибери правильну формулу:',
    blocksPrompt: 'Склади формулу з блоків:',
    inputPrompt: 'Введи формулу за допомогою клавіатури ↓',
    check: 'Перевірити',
    next: 'Далі →',
    inputVarsLabel: 'Позначення:',
    inputCorrectAnswer: 'Правильна відповідь: ',
    resultCorrect: 'Правильно!',
    resultWrong: 'Неправильно',
    resultNextTask: 'Наступне завдання',
    goHome: 'На головну',
    statsTitle: 'Статистика',
    statsOverallLabel: '{correct} правильних із {total} завдань',
    statsByTopic: 'За розділами',
    statsWeak: 'Слабкі місця',
    statsWeakNone: 'Чудова робота — слабких місць немає!',
    statsNoData: 'Даних поки немає',
    statsWeakErrors: '{errors} пом.',
    statsReset: 'Скинути прогрес',
    topics: {
      geometry_2d: 'Планіметрія',
      geometry_3d: 'Стереометрія',
      circles: 'Кола',
      algebra_identities: 'Алгебраїчні тотожності',
      equations_quadratic: 'Квадратні рівняння',
      powers: 'Степені та корені',
    },
  },
};

const LATEX_TEXT_REPLACEMENTS = {
  en: {
    '\\text{осн}': '\\text{base}',
    '\\text{бок}': '\\text{lat}',
  },
  et: {
    '\\text{осн}': '\\text{alus}',
    '\\text{бок}': '\\text{kulg}',
  },
  tr: {
    '\\text{осн}': '\\text{tab}',
    '\\text{бок}': '\\text{yan}',
  },
  ja: {
    '\\text{осн}': '\\text{底}',
    '\\text{бок}': '\\text{側}',
  },
  uk: {
    '\\text{осн}': '\\text{осн}',
    '\\text{бок}': '\\text{біч}',
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
  tr: {
    area_trapezoid: {
      name: 'Yamugun Alani',
      hint: 'Tabanlarin yarim toplami yukseklik ile carpilir',
      variables: ['alan', 'alt taban', 'ust taban', 'yukseklik'],
    },
    area_rectangle: {
      name: 'Dikdortgenin Alani',
      hint: 'Iki kenarin carpimi',
      variables: ['alan', 'uzunluk', 'genislik'],
    },
    area_triangle: {
      name: 'Ucgenin Alani',
      hint: 'Taban ile yuksekligin carpiminin yarisi',
      variables: ['alan', 'taban', 'yukseklik'],
    },
    area_circle: {
      name: 'Dairenin Alani',
      hint: 'Pi ile yaricapin karesinin carpimi',
      variables: ['alan', 'yaricap', 'pi ≈ 3.14'],
    },
    circumference: {
      name: 'Cemberin Cevresi',
      hint: 'Iki pi carpi yaricap veya pi carpi cap',
      variables: ['cevre', 'yaricap', 'pi ≈ 3.14'],
    },
    volume_prism: {
      name: 'Prizmanin Hacmi',
      hint: 'Taban alani ile yuksekligin carpimi',
      variables: ['hacim', 'taban alani', 'yukseklik'],
    },
    volume_pyramid: {
      name: 'Piramitin Hacmi',
      hint: 'Taban alani ile yuksekligin carpiminin ucte biri',
      variables: ['hacim', 'taban alani', 'yukseklik'],
    },
    volume_parallelepiped: {
      name: 'Dikdortgenler Prizmasinin Hacmi',
      hint: 'Uc boyutun carpimi',
      variables: ['hacim', 'uzunluk', 'genislik', 'yukseklik'],
    },
    volume_cube: {
      name: 'Kupun Hacmi',
      hint: 'Ayrtin kupu',
      variables: ['hacim', 'kup ayrti'],
    },
    surface_cube: {
      name: 'Kupun Toplam Yuzey Alani',
      hint: 'Alti kare yuz',
      variables: ['toplam yuzey alani', 'kup ayrti'],
    },
    volume_cylinder: {
      name: 'Silindirin Hacmi',
      hint: 'Dairesel taban alani ile yuksekligin carpimi',
      variables: ['hacim', 'taban yaricapi', 'yukseklik', 'pi ≈ 3.14'],
    },
    surface_lateral_cylinder: {
      name: 'Silindirin Yanal Yuzey Alani',
      hint: 'Cevre ile yuksekligin carpimi',
      variables: ['yanal yuzey alani', 'taban yaricapi', 'yukseklik', 'pi ≈ 3.14'],
    },
    volume_cone: {
      name: 'Koninin Hacmi',
      hint: 'Silindir hacminin ucte biri',
      variables: ['hacim', 'taban yaricapi', 'yukseklik', 'pi ≈ 3.14'],
    },
    surface_lateral_cone: {
      name: 'Koninin Yanal Yuzey Alani',
      hint: 'Pi carpi yaricap carpi egik yukseklik',
      variables: ['yanal yuzey alani', 'taban yaricapi', 'egik yukseklik', 'pi ≈ 3.14'],
    },
    volume_sphere: {
      name: 'Kurenin Hacmi',
      hint: 'Dort bolu uc pi carpi yaricapin kupu',
      variables: ['hacim', 'yaricap', 'pi ≈ 3.14'],
    },
    surface_sphere: {
      name: 'Kurenin Yuzey Alani',
      hint: 'Ayni yaricapa sahip dort dairenin alani',
      variables: ['yuzey alani', 'yaricap', 'pi ≈ 3.14'],
    },
    surface_lateral_prism: {
      name: 'Prizmanin Yanal Yuzey Alani',
      hint: 'Taban cevresi ile yuksekligin carpimi',
      variables: ['yanal yuzey alani', 'taban cevresi', 'yukseklik'],
    },
    square_sum: {
      name: 'Toplamin Karesi',
      hint: 'Ortadaki iki kat carpimi unutma',
      variables: ['birinci terim', 'ikinci terim'],
    },
    square_diff: {
      name: 'Farkin Karesi',
      hint: 'Ortadaki terim negatif, distakiler pozitiftir',
      variables: ['eksilen', 'cikan'],
    },
    diff_squares: {
      name: 'Kareler Farki',
      hint: 'Toplam ile farkin carpimi',
      variables: ['birinci sayi', 'ikinci sayi'],
    },
    discriminant: {
      name: 'Diskriminant',
      hint: 'b kare eksi dort ac',
      variables: ['diskriminant', 'x² katsayisi', 'x katsayisi', 'sabit terim'],
    },
    quadratic_roots: {
      name: 'Ikinci Dereceden Denklemin Kokleri',
      hint: 'Eksi b arti eksi kok D, tumu 2a ya bolunur',
      variables: ['denklemin kokleri', 'diskriminant', 'x² katsayisi', 'x katsayisi'],
    },
    power_product: {
      name: 'Uslerin Carpimi (Ayni Taban)',
      hint: 'Carpmada usler toplanir',
      variables: ['taban', 'birinci us', 'ikinci us'],
    },
    power_quotient: {
      name: 'Uslerin Bolumu (Ayni Taban)',
      hint: 'Bolmede usler cikarilir',
      variables: ['taban', 'bolunen us', 'bolen us'],
    },
    power_of_power: {
      name: 'Usun Usu',
      hint: 'Usler birbiriyle carpilir',
      variables: ['taban', 'ic us', 'dis us'],
    },
    power_zero: {
      name: 'Sifirinci Kuvvet',
      hint: 'Sifirdan farkli her sayinin sifirinci kuvveti 1 dir',
      variables: ['taban (x ≠ 0)'],
    },
    power_negative: {
      name: 'Negatif Kuvvet',
      hint: 'Negatif kuvvet ilgili pozitif kuvvetin tersidir',
      variables: ['taban (x ≠ 0)', 'us'],
    },
  },
  ja: {
    area_trapezoid: {
      name: '台形の面積',
      hint: '2つの底辺の和の半分に高さを掛ける',
      variables: ['面積', '下底', '上底', '高さ'],
    },
    area_rectangle: {
      name: '長方形の面積',
      hint: '2辺の積',
      variables: ['面積', '縦', '横'],
    },
    area_triangle: {
      name: '三角形の面積',
      hint: '底辺と高さの積を2で割る',
      variables: ['面積', '底辺', '高さ'],
    },
    area_circle: {
      name: '円の面積',
      hint: '半径の二乗にπを掛ける',
      variables: ['面積', '半径', 'π ≈ 3.14'],
    },
    circumference: {
      name: '円周',
      hint: '2πr または πd',
      variables: ['円周', '半径', 'π ≈ 3.14'],
    },
    volume_prism: {
      name: '柱体の体積',
      hint: '底面積に高さを掛ける',
      variables: ['体積', '底面積', '高さ'],
    },
    volume_pyramid: {
      name: '錐体の体積',
      hint: '底面積と高さの積の3分の1',
      variables: ['体積', '底面積', '高さ'],
    },
    volume_parallelepiped: {
      name: '直方体の体積',
      hint: '3つの辺の長さの積',
      variables: ['体積', '縦', '横', '高さ'],
    },
    volume_cube: {
      name: '立方体の体積',
      hint: '一辺の長さの3乗',
      variables: ['体積', '立方体の一辺'],
    },
    surface_cube: {
      name: '立方体の表面積',
      hint: '6つの正方形の面',
      variables: ['表面積', '立方体の一辺'],
    },
    volume_cylinder: {
      name: '円柱の体積',
      hint: '円形の底面積に高さを掛ける',
      variables: ['体積', '底面の半径', '高さ', 'π ≈ 3.14'],
    },
    surface_lateral_cylinder: {
      name: '円柱の側面積',
      hint: '円周に高さを掛ける',
      variables: ['側面積', '底面の半径', '高さ', 'π ≈ 3.14'],
    },
    volume_cone: {
      name: '円錐の体積',
      hint: '円柱の体積の3分の1',
      variables: ['体積', '底面の半径', '高さ', 'π ≈ 3.14'],
    },
    surface_lateral_cone: {
      name: '円錐の側面積',
      hint: 'πと半径と母線の積',
      variables: ['側面積', '底面の半径', '母線', 'π ≈ 3.14'],
    },
    volume_sphere: {
      name: '球の体積',
      hint: '4/3πr³',
      variables: ['体積', '半径', 'π ≈ 3.14'],
    },
    surface_sphere: {
      name: '球の表面積',
      hint: '同じ半径の円4つ分の面積',
      variables: ['表面積', '半径', 'π ≈ 3.14'],
    },
    surface_lateral_prism: {
      name: '柱体の側面積',
      hint: '底面の周の長さに高さを掛ける',
      variables: ['側面積', '底面の周の長さ', '高さ'],
    },
    square_sum: {
      name: '和の平方',
      hint: '中央の2abを忘れない',
      variables: ['第1項', '第2項'],
    },
    square_diff: {
      name: '差の平方',
      hint: '中央の項は負、両端は正',
      variables: ['引かれる数', '引く数'],
    },
    diff_squares: {
      name: '平方差',
      hint: '和と差の積',
      variables: ['1つ目の数', '2つ目の数'],
    },
    discriminant: {
      name: '判別式',
      hint: 'bの二乗から4acを引く',
      variables: ['判別式', 'x²の係数', 'xの係数', '定数項'],
    },
    quadratic_roots: {
      name: '二次方程式の解',
      hint: '-b ± √D を 2a で割る',
      variables: ['方程式の解', '判別式', 'x²の係数', 'xの係数'],
    },
    power_product: {
      name: 'べきの積（同じ底）',
      hint: '掛け算では指数を足す',
      variables: ['底', '1つ目の指数', '2つ目の指数'],
    },
    power_quotient: {
      name: 'べきの商（同じ底）',
      hint: '割り算では指数を引く',
      variables: ['底', '割られる指数', '割る指数'],
    },
    power_of_power: {
      name: 'べきのべき',
      hint: '指数どうしを掛ける',
      variables: ['底', '内側の指数', '外側の指数'],
    },
    power_zero: {
      name: '0乗',
      hint: '0でない数の0乗は1',
      variables: ['底 (x ≠ 0)'],
    },
    power_negative: {
      name: '負の指数',
      hint: '負の指数は対応する正の指数の逆数',
      variables: ['底 (x ≠ 0)', '指数'],
    },
  },
  uk: {
    area_trapezoid: {
      name: 'Площа Трапеції',
      hint: 'Півсума основ, помножена на висоту',
      variables: ['площа', 'нижня основа', 'верхня основа', 'висота'],
    },
    area_rectangle: {
      name: 'Площа Прямокутника',
      hint: 'Добуток двох сторін',
      variables: ['площа', 'довжина', 'ширина'],
    },
    area_triangle: {
      name: 'Площа Трикутника',
      hint: 'Основа помножена на висоту, поділена на 2',
      variables: ['площа', 'основа', 'висота'],
    },
    area_circle: {
      name: 'Площа Круга',
      hint: 'Пі, помножене на квадрат радіуса',
      variables: ['площа', 'радіус', 'пі ≈ 3.14'],
    },
    circumference: {
      name: 'Довжина Кола',
      hint: 'Два пі на радіус або пі на діаметр',
      variables: ['довжина кола', 'радіус', 'пі ≈ 3.14'],
    },
    volume_prism: {
      name: 'Обʼєм Призми',
      hint: 'Площа основи, помножена на висоту',
      variables: ['обʼєм', 'площа основи', 'висота'],
    },
    volume_pyramid: {
      name: 'Обʼєм Піраміди',
      hint: 'Третина добутку площі основи на висоту',
      variables: ['обʼєм', 'площа основи', 'висота'],
    },
    volume_parallelepiped: {
      name: 'Обʼєм Паралелепіпеда',
      hint: 'Добуток трьох вимірів',
      variables: ['обʼєм', 'довжина', 'ширина', 'висота'],
    },
    volume_cube: {
      name: 'Обʼєм Куба',
      hint: 'Ребро в кубі',
      variables: ['обʼєм', 'ребро куба'],
    },
    surface_cube: {
      name: 'Повна Поверхня Куба',
      hint: 'Шість квадратних граней',
      variables: ['повна площа поверхні', 'ребро куба'],
    },
    volume_cylinder: {
      name: 'Обʼєм Циліндра',
      hint: 'Площа круглої основи, помножена на висоту',
      variables: ['обʼєм', 'радіус основи', 'висота', 'пі ≈ 3.14'],
    },
    surface_lateral_cylinder: {
      name: 'Бічна Поверхня Циліндра',
      hint: 'Довжина кола, помножена на висоту',
      variables: ['бічна поверхня', 'радіус основи', 'висота', 'пі ≈ 3.14'],
    },
    volume_cone: {
      name: 'Обʼєм Конуса',
      hint: 'Третина обʼєму циліндра',
      variables: ['обʼєм', 'радіус основи', 'висота', 'пі ≈ 3.14'],
    },
    surface_lateral_cone: {
      name: 'Бічна Поверхня Конуса',
      hint: 'Пі, помножене на радіус і твірну',
      variables: ['бічна поверхня', 'радіус основи', 'твірна', 'пі ≈ 3.14'],
    },
    volume_sphere: {
      name: 'Обʼєм Сфери',
      hint: 'Чотири третіх пі на куб радіуса',
      variables: ['обʼєм', 'радіус', 'пі ≈ 3.14'],
    },
    surface_sphere: {
      name: 'Площа Сфери',
      hint: 'Чотири площі круга з тим самим радіусом',
      variables: ['площа поверхні', 'радіус', 'пі ≈ 3.14'],
    },
    surface_lateral_prism: {
      name: 'Бічна Поверхня Призми',
      hint: 'Периметр основи, помножений на висоту',
      variables: ['бічна поверхня', 'периметр основи', 'висота'],
    },
    square_sum: {
      name: 'Квадрат Суми',
      hint: 'Не забудь подвоєний добуток посередині',
      variables: ['перший доданок', 'другий доданок'],
    },
    square_diff: {
      name: 'Квадрат Різниці',
      hint: 'Середній член відʼємний, крайні додатні',
      variables: ['зменшуване', 'відʼємник'],
    },
    diff_squares: {
      name: 'Різниця Квадратів',
      hint: 'Добуток суми та різниці',
      variables: ['перше число', 'друге число'],
    },
    discriminant: {
      name: 'Дискримінант',
      hint: 'b у квадраті мінус чотири ac',
      variables: ['дискримінант', 'коефіцієнт при x²', 'коефіцієнт при x', 'вільний член'],
    },
    quadratic_roots: {
      name: 'Корені Квадратного Рівняння',
      hint: 'Мінус b плюс-мінус корінь із D, усе поділене на 2a',
      variables: ['корені рівняння', 'дискримінант', 'коефіцієнт при x²', 'коефіцієнт при x'],
    },
    power_product: {
      name: 'Добуток Степенів (Одна Основа)',
      hint: 'Під час множення показники додаються',
      variables: ['основа', 'перший показник', 'другий показник'],
    },
    power_quotient: {
      name: 'Частка Степенів (Одна Основа)',
      hint: 'Під час ділення показники віднімаються',
      variables: ['основа', 'показник діленого', 'показник дільника'],
    },
    power_of_power: {
      name: 'Степінь Степеня',
      hint: 'Показники перемножуються',
      variables: ['основа', 'внутрішній показник', 'зовнішній показник'],
    },
    power_zero: {
      name: 'Нульовий Степінь',
      hint: 'Будь-яке ненульове число в степені 0 дорівнює 1',
      variables: ['основа (x ≠ 0)'],
    },
    power_negative: {
      name: 'Відʼємний Степінь',
      hint: 'Відʼємний степінь — це одиниця, поділена на відповідний додатний степінь',
      variables: ['основа (x ≠ 0)', 'показник'],
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
