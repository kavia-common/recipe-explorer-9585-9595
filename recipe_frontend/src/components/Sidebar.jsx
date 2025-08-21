import React from "react";

/**
 * PUBLIC_INTERFACE
 * Sidebar filter panel.
 */
export default function Sidebar({ filters, onChange, cuisines }) {
  /** Renders filter controls. */
  return (
    <aside className="sidebar" aria-label="Filters">
      <h3>Filters</h3>

      <div className="filter-group">
        <label htmlFor="ingredient">Ingredient</label>
        <input
          id="ingredient"
          className="input"
          placeholder="e.g., garlic"
          value={filters.ingredient}
          onChange={(e) => onChange({ ...filters, ingredient: e.target.value })}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="cuisine">Cuisine</label>
        <select
          id="cuisine"
          className="select"
          value={filters.cuisine}
          onChange={(e) => onChange({ ...filters, cuisine: e.target.value })}
        >
          <option value="any">Any</option>
          {cuisines.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="difficulty">Difficulty</label>
        <select
          id="difficulty"
          className="select"
          value={filters.difficulty}
          onChange={(e) => onChange({ ...filters, difficulty: e.target.value })}
        >
          <option value="any">Any</option>
          {["Easy", "Medium", "Hard"].map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="calories">Max calories</label>
        <div className="filter-row">
          <input
            id="calories"
            className="input"
            type="number"
            min="0"
            placeholder="e.g., 500"
            value={filters.maxCalories}
            onChange={(e) => onChange({ ...filters, maxCalories: e.target.value })}
          />
          <button className="btn" onClick={() => onChange({ ...filters, maxCalories: "" })}>Clear</button>
        </div>
      </div>

      <div className="filter-group">
        <label htmlFor="sort">Sort by</label>
        <select
          id="sort"
          className="select"
          value={filters.sort}
          onChange={(e) => onChange({ ...filters, sort: e.target.value })}
        >
          <option value="">Default</option>
          <option value="time-asc">Time: Low to High</option>
          <option value="time-desc">Time: High to Low</option>
          <option value="cal-asc">Calories: Low to High</option>
          <option value="cal-desc">Calories: High to Low</option>
        </select>
      </div>
    </aside>
  );
}
