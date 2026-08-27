import React, { useState, useEffect, useRef } from "https://esm.sh/react@18.3.1";
import ReactDOM from "https://esm.sh/react-dom@18.3.1/client";
import { ArrowRight, ArrowLeft, Check, Lock, Home as HomeIcon, Phone, Mail, MapPin, LogOut, Plus, Trash2, X, RefreshCw, ClipboardCopy, Sparkles, ShieldCheck, Building2, KeyRound, } from "https://esm.sh/lucide-react@0.383.0?deps=react@18.3.1";
/* =========================================================================
   CONFIGURATION SUPABASE — à compléter avant la mise en ligne
   Récupérez ces deux valeurs dans Supabase : Project Settings > API
   ========================================================================= */
const SUPABASE_URL = "https://iiyqzeanhpitlwbbqjbp.supabase.co"; // <-- remplacez par votre Project URL
const SUPABASE_ANON_KEY = "sb_publishable_ktgPxR54ZFBnDeO-l3nX3A_JIbe_FJa"; // <-- remplacez par votre clé "anon public"
/* =========================================================================
   ID'HOME CRÉATION — Simulateur de projet de rénovation
   Site statique autonome (HTML + JS, sans build). Persistance partagée via Supabase.
   ========================================================================= */
/* ---------------------------- Design tokens ----------------------------- */
const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Manrope:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

.ihc {
  --sand: #EFE7D6;
  --sand-deep: #E4D8BF;
  --ink: #26221C;
  --ink-soft: #57503f;
  --clay: #9C4420;
  --clay-deep: #7A3418;
  --garrigue: #5C6B4A;
  --garrigue-deep: #414D34;
  --brass: #AD8A4E;
  --paper: #FBF8F1;
  --line: rgba(38,34,28,0.14);
  --shadow: 0 12px 32px rgba(38,34,28,0.10);
  font-family: 'Manrope', sans-serif;
  color: var(--ink);
  background: var(--sand);
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
  position: relative;
}
.ihc *, .ihc *::before, .ihc *::after { box-sizing: border-box; }
.ihc h1, .ihc h2, .ihc h3, .ihc .disp { font-family: 'Fraunces', serif; letter-spacing: -0.01em; }
.ihc .mono { font-family: 'IBM Plex Mono', monospace; }
.ihc button { font-family: inherit; cursor: pointer; }
.ihc a { color: inherit; }
.ihc ::selection { background: var(--clay); color: var(--paper); }

.ihc-shell { max-width: 980px; margin: 0 auto; padding: 0 20px 64px; }
.ihc-topbar { display:flex; align-items:center; justify-content:space-between; padding: 22px 20px; max-width: 980px; margin: 0 auto; }
.ihc-brand { display:flex; align-items:center; gap:10px; }
.ihc-brand-mark { width:34px; height:34px; border-radius: 3px; background: linear-gradient(155deg, var(--clay), var(--clay-deep)); display:flex; align-items:center; justify-content:center; color:var(--paper); flex-shrink:0; }
.ihc-brand-name { font-family:'Fraunces', serif; font-size:17px; font-weight:600; line-height:1.1; }
.ihc-brand-sub { font-size:10.5px; letter-spacing:0.14em; text-transform:uppercase; color: var(--ink-soft); }
.ihc-pro-link { font-size:12px; color: var(--ink-soft); border:none; background:none; text-decoration: underline; text-underline-offset:3px; opacity:0.7; }
.ihc-pro-link:hover { opacity:1; }

.ihc-hero { padding: 30px 0 46px; position: relative; }
.ihc-eyebrow { display:inline-flex; align-items:center; gap:8px; font-size:12px; letter-spacing:0.12em; text-transform:uppercase; color: var(--clay-deep); background: rgba(156,68,32,0.08); border:1px solid rgba(156,68,32,0.22); padding:6px 12px; border-radius:100px; margin-bottom:22px; }
.ihc-h1 { font-size: clamp(32px, 5.4vw, 52px); line-height:1.04; font-weight:600; margin:0 0 18px; max-width: 15ch; }
.ihc-h1 em { font-style:normal; color: var(--clay); }
.ihc-lede { font-size:17px; line-height:1.6; color: var(--ink-soft); max-width:52ch; margin:0 0 34px; }

.ihc-steps3 { display:grid; grid-template-columns: repeat(3,1fr); gap:14px; margin-bottom:36px; }
.ihc-step-card { background: var(--paper); border:1px solid var(--line); border-radius:10px; padding:18px 16px; }
.ihc-step-num { font-family:'IBM Plex Mono', monospace; font-size:12px; color: var(--clay); margin-bottom:10px; display:block; }
.ihc-step-title { font-weight:700; font-size:14.5px; margin-bottom:5px; }
.ihc-step-desc { font-size:13px; color: var(--ink-soft); line-height:1.5; }

.btn { display:inline-flex; align-items:center; gap:9px; border-radius:8px; padding:14px 24px; font-weight:700; font-size:15px; border:1px solid transparent; transition: transform .15s ease, box-shadow .15s ease, background .15s ease; }
.btn:active { transform: translateY(1px); }
.btn-primary { background: var(--ink); color: var(--paper); }
.btn-primary:hover { background: #171410; box-shadow: var(--shadow); }
.btn-primary:disabled { opacity:0.35; cursor:not-allowed; box-shadow:none; }
.btn-clay { background: var(--clay); color: var(--paper); }
.btn-clay:hover { background: var(--clay-deep); box-shadow: var(--shadow); }
.btn-ghost { background: transparent; color: var(--ink); border-color: var(--line); }
.btn-ghost:hover { border-color: var(--ink); }
.btn-sm { padding:9px 14px; font-size:13px; border-radius:7px; }
.btn-danger { background: transparent; color: #8a3122; border: 1px solid rgba(138,49,34,0.3); }
.btn-danger:hover { background: rgba(138,49,34,0.08); }

.ihc-ascent { display:flex; align-items:center; gap:0; margin: 8px 0 40px; }
.ihc-ascent-node { display:flex; flex-direction:column; align-items:center; gap:8px; flex:1; position:relative; }
.ihc-ascent-dot { width:12px; height:12px; border-radius:50%; background: var(--paper); border:2px solid var(--line); z-index:2; transition: all .2s ease; }
.ihc-ascent-node.done .ihc-ascent-dot { background: var(--garrigue); border-color: var(--garrigue); }
.ihc-ascent-node.active .ihc-ascent-dot { background: var(--clay); border-color: var(--clay); width:14px; height:14px; }
.ihc-ascent-track { position:absolute; top:5px; left:-50%; width:100%; height:2px; background: var(--line); z-index:1; }
.ihc-ascent-node:first-child .ihc-ascent-track { display:none; }
.ihc-ascent-node.done .ihc-ascent-track, .ihc-ascent-node.active .ihc-ascent-track { background: var(--garrigue); }
.ihc-ascent-label { font-size:11px; text-align:center; color: var(--ink-soft); max-width:90px; }
.ihc-ascent-node.active .ihc-ascent-label { color: var(--ink); font-weight:700; }

.ihc-card { background: var(--paper); border:1px solid var(--line); border-radius:12px; padding:26px 26px 24px; box-shadow: var(--shadow); }
.ihc-q-title { font-size:22px; font-weight:600; margin:0 0 6px; }
.ihc-q-sub { font-size:14px; color: var(--ink-soft); margin:0 0 26px; }

.ihc-grid3 { display:grid; grid-template-columns: repeat(3,1fr); gap:12px; }
.ihc-opt { border:1.5px solid var(--line); background: var(--sand); border-radius:10px; padding:20px 14px; text-align:center; transition: all .15s ease; display:flex; flex-direction:column; align-items:center; gap:10px; }
.ihc-opt:hover { border-color: var(--ink-soft); }
.ihc-opt.selected { border-color: var(--clay); background: rgba(156,68,32,0.07); }
.ihc-opt-label { font-weight:700; font-size:14.5px; }

.ihc-piece-row { display:grid; grid-template-columns: 1.6fr 100px 130px; gap:12px; align-items:center; padding:12px 0; border-bottom:1px solid var(--line); }
.ihc-piece-row:last-child { border-bottom:none; }
.ihc-piece-name { font-weight:600; font-size:14.5px; }
.ihc-stepper { display:flex; align-items:center; border:1px solid var(--line); border-radius:7px; overflow:hidden; }
.ihc-stepper button { width:30px; height:30px; background: var(--sand); border:none; font-size:16px; font-weight:700; }
.ihc-stepper button:hover { background: var(--sand-deep); }
.ihc-stepper span { width:34px; text-align:center; font-family:'IBM Plex Mono', monospace; font-size:13px; }
.ihc-surf-input { width:100%; border:1px solid var(--line); border-radius:7px; padding:7px 8px; font-family:'IBM Plex Mono', monospace; font-size:13px; background: var(--sand); }
.ihc-surf-input:disabled { opacity:0.35; }

.ihc-tier-grid { display:grid; grid-template-columns: repeat(3,1fr); gap:14px; }
.ihc-tier { border:1.5px solid var(--line); border-radius:12px; padding:20px 16px 18px; text-align:left; position:relative; overflow:hidden; transition: all .15s ease; }
.ihc-tier:hover { border-color: var(--ink-soft); }
.ihc-tier.selected { border-color: var(--clay); box-shadow: var(--shadow); }
.ihc-tier-alt { font-family:'IBM Plex Mono', monospace; font-size:10.5px; color: var(--ink-soft); letter-spacing:0.06em; }
.ihc-tier-name { font-family:'Fraunces', serif; font-size:19px; font-weight:600; margin:2px 0 8px; }
.ihc-tier-tag { font-size:12.5px; font-weight:700; color: var(--clay-deep); margin-bottom:8px; }
.ihc-tier-desc { font-size:12.5px; color: var(--ink-soft); line-height:1.5; }
.ihc-tier-mtn { margin: 6px 0 10px; }

.ihc-poste-row { display:flex; align-items:flex-start; gap:12px; padding:13px 0; border-bottom:1px solid var(--line); }
.ihc-poste-row:last-child { border-bottom:none; }
.ihc-check { width:20px; height:20px; border-radius:5px; border:1.5px solid var(--line); flex-shrink:0; margin-top:1px; display:flex; align-items:center; justify-content:center; background: var(--sand); }
.ihc-check.on { background: var(--garrigue); border-color: var(--garrigue); color: var(--paper); }
.ihc-poste-label { font-weight:700; font-size:14px; }
.ihc-poste-meta { font-size:12px; color: var(--ink-soft); margin-top:2px; }

.ihc-nav { display:flex; justify-content:space-between; align-items:center; margin-top:28px; }

.ihc-result-hero { text-align:center; padding: 10px 10px 6px; }
.ihc-result-range { font-family:'IBM Plex Mono', monospace; font-size:clamp(30px,6vw,44px); font-weight:600; margin:10px 0 6px; color: var(--clay-deep); }
.ihc-result-note { font-size:13px; color: var(--ink-soft); max-width:46ch; margin:0 auto 26px; }
.ihc-breakdown { border-top:1px dashed var(--line); margin-top:10px; padding-top:16px; }
.ihc-bd-row { display:flex; justify-content:space-between; font-size:13.5px; padding:7px 0; }
.ihc-bd-locked { filter: blur(5px); user-select:none; }
.ihc-lock-wrap { position:relative; }
.ihc-lock-overlay { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; text-align:center; }

.ihc-field { display:flex; flex-direction:column; gap:6px; margin-bottom:14px; }
.ihc-field label { font-size:12.5px; font-weight:700; color: var(--ink-soft); }
.ihc-field input, .ihc-field textarea, .ihc-field select { border:1px solid var(--line); border-radius:8px; padding:11px 12px; font-size:14px; font-family:inherit; background: var(--sand); }
.ihc-field input:focus, .ihc-field textarea:focus, .ihc-field select:focus { outline:2px solid var(--clay); outline-offset:1px; border-color: transparent; }
.ihc-field-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
.ihc-checkline { display:flex; align-items:flex-start; gap:9px; font-size:12.5px; color: var(--ink-soft); margin: 6px 0 18px; }
.ihc-checkline input { margin-top:2px; width:18px; height:18px; flex-shrink:0; }

.ihc-modal-backdrop { position:fixed; inset:0; background: rgba(38,34,28,0.5); display:flex; align-items:center; justify-content:center; padding:20px; z-index:50; }
.ihc-modal { background: var(--paper); border-radius:14px; max-width:520px; width:100%; max-height:88vh; overflow-y:auto; padding:28px 26px; box-shadow: 0 24px 60px rgba(0,0,0,0.25); }
.ihc-modal-close { position:absolute; top:16px; right:16px; }

.ihc-footer { text-align:center; padding: 40px 0 10px; font-size:11.5px; color: var(--ink-soft); opacity:0.7; }

/* ---- Admin ---- */
.ihc-admin { background: var(--ink); min-height:100%; color: var(--sand); }
.ihc-admin-topbar { display:flex; justify-content:space-between; align-items:center; padding:20px 28px; border-bottom:1px solid rgba(239,231,214,0.15); max-width:1080px; margin:0 auto; }
.ihc-admin-shell { max-width:1080px; margin:0 auto; padding: 26px 28px 60px; }
.ihc-admin-tabs { display:flex; gap:4px; margin-bottom:26px; border-bottom:1px solid rgba(239,231,214,0.15); flex-wrap:wrap; }
.ihc-admin-tab { background:none; border:none; color: rgba(239,231,214,0.55); padding:11px 16px; font-size:13.5px; font-weight:700; border-bottom:2px solid transparent; }
.ihc-admin-tab.active { color: var(--sand); border-bottom-color: var(--clay); }
.ihc-kpi-grid { display:grid; grid-template-columns: repeat(4,1fr); gap:14px; margin-bottom:30px; }
.ihc-kpi { background: rgba(239,231,214,0.06); border:1px solid rgba(239,231,214,0.14); border-radius:10px; padding:18px; }
.ihc-kpi-val { font-family:'IBM Plex Mono', monospace; font-size:26px; font-weight:600; }
.ihc-kpi-label { font-size:11.5px; color: rgba(239,231,214,0.55); margin-top:4px; }
.ihc-panel { background: rgba(239,231,214,0.05); border:1px solid rgba(239,231,214,0.14); border-radius:12px; padding:20px 22px; margin-bottom:20px; }
.ihc-panel h3 { margin:0 0 14px; font-size:16px; font-family:'Fraunces', serif; }
.ihc-admin-row { display:grid; grid-template-columns: 1.8fr 1fr 1fr 1fr 1fr 40px; gap:10px; align-items:center; padding:10px 0; border-bottom:1px solid rgba(239,231,214,0.1); font-size:13px; }
.ihc-admin-row input, .ihc-admin-row select { width:100%; background: rgba(239,231,214,0.08); border:1px solid rgba(239,231,214,0.2); color: var(--sand); border-radius:6px; padding:7px 8px; font-size:12.5px; font-family:'IBM Plex Mono', monospace; }
.ihc-admin-row select { font-family:'Manrope', sans-serif; }
.ihc-admin-piece-row { display:grid; grid-template-columns: 2fr 1fr 40px; gap:10px; align-items:center; padding:10px 0; border-bottom:1px solid rgba(239,231,214,0.1); }
.ihc-admin-piece-row input { background: rgba(239,231,214,0.08); border:1px solid rgba(239,231,214,0.2); color: var(--sand); border-radius:6px; padding:7px 8px; font-size:13px; font-family:inherit; width:100%; }
.ihc-chip-group { display:flex; flex-wrap:wrap; gap:6px; }
.ihc-chip { font-size:11px; padding:4px 9px; border-radius:100px; border:1px solid rgba(239,231,214,0.25); background: rgba(239,231,214,0.05); color: rgba(239,231,214,0.75); }
.ihc-chip.on { background: var(--garrigue); border-color: var(--garrigue); color: var(--paper); }
.ihc-lead-card { background: rgba(239,231,214,0.06); border:1px solid rgba(239,231,214,0.14); border-radius:10px; padding:16px 18px; margin-bottom:12px; }
.ihc-lead-top { display:flex; justify-content:space-between; align-items:flex-start; gap:12px; }
.ihc-lead-name { font-weight:700; font-size:14.5px; }
.ihc-lead-meta { font-size:12px; color: rgba(239,231,214,0.6); margin-top:3px; line-height:1.6; }
.ihc-status-badge { font-size:11px; font-weight:700; padding:5px 10px; border-radius:100px; border:none; }
.ihc-status-badge.new { background: var(--clay); color: var(--paper); }
.ihc-status-badge.done { background: var(--garrigue); color: var(--paper); }
.ihc-login-wrap { display:flex; align-items:center; justify-content:center; min-height:80vh; padding:20px; }
.ihc-login-card { background: rgba(239,231,214,0.06); border:1px solid rgba(239,231,214,0.15); border-radius:14px; padding:36px 32px; max-width:360px; width:100%; text-align:center; }
.ihc-login-card input { width:100%; background: rgba(239,231,214,0.08); border:1px solid rgba(239,231,214,0.25); color: var(--sand); border-radius:8px; padding:12px; font-size:15px; margin: 18px 0 12px; text-align:center; letter-spacing:0.2em; }
.ihc-error-text { color: #e08a6f; font-size:12.5px; margin-bottom:10px; }
.ihc-toast { position:fixed; bottom:22px; left:50%; transform:translateX(-50%); background: var(--ink); color: var(--sand); padding:12px 20px; border-radius:8px; font-size:13px; z-index:60; box-shadow: var(--shadow); }
.ihc-empty { text-align:center; padding: 30px 10px; color: rgba(239,231,214,0.55); font-size:13.5px; }

@media (max-width: 680px) {
  .ihc-steps3, .ihc-grid3, .ihc-tier-grid { grid-template-columns: 1fr; }
  .ihc-piece-row { grid-template-columns: 1fr; gap:8px; }
  .ihc-field-row { grid-template-columns: 1fr; }
  .ihc-kpi-grid { grid-template-columns: repeat(2,1fr); }
  .ihc-admin-row { grid-template-columns: 1fr 1fr; }
  .ihc-ascent-label { display:none; }
  .ihc-stepper button { width:40px; height:40px; font-size:19px; }
  .ihc-stepper span { width:38px; }
  .ihc-check { width:26px; height:26px; }
  .ihc-hero-cta-desktop { display:none; }
  .ihc-shell { padding-bottom: 96px; }
}
@media (min-width: 681px) {
  .ihc-mobile-cta-bar { display:none; }
}
.ihc-mobile-cta-bar { position:fixed; left:0; right:0; bottom:0; z-index:40; background: rgba(251,248,241,0.92); backdrop-filter: blur(6px); border-top:1px solid var(--line); padding: 12px 16px calc(12px + env(safe-area-inset-bottom)); }
.ihc-mobile-cta-bar .btn { width:100%; justify-content:center; }

.ihc-nav-wrap { position: sticky; bottom:0; margin: 0 -20px; padding: 14px 20px calc(14px + env(safe-area-inset-bottom)); background: rgba(239,231,214,0.94); backdrop-filter: blur(6px); border-top: 1px solid var(--line); z-index: 20; }
@media (min-width: 681px) {
  .ihc-nav-wrap { position: static; background: none; border-top: none; margin: 28px 0 0; padding: 0; backdrop-filter: none; }
}

.ihc-step-counter { font-size:11.5px; font-weight:700; letter-spacing:0.06em; text-transform:uppercase; color: var(--ink-soft); text-align:center; margin: -2px 0 14px; }
@media (min-width: 681px) { .ihc-step-counter { display:none; } }

.ihc-required { color: var(--clay); margin-left:2px; }

.ihc-spinner { width:15px; height:15px; border:2px solid rgba(255,255,255,0.4); border-top-color: currentColor; border-radius:50%; display:inline-block; animation: ihc-spin 0.7s linear infinite; }
@keyframes ihc-spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .ihc-spinner { animation: none; } }

.ihc-select-all-row { display:flex; justify-content:flex-end; gap:8px; margin-bottom:8px; }
.ihc-select-all-row button { font-size:12px; color: var(--ink-soft); background:none; border:none; text-decoration:underline; text-underline-offset:3px; }
.ihc-select-all-row button:hover { color: var(--ink); }

.ihc-field-error { border-color: var(--clay) !important; }
.ihc-field-hint { font-size:11.5px; color: var(--ink-soft); margin-top:4px; }

@media (prefers-reduced-motion: reduce) {
  .ihc * { transition: none !important; animation: none !important; }
}
.ihc :focus-visible { outline: 2px solid var(--clay); outline-offset:2px; }
`;
/* ------------------------------ Defaults -------------------------------- */
const DEFAULT_PASSWORD = "idhome34";
const DEFAULT_TIERS = [
    { id: "fuji", label: "Fuji", altitude: "3 776 m", tagline: "L'essentiel, bien exécuté", description: "Matériaux qualitatifs et finitions soignées pour une rénovation fonctionnelle et durable.", peak: 0.45 },
    { id: "kilimanjaro", label: "Kilimanjaro", altitude: "5 895 m", tagline: "Le confort affirmé", description: "Un cran au-dessus : matériaux milieu/haut de gamme et équipements plus performants.", peak: 0.72 },
    { id: "everest", label: "Everest", altitude: "8 849 m", tagline: "L'excellence sans compromis", description: "Le meilleur du savoir-faire ID'Home Création : matériaux haut de gamme et finitions d'exception.", peak: 1 },
];
const DEFAULT_HABITATIONS = [
    { id: "appartement", label: "Appartement" },
    { id: "maison", label: "Maison" },
    { id: "studio", label: "Studio" },
];
const DEFAULT_PIECES = [
    { id: "cuisine", label: "Cuisine", avgSurface: 10 },
    { id: "sdb", label: "Salle de bain", avgSurface: 6 },
    { id: "sejour", label: "Salon / Séjour", avgSurface: 25 },
    { id: "chambre", label: "Chambre", avgSurface: 12 },
    { id: "wc", label: "WC / Toilettes", avgSurface: 2 },
    { id: "entree", label: "Entrée / Couloir", avgSurface: 6 },
    { id: "bureau", label: "Bureau", avgSurface: 9 },
    { id: "autre", label: "Autre pièce", avgSurface: 10 },
];
const DEFAULT_POSTES = [
    { id: "peinture", label: "Peinture & finitions murs/plafonds", unit: "m2", appliesTo: "all", prices: { fuji: 28, kilimanjaro: 42, everest: 65 } },
    { id: "sol", label: "Revêtement de sol", unit: "m2", appliesTo: "all", prices: { fuji: 35, kilimanjaro: 60, everest: 110 } },
    { id: "elec", label: "Électricité (reprise / mise aux normes)", unit: "m2", appliesTo: "all", prices: { fuji: 45, kilimanjaro: 70, everest: 95 } },
    { id: "plomberie", label: "Plomberie", unit: "forfait_piece", appliesTo: ["cuisine", "sdb", "wc"], prices: { fuji: 800, kilimanjaro: 1500, everest: 2800 } },
    { id: "menuiserie", label: "Menuiseries intérieures", unit: "forfait_piece", appliesTo: "all", prices: { fuji: 350, kilimanjaro: 600, everest: 1100 } },
    { id: "cuisine_eq", label: "Cuisine équipée (meubles + électroménager)", unit: "m2", appliesTo: ["cuisine"], prices: { fuji: 450, kilimanjaro: 900, everest: 1800 } },
    { id: "sdb_eq", label: "Salle de bain équipée (sanitaires + faïence)", unit: "m2", appliesTo: ["sdb"], prices: { fuji: 600, kilimanjaro: 1100, everest: 2200 } },
    { id: "isolation", label: "Isolation thermique", unit: "m2", appliesTo: "all", prices: { fuji: 20, kilimanjaro: 35, everest: 55 } },
    { id: "chauffage", label: "Chauffage / Climatisation", unit: "m2", appliesTo: "all", prices: { fuji: 40, kilimanjaro: 65, everest: 100 } },
    { id: "coordination", label: "Coordination de chantier & aléas", unit: "forfait_projet", appliesTo: "projet", prices: { fuji: 900, kilimanjaro: 1800, everest: 3500 } },
];
const UNIT_LABEL = { m2: "€ / m²", forfait_piece: "€ / pièce", forfait_projet: "forfait projet" };
function defaultConfig() {
    return {
        habitationTypes: DEFAULT_HABITATIONS,
        pieceTypes: DEFAULT_PIECES,
        posteTypes: DEFAULT_POSTES,
        tiers: DEFAULT_TIERS,
        emailSettings: { toEmail: "contact@idhomecreation.fr", serviceId: "", templateId: "", publicKey: "" },
    };
}
const MAX_ATTEMPTS = 5;
const BASE_LOCK_MS = 30000;
const INACTIVITY_LIMIT_MS = 10 * 60 * 1000; // 10 min
function uid(p = "id") { return p + "_" + Math.random().toString(36).slice(2, 9); }
function euro(n) { return Math.round(n).toLocaleString("fr-FR") + " €"; }
function clamp(n, min, max) { return Math.min(Math.max(n, min), max); }
function buildListText(items) {
    if (!items || !items.length)
        return "Aucun";
    return items.map((i) => `• ${i}`).join("\n");
}
async function sha256Hex(text) {
    const enc = new TextEncoder().encode(text);
    const buf = await crypto.subtle.digest("SHA-256", enc);
    return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
/* ------------------------------ Supabase io -------------------------------
   Deux tables (voir SUPABASE_SETUP.sql) :
   - ihc_config(id text primary key, value jsonb)   → lignes: 'config', 'password_hash', 'metrics'
   - ihc_leads(id uuid, created_at timestamptz, status text, data jsonb)
   ============================================================================ */
function sbHeaders(extra = {}) {
    return {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        ...extra,
    };
}
async function sbGetConfigRow(id, fallback) {
    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/ihc_config?id=eq.${id}&select=value`, { headers: sbHeaders() });
        if (!res.ok)
            return fallback;
        const rows = await res.json();
        return rows.length ? rows[0].value : fallback;
    }
    catch (e) {
        return fallback;
    }
}
async function sbUpsertConfigRow(id, value) {
    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/ihc_config`, {
            method: "POST",
            headers: sbHeaders({ Prefer: "resolution=merge-duplicates,return=minimal" }),
            body: JSON.stringify({ id, value }),
        });
        return res.ok;
    }
    catch (e) {
        return false;
    }
}
async function sbGetLeads() {
    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/ihc_leads?select=*&order=created_at.desc`, { headers: sbHeaders() });
        if (!res.ok)
            return [];
        const rows = await res.json();
        return rows.map((r) => ({ id: r.id, date: r.created_at, status: r.status, ...r.data }));
    }
    catch (e) {
        return [];
    }
}
async function sbInsertLead(lead) {
    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/ihc_leads`, {
            method: "POST",
            headers: sbHeaders({ Prefer: "return=representation" }),
            body: JSON.stringify({ status: "new", data: lead }),
        });
        if (!res.ok)
            return null;
        const rows = await res.json();
        return rows[0] ? { id: rows[0].id, date: rows[0].created_at, status: rows[0].status, ...rows[0].data } : null;
    }
    catch (e) {
        return null;
    }
}
async function sbUpdateLeadStatus(id, status) {
    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/ihc_leads?id=eq.${id}`, {
            method: "PATCH",
            headers: sbHeaders({ Prefer: "return=minimal" }),
            body: JSON.stringify({ status }),
        });
        return res.ok;
    }
    catch (e) {
        return false;
    }
}
/* ------------------------------ Email (EmailJS) --------------------------- */
async function sendLeadEmail(emailSettings, templateParams) {
    const { serviceId, templateId, publicKey } = emailSettings || {};
    if (!serviceId || !templateId || !publicKey) {
        return { ok: false, reason: "not_configured" };
    }
    try {
        const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                service_id: serviceId,
                template_id: templateId,
                user_id: publicKey,
                template_params: templateParams,
            }),
        });
        if (!res.ok) {
            const text = await res.text().catch(() => "");
            return { ok: false, reason: "http_error", detail: text };
        }
        return { ok: true };
    }
    catch (e) {
        return { ok: false, reason: "network_error" };
    }
}
/* ------------------------------ Mountain glyph --------------------------- */
function MountainGlyph({ peak = 0.6, active = false, size = "md" }) {
    const h = size === "sm" ? 46 : 64;
    const w = size === "sm" ? 70 : 96;
    const baseY = h - 6;
    const peakY = baseY - peak * (h - 16);
    const midX = w / 2;
    const points = `4,${baseY} ${midX - 14},${peakY + 10} ${midX - 4},${peakY} ${midX + 6},${peakY + 8} ${midX + 22},${peakY - 4} ${w - 4},${baseY}`;
    return (React.createElement("svg", { width: w, height: h, viewBox: `0 0 ${w} ${h}`, "aria-hidden": "true" },
        React.createElement("polygon", { points: points, fill: active ? "var(--clay)" : "var(--sand-deep)", stroke: active ? "var(--clay-deep)" : "var(--line)", strokeWidth: "1.5", strokeLinejoin: "round" }),
        React.createElement("polygon", { points: `${midX - 4},${peakY} ${midX - 1},${peakY + 6} ${midX + 3},${peakY + 5} ${midX + 6},${peakY + 8} ${midX - 4},${peakY}`, fill: active ? "var(--paper)" : "rgba(255,255,255,0.6)", opacity: "0.85" }),
        React.createElement("line", { x1: midX + 22, y1: peakY - 4, x2: midX + 22, y2: peakY - 16, stroke: active ? "var(--clay-deep)" : "var(--ink-soft)", strokeWidth: "1.4" }),
        React.createElement("polygon", { points: `${midX + 22},${peakY - 16} ${midX + 22},${peakY - 11} ${midX + 32},${peakY - 13.5}`, fill: active ? "var(--clay-deep)" : "var(--ink-soft)" })));
}
/* ------------------------------ Ascent progress --------------------------- */
function AscentProgress({ labels, currentIndex }) {
    return (React.createElement("div", { className: "ihc-ascent" }, labels.map((label, i) => (React.createElement("div", { key: label, className: "ihc-ascent-node" + (i < currentIndex ? " done" : i === currentIndex ? " active" : "") },
        React.createElement("div", { className: "ihc-ascent-track" }),
        React.createElement("div", { className: "ihc-ascent-dot" }),
        React.createElement("div", { className: "ihc-ascent-label" }, label))))));
}
/* ------------------------------ Toast -------------------------------------*/
function Toast({ message }) {
    if (!message)
        return null;
    return React.createElement("div", { className: "ihc-toast", role: "status", "aria-live": "polite" }, message);
}
/* ------------------------------ Escape-to-close hook ----------------------*/
function useEscapeClose(active, onClose) {
    useEffect(() => {
        if (!active)
            return;
        function onKey(e) { if (e.key === "Escape")
            onClose(); }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [active, onClose]);
}
/* ------------------------------ Confirm modal ------------------------------*/
function ConfirmDialog({ open, title, body, onConfirm, onCancel }) {
    useEscapeClose(open, onCancel);
    if (!open)
        return null;
    return (React.createElement("div", { className: "ihc-modal-backdrop", role: "dialog", "aria-modal": "true", onMouseDown: (e) => { if (e.target === e.currentTarget)
            onCancel(); } },
        React.createElement("div", { className: "ihc-modal", style: { maxWidth: 420, position: "relative" } },
            React.createElement("h3", { style: { marginTop: 0 } }, title),
            React.createElement("p", { style: { fontSize: 13.5, color: "var(--ink-soft)" } }, body),
            React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 18 } },
                React.createElement("button", { className: "btn btn-ghost btn-sm", onClick: onCancel, autoFocus: true }, "Annuler"),
                React.createElement("button", { className: "btn btn-clay btn-sm", onClick: onConfirm }, "Confirmer")))));
}
/* =========================================================================
   APP
   ========================================================================= */
export default function App() {
    const [ready, setReady] = useState(false);
    const [view, setView] = useState("home"); // home | wizard | result | admin-login | admin
    const [config, setConfig] = useState(null);
    const [leads, setLeads] = useState([]);
    const [metrics, setMetrics] = useState({ started: 0, completed: 0 });
    const [passwordHash, setPasswordHash] = useState(null);
    const [toast, setToast] = useState("");
    const lastActivityRef = useRef(Date.now());
    // wizard state
    const [step, setStep] = useState(0);
    const [habitationType, setHabitationType] = useState(null);
    const [pieceSel, setPieceSel] = useState({}); // {pieceId: {count, surface}}
    const [tierId, setTierId] = useState(null);
    const [posteSel, setPosteSel] = useState({}); // {posteId: bool}
    const [estimate, setEstimate] = useState(null);
    const [showLeadForm, setShowLeadForm] = useState(false);
    const [leadSubmitted, setLeadSubmitted] = useState(false);
    useEffect(() => { loadAll(); }, []);
    const toastTimer = useRef(null);
    function flashToast(msg) {
        setToast(msg);
        if (toastTimer.current)
            window.clearTimeout(toastTimer.current);
        toastTimer.current = window.setTimeout(() => setToast(""), 2600);
    }
    async function loadAll() {
        const [cfg, storedHash, leadsData, metricsData] = await Promise.all([
            sbGetConfigRow("config", null),
            sbGetConfigRow("password_hash", null),
            sbGetLeads(),
            sbGetConfigRow("metrics", { started: 0, completed: 0 }),
        ]);
        const mergedConfig = { ...defaultConfig(), ...(cfg || {}) };
        if (!mergedConfig.emailSettings)
            mergedConfig.emailSettings = defaultConfig().emailSettings;
        setConfig(mergedConfig);
        setPasswordHash((storedHash && storedHash.hash) || (await sha256Hex(DEFAULT_PASSWORD)));
        setLeads(leadsData || []);
        setMetrics(metricsData || { started: 0, completed: 0 });
        setReady(true);
    }
    const configSaveTimer = useRef(null);
    async function persistConfig(next) {
        setConfig(next);
        if (configSaveTimer.current)
            window.clearTimeout(configSaveTimer.current);
        configSaveTimer.current = window.setTimeout(async () => {
            const ok = await sbUpsertConfigRow("config", next);
            if (ok)
                flashToast("Configuration enregistrée");
            else
                flashToast("Échec de l'enregistrement — réessayez");
        }, 700);
    }
    async function persistMetrics(next) {
        setMetrics(next);
        await sbUpsertConfigRow("metrics", next);
    }
    async function persistPasswordHash(hash) {
        setPasswordHash(hash);
        const ok = await sbUpsertConfigRow("password_hash", { hash });
        flashToast(ok ? "Code d'accès mis à jour" : "Échec de l'enregistrement du code d'accès");
    }
    async function updateLeadStatus(id, status) {
        setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
        await sbUpdateLeadStatus(id, status);
    }
    // Auto-logout admin session after inactivity
    useEffect(() => {
        if (view !== "admin")
            return;
        lastActivityRef.current = Date.now();
        const bump = () => { lastActivityRef.current = Date.now(); };
        const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
        events.forEach((ev) => window.addEventListener(ev, bump, { passive: true }));
        const interval = window.setInterval(() => {
            if (Date.now() - lastActivityRef.current > INACTIVITY_LIMIT_MS) {
                setView("home");
                flashToast("Session administrateur expirée par inactivité");
            }
        }, 15000);
        return () => {
            events.forEach((ev) => window.removeEventListener(ev, bump));
            window.clearInterval(interval);
        };
    }, [view]);
    function resetWizard() {
        setStep(0);
        setHabitationType(null);
        setPieceSel({});
        setTierId(null);
        setPosteSel({});
        setEstimate(null);
        setShowLeadForm(false);
        setLeadSubmitted(false);
    }
    async function startSimulation() {
        resetWizard();
        setView("wizard");
        const next = { ...metrics, started: metrics.started + 1 };
        persistMetrics(next);
    }
    function selectedPieceIds() {
        return Object.keys(pieceSel).filter((id) => (pieceSel[id]?.count || 0) > 0);
    }
    function posteApplies(poste) {
        if (poste.appliesTo === "all")
            return selectedPieceIds().length > 0;
        if (poste.appliesTo === "projet")
            return selectedPieceIds().length > 0;
        return poste.appliesTo.some((pid) => selectedPieceIds().includes(pid));
    }
    function applicablePostes() {
        if (!config)
            return [];
        return config.posteTypes.filter(posteApplies);
    }
    function computeEstimate() {
        const rows = [];
        let total = 0;
        applicablePostes().forEach((poste) => {
            if (posteSel[poste.id] === false)
                return; // unchecked by user
            const price = poste.prices[tierId] || 0;
            let qty = 0;
            if (poste.unit === "m2") {
                const ids = poste.appliesTo === "all" ? selectedPieceIds() : poste.appliesTo.filter((id) => selectedPieceIds().includes(id));
                qty = ids.reduce((s, id) => s + (Number(pieceSel[id]?.surface) || 0), 0);
            }
            else if (poste.unit === "forfait_piece") {
                const ids = poste.appliesTo === "all" ? selectedPieceIds() : poste.appliesTo.filter((id) => selectedPieceIds().includes(id));
                qty = ids.reduce((s, id) => s + (Number(pieceSel[id]?.count) || 0), 0);
            }
            else if (poste.unit === "forfait_projet") {
                qty = 1;
            }
            const lineTotal = qty * price;
            total += lineTotal;
            rows.push({ id: poste.id, label: poste.label, unit: poste.unit, qty, price, lineTotal });
        });
        const low = Math.round((total * 0.85) / 50) * 50;
        const high = Math.round((total * 1.15) / 50) * 50;
        return { total, low, high, rows };
    }
    function goResult() {
        const est = computeEstimate();
        setEstimate(est);
        setView("result");
        const next = { ...metrics, completed: metrics.completed + 1 };
        persistMetrics(next);
    }
    async function submitLead(formValues) {
        const leadData = {
            ...formValues,
            habitationType,
            tierId,
            pieces: selectedPieceIds().map((id) => ({ id, ...pieceSel[id] })),
            low: estimate?.low || 0,
            high: estimate?.high || 0,
        };
        const inserted = await sbInsertLead(leadData);
        const lead = inserted || { id: uid("lead"), date: new Date().toISOString(), status: "new", ...leadData };
        setLeads((prev) => [lead, ...prev]);
        setShowLeadForm(false);
        setLeadSubmitted(true);
        flashToast(inserted ? "Demande de rappel enregistrée" : "Demande enregistrée localement — vérifiez la configuration Supabase");
        const habitationLabel = config.habitationTypes.find((h) => h.id === habitationType)?.label || habitationType || "—";
        const tierLabel = config.tiers.find((t) => t.id === tierId)?.label || tierId || "—";
        const piecesLines = leadData.pieces.map((p) => {
            const info = config.pieceTypes.find((pt) => pt.id === p.id);
            const label = info ? info.label : p.id;
            return `${label} — ${p.count} pièce(s), ${p.surface || 0} m²`;
        });
        const postesLines = (estimate?.rows || []).map((r) => `${r.label} — ${euro(r.lineTotal)}`);
        const result = await sendLeadEmail(config.emailSettings, {
            to_email: config.emailSettings?.toEmail || "",
            prenom: lead.prenom, nom: lead.nom, telephone: lead.telephone, email: lead.email,
            adresse: lead.adresse, creneau: lead.creneau, message: lead.message,
            habitation: habitationLabel, niveau: tierLabel,
            budget_bas: euro(lead.low), budget_haut: euro(lead.high),
            pieces_detail: buildListText(piecesLines),
            postes_detail: buildListText(postesLines),
            date: new Date(lead.date).toLocaleString("fr-FR"),
        });
        if (result.ok)
            flashToast("Email de notification envoyé");
        else if (result.reason !== "not_configured")
            flashToast("Lead enregistré, mais l'envoi d'email a échoué");
    }
    if (!ready || !config) {
        return (React.createElement("div", { className: "ihc", style: { display: "flex", alignItems: "center", justifyContent: "center", minHeight: 320 } },
            React.createElement("style", null, STYLE),
            React.createElement("div", { style: { fontSize: 13, color: "var(--ink-soft)" } }, "Chargement du simulateur\u2026")));
    }
    return (React.createElement("div", { className: "ihc" },
        React.createElement("style", null, STYLE),
        React.createElement(Toast, { message: toast }),
        view !== "admin" && view !== "admin-login" && (React.createElement("div", { className: "ihc-topbar" },
            React.createElement(BrandMark, null),
            React.createElement("button", { className: "ihc-pro-link", onClick: () => setView("admin-login") }, "Espace professionnel"))),
        view === "home" && React.createElement(HomeView, { config: config, onStart: startSimulation }),
        view === "wizard" && (React.createElement(WizardView, { config: config, step: step, setStep: setStep, habitationType: habitationType, setHabitationType: setHabitationType, pieceSel: pieceSel, setPieceSel: setPieceSel, tierId: tierId, setTierId: setTierId, posteSel: posteSel, setPosteSel: setPosteSel, applicablePostes: applicablePostes, selectedPieceIds: selectedPieceIds, onFinish: goResult, onAbort: () => setView("home") })),
        view === "result" && estimate && (React.createElement(ResultView, { estimate: estimate, leadSubmitted: leadSubmitted, onAskCallback: () => setShowLeadForm(true), onRestart: () => { resetWizard(); setView("home"); } })),
        showLeadForm && (React.createElement(LeadFormModal, { onClose: () => setShowLeadForm(false), onSubmit: submitLead })),
        view === "admin-login" && (React.createElement(AdminLogin, { passwordHash: passwordHash, onSuccess: () => setView("admin"), onBack: () => setView("home") })),
        view === "admin" && (React.createElement(AdminDashboard, { config: config, setConfig: persistConfig, leads: leads, setLeads: updateLeadStatus, metrics: metrics, setPasswordHash: persistPasswordHash, onExit: () => setView("home"), flashToast: flashToast })),
        view !== "admin" && view !== "admin-login" && (React.createElement("div", { className: "ihc-shell" },
            React.createElement("div", { className: "ihc-footer" }, "Simulateur indicatif ID'Home Cr\u00E9ation \u2014 Lattes (34) \u00B7 Les montants affich\u00E9s sont estimatifs et ne constituent pas un devis contractuel.")))));
}
/* ------------------------------ Brand mark -------------------------------- */
function BrandMark() {
    return (React.createElement("div", { className: "ihc-brand" },
        React.createElement("div", { className: "ihc-brand-mark" },
            React.createElement(HomeIcon, { size: 17 })),
        React.createElement("div", null,
            React.createElement("div", { className: "ihc-brand-name" }, "ID'Home Cr\u00E9ation"),
            React.createElement("div", { className: "ihc-brand-sub" }, "Simulateur de r\u00E9novation"))));
}
/* ================================ HOME VIEW =============================== */
function HomeView({ config, onStart }) {
    return (React.createElement("div", { className: "ihc-shell" },
        React.createElement("div", { className: "ihc-hero" },
            React.createElement("span", { className: "ihc-eyebrow" },
                React.createElement(Sparkles, { size: 13 }),
                " Estimation en 4 \u00E9tapes"),
            React.createElement("h1", { className: "ihc-h1" },
                "Donnez une ",
                React.createElement("em", null, "premi\u00E8re altitude"),
                " \u00E0 votre projet de r\u00E9novation"),
            React.createElement("p", { className: "ihc-lede" }, "Un outil indicatif, gratuit et sans engagement, pour situer votre budget avant d'\u00E9changer avec notre \u00E9quipe. De la douceur m\u00E9diterran\u00E9enne aux horizons urbains, on vous accompagne o\u00F9 que naisse votre projet."),
            React.createElement("div", { className: "ihc-steps3" },
                React.createElement("div", { className: "ihc-step-card" },
                    React.createElement("span", { className: "ihc-step-num" }, "01"),
                    React.createElement("div", { className: "ihc-step-title" }, "Votre habitation"),
                    React.createElement("div", { className: "ihc-step-desc" }, "Appartement, maison ou studio \u2014 le point de d\u00E9part de l'estimation.")),
                React.createElement("div", { className: "ihc-step-card" },
                    React.createElement("span", { className: "ihc-step-num" }, "02"),
                    React.createElement("div", { className: "ihc-step-title" }, "Vos pi\u00E8ces"),
                    React.createElement("div", { className: "ihc-step-desc" }, "Le nombre, le type et la surface approximative des pi\u00E8ces \u00E0 r\u00E9nover.")),
                React.createElement("div", { className: "ihc-step-card" },
                    React.createElement("span", { className: "ihc-step-num" }, "03"),
                    React.createElement("div", { className: "ihc-step-title" }, "Votre niveau d'ambition"),
                    React.createElement("div", { className: "ihc-step-desc" }, "Fuji, Kilimanjaro ou Everest : le niveau de finition qui vous ressemble."))),
            React.createElement("button", { className: "btn btn-clay ihc-hero-cta-desktop", onClick: onStart },
                "D\u00E9marrer la simulation ",
                React.createElement(ArrowRight, { size: 17 }))),
        React.createElement("div", { className: "ihc-mobile-cta-bar" },
            React.createElement("button", { className: "btn btn-clay", onClick: onStart },
                "D\u00E9marrer la simulation ",
                React.createElement(ArrowRight, { size: 17 })))));
}
/* ================================ WIZARD =================================== */
function WizardView(props) {
    const { config, step, setStep, habitationType, setHabitationType, pieceSel, setPieceSel, tierId, setTierId, posteSel, setPosteSel, applicablePostes, selectedPieceIds, onFinish, onAbort, } = props;
    const labels = ["Habitation", "Pièces", "Finition", "Postes"];
    const helpWhenBlocked = [
        "Choisissez un type d'habitation pour continuer.",
        "Ajoutez au moins une pièce pour continuer.",
        "Choisissez un niveau de finition pour continuer.",
        "",
    ];
    const canNext = [
        !!habitationType,
        selectedPieceIds().length > 0,
        !!tierId,
        true,
    ];
    useEffect(() => {
        const el = document.getElementById("ihc-wizard-top");
        if (el)
            el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, [step]);
    function next() {
        if (step === labels.length - 1) {
            onFinish();
            return;
        }
        setStep((s) => clamp(s + 1, 0, labels.length - 1));
    }
    function prev() {
        if (step === 0) {
            onAbort();
            return;
        }
        setStep((s) => clamp(s - 1, 0, labels.length - 1));
    }
    function updatePiece(id, patch) {
        setPieceSel((prevSel) => {
            const current = prevSel[id] || { count: 0, surface: 0 };
            const merged = { ...current, ...patch };
            return { ...prevSel, [id]: merged };
        });
    }
    function selectAllPostes(value) {
        const next = {};
        applicablePostes().forEach((p) => { next[p.id] = value; });
        setPosteSel((s) => ({ ...s, ...next }));
    }
    return (React.createElement("div", { className: "ihc-shell" },
        React.createElement("div", { id: "ihc-wizard-top", style: { paddingTop: 8, scrollMarginTop: 20 } },
            React.createElement("div", { className: "ihc-step-counter" },
                "\u00C9tape ",
                step + 1,
                " / ",
                labels.length,
                " \u2014 ",
                labels[step]),
            React.createElement(AscentProgress, { labels: labels, currentIndex: step }),
            React.createElement("div", { className: "ihc-card" },
                step === 0 && (React.createElement(React.Fragment, null,
                    React.createElement("h2", { className: "ihc-q-title" }, "Quel type d'habitation souhaitez-vous r\u00E9nover ?"),
                    React.createElement("p", { className: "ihc-q-sub" }, "Cela nous aide \u00E0 calibrer les postes de travaux pertinents."),
                    React.createElement("div", { className: "ihc-grid3" }, config.habitationTypes.map((h) => (React.createElement("button", { key: h.id, className: "ihc-opt" + (habitationType === h.id ? " selected" : ""), onClick: () => setHabitationType(h.id), "aria-pressed": habitationType === h.id },
                        React.createElement(Building2, { size: 22, color: habitationType === h.id ? "var(--clay)" : "var(--ink-soft)" }),
                        React.createElement("span", { className: "ihc-opt-label" }, h.label))))))),
                step === 1 && (React.createElement(React.Fragment, null,
                    React.createElement("h2", { className: "ihc-q-title" }, "Quelles pi\u00E8ces souhaitez-vous r\u00E9nover ?"),
                    React.createElement("p", { className: "ihc-q-sub" }, "Indiquez le nombre de pi\u00E8ces de chaque type et leur surface totale approximative (m\u00B2) \u2014 une valeur par d\u00E9faut est propos\u00E9e, ajustez-la si besoin."),
                    React.createElement("div", null, config.pieceTypes.map((p) => {
                        const val = pieceSel[p.id] || { count: 0, surface: 0 };
                        return (React.createElement("div", { key: p.id, className: "ihc-piece-row" },
                            React.createElement("div", { className: "ihc-piece-name" }, p.label),
                            React.createElement("div", { className: "ihc-stepper" },
                                React.createElement("button", { type: "button", "aria-label": `Retirer une pièce ${p.label}`, onClick: () => {
                                        const nc = clamp((val.count || 0) - 1, 0, 20);
                                        updatePiece(p.id, { count: nc, surface: nc === 0 ? 0 : Math.max(1, val.surface || nc * p.avgSurface) });
                                    } }, "\u2013"),
                                React.createElement("span", { "aria-live": "polite" }, val.count || 0),
                                React.createElement("button", { type: "button", "aria-label": `Ajouter une pièce ${p.label}`, onClick: () => {
                                        const nc = clamp((val.count || 0) + 1, 0, 20);
                                        const defaultSurface = val.surface ? val.surface + p.avgSurface : nc * p.avgSurface;
                                        updatePiece(p.id, { count: nc, surface: Math.max(1, defaultSurface) });
                                    } }, "+")),
                            React.createElement("input", { className: "ihc-surf-input", type: "number", min: "1", step: "1", disabled: !val.count, placeholder: "Surface m\u00B2", "aria-label": `Surface totale pour ${p.label}`, value: val.count ? (val.surface ?? "") : "", onChange: (e) => updatePiece(p.id, { surface: Math.max(0, Number(e.target.value)) }), onBlur: (e) => { if (val.count && !Number(e.target.value))
                                    updatePiece(p.id, { surface: p.avgSurface * val.count }); } })));
                    })))),
                step === 2 && (React.createElement(React.Fragment, null,
                    React.createElement("h2", { className: "ihc-q-title" }, "Quel niveau de finition visez-vous ?"),
                    React.createElement("p", { className: "ihc-q-sub" }, "Trois altitudes, trois niveaux de gamme \u2014 appliqu\u00E9s \u00E0 l'ensemble des postes chiffr\u00E9s."),
                    React.createElement("div", { className: "ihc-tier-grid" }, config.tiers.map((t) => (React.createElement("button", { key: t.id, className: "ihc-tier" + (tierId === t.id ? " selected" : ""), onClick: () => setTierId(t.id), "aria-pressed": tierId === t.id },
                        React.createElement("div", { className: "ihc-tier-alt" }, t.altitude),
                        React.createElement("div", { className: "ihc-tier-mtn" },
                            React.createElement(MountainGlyph, { peak: t.peak, active: tierId === t.id })),
                        React.createElement("div", { className: "ihc-tier-name" }, t.label),
                        React.createElement("div", { className: "ihc-tier-tag" }, t.tagline),
                        React.createElement("div", { className: "ihc-tier-desc" }, t.description))))))),
                step === 3 && (React.createElement(React.Fragment, null,
                    React.createElement("h2", { className: "ihc-q-title" }, "Quels postes souhaitez-vous chiffrer ?"),
                    React.createElement("p", { className: "ihc-q-sub" }, "Pr\u00E9-s\u00E9lectionn\u00E9s selon vos pi\u00E8ces \u2014 d\u00E9cochez ce qui ne vous concerne pas."),
                    applicablePostes().length > 0 && (React.createElement("div", { className: "ihc-select-all-row" },
                        React.createElement("button", { type: "button", onClick: () => selectAllPostes(true) }, "Tout s\u00E9lectionner"),
                        React.createElement("span", { style: { color: "var(--line)" } }, "\u00B7"),
                        React.createElement("button", { type: "button", onClick: () => selectAllPostes(false) }, "Tout d\u00E9s\u00E9lectionner"))),
                    React.createElement("div", null,
                        applicablePostes().map((poste) => {
                            const on = posteSel[poste.id] !== false;
                            return (React.createElement("div", { key: poste.id, className: "ihc-poste-row" },
                                React.createElement("button", { type: "button", className: "ihc-check" + (on ? " on" : ""), onClick: () => setPosteSel((s) => ({ ...s, [poste.id]: !on })), "aria-pressed": on, "aria-label": poste.label }, on && React.createElement(Check, { size: 13 })),
                                React.createElement("div", null,
                                    React.createElement("div", { className: "ihc-poste-label" }, poste.label),
                                    React.createElement("div", { className: "ihc-poste-meta" }, UNIT_LABEL[poste.unit]))));
                        }),
                        applicablePostes().length === 0 && React.createElement("div", { style: { fontSize: 13, color: "var(--ink-soft)" } }, "S\u00E9lectionnez au moins une pi\u00E8ce \u00E0 l'\u00E9tape pr\u00E9c\u00E9dente."))))),
            React.createElement("div", { className: "ihc-nav-wrap" },
                React.createElement("div", { className: "ihc-nav" },
                    React.createElement("button", { className: "btn btn-ghost", onClick: prev },
                        React.createElement(ArrowLeft, { size: 16 }),
                        " ",
                        step === 0 ? "Annuler" : "Précédent"),
                    React.createElement("button", { className: "btn btn-primary", disabled: !canNext[step], onClick: next, title: !canNext[step] ? helpWhenBlocked[step] : undefined },
                        step === labels.length - 1 ? "Voir mon estimation" : "Suivant",
                        " ",
                        React.createElement(ArrowRight, { size: 16 }))),
                !canNext[step] && helpWhenBlocked[step] && (React.createElement("div", { style: { textAlign: "right", fontSize: 11.5, color: "var(--ink-soft)", marginTop: 6 } }, helpWhenBlocked[step]))))));
}
/* ================================ RESULT =================================== */
function ResultView({ estimate, leadSubmitted, onAskCallback, onRestart }) {
    return (React.createElement("div", { className: "ihc-shell" },
        React.createElement("div", { className: "ihc-card ihc-result-hero" },
            React.createElement("span", { className: "ihc-eyebrow" },
                React.createElement(ShieldCheck, { size: 13 }),
                " Estimation indicative"),
            React.createElement("div", { className: "ihc-result-range mono" },
                euro(estimate.low),
                " \u2014 ",
                euro(estimate.high)),
            React.createElement("p", { className: "ihc-result-note" }, "Cette fourchette couvre les postes s\u00E9lectionn\u00E9s, au niveau de finition choisi. Le d\u00E9tail chiffr\u00E9 poste par poste est transmis par un conseiller lors du rappel."),
            !leadSubmitted ? (React.createElement("div", { className: "ihc-lock-wrap" },
                React.createElement("div", { className: "ihc-breakdown ihc-bd-locked" }, estimate.rows.map((r) => (React.createElement("div", { key: r.id, className: "ihc-bd-row" },
                    React.createElement("span", null, r.label),
                    React.createElement("span", { className: "mono" }, euro(r.lineTotal)))))),
                React.createElement("div", { className: "ihc-lock-overlay" },
                    React.createElement(Lock, { size: 20, color: "var(--ink-soft)" }),
                    React.createElement("div", { style: { fontSize: 13, color: "var(--ink-soft)", maxWidth: 260 } }, "D\u00E9tail poste par poste d\u00E9bloqu\u00E9 apr\u00E8s votre demande de rappel"),
                    React.createElement("button", { className: "btn btn-clay btn-sm", onClick: onAskCallback },
                        React.createElement(Phone, { size: 14 }),
                        " \u00CAtre rappel\u00E9(e)")))) : (React.createElement(React.Fragment, null,
                React.createElement("div", { className: "ihc-breakdown" }, estimate.rows.map((r) => (React.createElement("div", { key: r.id, className: "ihc-bd-row" },
                    React.createElement("span", null, r.label),
                    React.createElement("span", { className: "mono" }, euro(r.lineTotal)))))),
                React.createElement("div", { style: { marginTop: 20, fontSize: 13.5, color: "var(--garrigue-deep)", fontWeight: 700 } },
                    React.createElement(Check, { size: 15, style: { verticalAlign: -2 } }),
                    " Merci, votre demande a bien \u00E9t\u00E9 transmise. Un conseiller ID'Home Cr\u00E9ation vous recontacte prochainement."))),
            React.createElement("div", { style: { marginTop: 26 } },
                React.createElement("button", { className: "btn btn-ghost btn-sm", onClick: onRestart },
                    React.createElement(RefreshCw, { size: 14 }),
                    " Refaire une simulation")))));
}
/* ============================== LEAD FORM MODAL ============================ */
function LeadFormModal({ onClose, onSubmit }) {
    const [form, setForm] = useState({ prenom: "", nom: "", telephone: "", email: "", adresse: "", creneau: "Peu importe", message: "" });
    const [consent, setConsent] = useState(false);
    const [err, setErr] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});
    const [sending, setSending] = useState(false);
    useEscapeClose(true, onClose);
    function set(k, v) { setForm((f) => ({ ...f, [k]: v })); if (fieldErrors[k])
        setFieldErrors((fe) => ({ ...fe, [k]: false })); }
    async function handleSubmit(e) {
        if (e && e.preventDefault)
            e.preventDefault();
        if (sending)
            return;
        const errors = {};
        if (!form.prenom.trim())
            errors.prenom = true;
        if (!form.nom.trim())
            errors.nom = true;
        if (!form.telephone.trim())
            errors.telephone = true;
        if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            errors.email = true;
        if (Object.keys(errors).length) {
            setFieldErrors(errors);
            setErr("Merci de compléter les champs obligatoires (marqués d'un *).");
            return;
        }
        if (!consent) {
            setErr("Merci d'accepter d'être recontacté(e) pour valider la demande.");
            return;
        }
        setErr("");
        setFieldErrors({});
        setSending(true);
        try {
            await onSubmit(form);
        }
        finally {
            setSending(false);
        }
    }
    return (React.createElement("div", { className: "ihc-modal-backdrop", role: "dialog", "aria-modal": "true", "aria-labelledby": "ihc-lead-title" },
        React.createElement("div", { className: "ihc-modal ihc", style: { position: "relative" } },
            React.createElement("style", null, STYLE),
            React.createElement("button", { className: "ihc-modal-close btn btn-ghost btn-sm", onClick: onClose, "aria-label": "Fermer" },
                React.createElement(X, { size: 16 })),
            React.createElement("h2", { id: "ihc-lead-title", className: "ihc-q-title", style: { marginTop: 0 } }, "Demander \u00E0 \u00EAtre rappel\u00E9(e)"),
            React.createElement("p", { className: "ihc-q-sub" }, "Un conseiller vous recontacte pour affiner votre estimation et r\u00E9pondre \u00E0 vos questions."),
            React.createElement("div", { onKeyDown: (e) => { if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
                    e.preventDefault();
                    handleSubmit();
                } } },
                React.createElement("div", { className: "ihc-field-row" },
                    React.createElement("div", { className: "ihc-field" },
                        React.createElement("label", null,
                            "Pr\u00E9nom",
                            React.createElement("span", { className: "ihc-required" }, "*")),
                        React.createElement("input", { autoFocus: true, value: form.prenom, className: fieldErrors.prenom ? "ihc-field-error" : "", onChange: (e) => set("prenom", e.target.value) })),
                    React.createElement("div", { className: "ihc-field" },
                        React.createElement("label", null,
                            "Nom",
                            React.createElement("span", { className: "ihc-required" }, "*")),
                        React.createElement("input", { value: form.nom, className: fieldErrors.nom ? "ihc-field-error" : "", onChange: (e) => set("nom", e.target.value) }))),
                React.createElement("div", { className: "ihc-field-row" },
                    React.createElement("div", { className: "ihc-field" },
                        React.createElement("label", null,
                            "T\u00E9l\u00E9phone",
                            React.createElement("span", { className: "ihc-required" }, "*")),
                        React.createElement("input", { type: "tel", value: form.telephone, className: fieldErrors.telephone ? "ihc-field-error" : "", onChange: (e) => set("telephone", e.target.value) })),
                    React.createElement("div", { className: "ihc-field" },
                        React.createElement("label", null, "E-mail"),
                        React.createElement("input", { type: "email", value: form.email, className: fieldErrors.email ? "ihc-field-error" : "", onChange: (e) => set("email", e.target.value) }),
                        fieldErrors.email && React.createElement("span", { className: "ihc-field-hint" }, "Format d'e-mail invalide"))),
                React.createElement("div", { className: "ihc-field" },
                    React.createElement("label", null, "Adresse du bien"),
                    React.createElement("input", { value: form.adresse, onChange: (e) => set("adresse", e.target.value) })),
                React.createElement("div", { className: "ihc-field" },
                    React.createElement("label", null, "Cr\u00E9neau de rappel pr\u00E9f\u00E9r\u00E9"),
                    React.createElement("select", { value: form.creneau, onChange: (e) => set("creneau", e.target.value) },
                        React.createElement("option", null, "Peu importe"),
                        React.createElement("option", null, "Matin (9h-12h)"),
                        React.createElement("option", null, "Apr\u00E8s-midi (14h-18h)"),
                        React.createElement("option", null, "Soir\u00E9e (18h-20h)"))),
                React.createElement("div", { className: "ihc-field" },
                    React.createElement("label", null, "Message (facultatif)"),
                    React.createElement("textarea", { rows: 3, value: form.message, onChange: (e) => set("message", e.target.value) })),
                React.createElement("label", { className: "ihc-checkline" },
                    React.createElement("input", { type: "checkbox", checked: consent, onChange: (e) => setConsent(e.target.checked) }),
                    React.createElement("span", null, "J'accepte d'\u00EAtre recontact\u00E9(e) par ID'Home Cr\u00E9ation au sujet de mon projet. Ces informations sont utilis\u00E9es uniquement \u00E0 cette fin, conform\u00E9ment \u00E0 la politique de confidentialit\u00E9.")),
                err && React.createElement("div", { className: "ihc-error-text" }, err),
                React.createElement("button", { className: "btn btn-clay", type: "button", disabled: sending, onClick: handleSubmit, style: { width: "100%", justifyContent: "center", opacity: sending ? 0.75 : 1 } }, sending ? (React.createElement(React.Fragment, null,
                    React.createElement("span", { className: "ihc-spinner" }),
                    " Envoi en cours\u2026")) : (React.createElement(React.Fragment, null,
                    "Envoyer ma demande ",
                    React.createElement(ArrowRight, { size: 16 }))))))));
}
/* ================================ ADMIN LOGIN =============================== */
function AdminLogin({ passwordHash, onSuccess, onBack }) {
    const [value, setValue] = useState("");
    const [err, setErr] = useState("");
    const [attempts, setAttempts] = useState(0);
    const [lockUntil, setLockUntil] = useState(0);
    const [now, setNow] = useState(Date.now());
    const [checking, setChecking] = useState(false);
    useEffect(() => {
        if (!lockUntil)
            return;
        const t = window.setInterval(() => setNow(Date.now()), 1000);
        return () => window.clearInterval(t);
    }, [lockUntil]);
    const locked = lockUntil > now;
    const remaining = Math.max(0, Math.ceil((lockUntil - now) / 1000));
    async function handle() {
        if (locked || checking || !value)
            return;
        setChecking(true);
        const hash = await sha256Hex(value.trim());
        setChecking(false);
        if (hash === passwordHash) {
            setErr("");
            setAttempts(0);
            onSuccess();
        }
        else {
            const next = attempts + 1;
            setAttempts(next);
            setValue("");
            if (next >= MAX_ATTEMPTS) {
                const cycle = Math.floor((next - MAX_ATTEMPTS) / MAX_ATTEMPTS);
                const lockMs = BASE_LOCK_MS * Math.pow(2, cycle);
                setLockUntil(Date.now() + lockMs);
                setErr(`Trop de tentatives. Accès verrouillé ${Math.round(lockMs / 1000)}s.`);
            }
            else {
                setErr(`Code d'accès incorrect (${next}/${MAX_ATTEMPTS} avant verrouillage).`);
            }
        }
    }
    function handleKeyDown(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            handle();
        }
    }
    return (React.createElement("div", { className: "ihc-admin" },
        React.createElement("div", { className: "ihc-login-wrap" },
            React.createElement("div", { className: "ihc-login-card" },
                React.createElement(KeyRound, { size: 22, color: "var(--brass)" }),
                React.createElement("h2", { className: "disp", style: { margin: "12px 0 4px", fontSize: 20 } }, "Espace professionnel"),
                React.createElement("div", { style: { fontSize: 12.5, color: "rgba(239,231,214,0.6)" } }, "Acc\u00E8s r\u00E9serv\u00E9 aux \u00E9quipes ID'Home Cr\u00E9ation"),
                React.createElement("input", { type: "password", placeholder: "Code d'acc\u00E8s", value: value, disabled: locked, onChange: (e) => setValue(e.target.value), onKeyDown: handleKeyDown, autoFocus: true }),
                err && React.createElement("div", { className: "ihc-error-text" }, locked ? `Trop de tentatives. Réessayez dans ${remaining}s.` : err),
                React.createElement("button", { className: "btn btn-clay", type: "button", disabled: locked || checking, onClick: handle, style: { width: "100%", justifyContent: "center", marginBottom: 10, opacity: locked ? 0.5 : 1 } }, checking ? (React.createElement(React.Fragment, null,
                    React.createElement("span", { className: "ihc-spinner" }),
                    " V\u00E9rification\u2026")) : locked ? `Verrouillé (${remaining}s)` : "Entrer"),
                React.createElement("button", { className: "btn btn-ghost btn-sm", type: "button", onClick: onBack, style: { width: "100%", justifyContent: "center", color: "var(--sand)", borderColor: "rgba(239,231,214,0.25)" } }, "Retour au site")))));
}
/* ================================ ADMIN DASHBOARD ============================ */
function AdminDashboard({ config, setConfig, leads, setLeads, metrics, setPasswordHash, onExit, flashToast }) {
    const [tab, setTab] = useState("apercu");
    const tabs = [
        { id: "apercu", label: "Aperçu" },
        { id: "postes", label: "Tarifs & postes" },
        { id: "pieces", label: "Types de pièces" },
        { id: "niveaux", label: "Niveaux de finition" },
        { id: "leads", label: `Demandes de rappel${leads.length ? " (" + leads.length + ")" : ""}` },
        { id: "reglages", label: "Réglages" },
    ];
    return (React.createElement("div", { className: "ihc-admin" },
        React.createElement("div", { className: "ihc-admin-topbar" },
            React.createElement(BrandMark, null),
            React.createElement("button", { className: "btn btn-ghost btn-sm", onClick: onExit, style: { color: "var(--sand)", borderColor: "rgba(239,231,214,0.25)" } },
                React.createElement(LogOut, { size: 14 }),
                " Quitter l'espace pro")),
        React.createElement("div", { className: "ihc-admin-shell" },
            React.createElement("div", { className: "ihc-admin-tabs" }, tabs.map((t) => (React.createElement("button", { key: t.id, className: "ihc-admin-tab" + (tab === t.id ? " active" : ""), onClick: () => setTab(t.id) }, t.label)))),
            tab === "apercu" && React.createElement(AdminOverview, { metrics: metrics, leads: leads }),
            tab === "postes" && React.createElement(AdminPostes, { config: config, setConfig: setConfig, flashToast: flashToast }),
            tab === "pieces" && React.createElement(AdminPieces, { config: config, setConfig: setConfig, flashToast: flashToast }),
            tab === "niveaux" && React.createElement(AdminTiers, { config: config, setConfig: setConfig, flashToast: flashToast }),
            tab === "leads" && React.createElement(AdminLeads, { leads: leads, setLeads: setLeads, flashToast: flashToast }),
            tab === "reglages" && React.createElement(AdminSettings, { config: config, setConfig: setConfig, setPasswordHash: setPasswordHash, flashToast: flashToast }))));
}
function AdminOverview({ metrics, leads }) {
    const completedRate = metrics.started ? Math.round((metrics.completed / metrics.started) * 100) : 0;
    const leadRate = metrics.completed ? Math.round((leads.length / metrics.completed) * 100) : 0;
    const avgBasket = leads.length ? Math.round(leads.reduce((s, l) => s + (l.low + l.high) / 2, 0) / leads.length) : 0;
    return (React.createElement("div", null,
        React.createElement("div", { className: "ihc-kpi-grid" },
            React.createElement("div", { className: "ihc-kpi" },
                React.createElement("div", { className: "ihc-kpi-val" }, metrics.started),
                React.createElement("div", { className: "ihc-kpi-label" }, "Simulations d\u00E9marr\u00E9es")),
            React.createElement("div", { className: "ihc-kpi" },
                React.createElement("div", { className: "ihc-kpi-val" },
                    completedRate,
                    "%"),
                React.createElement("div", { className: "ihc-kpi-label" }, "Taux d'ach\u00E8vement")),
            React.createElement("div", { className: "ihc-kpi" },
                React.createElement("div", { className: "ihc-kpi-val" }, leads.length),
                React.createElement("div", { className: "ihc-kpi-label" }, "Demandes de rappel")),
            React.createElement("div", { className: "ihc-kpi" },
                React.createElement("div", { className: "ihc-kpi-val" },
                    leadRate,
                    "%"),
                React.createElement("div", { className: "ihc-kpi-label" }, "Conversion en rappel"))),
        React.createElement("div", { className: "ihc-panel" },
            React.createElement("h3", null, "Panier moyen estim\u00E9"),
            React.createElement("div", { style: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 24 } }, avgBasket ? euro(avgBasket) : "—"),
            React.createElement("div", { style: { fontSize: 12.5, color: "rgba(239,231,214,0.55)", marginTop: 6 } }, "Moyenne du point milieu des fourchettes, sur les demandes de rappel re\u00E7ues.")),
        React.createElement("div", { className: "ihc-panel" },
            React.createElement("h3", null, "\u00C0 retenir"),
            React.createElement("div", { style: { fontSize: 13, color: "rgba(239,231,214,0.7)", lineHeight: 1.7 } }, "Le simulateur ne communique une fourchette qu'apr\u00E8s le questionnaire complet, et r\u00E9serve le d\u00E9tail chiffr\u00E9 aux demandes de rappel : ce funnel D\u00E9marr\u00E9 \u2192 Termin\u00E9 \u2192 Rappel demand\u00E9 est le principal indicateur \u00E0 suivre pour ajuster le questionnaire ou les tarifs."))));
}
function AdminPostes({ config, setConfig, flashToast }) {
    const [confirmDelete, setConfirmDelete] = useState(null);
    function updatePoste(id, patch) {
        setConfig({ ...config, posteTypes: config.posteTypes.map((p) => (p.id === id ? { ...p, ...patch } : p)) });
    }
    function updatePrice(id, tierId, value) {
        setConfig({ ...config, posteTypes: config.posteTypes.map((p) => (p.id === id ? { ...p, prices: { ...p.prices, [tierId]: Number(value) } } : p)) });
    }
    function togglePiece(id, pieceId) {
        setConfig({
            ...config,
            posteTypes: config.posteTypes.map((p) => {
                if (p.id !== id)
                    return p;
                const arr = p.appliesTo === "all" || p.appliesTo === "projet" ? [] : p.appliesTo;
                const has = arr.includes(pieceId);
                const nextArr = has ? arr.filter((x) => x !== pieceId) : [...arr, pieceId];
                return { ...p, appliesTo: nextArr };
            }),
        });
    }
    function addPoste() {
        const newPoste = { id: uid("poste"), label: "Nouveau poste", unit: "m2", appliesTo: "all", prices: { fuji: 0, kilimanjaro: 0, everest: 0 } };
        setConfig({ ...config, posteTypes: [...config.posteTypes, newPoste] });
    }
    function deletePoste(id) {
        setConfig({ ...config, posteTypes: config.posteTypes.filter((p) => p.id !== id) });
        setConfirmDelete(null);
        flashToast("Poste supprimé");
    }
    function resetDefaults() {
        setConfig({ ...config, posteTypes: DEFAULT_POSTES });
    }
    return (React.createElement("div", { className: "ihc-panel" },
        React.createElement("h3", null, "Grille tarifaire par poste de travaux"),
        React.createElement("div", { style: { fontSize: 12, color: "rgba(239,231,214,0.55)", marginBottom: 14 } }, "Prix par niveau de finition (Fuji / Kilimanjaro / Everest). L'unit\u00E9 d\u00E9termine le mode de calcul dans le simulateur."),
        React.createElement("div", { className: "ihc-admin-row", style: { fontWeight: 700, color: "rgba(239,231,214,0.5)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" } },
            React.createElement("div", null, "Poste"),
            React.createElement("div", null, "Unit\u00E9"),
            React.createElement("div", null, "Fuji (\u20AC)"),
            React.createElement("div", null, "Kilimanjaro (\u20AC)"),
            React.createElement("div", null, "Everest (\u20AC)"),
            React.createElement("div", null)),
        config.posteTypes.map((p) => (React.createElement("div", { key: p.id },
            React.createElement("div", { className: "ihc-admin-row" },
                React.createElement("input", { value: p.label, onChange: (e) => updatePoste(p.id, { label: e.target.value }), style: { fontFamily: "'Manrope', sans-serif" } }),
                React.createElement("select", { value: p.unit, onChange: (e) => updatePoste(p.id, { unit: e.target.value }) },
                    React.createElement("option", { value: "m2" }, "\u20AC / m\u00B2"),
                    React.createElement("option", { value: "forfait_piece" }, "\u20AC / pi\u00E8ce"),
                    React.createElement("option", { value: "forfait_projet" }, "forfait projet")),
                React.createElement("input", { type: "number", value: p.prices.fuji, onChange: (e) => updatePrice(p.id, "fuji", e.target.value) }),
                React.createElement("input", { type: "number", value: p.prices.kilimanjaro, onChange: (e) => updatePrice(p.id, "kilimanjaro", e.target.value) }),
                React.createElement("input", { type: "number", value: p.prices.everest, onChange: (e) => updatePrice(p.id, "everest", e.target.value) }),
                React.createElement("button", { className: "btn btn-danger btn-sm", style: { padding: 6 }, onClick: () => setConfirmDelete(p.id), "aria-label": "Supprimer" },
                    React.createElement(Trash2, { size: 14 }))),
            p.unit !== "forfait_projet" && (React.createElement("div", { style: { paddingBottom: 12 } },
                React.createElement("div", { style: { fontSize: 11, color: "rgba(239,231,214,0.45)", marginBottom: 5 } }, "S'applique \u00E0 :"),
                React.createElement("div", { className: "ihc-chip-group" },
                    config.pieceTypes.map((pc) => {
                        const isAll = p.appliesTo === "all";
                        const on = isAll || (Array.isArray(p.appliesTo) && p.appliesTo.includes(pc.id));
                        return React.createElement("button", { key: pc.id, className: "ihc-chip" + (on ? " on" : ""), onClick: () => { if (isAll)
                                updatePoste(p.id, { appliesTo: config.pieceTypes.filter((x) => x.id !== pc.id).map((x) => x.id) });
                            else
                                togglePiece(p.id, pc.id); } }, pc.label);
                    }),
                    React.createElement("button", { className: "ihc-chip" + (p.appliesTo === "all" ? " on" : ""), onClick: () => updatePoste(p.id, { appliesTo: "all" }) }, "Toutes les pi\u00E8ces"))))))),
        React.createElement("div", { style: { display: "flex", gap: 10, marginTop: 16 } },
            React.createElement("button", { className: "btn btn-clay btn-sm", onClick: addPoste },
                React.createElement(Plus, { size: 14 }),
                " Ajouter un poste"),
            React.createElement("button", { className: "btn btn-ghost btn-sm", style: { color: "var(--sand)", borderColor: "rgba(239,231,214,0.25)" }, onClick: resetDefaults },
                React.createElement(RefreshCw, { size: 14 }),
                " R\u00E9initialiser les tarifs par d\u00E9faut")),
        React.createElement(ConfirmDialog, { open: !!confirmDelete, title: "Supprimer ce poste ?", body: "Cette action retire le poste de la grille tarifaire et du questionnaire public.", onConfirm: () => deletePoste(confirmDelete), onCancel: () => setConfirmDelete(null) })));
}
function AdminPieces({ config, setConfig, flashToast }) {
    const [confirmDelete, setConfirmDelete] = useState(null);
    function update(id, patch) { setConfig({ ...config, pieceTypes: config.pieceTypes.map((p) => (p.id === id ? { ...p, ...patch } : p)) }); }
    function add() { setConfig({ ...config, pieceTypes: [...config.pieceTypes, { id: uid("piece"), label: "Nouvelle pièce", avgSurface: 10 }] }); }
    function remove(id) {
        setConfig({
            ...config,
            pieceTypes: config.pieceTypes.filter((p) => p.id !== id),
            posteTypes: config.posteTypes.map((p) => (Array.isArray(p.appliesTo) ? { ...p, appliesTo: p.appliesTo.filter((x) => x !== id) } : p)),
        });
        setConfirmDelete(null);
        flashToast("Type de pièce supprimé");
    }
    return (React.createElement("div", { className: "ihc-panel" },
        React.createElement("h3", null, "Types de pi\u00E8ces propos\u00E9s dans le questionnaire"),
        React.createElement("div", { style: { fontSize: 12, color: "rgba(239,231,214,0.55)", marginBottom: 14 } }, "La surface moyenne sert de valeur de d\u00E9part sugg\u00E9r\u00E9e lors de la simulation."),
        React.createElement("div", { className: "ihc-admin-piece-row", style: { fontWeight: 700, color: "rgba(239,231,214,0.5)", fontSize: 11, textTransform: "uppercase" } },
            React.createElement("div", null, "Libell\u00E9"),
            React.createElement("div", null, "Surface moy. (m\u00B2)"),
            React.createElement("div", null)),
        config.pieceTypes.map((p) => (React.createElement("div", { key: p.id, className: "ihc-admin-piece-row" },
            React.createElement("input", { value: p.label, onChange: (e) => update(p.id, { label: e.target.value }) }),
            React.createElement("input", { type: "number", value: p.avgSurface, onChange: (e) => update(p.id, { avgSurface: Number(e.target.value) }), style: { fontFamily: "'IBM Plex Mono', monospace" } }),
            React.createElement("button", { className: "btn btn-danger btn-sm", style: { padding: 6 }, onClick: () => setConfirmDelete(p.id), "aria-label": "Supprimer" },
                React.createElement(Trash2, { size: 14 }))))),
        React.createElement("button", { className: "btn btn-clay btn-sm", style: { marginTop: 14 }, onClick: add },
            React.createElement(Plus, { size: 14 }),
            " Ajouter un type de pi\u00E8ce"),
        React.createElement(ConfirmDialog, { open: !!confirmDelete, title: "Supprimer ce type de pi\u00E8ce ?", body: "Les postes qui lui \u00E9taient rattach\u00E9s sp\u00E9cifiquement seront mis \u00E0 jour.", onConfirm: () => remove(confirmDelete), onCancel: () => setConfirmDelete(null) })));
}
function AdminTiers({ config, setConfig }) {
    function update(id, patch) { setConfig({ ...config, tiers: config.tiers.map((t) => (t.id === id ? { ...t, ...patch } : t)) }); }
    return (React.createElement("div", { className: "ihc-panel" },
        React.createElement("h3", null, "Niveaux de finition"),
        React.createElement("div", { style: { fontSize: 12, color: "rgba(239,231,214,0.55)", marginBottom: 16 } }, "L'ordre (Fuji \u2192 Kilimanjaro \u2192 Everest) refl\u00E8te l'altitude croissante, du niveau d'entr\u00E9e de gamme au haut de gamme."),
        config.tiers.map((t) => (React.createElement("div", { key: t.id, style: { display: "grid", gridTemplateColumns: "70px 1fr", gap: 16, alignItems: "flex-start", padding: "16px 0", borderBottom: "1px solid rgba(239,231,214,0.1)" } },
            React.createElement(MountainGlyph, { peak: t.peak, active: true, size: "sm" }),
            React.createElement("div", { style: { display: "grid", gap: 8 } },
                React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 } },
                    React.createElement("input", { value: t.label, onChange: (e) => update(t.id, { label: e.target.value }), style: { background: "rgba(239,231,214,0.08)", border: "1px solid rgba(239,231,214,0.2)", color: "var(--sand)", borderRadius: 6, padding: "7px 8px", fontWeight: 700 } }),
                    React.createElement("input", { value: t.altitude, onChange: (e) => update(t.id, { altitude: e.target.value }), style: { background: "rgba(239,231,214,0.08)", border: "1px solid rgba(239,231,214,0.2)", color: "var(--sand)", borderRadius: 6, padding: "7px 8px", fontFamily: "'IBM Plex Mono', monospace" } }),
                    React.createElement("input", { value: t.tagline, onChange: (e) => update(t.id, { tagline: e.target.value }), style: { background: "rgba(239,231,214,0.08)", border: "1px solid rgba(239,231,214,0.2)", color: "var(--sand)", borderRadius: 6, padding: "7px 8px" } })),
                React.createElement("textarea", { rows: 2, value: t.description, onChange: (e) => update(t.id, { description: e.target.value }), style: { background: "rgba(239,231,214,0.08)", border: "1px solid rgba(239,231,214,0.2)", color: "var(--sand)", borderRadius: 6, padding: "8px 10px", fontFamily: "inherit", fontSize: 13 } })))))));
}
function AdminLeads({ leads, setLeads, flashToast }) {
    const [copied, setCopied] = useState(false);
    function toggleStatus(id, current) {
        setLeads(id, current === "new" ? "done" : "new");
    }
    function toCsv() {
        const header = ["Date", "Prénom", "Nom", "Téléphone", "Email", "Adresse", "Créneau", "Fourchette basse", "Fourchette haute", "Statut"];
        const rows = leads.map((l) => [new Date(l.date).toLocaleString("fr-FR"), l.prenom, l.nom, l.telephone, l.email, l.adresse, l.creneau, l.low, l.high, l.status === "new" ? "Nouveau" : "Traité"]);
        return [header, ...rows].map((r) => r.map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`).join(";")).join("\n");
    }
    async function copyCsv() {
        try {
            await navigator.clipboard.writeText(toCsv());
            setCopied(true);
            flashToast("CSV copié dans le presse-papiers");
            window.setTimeout(() => setCopied(false), 2000);
        }
        catch {
            flashToast("Copie impossible sur ce navigateur");
        }
    }
    if (!leads.length)
        return React.createElement("div", { className: "ihc-panel" },
            React.createElement("div", { className: "ihc-empty" }, "Aucune demande de rappel pour le moment. Les demandes envoy\u00E9es depuis le simulateur public appara\u00EEtront ici."));
    return (React.createElement("div", null,
        React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", marginBottom: 12 } },
            React.createElement("button", { className: "btn btn-ghost btn-sm", style: { color: "var(--sand)", borderColor: "rgba(239,231,214,0.25)" }, onClick: copyCsv },
                React.createElement(ClipboardCopy, { size: 14 }),
                " ",
                copied ? "Copié !" : "Copier en CSV")),
        leads.map((l) => (React.createElement("div", { key: l.id, className: "ihc-lead-card" },
            React.createElement("div", { className: "ihc-lead-top" },
                React.createElement("div", null,
                    React.createElement("div", { className: "ihc-lead-name" },
                        l.prenom,
                        " ",
                        l.nom),
                    React.createElement("div", { className: "ihc-lead-meta" },
                        React.createElement(Phone, { size: 11, style: { verticalAlign: -1 } }),
                        " ",
                        l.telephone || "—",
                        " \u00B7 ",
                        React.createElement(Mail, { size: 11, style: { verticalAlign: -1 } }),
                        " ",
                        l.email || "—",
                        React.createElement("br", null),
                        React.createElement(MapPin, { size: 11, style: { verticalAlign: -1 } }),
                        " ",
                        l.adresse || "—",
                        " \u00B7 Cr\u00E9neau : ",
                        l.creneau,
                        React.createElement("br", null),
                        "Estimation : ",
                        euro(l.low),
                        " \u2014 ",
                        euro(l.high),
                        " \u00B7 ",
                        new Date(l.date).toLocaleString("fr-FR"))),
                React.createElement("button", { className: "ihc-status-badge " + (l.status === "new" ? "new" : "done"), onClick: () => toggleStatus(l.id, l.status) }, l.status === "new" ? "Nouveau" : "Traité")))))));
}
function AdminSettings({ config, setConfig, setPasswordHash, flashToast }) {
    const [pwd, setPwd] = useState("");
    const [pwd2, setPwd2] = useState("");
    const [confirmReset, setConfirmReset] = useState(false);
    const email = config.emailSettings || {};
    const [testState, setTestState] = useState("idle"); // idle | sending | ok | error
    const [testDetail, setTestDetail] = useState("");
    async function savePwd() {
        if (pwd.length < 6) {
            flashToast("Le code doit contenir au moins 6 caractères");
            return;
        }
        if (pwd !== pwd2) {
            flashToast("Les deux codes ne correspondent pas");
            return;
        }
        const hash = await sha256Hex(pwd.trim());
        setPasswordHash(hash);
        setPwd("");
        setPwd2("");
    }
    function resetAll() {
        setConfig({ ...defaultConfig(), emailSettings: config.emailSettings });
        setConfirmReset(false);
        flashToast("Configuration réinitialisée");
    }
    function updateEmail(patch) {
        setConfig({ ...config, emailSettings: { ...email, ...patch } });
    }
    async function testEmail() {
        setTestState("sending");
        setTestDetail("");
        const result = await sendLeadEmail(email, {
            to_email: email.toEmail || "",
            prenom: "Test", nom: "Simulateur", telephone: "0600000000", email: "test@id-homecreation.com",
            adresse: "1570 Avenue des Platanes, 34970 Lattes", creneau: "Peu importe",
            message: "Ceci est un envoi de test depuis l'espace professionnel.",
            habitation: "Appartement", niveau: "Kilimanjaro", budget_bas: "12 000 €", budget_haut: "16 000 €",
            pieces_detail: buildListText(["Cuisine — 1 pièce, 10 m²", "Salle de bain — 1 pièce, 6 m²"]),
            postes_detail: buildListText(["Peinture & finitions murs/plafonds — 2 700 €", "Revêtement de sol — 3 800 €", "Cuisine équipée — 9 000 €"]),
            date: new Date().toLocaleString("fr-FR"),
        });
        setTestState(result.ok ? "ok" : "error");
        if (result.ok) {
            flashToast("Email de test envoyé avec succès");
        }
        else if (result.reason === "not_configured") {
            flashToast("Complétez les 3 champs EmailJS avant de tester");
        }
        else {
            flashToast("Échec de l'envoi — voir le détail ci-dessous");
            setTestDetail(result.reason === "network_error" ? "Impossible de joindre EmailJS (problème réseau ou domaine bloqué)." : (result.detail || "Erreur inconnue renvoyée par EmailJS."));
        }
    }
    return (React.createElement("div", null,
        React.createElement("div", { className: "ihc-panel" },
            React.createElement("h3", null, "Code d'acc\u00E8s professionnel"),
            React.createElement("div", { style: { fontSize: 12.5, color: "rgba(239,231,214,0.55)", marginBottom: 12 } }, "Le code n'est jamais stock\u00E9 ni affich\u00E9 en clair (seule son empreinte cryptographique est conserv\u00E9e). Apr\u00E8s 5 tentatives incorrectes, l'acc\u00E8s est temporairement verrouill\u00E9."),
            React.createElement("div", { className: "ihc-field-row", style: { marginBottom: 10 } },
                React.createElement("input", { type: "password", placeholder: "Nouveau code (6 caract\u00E8res min.)", value: pwd, onChange: (e) => setPwd(e.target.value), style: { background: "rgba(239,231,214,0.08)", border: "1px solid rgba(239,231,214,0.2)", color: "var(--sand)", borderRadius: 6, padding: "9px 12px" } }),
                React.createElement("input", { type: "password", placeholder: "Confirmer le code", value: pwd2, onChange: (e) => setPwd2(e.target.value), style: { background: "rgba(239,231,214,0.08)", border: "1px solid rgba(239,231,214,0.2)", color: "var(--sand)", borderRadius: 6, padding: "9px 12px" } })),
            React.createElement("button", { className: "btn btn-clay btn-sm", onClick: savePwd }, "Mettre \u00E0 jour le code d'acc\u00E8s")),
        React.createElement("div", { className: "ihc-panel" },
            React.createElement("h3", null, "Envoi automatique des demandes de rappel par email"),
            React.createElement("div", { style: { fontSize: 12.5, color: "rgba(239,231,214,0.55)", marginBottom: 14, lineHeight: 1.6 } },
                "Un artifact n'a pas de serveur mail propre : l'envoi passe par ",
                React.createElement("strong", null, "EmailJS"),
                " (compte gratuit), qui autorise l'envoi depuis le navigateur sans exposer de mot de passe SMTP. Cr\u00E9ez un compte sur emailjs.com, un \u00AB Service \u00BB (votre bo\u00EEte mail), un \u00AB Template \u00BB avec les variables ",
                React.createElement("span", { className: "mono", style: { fontSize: 11 } }, "{{prenom}} {{nom}} {{telephone}} {{email}} {{adresse}} {{creneau}} {{message}} {{habitation}} {{niveau}} {{budget_bas}} {{budget_haut}} {{date}} {{to_email}}"),
                ", puis renseignez le champ \u00AB To email \u00BB du template avec ",
                React.createElement("span", { className: "mono", style: { fontSize: 11 } }, "{{to_email}}"),
                " pour que la destination reste pilot\u00E9e depuis ce back-office."),
            React.createElement("div", { className: "ihc-field-row", style: { marginBottom: 10 } },
                React.createElement("div", null,
                    React.createElement("div", { style: { fontSize: 11, color: "rgba(239,231,214,0.5)", marginBottom: 4 } }, "Adresse email destinataire"),
                    React.createElement("input", { type: "email", value: email.toEmail || "", onChange: (e) => updateEmail({ toEmail: e.target.value }), placeholder: "contact@id-homecreation.com", style: { background: "rgba(239,231,214,0.08)", border: "1px solid rgba(239,231,214,0.2)", color: "var(--sand)", borderRadius: 6, padding: "9px 12px", width: "100%" } })),
                React.createElement("div", null,
                    React.createElement("div", { style: { fontSize: 11, color: "rgba(239,231,214,0.5)", marginBottom: 4 } }, "Service ID (EmailJS)"),
                    React.createElement("input", { value: email.serviceId || "", onChange: (e) => updateEmail({ serviceId: e.target.value }), placeholder: "service_xxxxxxx", style: { background: "rgba(239,231,214,0.08)", border: "1px solid rgba(239,231,214,0.2)", color: "var(--sand)", borderRadius: 6, padding: "9px 12px", width: "100%", fontFamily: "'IBM Plex Mono', monospace", fontSize: 12.5 } }))),
            React.createElement("div", { className: "ihc-field-row", style: { marginBottom: 14 } },
                React.createElement("div", null,
                    React.createElement("div", { style: { fontSize: 11, color: "rgba(239,231,214,0.5)", marginBottom: 4 } }, "Template ID (EmailJS)"),
                    React.createElement("input", { value: email.templateId || "", onChange: (e) => updateEmail({ templateId: e.target.value }), placeholder: "template_xxxxxxx", style: { background: "rgba(239,231,214,0.08)", border: "1px solid rgba(239,231,214,0.2)", color: "var(--sand)", borderRadius: 6, padding: "9px 12px", width: "100%", fontFamily: "'IBM Plex Mono', monospace", fontSize: 12.5 } })),
                React.createElement("div", null,
                    React.createElement("div", { style: { fontSize: 11, color: "rgba(239,231,214,0.5)", marginBottom: 4 } }, "Public Key (EmailJS)"),
                    React.createElement("input", { value: email.publicKey || "", onChange: (e) => updateEmail({ publicKey: e.target.value }), placeholder: "xxxxxxxxxxxxxxxx", style: { background: "rgba(239,231,214,0.08)", border: "1px solid rgba(239,231,214,0.2)", color: "var(--sand)", borderRadius: 6, padding: "9px 12px", width: "100%", fontFamily: "'IBM Plex Mono', monospace", fontSize: 12.5 } }))),
            React.createElement("button", { className: "btn btn-clay btn-sm", onClick: testEmail, disabled: testState === "sending" }, testState === "sending" ? (React.createElement(React.Fragment, null,
                React.createElement("span", { className: "ihc-spinner" }),
                " Envoi du test\u2026")) : "Envoyer un email de test"),
            testState === "ok" && React.createElement("span", { style: { marginLeft: 12, fontSize: 12.5, color: "#8fae7a" } },
                React.createElement(Check, { size: 13, style: { verticalAlign: -2 } }),
                " Re\u00E7u c\u00F4t\u00E9 EmailJS"),
            testState === "error" && React.createElement("span", { style: { marginLeft: 12, fontSize: 12.5, color: "#e08a6f" } }, "\u00C9chec de l'envoi"),
            testState === "error" && testDetail && (React.createElement("div", { style: { marginTop: 10, fontSize: 12.5, color: "#e08a6f", background: "rgba(224,138,111,0.1)", border: "1px solid rgba(224,138,111,0.3)", borderRadius: 6, padding: "10px 12px", fontFamily: "'IBM Plex Mono', monospace" } }, testDetail))),
        React.createElement("div", { className: "ihc-panel" },
            React.createElement("h3", null, "R\u00E9initialisation globale"),
            React.createElement("div", { style: { fontSize: 12.5, color: "rgba(239,231,214,0.55)", marginBottom: 12 } }, "Restaure les types de pi\u00E8ces, postes et niveaux de finition par d\u00E9faut. Les demandes de rappel re\u00E7ues et les r\u00E9glages email ne sont pas affect\u00E9s."),
            React.createElement("button", { className: "btn btn-danger btn-sm", onClick: () => setConfirmReset(true) }, "R\u00E9initialiser toute la configuration")),
        React.createElement(ConfirmDialog, { open: confirmReset, title: "R\u00E9initialiser la configuration ?", body: "Tous les tarifs, pi\u00E8ces et niveaux personnalis\u00E9s seront remplac\u00E9s par les valeurs par d\u00E9faut.", onConfirm: resetAll, onCancel: () => setConfirmReset(false) })));
}
/* ------------------------------ Bootstrap ---------------------------------
   Montage de l'application dans <div id="root"> (voir index.html)
   ============================================================================ */
console.log("%cID'Home Création — build 2026-08-23-d", "color:#9C4420; font-weight:bold; font-size:13px;");
const rootEl = document.getElementById("root");
ReactDOM.createRoot(rootEl).render(React.createElement(App, null));
