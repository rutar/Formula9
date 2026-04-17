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
      .replace(/\\left|\\right/g, '')
      .replace(/\\cdot|\\times/g, '*')
      .replace(/\s+/g, '');

  const normalized = normalize(latexString);
  const variants = [formula.correct_latex, ...(formula.alt_forms ?? [])];
  const correct = variants.some(v => normalize(v) === normalized);
  return { correct, normalized };
}
