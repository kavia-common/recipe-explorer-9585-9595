/**
 * PUBLIC_INTERFACE
 * Filter recipes by query, ingredient, cuisine, difficulty, and calories range.
 */
export function applyFilters(recipes, { q, ingredient, cuisine, difficulty, maxCalories, sort }) {
  /** Apply search and filter options to a recipes array. */
  let out = recipes;

  if (q && q.trim()) {
    const t = q.trim().toLowerCase();
    out = out.filter(
      r =>
        r.name.toLowerCase().includes(t) ||
        r.ingredients.some(i => i.toLowerCase().includes(t))
    );
  }
  if (ingredient && ingredient.trim()) {
    const i = ingredient.trim().toLowerCase();
    out = out.filter(r => r.ingredients.some(x => x.toLowerCase().includes(i)));
  }
  if (cuisine && cuisine !== "any") {
    out = out.filter(r => r.cuisine === cuisine);
  }
  if (difficulty && difficulty !== "any") {
    out = out.filter(r => r.difficulty === difficulty);
  }
  if (maxCalories) {
    out = out.filter(r => r.calories <= Number(maxCalories));
  }
  if (sort) {
    if (sort === "time-asc") out = [...out].sort((a, b) => a.time - b.time);
    if (sort === "time-desc") out = [...out].sort((a, b) => b.time - a.time);
    if (sort === "cal-asc") out = [...out].sort((a, b) => a.calories - b.calories);
    if (sort === "cal-desc") out = [...out].sort((a, b) => b.calories - a.calories);
  }
  return out;
}
