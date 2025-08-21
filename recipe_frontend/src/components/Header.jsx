import React from "react";
import { getCurrentUser, signOut } from "../services/auth";

/**
 * PUBLIC_INTERFACE
 * Header component with navigation and actions.
 */
export default function Header({ onSearchChange, searchValue, onNavigate, activeView, onShowAuth, onShowFavs }) {
  /** Renders the app header including search and actions. */
  const user = getCurrentUser();

  return (
    <header className="header">
      <div className="container navbar">
        <div className="brand" style={{cursor: "pointer"}} onClick={() => onNavigate("browse")}>
          <div className="brand-mark" />
          <div>
            <div style={{fontSize: 16}}>Recipe Explorer</div>
            <div style={{fontSize: 12, color: "var(--text-muted)"}}>Browse • Search • Save</div>
          </div>
        </div>

        <div className="search" role="search">
          <span className="prefix" aria-hidden>🔎</span>
          <input
            aria-label="Search recipes by name or ingredient"
            placeholder="Search recipes by name or ingredient..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchValue ? (
            <button className="suffix icon-btn" title="Clear" onClick={() => onSearchChange("")}>✖</button>
          ) : null}
        </div>

        <div className="nav-actions">
          <button
            className={`btn ${activeView === "browse" ? "primary" : ""}`}
            onClick={() => onNavigate("browse")}
          >
            🏠 Browse
          </button>
          <button
            className={`btn ${activeView === "favorites" ? "accent" : ""}`}
            onClick={() => onShowFavs()}
            title="View favorites"
          >
            ⭐ Favorites
          </button>
          {!user ? (
            <button className="btn" onClick={onShowAuth}>Sign in</button>
          ) : (
            <button className="btn" onClick={() => { signOut(); onNavigate("browse"); }}>Sign out</button>
          )}
        </div>
      </div>
    </header>
  );
}
