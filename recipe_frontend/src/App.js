import React from "react";
import "./styles.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import RecipeCard from "./components/RecipeCard";
import RecipeDetail from "./components/RecipeDetail";
import FavoritesPanel from "./components/FavoritesPanel";
import AuthModal from "./components/AuthModal";
import { RECIPES } from "./mock/recipes";
import { applyFilters } from "./utils/filters";
import { getFavorites } from "./services/auth";

/**
 * PUBLIC_INTERFACE
 * Root application component that renders the layout and handles UI logic.
 */
function App() {
  /** Implements search, filters, details view, auth modal, and favorites. */
  const [view, setView] = React.useState("browse"); // browse | details | favorites
  const [search, setSearch] = React.useState("");
  const [filters, setFilters] = React.useState({
    ingredient: "",
    cuisine: "any",
    difficulty: "any",
    maxCalories: "",
    sort: ""
  });
  const [detailRecipe, setDetailRecipe] = React.useState(null);
  const [authOpen, setAuthOpen] = React.useState(false);
  const [favVersion, setFavVersion] = React.useState(0); // bump to refresh favorites

  const cuisines = React.useMemo(
    () => Array.from(new Set(RECIPES.map(r => r.cuisine))),
    []
  );

  const filtered = React.useMemo(
    () => applyFilters(RECIPES, { q: search, ...filters }),
    [search, filters]
  );

  const favIds = React.useMemo(() => getFavorites(), [favVersion]);
  const favRecipes = React.useMemo(
    () => RECIPES.filter(r => favIds.includes(r.id)),
    [favIds]
  );

  const openRecipe = (r) => {
    setDetailRecipe(r);
    setView("details");
  };
  const backToBrowse = () => {
    setDetailRecipe(null);
    setView("browse");
  };

  const showAuth = () => setAuthOpen(true);

  return (
    <div className="app-shell" data-theme="light">
      <Header
        onSearchChange={setSearch}
        searchValue={search}
        onNavigate={(v) => setView(v)}
        activeView={view}
        onShowAuth={showAuth}
        onShowFavs={() => setView("favorites")}
      />

      <main className="container main">
        <Sidebar filters={filters} onChange={setFilters} cuisines={cuisines} />

        <section className="content">
          <div className="toolbar">
            {view !== "details" && (
              <>
                <div className="tag">Showing {filtered.length} of {RECIPES.length}</div>
                <button className="btn" onClick={() => { setFilters({ ingredient: "", cuisine: "any", difficulty: "any", maxCalories: "", sort: "" }); setSearch(""); }}>
                  Reset
                </button>
              </>
            )}
          </div>

          {view === "browse" && (
            <>
              {filtered.length === 0 ? (
                <div className="empty">No recipes match your search and filters.</div>
              ) : (
                <div className="grid">
                  {filtered.map((r) => (
                    <RecipeCard key={r.id} recipe={r} onOpen={openRecipe} />
                  ))}
                </div>
              )}
            </>
          )}

          {view === "details" && (
            <RecipeDetail recipe={detailRecipe} onBack={backToBrowse} />
          )}

          {view === "favorites" && (
            <>
              <div className="toolbar">
                <button className="btn" onClick={() => setView("browse")}>← Back to browse</button>
                <button className="btn" onClick={() => setFavVersion(v => v + 1)}>Refresh</button>
              </div>
              <FavoritesPanel recipes={favRecipes} onOpen={openRecipe} />
            </>
          )}
        </section>
      </main>

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onSignedIn={() => setAuthOpen(false)}
      />
    </div>
  );
}

export default App;
