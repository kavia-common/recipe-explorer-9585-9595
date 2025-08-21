import React from "react";
import { signIn } from "../services/auth";

/**
 * PUBLIC_INTERFACE
 * Authentication modal for mock sign-in.
 */
export default function AuthModal({ open, onClose, onSignedIn }) {
  /** Modal for entering email/password and signing in. */
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    setError("");
    try {
      const user = signIn(email.trim(), password.trim());
      onSignedIn?.(user);
      onClose?.();
    } catch (err) {
      setError(err.message || "Failed to sign in.");
    }
  };

  return (
    <div role="dialog" aria-modal="true" aria-label="Sign in"
         style={{
           position:"fixed", inset:0, background:"rgba(0,0,0,0.35)",
           display:"grid", placeItems:"center", zIndex:100
         }}
         onClick={(e)=>{ if(e.target===e.currentTarget) onClose?.(); }}
    >
      <form
        onSubmit={submit}
        style={{
          background:"#fff", width:"min(96vw, 420px)", borderRadius:"16px",
          border:"1px solid var(--border)", boxShadow:"var(--shadow-lg)", padding:"20px",
          display:"grid", gap:"12px"
        }}
      >
        <h3 style={{margin:0}}>Sign in</h3>
        <div style={{color:"var(--text-muted)", fontSize:14}}>Use any email and password to sign in (mock).</div>
        {error ? <div style={{color:"#b00020"}}>{error}</div> : null}
        <div style={{display:"grid", gap:6}}>
          <label htmlFor="email">Email</label>
          <input id="email" className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <div style={{display:"grid", gap:6}}>
          <label htmlFor="password">Password</label>
          <input id="password" className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" />
        </div>
        <div style={{display:"flex", gap:8, justifyContent:"flex-end", marginTop:4}}>
          <button type="button" className="btn" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn primary">Sign in</button>
        </div>
      </form>
    </div>
  );
}
