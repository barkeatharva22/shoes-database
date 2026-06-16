import { useState, useEffect } from "react";
import { supabase } from "./components/Supabase";

/* ─── STYLES ─── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Bebas+Neue&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Inter', sans-serif;
    background: #0a0a0a;
    color: #f0f0f0;
    min-height: 100vh;
  }

  /* ── NAVBAR ── */
  .navbar {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.2rem 4rem;
    background: rgba(10,10,10,0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .navbar-logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.8rem;
    letter-spacing: 0.12em;
    color: #f0f0f0;
    cursor: pointer;
  }

  .navbar ul {
    display: flex;
    gap: 2.5rem;
    list-style: none;
  }

  .navbar ul li {
    font-size: 0.78rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(240,240,240,0.55);
    cursor: pointer;
    transition: color 0.2s;
    padding-bottom: 2px;
    border-bottom: 1px solid transparent;
  }

  .navbar ul li:hover { color: #f0f0f0; }
  .navbar ul li.active {
    color: #f0f0f0;
    border-bottom-color: #c8a96e;
  }

  .navbar-actions {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  .navbar-btn {
    font-size: 0.72rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    padding: 0.6rem 1.4rem;
    border: 1px solid rgba(255,255,255,0.25);
    background: transparent;
    color: #f0f0f0;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
  }
  .navbar-btn:hover {
    background: rgba(255,255,255,0.08);
    border-color: rgba(255,255,255,0.5);
  }

  .navbar-btn.gold {
    background: #c8a96e;
    color: #0a0a0a;
    border-color: #c8a96e;
    font-weight: 600;
  }
  .navbar-btn.gold:hover { opacity: 0.85; background: #c8a96e; }

  /* ── PAGE WRAPPER ── */
  .page { padding-top: 72px; min-height: 100vh; }

  /* ── HERO ── */
  .hero {
    display: flex;
    align-items: center;
    min-height: calc(100vh - 72px);
    padding: 4rem 4rem 4rem 4rem;
    gap: 4rem;
  }
  .hero-left { flex: 1; }
  .hero-left .small {
    font-size: 0.7rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #c8a96e;
    margin-bottom: 1.5rem;
  }
  .hero-left h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(4rem, 9vw, 8rem);
    line-height: 0.95;
    letter-spacing: 0.04em;
    color: #f0f0f0;
    margin-bottom: 0.4rem;
  }
  .hero-left h2 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(2rem, 4vw, 3.5rem);
    letter-spacing: 0.08em;
    color: #c8a96e;
    margin-bottom: 1.8rem;
  }
  .hero-left .desc {
    font-size: 0.9rem;
    line-height: 1.9;
    color: rgba(240,240,240,0.55);
    margin-bottom: 2.5rem;
  }
  .hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; }
  .hero-btn {
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    padding: 1rem 2.5rem;
    background: #c8a96e;
    color: #0a0a0a;
    border: none;
    cursor: pointer;
    font-weight: 600;
    transition: opacity 0.2s;
  }
  .hero-btn:hover { opacity: 0.85; }
  .hero-btn.outline {
    background: transparent;
    color: #f0f0f0;
    border: 1px solid rgba(255,255,255,0.25);
  }
  .hero-btn.outline:hover { background: rgba(255,255,255,0.08); opacity: 1; }
  .hero-right { flex: 1; display: flex; justify-content: flex-end; }
  .hero-right img {
    width: 100%;
    max-width: 520px;
    height: 70vh;
    object-fit: cover;
    object-position: top;
    filter: grayscale(20%);
  }

  /* ── BRANDS ── */
  .brands {
    padding: 2.5rem 4rem;
    border-top: 1px solid rgba(255,255,255,0.06);
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .brand-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
  }
  .brand-container span {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.3rem;
    letter-spacing: 0.14em;
    color: rgba(240,240,240,0.2);
    transition: color 0.2s;
    cursor: default;
  }
  .brand-container span:hover { color: rgba(240,240,240,0.6); }

  /* ── COLLECTIONS ── */
  .collections { padding: 6rem 4rem; }
  .collections > h2 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2.8rem;
    letter-spacing: 0.1em;
    color: #f0f0f0;
    margin-bottom: 3rem;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 320px 260px;
    gap: 1rem;
  }
  .card {
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: flex-end;
    padding: 1.5rem;
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }
  .card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%);
    transition: opacity 0.3s;
  }
  .card:hover::after { opacity: 0.5; }
  .card h3 {
    position: relative;
    z-index: 1;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.8rem;
    letter-spacing: 0.1em;
    color: #f0f0f0;
  }
  .card.large { grid-column: span 2; }
  .card.wide  { grid-column: span 2; }

  /* ── TESTIMONIALS ── */
  .testimonials { padding: 6rem 4rem; background: #111; }
  .testimonials h2 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2.8rem;
    letter-spacing: 0.1em;
    color: #f0f0f0;
    margin-bottom: 3rem;
  }
  .reviews { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  .review {
    background: #1a1a1a;
    border: 1px solid rgba(255,255,255,0.06);
    padding: 2rem;
  }
  .review h3 { font-size: 1rem; color: #c8a96e; margin-bottom: 0.8rem; }
  .review p { font-size: 0.9rem; color: rgba(240,240,240,0.65); line-height: 1.7; }

  /* ── FOOTER ── */
  .footer {
    padding: 4rem;
    border-top: 1px solid rgba(255,255,255,0.06);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    text-align: center;
  }
  .footer h2 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2.2rem;
    letter-spacing: 0.16em;
    color: #f0f0f0;
  }
  .footer > p { font-size: 0.85rem; color: rgba(240,240,240,0.45); }
  .footer-links { display: flex; gap: 2rem; }
  .footer-links span {
    font-size: 0.75rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(240,240,240,0.4);
    cursor: pointer;
    transition: color 0.2s;
  }
  .footer-links span:hover { color: #c8a96e; }

  /* ── COLLECTION PAGE ── */
  .collection-page { padding: 6rem 4rem; }
  .collection-page-head {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-bottom: 3rem;
  }
  .collection-page h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 3.5rem;
    letter-spacing: 0.1em;
    margin-bottom: 0.5rem;
  }
  .collection-page .subtitle {
    font-size: 0.85rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #c8a96e;
  }
  .filter-bar {
    display: flex;
    gap: 1rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;
  }
  .filter-btn {
    font-size: 0.72rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 0.5rem 1.2rem;
    border: 1px solid rgba(255,255,255,0.15);
    background: transparent;
    color: rgba(240,240,240,0.55);
    cursor: pointer;
    transition: all 0.2s;
  }
  .filter-btn.active, .filter-btn:hover {
    border-color: #c8a96e;
    color: #c8a96e;
  }
  .products-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
  .product-card { cursor: pointer; position: relative; }
  .product-img {
    width: 100%;
    aspect-ratio: 3/4;
    object-fit: cover;
    display: block;
    filter: grayscale(10%);
    transition: filter 0.3s;
    background: #1a1a1a;
  }
  .product-card:hover .product-img { filter: grayscale(0%); }
  .product-info { padding: 1rem 0; }
  .product-info h4 {
    font-size: 0.85rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 0.3rem;
  }
  .product-info .brand {
    font-size: 0.72rem;
    color: rgba(240,240,240,0.4);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }
  .product-info .price { font-size: 0.9rem; color: #c8a96e; }
  .product-badge {
    position: absolute;
    top: 0.6rem;
    left: 0.6rem;
    background: #c8a96e;
    color: #0a0a0a;
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 0.3rem 0.7rem;
    font-weight: 600;
    z-index: 1;
  }

  /* ── LOOKBOOK PAGE ── */
  .lookbook-page { padding: 6rem 4rem; }
  .lookbook-page h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 3.5rem;
    letter-spacing: 0.1em;
    margin-bottom: 0.5rem;
  }
  .lookbook-page .subtitle {
    font-size: 0.85rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(240,240,240,0.4);
    margin-bottom: 3rem;
  }
  .season-tabs {
    display: flex;
    gap: 0;
    margin-bottom: 3rem;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }
  .season-tab {
    font-size: 0.75rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    padding: 0.8rem 1.8rem;
    cursor: pointer;
    color: rgba(240,240,240,0.4);
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    background: transparent;
    border-top: none;
    border-left: none;
    border-right: none;
    transition: all 0.2s;
  }
  .season-tab.active { color: #f0f0f0; border-bottom-color: #c8a96e; }
  .lookbook-grid {
    columns: 3;
    gap: 1rem;
  }
  .lookbook-item {
    break-inside: avoid;
    margin-bottom: 1rem;
    overflow: hidden;
    position: relative;
  }
  .lookbook-item img {
    width: 100%;
    display: block;
    transition: transform 0.4s;
    filter: grayscale(15%);
  }
  .lookbook-item:hover img { transform: scale(1.03); }
  .lookbook-overlay {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
    padding: 1.5rem 1rem 1rem;
    transform: translateY(100%);
    transition: transform 0.3s;
  }
  .lookbook-item:hover .lookbook-overlay { transform: translateY(0); }
  .lookbook-overlay span {
    font-size: 0.72rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #f0f0f0;
  }

  /* ── ABOUT PAGE ── */
  .about-page { }
  .about-hero {
    height: 60vh;
    background-image: url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400');
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: flex-end;
    padding: 4rem;
    position: relative;
  }
  .about-hero::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.3) 60%, transparent 100%);
  }
  .about-hero-text { position: relative; z-index: 1; }
  .about-hero-text h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 5rem;
    letter-spacing: 0.08em;
    margin-bottom: 0.5rem;
  }
  .about-hero-text p {
    font-size: 0.9rem;
    color: rgba(240,240,240,0.6);
    letter-spacing: 0.06em;
  }
  .about-body { padding: 6rem 4rem; }
  .about-manifesto {
    max-width: 680px;
    margin-bottom: 6rem;
  }
  .about-manifesto .eyebrow {
    font-size: 0.7rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #c8a96e;
    margin-bottom: 1.5rem;
  }
  .about-manifesto p {
    font-size: 1.1rem;
    line-height: 1.9;
    color: rgba(240,240,240,0.75);
    margin-bottom: 1.5rem;
  }
  .about-values {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
    border-top: 1px solid rgba(255,255,255,0.08);
    padding-top: 4rem;
  }
  .value-item .num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 3rem;
    color: rgba(200,169,110,0.25);
    line-height: 1;
    margin-bottom: 1rem;
  }
  .value-item h4 {
    font-size: 0.85rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin-bottom: 0.8rem;
  }
  .value-item p { font-size: 0.85rem; color: rgba(240,240,240,0.5); line-height: 1.8; }

  /* ── CONTACT PAGE ── */
  .contact-page {
    min-height: calc(100vh - 72px);
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .contact-left {
    background: #111;
    padding: 6rem 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .contact-left .eyebrow {
    font-size: 0.7rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #c8a96e;
    margin-bottom: 1.5rem;
  }
  .contact-left h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 4rem;
    letter-spacing: 0.06em;
    line-height: 1;
    margin-bottom: 2rem;
  }
  .contact-left p {
    font-size: 0.9rem;
    color: rgba(240,240,240,0.55);
    line-height: 1.8;
    margin-bottom: 3rem;
  }
  .contact-details { display: flex; flex-direction: column; gap: 1.2rem; }
  .contact-detail .label {
    font-size: 0.68rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(240,240,240,0.35);
    margin-bottom: 0.2rem;
  }
  .contact-detail .val {
    font-size: 0.9rem;
    color: rgba(240,240,240,0.75);
  }
  .contact-right {
    padding: 6rem 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #0a0a0a;
  }
  .contact-right h2 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2rem;
    letter-spacing: 0.1em;
    margin-bottom: 2.5rem;
  }
  .form-group { margin-bottom: 1.5rem; }
  .form-group label {
    display: block;
    font-size: 0.68rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(240,240,240,0.45);
    margin-bottom: 0.6rem;
  }
  .form-group input,
  .form-group textarea,
  .form-group select {
    width: 100%;
    background: #111;
    border: 1px solid rgba(255,255,255,0.08);
    color: #f0f0f0;
    padding: 0.85rem 1rem;
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    outline: none;
    transition: border-color 0.2s;
    appearance: none;
  }
  .form-group input:focus,
  .form-group textarea:focus,
  .form-group select:focus { border-color: #c8a96e; }
  .form-group textarea { resize: none; }
  .form-group select { cursor: pointer; }
  .submit-btn {
    width: 100%;
    padding: 1rem;
    background: #c8a96e;
    color: #0a0a0a;
    border: none;
    font-size: 0.75rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    font-weight: 600;
    cursor: pointer;
    margin-top: 0.5rem;
    transition: opacity 0.2s;
  }
  .submit-btn:hover { opacity: 0.85; }
  .submit-success {
    background: rgba(200,169,110,0.1);
    border: 1px solid rgba(200,169,110,0.3);
    padding: 1rem;
    font-size: 0.85rem;
    color: #c8a96e;
    text-align: center;
    margin-top: 1rem;
  }

  /* ── SELL / ADD PRODUCT PAGE ── */
  .sell-page {
    padding: 6rem 4rem;
    max-width: 900px;
    margin: 0 auto;
  }
  .sell-page .eyebrow {
    font-size: 0.7rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #c8a96e;
    margin-bottom: 1.5rem;
  }
  .sell-page h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 3.5rem;
    letter-spacing: 0.06em;
    line-height: 1;
    margin-bottom: 1rem;
  }
  .sell-page .lead {
    font-size: 0.9rem;
    color: rgba(240,240,240,0.55);
    line-height: 1.8;
    margin-bottom: 3rem;
    max-width: 600px;
  }
  .sell-form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
  .sell-form .full { grid-column: 1 / -1; }
  .sell-form .form-group { margin-bottom: 0; }
  .sell-form .submit-btn {
    grid-column: 1 / -1;
    width: auto;
    padding: 1rem 3rem;
    justify-self: start;
  }
  .img-preview-row {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-top: -0.5rem;
  }
  .img-preview {
    width: 110px;
    height: 145px;
    object-fit: cover;
    border: 1px solid rgba(255,255,255,0.1);
    background: #111;
  }
  .img-preview-placeholder {
    width: 110px;
    height: 145px;
    border: 1px dashed rgba(255,255,255,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(240,240,240,0.3);
    text-align: center;
    padding: 0.5rem;
  }
  .img-preview-text {
    font-size: 0.8rem;
    color: rgba(240,240,240,0.4);
    line-height: 1.7;
    max-width: 320px;
  }
  .sell-success {
    grid-column: 1 / -1;
    background: rgba(200,169,110,0.1);
    border: 1px solid rgba(200,169,110,0.3);
    padding: 1.2rem;
    font-size: 0.85rem;
    color: #c8a96e;
  }
  .sell-success span {
    display: block;
    margin-top: 0.6rem;
    font-size: 0.75rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    cursor: pointer;
    text-decoration: underline;
  }

  @media (max-width: 800px) {
    .sell-form { grid-template-columns: 1fr; }
  }
`;

/* ─── DATA ─── */
const INITIAL_PRODUCTS = [
  { id: 1, name: "Oversized Utility Jacket", brand: "FYNTRIX", price: "₹4,999", cat: "Streetwear", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600" },
  { id: 2, name: "Structured Wool Coat", brand: "FYNTRIX", price: "₹12,499", cat: "Luxury", img: "https://images.unsplash.com/photo-1548624313-0396a7571060?w=600" },
  { id: 3, name: "Vintage Denim Set", brand: "FYNTRIX", price: "₹3,799", cat: "New Arrivals", img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600" },
  { id: 4, name: "Silk Slip Dress", brand: "FYNTRIX", price: "₹8,299", cat: "Luxury", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600" },
  { id: 5, name: "Cargo Trousers", brand: "FYNTRIX", price: "₹2,999", cat: "Streetwear", img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600" },
  { id: 6, name: "Essential White Tee", brand: "FYNTRIX", price: "₹899", cat: "New Arrivals", img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600" },
];

const LOOKBOOK = {
  "SS 2026": [
    { img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600", label: "Look 01" },
    { img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600", label: "Look 02" },
    { img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600", label: "Look 03" },
    { img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600", label: "Look 04" },
    { img: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=600", label: "Look 05" },
    { img: "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=600", label: "Look 06" },
  ],
  "FW 2025": [
    { img: "https://images.unsplash.com/photo-1548624313-0396a7571060?w=600", label: "Look 01" },
    { img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600", label: "Look 02" },
    { img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600", label: "Look 03" },
    { img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600", label: "Look 04" },
  ],
};

const CATEGORIES = ["Streetwear", "Luxury", "New Arrivals", "Essentials"];

/* ─── COMPONENTS ─── */
function Navbar({ current, navigate }) {
  const links = ["Home", "Collection", "Lookbook", "About", "Contact"];
  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate("Home")}>FYNTRIX</div>
      <ul>
        {links.map(l => (
          <li key={l} className={current === l ? "active" : ""} onClick={() => navigate(l)}>{l}</li>
        ))}
      </ul>
      <div className="navbar-actions">
        <button className="navbar-btn gold" onClick={() => navigate("Sell")}>+ Add Product</button>
        <button className="navbar-btn" onClick={() => navigate("Collection")}>SHOP NOW</button>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <h2>FYNTRIX</h2>
      <p>Redefining fashion with creativity.</p>
      <div className="footer-links">
        <span>Instagram</span>
        <span>Pinterest</span>
        <span>TikTok</span>
      </div>
      <p style={{ fontSize: "0.75rem", color: "rgba(240,240,240,0.3)" }}>© 2026 FYNTRIX</p>
    </footer>
  );
}

/* ── PAGES ── */
function HomePage({ navigate }) {
  return (
    <>
      <section className="hero">
        <div className="hero-left">
          <p className="small">NEW COLLECTION 2026</p>
          <h1>WE DON'T<br />FOLLOW<br />TRENDS.</h1>
          <h2>WE CREATE THEM.</h2>
          <p className="desc">Fashion is more than clothing.<br />It's identity, attitude and expression.</p>
          <div className="hero-btns">
            <button className="hero-btn" onClick={() => navigate("Collection")}>Explore Collection</button>
            <button className="hero-btn outline" onClick={() => navigate("Sell")}>Sell Your Designs</button>
          </div>
        </div>
        <div className="hero-right">
          <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900" alt="Hero model" />
        </div>
      </section>

      <section className="brands">
        <div className="brand-container">
          {["NIKE", "ADIDAS", "PUMA", "ZARA", "H&M", "DIESEL"].map(b => (
            <span key={b}>{b}</span>
          ))}
        </div>
      </section>

      <section className="collections">
        <h2>Explore Collections</h2>
        <div className="grid">
          <div className="card large" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1000')" }}><h3>Streetwear</h3></div>
          <div className="card luxury" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000')" }}><h3>Luxury</h3></div>
          <div className="card arrivals" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1000')" }}><h3>New Arrivals</h3></div>
          <div className="card wide" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1000')" }}><h3>Essentials</h3></div>
        </div>
      </section>

      <section className="testimonials">
        <h2>Customer Love</h2>
        <div className="reviews">
          {[["Quality is insane. Each piece is crafted with precision.", "Riya S., Mumbai"],
            ["Premium and stylish — unlike anything I've worn before.", "Arjun K., Delhi"],
            ["Worth every rupee. My go-to brand now.", "Priya M., Bangalore"]
          ].map(([text, name], i) => (
            <div key={i} className="review">
              <h3>★★★★★</h3>
              <p>{text}</p>
              <p style={{ fontSize: "0.72rem", color: "rgba(240,240,240,0.3)", marginTop: "1rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>{name}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

function CollectionPage({ products }) {
  const cats = ["All", "Streetwear", "Luxury", "New Arrivals", "Essentials"];
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? products : products.filter(p => p.cat === active);

  return (
    <div className="collection-page">
      <div className="collection-page-head">
        <div>
          <h1>The Collection</h1>
          <p className="subtitle">Season 2026 — Curated Drops</p>
        </div>
      </div>
      <div className="filter-bar">
        {cats.map(c => (
          <button key={c} className={`filter-btn ${active === c ? "active" : ""}`} onClick={() => setActive(c)}>{c}</button>
        ))}
      </div>
      <div className="products-grid">
        {filtered.map(p => (
          <div key={p.id} className="product-card">
            {p.userAdded && <div className="product-badge">Seller</div>}
            <img className="product-img" src={p.img} alt={p.name} />
            <div className="product-info">
              <div className="brand">{p.brand} · {p.cat}</div>
              <h4>{p.name}</h4>
              <div className="price">{p.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LookbookPage() {
  const seasons = Object.keys(LOOKBOOK);
  const [active, setActive] = useState(seasons[0]);

  return (
    <div className="lookbook-page">
      <h1>Lookbook</h1>
      <p className="subtitle">Visual stories from the studio</p>
      <div className="season-tabs">
        {seasons.map(s => (
          <button key={s} className={`season-tab ${active === s ? "active" : ""}`} onClick={() => setActive(s)}>{s}</button>
        ))}
      </div>
      <div className="lookbook-grid">
        {LOOKBOOK[active].map((item, i) => (
          <div key={i} className="lookbook-item">
            <img src={item.img} alt={item.label} />
            <div className="lookbook-overlay"><span>{item.label}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="about-hero-text">
          <h1>FYNTRIX</h1>
          <p>Est. 2022 · Mumbai, India</p>
        </div>
      </div>
      <div className="about-body">
        <div className="about-manifesto">
          <div className="eyebrow">Our Manifesto</div>
          <p>FYNTRIX was born out of a refusal — a refusal to follow what everyone else was doing. We started with a simple conviction: clothing should carry character.</p>
          <p>We source thoughtfully, design with intention, and create pieces built for the people who move through the world on their own terms. Every stitch is a statement.</p>
          <p>We are not a trend. We are a perspective.</p>
        </div>
        <div className="about-values">
          {[
            ["01", "Craft First", "Every piece is reviewed by our team before it leaves the studio. No shortcuts, no compromises."],
            ["02", "Identity Over Trend", "We design for the individual — not the algorithm. Fashion that outlives the season."],
            ["03", "Transparency", "We tell you where your clothes come from and who made them. Always."],
          ].map(([num, title, desc]) => (
            <div key={num} className="value-item">
              <div className="num">{num}</div>
              <h4>{title}</h4>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = () => {
    if (form.name && form.email && form.message) setSent(true);
  };

  return (
    <div className="contact-page">
      <div className="contact-left">
        <div className="eyebrow">Get In Touch</div>
        <h1>LET'S<br />TALK.</h1>
        <p>Whether it's a collaboration, a wholesale inquiry, or just a thought — our inbox is always open.</p>
        <div className="contact-details">
          {[["Email", "hello@fyntrix.in"], ["Phone", "+91 98765 43210"], ["Location", "Bandra West, Mumbai"], ["Hours", "Mon–Sat, 10am–7pm"]].map(([label, val]) => (
            <div key={label} className="contact-detail">
              <div className="label">{label}</div>
              <div className="val">{val}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="contact-right">
        <h2>SEND A MESSAGE</h2>
        <div className="form-group">
          <label>Your Name</label>
          <input name="name" value={form.name} onChange={handle} placeholder="e.g. Arjun Shah" />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input name="email" type="email" value={form.email} onChange={handle} placeholder="you@email.com" />
        </div>
        <div className="form-group">
          <label>Subject</label>
          <select name="subject" value={form.subject} onChange={handle}>
            <option value="">Select a topic</option>
            <option>Order Enquiry</option>
            <option>Collaboration</option>
            <option>Wholesale</option>
            <option>Press & Media</option>
            <option>Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea name="message" rows={5} value={form.message} onChange={handle} placeholder="Tell us what's on your mind..." />
        </div>
        <button className="submit-btn" onClick={submit}>Send Message →</button>
        {sent && <div className="submit-success">Your message has been sent. We'll be in touch shortly.</div>}
      </div>
    </div>
  );
}

function SellPage({ addProduct, navigate }) {
  const empty = { name: "", brand: "", price: "", cat: "", img: "", desc: "" };
  const [form, setForm] = useState(empty);
  const [done, setDone] = useState(false);

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = () => {
    if (!form.name || !form.price || !form.cat) return;
    const price = form.price.trim().startsWith("₹") ? form.price.trim() : `₹${form.price.trim()}`;
    const fallbackImg = "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600";
    addProduct({
      id: Date.now(),
      name: form.name,
      brand: form.brand || "Independent Seller",
      price,
      cat: form.cat,
      img: form.img || fallbackImg,
      desc: form.desc,
      userAdded: true,
    });
    setForm(empty);
    setDone(true);
  };

  return (
    <div className="sell-page">
      <div className="eyebrow">Seller Hub</div>
      <h1>List A Product</h1>
      <p className="lead">
        Got something to sell? Fill in the details below and your product will be
        added straight to the FYNTRIX collection for shoppers to discover.
      </p>

      <div className="sell-form">
        {done && (
          <div className="sell-success">
            Your product has been listed successfully!
            <span onClick={() => navigate("Collection")}>View it in the Collection →</span>
          </div>
        )}

        <div className="form-group">
          <label>Product Name *</label>
          <input name="name" value={form.name} onChange={handle} placeholder="e.g. Hand-stitched Denim Jacket" />
        </div>
        <div className="form-group">
          <label>Brand / Seller Name</label>
          <input name="brand" value={form.brand} onChange={handle} placeholder="e.g. Your label name" />
        </div>

        <div className="form-group">
          <label>Price (₹) *</label>
          <input name="price" value={form.price} onChange={handle} placeholder="e.g. 2,499" />
        </div>
        <div className="form-group">
          <label>Category *</label>
          <select name="cat" value={form.cat} onChange={handle}>
            <option value="">Select a category</option>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="form-group full">
          <label>Image URL</label>
          <input name="img" value={form.img} onChange={handle} placeholder="https://... (optional — a placeholder will be used if left blank)" />
        </div>

        <div className="img-preview-row">
          {form.img
            ? <img className="img-preview" src={form.img} alt="Preview" />
            : <div className="img-preview-placeholder">No Image Selected</div>}
          <p className="img-preview-text">
            Paste a direct image link for your product. For best results use a
            portrait photo (3:4 ratio) on a plain background.
          </p>
        </div>

        <div className="form-group full">
          <label>Description</label>
          <textarea name="desc" rows={4} value={form.desc} onChange={handle} placeholder="Tell buyers about the material, fit, and story behind this piece..." />
        </div>

        <button className="submit-btn" onClick={submit}>List My Product →</button>
      </div>
    </div>
  );
}

/* ─── APP ─── */
export default function App() {
  const [page, setPage] = useState("Home");
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  useEffect(() => {
    supabase
      .from("clothes")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) { console.error(error); return; }
        if (data?.length) {
          const mapped = data.map((r) => ({
            id: r.id,
            name: r.name,
            brand: r.brand || "Independent Seller",
            price: r.price,
            cat: r.cat,
            img: r.img || "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600",
            desc: r.desc,
            userAdded: r.user_added,
          }));
          setProducts((prev) => [...mapped, ...prev]);
        }
      });
  }, []);

const addProduct = async (p) => {
  setProducts((prev) => [p, ...prev]);

const { error } = await supabase.from("clothes").insert({
  name: p.name,
  brand: p.brand,
  price: p.price,
  cat: p.cat,
  img: p.img,
  description: p.desc,
  user_added: true,
});

  if (error) {
    console.error("Failed to save:", error.message);

    setProducts((prev) =>
      prev.filter((item) => item.id !== p.id)
    );

    alert("Failed to list product. Please try again.");
  }
};
  const PAGES = {
    Home: <HomePage navigate={setPage} />,
    Collection: <CollectionPage products={products} />,
    Lookbook: <LookbookPage />,
    About: <AboutPage />,
    Contact: <ContactPage />,
    Sell: <SellPage addProduct={addProduct} navigate={setPage} />,
  };

  return (
    <>
      <style>{css}</style>
      <Navbar current={page} navigate={setPage} />
      <div className="page">{PAGES[page]}</div>
    </>
  );
}
