import React from "react";
import RecipeCard from "./RecipeCard";

/**
 * PUBLIC_INTERFACE
 * Favorites listing component.
 */
export default function FavoritesPanel({ recipes, onOpen }) {
  /** Display a grid of favorite recipes. */
  if (!recipes.length) {
    return <div className="empty">No favorites yet. Save recipes you like ⭐</div>;
  }
  return (
    <div className="grid">
      {recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} onOpen={onOpen} />
      ))}
    </div>
  );
}
