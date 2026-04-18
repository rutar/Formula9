export function checkChoice(selectedIndex, correct_index) {
  return { correct: selectedIndex === correct_index };
}

export function checkBlocks(userBlocks, formula) {
  const joined = userBlocks.join('').replace(/\s+/g, '').toLowerCase();
  const correct = (formula.correct_blocks ?? '').replace(/\s+/g, '').toLowerCase();
  return { correct: joined === correct };
}

export function checkInput(latexString, formula) {
  const normalize = (s) =>
    s.trim()
      .replace(/\\left\(/g, '(')
      .replace(/\\right\)/g, ')')
      .replace(/\\left\[/g, '[')
      .replace(/\\right\]/g, ']')
      .replace(/\\left\{/g, '{')
      .replace(/\\right\}/g, '}')
      .replace(/−/g, '-')
      .replace(/\\left|\\right/g, '')
      .replace(/\\cdot/g, '')
      .replace(/\\times/g, '*')
      .replace(/\^\{(\(([^{}]+)\))\}/g, '^{$2}')
      .replace(/\\frac\{\(-([^{}]+)\)\}/g, '\\frac{-$1}')
      .replace(/\{\s+/g, '{')
      .replace(/\s+\}/g, '}')
      .replace(/\s+/g, '')
      .replace(/^(.*=)\\frac\{1\}\{(2|3)\}(.+)$/, '$1\\frac{$3}{$2}');

  const sortedRhs = (s) => {
    const eq = s.indexOf('=');
    if (eq === -1) return null;
    const rhs = s.slice(eq + 1);
    if (rhs.includes('-')) return null;
    return s.slice(0, eq + 1) + rhs.split('+').sort().join('+');
  };

  const normalized = normalize(latexString).toLowerCase();
  const variants = [formula.correct_latex, ...(formula.alt_forms ?? [])];
  const correct = variants.some(v => {
    const nv = normalize(v).toLowerCase();
    if (nv === normalized) return true;
    const sa = sortedRhs(normalized);
    const sb = sortedRhs(nv);
    return sa !== null && sb !== null && sa === sb;
  });
  return { correct, normalized };
}
