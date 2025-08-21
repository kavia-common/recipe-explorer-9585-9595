import React from "react";
import { getFavorites, toggleFavorite, getCurrentUser } from "../services/auth";

/**
 * PUBLIC_INTERFACE
 * Card representation of a recipe.
 */
export default function RecipeCard({ recipe, onOpen }) {
  /** Presents recipe summary and actions. */
  const [favs, setFavs] = React.useState(getFavorites());
  const user = getCurrentUser();
  const isFav = favs.includes(recipe.id);

  const handleFav = () => {
    if (!user) {
      alert("Please sign in to save favorites.");
      return;
    }
    const next = toggleFavorite(recipe.id);
    setFavs(next);
  };

  return (
    <div className="card" role="article" aria-labelledby={`title-${recipe.id}`}>
      <div className="card-media">
        <span className="card-badge">{recipe.cuisine}</span>
      </div>
      <div className="card-content">
        <h3 id={`title-${recipe.id}`} className="card-title">{recipe.name}</h3>
        <div className="card-meta">
          <span>⏱ {recipe.time}m</span>
          <span>•</span>
          <span>🔥 {recipe.calories} cal</span>
          <span>•</span>
          <span>🎯 {recipe.difficulty}</span>
        </div>
        <div className="card-actions">
          <div className="tag">🥗 {recipe.ingredients.length} ingredients</div>
          <div style={{display:"flex", gap:8}}>
            <button className="btn" onClick={() => onOpen(recipe)}>View</button>
            <button
              className={`btn ${isFav ? "accent" : ""}`}
              aria-pressed={isFav}
              aria-label={isFav ? "Remove from favorites" : "Save to favorites"}
              onClick={handleFav}
              title={isFav ? "Remove from favorites" : "Save to favorites"}
            >
              {isFav ? "⭐" : "☆"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
