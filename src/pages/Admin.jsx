import React, { lazy, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, LockKeyhole, LogOut, ShieldCheck } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";

// Demo-only credentials. Client-side values are not suitable for production authentication.
const ADMIN_EMAIL = "admin@splfintax.com";
const ADMIN_PASSWORD = "SPLAdmin@2026";
const ADMIN_SESSION_KEY = "spl-admin-session";
const AdminCodeEditor = lazy(() => import("../components/AdminCodeEditor"));

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => window.sessionStorage.getItem(ADMIN_SESSION_KEY) === "true",
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  function handleLogin(event) {
    event.preventDefault();
    if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      window.sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
      setIsAuthenticated(true);
      setLoginError("");
      return;
    }
    setLoginError("The email or password is incorrect. Please try again.");
  }

  function handleLogout() {
    window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAuthenticated(false);
    setPassword("");
  }

  if (!isAuthenticated) {
    return (
      <main className="admin-login-page">
        <div className="admin-login-glow admin-login-glow-one" />
        <div className="admin-login-glow admin-login-glow-two" />
        <section className="admin-login-card" role="dialog" aria-modal="true" aria-labelledby="admin-login-title">
          <div className="admin-login-card-top">
            <Link className="admin-back-link" to="/">
              <ArrowLeft size={16} /> Back to website
            </Link>
            <ThemeToggle />
          </div>
          <div className="admin-lock-icon"><LockKeyhole size={24} /></div>
          <span className="admin-eyebrow">SPL CORPORATE SERVICES</span>
          <h1 id="admin-login-title">Admin sign in</h1>
          <p className="admin-login-copy">Sign in to edit and publish website pages.</p>
          <form onSubmit={handleLogin} className="admin-login-form">
            <label htmlFor="admin-email">Email address</label>
            <input
              id="admin-email"
              autoComplete="username"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@company.com"
              required
            />
            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              autoComplete="current-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              required
            />
            {loginError && <p className="admin-login-error" role="alert">{loginError}</p>}
            <button className="admin-primary-button admin-login-submit" type="submit">
              Sign in <LockKeyhole size={16} />
            </button>
          </form>
          <div className="admin-demo-note"><ShieldCheck size={15} /> Admin access only</div>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-fullscreen">
      <header className="admin-fullscreen-header">
        <Link to="/" className="admin-brand-mark" aria-label="SPL home">S</Link>
        <div className="admin-fullscreen-heading"><b>SPL Website Editor</b><span>Edit pages · Preview · Publish</span></div>
        <Link to="/" className="admin-header-view"><ArrowLeft size={15} /> View website</Link>
        <ThemeToggle className="theme-toggle-admin" />
        <button className="admin-header-logout" onClick={handleLogout}><LogOut size={16} /> Sign out</button>
      </header>
      <section className="admin-fullscreen-workspace">
        <Suspense fallback={<div className="admin-code-loading">Loading code editor…</div>}><AdminCodeEditor /></Suspense>
      </section>
    </main>
  );
}
