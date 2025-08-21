import React from "react";

/**
 * PUBLIC_INTERFACE
 * Detailed recipe view.
 */
export default function RecipeDetail({ recipe, onBack }) {
  /** Render full recipe details. */
  if (!recipe) return null;

  return (
    <div className="recipe-detail" role="region" aria-label="Recipe details">
      <div className="detail-header">
        <button className="btn" onClick={onBack}>← Back</button>
        <h2 className="detail-title">{recipe.name}</h2>
      </div>
      <div className="detail-meta">
        <span>🍽 Cuisine: {recipe.cuisine}</span>
        <span>⏱ Time: {recipe.time} min</span>
        <span>🔥 Calories: {recipe.calories}</span>
        <span>🎯 Difficulty: {recipe.difficulty}</span>
      </div>

      <div className="section">
        <h4>Ingredients</h4>
        <ul>
          {recipe.ingredients.map((i, idx) => <li key={idx}>{i}</li>)}
        </ul>
      </div>

      <div className="section">
        <h4>Steps</h4>
        <ol>
          {recipe.steps.map((s, idx) => <li key={idx}>{s}</li>)}
        </ol>
      </div>

      <div className="section">
        <h4>Tags</h4>
        <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
          {recipe.tags.map((t) => <span key={t} className="tag"># {t}</span>)}
        </div>
      </div>
    </div>
  );
}
