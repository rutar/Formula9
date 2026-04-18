export const formulas = [

  // ── geometry_2d ────────────────────────────────────────────────────────────

  {
    id: "area_trapezoid",
    name: "Площадь трапеции",
    topic: "geometry_2d",
    correct_latex: "S = \\frac{(a + b) \\cdot h}{2}",
    alt_forms: [
      "S = \\frac{h(a+b)}{2}",
      "S = \\frac{1}{2}(a+b)h",
      "S = \\frac{1}{2} \\cdot (a+b) \\cdot h",
      "S = \\frac{1}{2}(a+b) \\cdot h",
      "S = \\frac{1}{2} \\cdot (a+b)h",
      "S = \\frac{(a+b)h}{2}"
    ],
    wrong_options: [
      "S = (a + b) \\cdot h",
      "S = \\frac{(a + b) \\cdot h}{3}",
      "S = \\frac{(a - b) \\cdot h}{2}"
    ],
    blocks: ["S", "=", "(", "a", "+", "b", ")", "\\cdot", "h", ":", "2"],
    correct_blocks: "S=(a+b)\\cdoth:2",
    hint: "Полусумма оснований, умноженная на высоту",
    variables: [
      { symbol: "S", meaning: "площадь" },
      { symbol: "a", meaning: "нижнее основание" },
      { symbol: "b", meaning: "верхнее основание" },
      { symbol: "h", meaning: "высота" }
    ],
    difficulty: "medium"
  },

  {
    id: "area_rectangle",
    name: "Площадь прямоугольника",
    topic: "geometry_2d",
    correct_latex: "S = a \\cdot b",
    alt_forms: ["S = ab"],
    wrong_options: [
      "S = 2(a + b)",
      "S = a + b",
      "S = \\frac{a \\cdot b}{2}"
    ],
    blocks: ["S", "=", "a", "\\cdot", "b"],
    correct_blocks: "S=a\\cdotb",
    hint: "Произведение двух сторон",
    variables: [
      { symbol: "S", meaning: "площадь" },
      { symbol: "a", meaning: "длина" },
      { symbol: "b", meaning: "ширина" }
    ],
    difficulty: "easy"
  },

  {
    id: "area_triangle",
    name: "Площадь треугольника",
    topic: "geometry_2d",
    correct_latex: "S = \\frac{a \\cdot h}{2}",
    alt_forms: [
      "S = \\frac{1}{2} a h",
      "S = \\frac{ah}{2}",
      "S = \\frac{1}{2} \\cdot a \\cdot h",
      "S = \\frac{1}{2} a \\cdot h",
      "S = \\frac{1}{2} \\cdot a h",
      "S = \\frac{a h}{2}"
    ],
    wrong_options: [
      "S = a \\cdot h",
      "S = \\frac{a \\cdot h}{3}",
      "S = \\frac{(a + h)}{2}"
    ],
    blocks: ["S", "=", "a", "\\cdot", "h", ":", "2"],
    correct_blocks: "S=a\\cdoth:2",
    hint: "Основание на высоту, делённое на 2",
    variables: [
      { symbol: "S", meaning: "площадь" },
      { symbol: "a", meaning: "основание" },
      { symbol: "h", meaning: "высота" }
    ],
    difficulty: "easy"
  },

  {
    id: "area_circle",
    name: "Площадь круга",
    topic: "geometry_2d",
    correct_latex: "S = \\pi r^2",
    alt_forms: ["S = \\pi \\cdot r^2"],
    wrong_options: [
      "S = 2\\pi r",
      "S = \\pi r",
      "S = \\pi r^3"
    ],
    blocks: ["S", "=", "\\pi", "r", "^{2}"],
    correct_blocks: "S=\\pir^{2}",
    hint: "Пи умножить на квадрат радиуса",
    variables: [
      { symbol: "S", meaning: "площадь" },
      { symbol: "r", meaning: "радиус" },
      { symbol: "\\pi", meaning: "число пи ≈ 3,14" }
    ],
    difficulty: "easy"
  },

  // ── circles ────────────────────────────────────────────────────────────────

  {
    id: "circumference",
    name: "Длина окружности",
    topic: "circles",
    correct_latex: "C = 2\\pi r",
    alt_forms: ["C = \\pi d", "C = 2 \\cdot \\pi \\cdot r"],
    wrong_options: [
      "C = \\pi r^2",
      "C = \\pi r",
      "C = 2\\pi r^2"
    ],
    blocks: ["C", "=", "2", "\\pi", "r"],
    correct_blocks: "C=2\\pir",
    hint: "Два пи на радиус (или пи на диаметр)",
    variables: [
      { symbol: "C", meaning: "длина окружности" },
      { symbol: "r", meaning: "радиус" },
      { symbol: "\\pi", meaning: "число пи ≈ 3,14" }
    ],
    difficulty: "easy"
  },

  // ── geometry_3d ────────────────────────────────────────────────────────────

  {
    id: "volume_prism",
    name: "Объём призмы",
    topic: "geometry_3d",
    correct_latex: "V = S_{\\text{осн}} \\cdot h",
    alt_forms: ["V = S \\cdot h", "V = S_{\\text{осн}} h", "V = S h"],
    wrong_options: [
      "V = \\frac{S_{\\text{осн}} \\cdot h}{2}",
      "V = \\frac{S_{\\text{осн}} \\cdot h}{3}",
      "V = 2 S_{\\text{осн}} \\cdot h"
    ],
    blocks: ["V", "=", "S_{\\text{осн}}", "\\cdot", "h"],
    correct_blocks: "V=S_{\\text{осн}}\\cdoth",
    hint: "Площадь основания умножить на высоту",
    variables: [
      { symbol: "V", meaning: "объём" },
      { symbol: "S_{\\text{осн}}", meaning: "площадь основания" },
      { symbol: "h", meaning: "высота" }
    ],
    difficulty: "easy"
  },

  {
    id: "volume_pyramid",
    name: "Объём пирамиды",
    topic: "geometry_3d",
    correct_latex: "V = \\frac{S_{\\text{осн}} \\cdot h}{3}",
    alt_forms: [
      "V = \\frac{1}{3} S h",
      "V = \\frac{S_{\\text{осн}} h}{3}",
      "V = \\frac{S_{\\text{осн}}}{3} \\cdot h",
      "V = \\frac{S_{\\text{осн}}}{3} h",
      "V = \\frac{1}{3} S_{\\text{осн}} \\cdot h",
      "V = \\frac{1}{3} S_{\\text{осн}} h",
      "V = \\frac{1}{3} S \\cdot h",
      "V = \\frac{1}{3} \\cdot S_{\\text{осн}} \\cdot h",
      "V = \\frac{S_{\\text{осн}} \\cdot h}{3}"
    ],
    wrong_options: [
      "V = S_{\\text{осн}} \\cdot h",
      "V = \\frac{S_{\\text{осн}} \\cdot h}{2}",
      "V = \\frac{S_{\\text{осн}} \\cdot h}{4}"
    ],
    blocks: ["V", "=", "S_{\\text{осн}}", "\\cdot", "h", ":", "3"],
    correct_blocks: "V=S_{\\text{осн}}\\cdoth:3",
    hint: "Треть произведения площади основания на высоту",
    variables: [
      { symbol: "V", meaning: "объём" },
      { symbol: "S_{\\text{осн}}", meaning: "площадь основания" },
      { symbol: "h", meaning: "высота" }
    ],
    difficulty: "medium"
  },

  {
    id: "volume_parallelepiped",
    name: "Объём параллелепипеда",
    topic: "geometry_3d",
    correct_latex: "V = a \\cdot b \\cdot c",
    alt_forms: ["V = abc"],
    wrong_options: [
      "V = 2(ab + bc + ca)",
      "V = (a + b + c)^2",
      "V = \\frac{a \\cdot b \\cdot c}{2}"
    ],
    blocks: ["V", "=", "a", "\\cdot", "b", "\\cdot", "c"],
    correct_blocks: "V=a\\cdotb\\cdotc",
    hint: "Произведение трёх измерений",
    variables: [
      { symbol: "V", meaning: "объём" },
      { symbol: "a", meaning: "длина" },
      { symbol: "b", meaning: "ширина" },
      { symbol: "c", meaning: "высота" }
    ],
    difficulty: "easy"
  },

  {
    id: "volume_cube",
    name: "Объём куба",
    topic: "geometry_3d",
    correct_latex: "V = a^3",
    alt_forms: [],
    wrong_options: [
      "V = a^2",
      "V = 6a^2",
      "V = 3a^2"
    ],
    blocks: ["V", "=", "a", "^{3}"],
    correct_blocks: "V=a^{3}",
    hint: "Ребро в кубе",
    variables: [
      { symbol: "V", meaning: "объём" },
      { symbol: "a", meaning: "ребро куба" }
    ],
    difficulty: "easy"
  },

  {
    id: "surface_cube",
    name: "Полная поверхность куба",
    topic: "geometry_3d",
    correct_latex: "S = 6a^2",
    alt_forms: [],
    wrong_options: [
      "S = a^3",
      "S = 4a^2",
      "S = 3a^2"
    ],
    blocks: ["S", "=", "6", "a", "^{2}"],
    correct_blocks: "S=6a^{2}",
    hint: "Шесть квадратных граней",
    variables: [
      { symbol: "S", meaning: "полная поверхность" },
      { symbol: "a", meaning: "ребро куба" }
    ],
    difficulty: "easy"
  },

  {
    id: "volume_cylinder",
    name: "Объём цилиндра",
    topic: "geometry_3d",
    correct_latex: "V = \\pi r^2 h",
    alt_forms: ["V = \\pi \\cdot r^2 \\cdot h", "V = \\pi r^2 \\cdot h", "V = \\pi \\cdot r^2 h"],
    wrong_options: [
      "V = 2\\pi r h",
      "V = \\pi r h^2",
      "V = \\frac{\\pi r^2 h}{3}"
    ],
    blocks: ["V", "=", "\\pi", "r", "^{2}", "h"],
    correct_blocks: "V=\\pir^{2}h",
    hint: "Площадь круга (основания) умножить на высоту",
    variables: [
      { symbol: "V", meaning: "объём" },
      { symbol: "r", meaning: "радиус основания" },
      { symbol: "h", meaning: "высота" },
      { symbol: "\\pi", meaning: "число пи ≈ 3,14" }
    ],
    difficulty: "medium"
  },

  {
    id: "surface_lateral_cylinder",
    name: "Боковая поверхность цилиндра",
    topic: "geometry_3d",
    correct_latex: "S_{\\text{бок}} = 2\\pi r h",
    alt_forms: ["S = 2\\pi r h"],
    wrong_options: [
      "S_{\\text{бок}} = \\pi r^2 h",
      "S_{\\text{бок}} = \\pi r h",
      "S_{\\text{бок}} = 2\\pi r^2"
    ],
    blocks: ["S_{\\text{бок}}", "=", "2", "\\pi", "r", "h"],
    correct_blocks: "S_{\\text{бок}}=2\\pirh",
    hint: "Длина окружности умножить на высоту",
    variables: [
      { symbol: "S_{\\text{бок}}", meaning: "боковая поверхность" },
      { symbol: "r", meaning: "радиус основания" },
      { symbol: "h", meaning: "высота" },
      { symbol: "\\pi", meaning: "число пи ≈ 3,14" }
    ],
    difficulty: "medium"
  },

  {
    id: "volume_cone",
    name: "Объём конуса",
    topic: "geometry_3d",
    correct_latex: "V = \\frac{\\pi r^2 h}{3}",
    alt_forms: [
      "V = \\frac{1}{3}\\pi r^2 h",
      "V = \\frac{\\pi r^2}{3} h",
      "V = \\frac{\\pi r^2}{3} \\cdot h",
      "V = \\frac{1}{3} \\pi r^2 \\cdot h",
      "V = \\frac{1}{3} \\pi \\cdot r^2 h",
      "V = \\frac{1}{3} \\pi \\cdot r^2 \\cdot h",
      "V = \\frac{1}{3} \\cdot \\pi r^2 h",
      "V = \\frac{1}{3} \\cdot \\pi r^2 \\cdot h",
      "V = \\frac{\\pi r^2 \\cdot h}{3}"
    ],
    wrong_options: [
      "V = \\pi r^2 h",
      "V = \\frac{\\pi r h^2}{3}",
      "V = \\frac{\\pi r^2 h}{2}"
    ],
    blocks: ["V", "=", "\\pi", "r", "^{2}", "h", ":", "3"],
    correct_blocks: "V=\\pir^{2}h:3",
    hint: "Треть объёма цилиндра",
    variables: [
      { symbol: "V", meaning: "объём" },
      { symbol: "r", meaning: "радиус основания" },
      { symbol: "h", meaning: "высота" },
      { symbol: "\\pi", meaning: "число пи ≈ 3,14" }
    ],
    difficulty: "medium"
  },

  {
    id: "surface_lateral_cone",
    name: "Боковая поверхность конуса",
    topic: "geometry_3d",
    correct_latex: "S_{\\text{бок}} = \\pi r l",
    alt_forms: ["S = \\pi r l"],
    wrong_options: [
      "S_{\\text{бок}} = \\pi r^2",
      "S_{\\text{бок}} = 2\\pi r l",
      "S_{\\text{бок}} = \\pi r h"
    ],
    blocks: ["S_{\\text{бок}}", "=", "\\pi", "r", "l"],
    correct_blocks: "S_{\\text{бок}}=\\pirl",
    hint: "Пи умножить на радиус и образующую",
    variables: [
      { symbol: "S_{\\text{бок}}", meaning: "боковая поверхность" },
      { symbol: "r", meaning: "радиус основания" },
      { symbol: "l", meaning: "образующая" },
      { symbol: "\\pi", meaning: "число пи ≈ 3,14" }
    ],
    difficulty: "medium"
  },

  {
    id: "volume_sphere",
    name: "Объём шара",
    topic: "geometry_3d",
    correct_latex: "V = \\frac{4}{3}\\pi r^3",
    alt_forms: ["V = \\frac{4\\pi r^3}{3}"],
    wrong_options: [
      "V = \\frac{4}{3}\\pi r^2",
      "V = 4\\pi r^3",
      "V = \\frac{2}{3}\\pi r^3"
    ],
    blocks: ["V", "=", "4", ":", "3", "\\cdot", "\\pi", "r", "^{3}"],
    correct_blocks: "V=4:3\\cdot\\pir^{3}",
    hint: "Четыре трети пи на куб радиуса",
    variables: [
      { symbol: "V", meaning: "объём" },
      { symbol: "r", meaning: "радиус" },
      { symbol: "\\pi", meaning: "число пи ≈ 3,14" }
    ],
    difficulty: "hard"
  },

  {
    id: "surface_sphere",
    name: "Площадь сферы",
    topic: "geometry_3d",
    correct_latex: "S = 4\\pi r^2",
    alt_forms: ["S = 4 \\cdot \\pi \\cdot r^2"],
    wrong_options: [
      "S = 2\\pi r^2",
      "S = \\pi r^2",
      "S = 4\\pi r^3"
    ],
    blocks: ["S", "=", "4", "\\pi", "r", "^{2}"],
    correct_blocks: "S=4\\pir^{2}",
    hint: "Четыре площади круга того же радиуса",
    variables: [
      { symbol: "S", meaning: "площадь сферы" },
      { symbol: "r", meaning: "радиус" },
      { symbol: "\\pi", meaning: "число пи ≈ 3,14" }
    ],
    difficulty: "hard"
  },

  {
    id: "surface_lateral_prism",
    name: "Боковая поверхность призмы",
    topic: "geometry_3d",
    correct_latex: "S_{\\text{бок}} = P_{\\text{осн}} \\cdot h",
    alt_forms: ["S = P \\cdot h"],
    wrong_options: [
      "S_{\\text{бок}} = \\frac{P_{\\text{осн}} \\cdot h}{2}",
      "S_{\\text{бок}} = S_{\\text{осн}} \\cdot h",
      "S_{\\text{бок}} = 2 P_{\\text{осн}} \\cdot h"
    ],
    blocks: ["S_{\\text{бок}}", "=", "P_{\\text{осн}}", "\\cdot", "h"],
    correct_blocks: "S_{\\text{бок}}=P_{\\text{осн}}\\cdoth",
    hint: "Периметр основания умножить на высоту",
    variables: [
      { symbol: "S_{\\text{бок}}", meaning: "боковая поверхность" },
      { symbol: "P_{\\text{осн}}", meaning: "периметр основания" },
      { symbol: "h", meaning: "высота" }
    ],
    difficulty: "medium"
  },

  // ── algebra_identities ─────────────────────────────────────────────────────

  {
    id: "square_sum",
    name: "Квадрат суммы",
    topic: "algebra_identities",
    correct_latex: "(a + b)^2 = a^2 + 2ab + b^2",
    alt_forms: [
      "(a+b)^2 = a^2 + 2ab + b^2",
      "(a+b)^{2}=b^{2}+2ab+a^{2}",
      "(a+b)^{2}=2ab+a^{2}+b^{2}",
      "(a+b)^{2}=2ab+b^{2}+a^{2}"
    ],
    wrong_options: [
      "(a + b)^2 = a^2 + b^2",
      "(a + b)^2 = a^2 - 2ab + b^2",
      "(a + b)^2 = 2a^2 + 2b^2"
    ],
    blocks: ["(", "a", "+", "b", ")", "^{2}", "=", "a", "^{2}", "+", "2ab", "+", "b", "^{2}"],
    correct_blocks: "(a+b)^{2}=a^{2}+2ab+b^{2}",
    hint: "Не забудь удвоенное произведение в середине",
    variables: [
      { symbol: "a", meaning: "первое слагаемое" },
      { symbol: "b", meaning: "второе слагаемое" }
    ],
    difficulty: "medium"
  },

  {
    id: "square_diff",
    name: "Квадрат разности",
    topic: "algebra_identities",
    correct_latex: "(a - b)^2 = a^2 - 2ab + b^2",
    alt_forms: [
      "(a-b)^2 = a^2 - 2ab + b^2",
      "(a-b)^{2}=b^{2}-2ab+a^{2}"
    ],
    wrong_options: [
      "(a - b)^2 = a^2 - b^2",
      "(a - b)^2 = a^2 + 2ab + b^2",
      "(a - b)^2 = a^2 + b^2"
    ],
    blocks: ["(", "a", "-", "b", ")", "^{2}", "=", "a", "^{2}", "-", "2ab", "+", "b", "^{2}"],
    correct_blocks: "(a-b)^{2}=a^{2}-2ab+b^{2}",
    hint: "Средний член отрицательный, крайние — положительные",
    variables: [
      { symbol: "a", meaning: "уменьшаемое" },
      { symbol: "b", meaning: "вычитаемое" }
    ],
    difficulty: "medium"
  },

  {
    id: "diff_squares",
    name: "Разность квадратов",
    topic: "algebra_identities",
    correct_latex: "a^2 - b^2 = (a + b)(a - b)",
    alt_forms: ["a^2 - b^2 = (a-b)(a+b)"],
    wrong_options: [
      "a^2 - b^2 = (a - b)^2",
      "a^2 - b^2 = (a + b)^2",
      "a^2 - b^2 = (a + b)(a + b)"
    ],
    blocks: ["a", "^{2}", "-", "b", "^{2}", "=", "(", "a", "+", "b", ")", "(", "a", "-", "b", ")"],
    correct_blocks: "a^{2}-b^{2}=(a+b)(a-b)",
    hint: "Произведение суммы и разности",
    variables: [
      { symbol: "a", meaning: "первое число" },
      { symbol: "b", meaning: "второе число" }
    ],
    difficulty: "medium"
  },

  // ── equations_quadratic ────────────────────────────────────────────────────

  {
    id: "discriminant",
    name: "Дискриминант",
    topic: "equations_quadratic",
    correct_latex: "D = b^2 - 4ac",
    alt_forms: [],
    wrong_options: [
      "D = b^2 + 4ac",
      "D = b^2 - 2ac",
      "D = 2b^2 - 4ac"
    ],
    blocks: ["D", "=", "b", "^{2}", "-", "4", "a", "c"],
    correct_blocks: "D=b^{2}-4ac",
    hint: "b в квадрате минус четыре ac",
    variables: [
      { symbol: "D", meaning: "дискриминант" },
      { symbol: "a", meaning: "коэф. при x²" },
      { symbol: "b", meaning: "коэф. при x" },
      { symbol: "c", meaning: "свободный член" }
    ],
    difficulty: "medium"
  },

  {
    id: "quadratic_roots",
    name: "Корни квадратного уравнения",
    topic: "equations_quadratic",
    correct_latex: "x_{1,2} = \\frac{-b \\pm \\sqrt{D}}{2a}",
    alt_forms: ["x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}"],
    wrong_options: [
      "x_{1,2} = \\frac{b \\pm \\sqrt{D}}{2a}",
      "x_{1,2} = \\frac{-b \\pm \\sqrt{D}}{a}",
      "x_{1,2} = \\frac{-b \\pm D}{2a}"
    ],
    blocks: ["x_{1,2}", "=", "(", "-b", "\\pm", "\\sqrt{D}", ")", ":", "(", "2", "\\cdot", "a", ")"],
    correct_blocks: "x_{1,2}=(-b\\pm\\sqrt{D}):(2\\cdota)",
    hint: "Минус b плюс-минус корень из D, всё делим на 2a",
    variables: [
      { symbol: "x_{1,2}", meaning: "корни уравнения" },
      { symbol: "D", meaning: "дискриминант" },
      { symbol: "a", meaning: "коэф. при x²" },
      { symbol: "b", meaning: "коэф. при x" }
    ],
    difficulty: "hard"
  },

  // ── powers ─────────────────────────────────────────────────────────────────

  {
    id: "power_product",
    name: "Произведение степеней (одно основание)",
    topic: "powers",
    correct_latex: "x^a \\cdot x^b = x^{a+b}",
    alt_forms: ["x^a \\cdot x^b = x^{a + b}"],
    wrong_options: [
      "x^a \\cdot x^b = x^{a \\cdot b}",
      "x^a \\cdot x^b = x^{a - b}",
      "x^a \\cdot x^b = (2x)^{a+b}"
    ],
    blocks: ["x", "^{a}", "\\cdot", "x", "^{b}", "=", "x", "^{a+b}"],
    correct_blocks: "x^{a}\\cdotx^{b}=x^{a+b}",
    hint: "При умножении показатели складываются",
    variables: [
      { symbol: "x", meaning: "основание" },
      { symbol: "a", meaning: "первый показатель" },
      { symbol: "b", meaning: "второй показатель" }
    ],
    difficulty: "easy"
  },

  {
    id: "power_quotient",
    name: "Деление степеней (одно основание)",
    topic: "powers",
    correct_latex: "\\frac{x^a}{x^b} = x^{a-b}",
    alt_forms: ["x^a / x^b = x^{a-b}"],
    wrong_options: [
      "\\frac{x^a}{x^b} = x^{a+b}",
      "\\frac{x^a}{x^b} = x^{a \\cdot b}",
      "\\frac{x^a}{x^b} = x^{\\frac{a}{b}}"
    ],
    blocks: ["x", "^{a}", ":", "x", "^{b}", "=", "x", "^{a-b}"],
    correct_blocks: "x^{a}:x^{b}=x^{a-b}",
    hint: "При делении показатели вычитаются",
    variables: [
      { symbol: "x", meaning: "основание" },
      { symbol: "a", meaning: "показатель делимого" },
      { symbol: "b", meaning: "показатель делителя" }
    ],
    difficulty: "easy"
  },

  {
    id: "power_of_power",
    name: "Степень степени",
    topic: "powers",
    correct_latex: "(x^a)^b = x^{ab}",
    alt_forms: ["(x^a)^b = x^{a \\cdot b}"],
    wrong_options: [
      "(x^a)^b = x^{a+b}",
      "(x^a)^b = x^{a-b}",
      "(x^a)^b = x^{a^b}"
    ],
    blocks: ["(", "x", "^{a}", ")", "^{b}", "=", "x", "^{ab}"],
    correct_blocks: "(x^{a})^{b}=x^{ab}",
    hint: "Показатели перемножаются",
    variables: [
      { symbol: "x", meaning: "основание" },
      { symbol: "a", meaning: "внутренний показатель" },
      { symbol: "b", meaning: "внешний показатель" }
    ],
    difficulty: "easy"
  },

  {
    id: "power_zero",
    name: "Нулевая степень",
    topic: "powers",
    correct_latex: "x^0 = 1",
    alt_forms: [],
    wrong_options: [
      "x^0 = 0",
      "x^0 = x",
      "x^0 = -1"
    ],
    blocks: ["x", "^{0}", "=", "1"],
    correct_blocks: "x^{0}=1",
    hint: "Любое ненулевое число в степени 0 равно 1",
    variables: [
      { symbol: "x", meaning: "основание (x ≠ 0)" }
    ],
    difficulty: "easy"
  },

  {
    id: "power_negative",
    name: "Отрицательная степень",
    topic: "powers",
    correct_latex: "x^{-a} = \\frac{1}{x^a}",
    alt_forms: ["x^{-n} = \\frac{1}{x^n}"],
    wrong_options: [
      "x^{-a} = -x^a",
      "x^{-a} = \\frac{1}{x^{-a}}",
      "x^{-a} = x^a"
    ],
    blocks: ["x", "^{-a}", "=", "1", ":", "x", "^{a}"],
    correct_blocks: "x^{-a}=1:x^{a}",
    hint: "Отрицательная степень — это единица, делённая на положительную",
    variables: [
      { symbol: "x", meaning: "основание (x ≠ 0)" },
      { symbol: "a", meaning: "показатель" }
    ],
    difficulty: "medium"
  }

];
