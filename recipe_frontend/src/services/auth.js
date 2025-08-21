const KEY_USER = "rx_user";
const KEY_FAVS = "rx_favs";

/**
 * PUBLIC_INTERFACE
 * Returns current user object or null.
 */
export function getCurrentUser() {
  /** Get the currently authenticated user from localStorage. */
  try {
    const raw = localStorage.getItem(KEY_USER);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * PUBLIC_INTERFACE
 * Perform a mock sign-in with email and password.
 */
export function signIn(email, password) {
  /** Mock sign in. Accepts any non-empty email/password. */
  if (!email || !password) throw new Error("Email and password are required.");
  const user = { id: "u-1", email };
  localStorage.setItem(KEY_USER, JSON.stringify(user));
  return user;
}

/**
 * PUBLIC_INTERFACE
 * Sign out the current user.
 */
export function signOut() {
  /** Remove user from storage and keep favorites. */
  localStorage.removeItem(KEY_USER);
}

/**
 * PUBLIC_INTERFACE
 * Toggle favorite recipe by id for current user (stored globally here).
 */
export function toggleFavorite(recipeId) {
  /** Toggle a recipe in favorites collection in localStorage. */
  const favs = getFavorites();
  const next = favs.includes(recipeId)
    ? favs.filter((id) => id !== recipeId)
    : [...favs, recipeId];
  localStorage.setItem(KEY_FAVS, JSON.stringify(next));
  return next;
}

/**
 * PUBLIC_INTERFACE
 * Get favorite recipe ids.
 */
export function getFavorites() {
  /** Return the list of favorite recipe ids from localStorage. */
  try {
    const raw = localStorage.getItem(KEY_FAVS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
