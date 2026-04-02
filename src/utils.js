export function normalize(s) {
  return s
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/\s+/g, ' ')
    .replace(/[.,!?;:]+$/g, '')
    .trim();
}

export function checkMatch(input, correct, alternates = []) {
  const n = normalize(input);
  const targets = [correct, ...(alternates || [])].map(normalize);
  return targets.some(t => t === n);
}
