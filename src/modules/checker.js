export function checkChoice(selectedIndex, correct_index) {
  return { correct: selectedIndex === correct_index };
}

export function checkBlocks(userBlocks, formula) {
  const normalize = (tokens) => tokens.join('').trim().replace(/\s+/g, '');
  const user = normalize(userBlocks);
  const variants = [formula.correct_latex, ...(formula.alt_forms ?? [])];
  const correct = variants.some(v => normalize(v.split('')) === user);
  return { correct };
}

export function checkInput(latexString, formula) {
  const normalize = (s) =>
    s.trim()
      .replace(/−/g, '-')
      .replace(/\\left|\\right/g, '')
      .replace(/\\cdot/g, '')
      .replace(/\\times/g, '*')
      .replace(/\^\{(\(([^{}]+)\))\}/g, '^{$2}')
      .replace(/\\frac\{\(-([^{}]+)\)\}/g, '\\frac{-$1}')
      .replace(/\{\s+/g, '{')
      .replace(/\s+\}/g, '}')
      .replace(/\s+/g, '');

  const normalized = normalize(latexString).toLowerCase();
  const variants = [formula.correct_latex, ...(formula.alt_forms ?? [])];
  const correct = variants.some(v => normalize(v).toLowerCase() === normalized);
  return { correct, normalized };
}
