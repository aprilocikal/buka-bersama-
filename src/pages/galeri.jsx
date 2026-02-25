import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

/* ─────────────────────────────────────────────
   Photo catalogue
   Naming: first 2 digits = year (23→2023, etc.)
   last digit  = photo index
───────────────────────────────────────────── */
const PHOTOS = [
  { id: "221", file: "221.jpeg", year: 2022 },
  { id: "222", file: "222.jpeg", year: 2022 },
  { id: "231", file: "231.jpeg", year: 2023 },
  { id: "232", file: "232.jpeg", year: 2023 },
  { id: "233", file: "233.jpeg", year: 2023 },
  { id: "234", file: "234.jpeg", year: 2023 },
  { id: "235", file: "235.jpeg", year: 2023 },
  { id: "241", file: "241.jpeg", year: 2024 },
  { id: "242", file: "242.jpeg", year: 2024 },
  { id: "243", file: "243.jpeg", year: 2024 },
  { id: "244", file: "244.jpeg", year: 2024 },
  { id: "245", file: "245.jpeg", year: 2024 },
  { id: "246", file: "246.jpeg", year: 2024 },
  { id: "247", file: "247.jpeg", year: 2024 },
  { id: "251", file: "251.jpeg", year: 2025 },
  { id: "252", file: "252.jpeg", year: 2025 },
  { id: "253", file: "253.jpeg", year: 2025 },
  { id: "254", file: "254.jpeg", year: 2025 },
  { id: "255", file: "255.jpeg", year: 2025 },
  { id: "256", file: "256.jpeg", year: 2025 },
  { id: "257", file: "257.jpeg", year: 2025 },
  { id: "258", file: "258.jpeg", year: 2025 },
];

const FILTERS = ["Semua", "2022", "2023", "2024", "2025"];

export default function Galeri() {
  const navigate = useNavigate();
  const [active, setActive] = useState("Semua");
  const [lightbox, setLightbox] = useState(null); // index in filtered array
  const [visible, setVisible] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const filtered =
    active === "Semua"
      ? PHOTOS
      : PHOTOS.filter((p) => p.year === parseInt(active));

  const handleFilter = (f) => {
    setActive(f);
    setAnimKey((k) => k + 1);
  };

  const openLightbox = (idx) => setLightbox(idx);
  const closeLightbox = () => setLightbox(null);
  const prevPhoto = useCallback(() => {
    setLightbox((i) => (i === 0 ? filtered.length - 1 : i - 1));
  }, [filtered.length]);
  const nextPhoto = useCallback(() => {
    setLightbox((i) => (i === filtered.length - 1 ? 0 : i + 1));
  }, [filtered.length]);

  // Keyboard nav
  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e) => {
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, prevPhoto, nextPhoto]);

  // Entry animation
  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, [animKey]);

  // Compute which indices in filtered array should be "wide" (span 2 cols)
  // Pattern: every 3rd item is wide (indices 2,5,8,...)
  // If the last item would end up alone in its row → auto-widen it too.
  const wideMap = useMemo(() => {
    const wide = new Array(filtered.length).fill(false);
    let col = 0; // tracks current column position (0 or 1) in the 2-col grid
    for (let i = 0; i < filtered.length; i++) {
      if ((i + 1) % 3 === 0) {
        wide[i] = true;
        col = 0; // wide item fills the entire row, reset
      } else {
        col = (col + 1) % 2;
      }
    }
    // If the last item ended up alone (col === 1), make it wide
    if (col === 1) {
      for (let i = filtered.length - 1; i >= 0; i--) {
        if (!wide[i]) {
          wide[i] = true;
          break;
        }
      }
    }
    return wide;
  }, [filtered]);

  // Year count summary
  const yearCounts = [2022, 2023, 2024, 2025].map((y) => ({
    year: y,
    count: PHOTOS.filter((p) => p.year === y).length,
  }));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,700;1,9..144,900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .gl-root {
          min-height: 100vh;
          background: #212f52;
          font-family: 'Plus Jakarta Sans', sans-serif;
          max-width: 430px;
          margin: 0 auto;
          overflow-x: hidden;
          position: relative;
        }

        /* ── HERO ── */
        .gl-hero {
          position: relative;
          padding: 90px 28px 44px;
          overflow: hidden;
          text-align: center;
        }
        .gl-hero-glow {
          position: absolute;
          top: 30px; left: 50%;
          transform: translateX(-50%);
          width: 320px; height: 200px;
          background: radial-gradient(ellipse, rgba(200,168,122,0.14) 0%, transparent 70%);
          pointer-events: none;
        }
        .gl-hero-label {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
          animation: glFadeUp 0.6s 0.1s ease both;
        }
        .gl-hero-line {
          flex: 1; height: 1px;
          background: linear-gradient(to right, transparent, rgba(200,168,122,0.45));
        }
        .gl-hero-line.r { background: linear-gradient(to left, transparent, rgba(200,168,122,0.45)); }
        .gl-hero-label-text {
          font-size: 8px; font-weight: 700;
          letter-spacing: 3px; text-transform: uppercase;
          color: #c8a87a; white-space: nowrap;
        }
        .gl-hero-title {
          font-family: 'Fraunces', serif;
          font-size: 42px; font-weight: 900;
          color: #eee6db; line-height: 0.95;
          letter-spacing: -1.5px;
          margin-bottom: 10px;
          animation: glFadeUp 0.6s 0.2s ease both;
        }
        .gl-hero-title em { font-style: italic; color: #c8a87a; }
        .gl-hero-sub {
          font-size: 13px; color: rgba(238,230,219,0.52);
          line-height: 1.6;
          animation: glFadeUp 0.6s 0.3s ease both;
          margin-bottom: 6px;
        }

        /* ── YEAR STATS ── */
        .gl-stats {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin-top: 28px;
          animation: glFadeUp 0.6s 0.4s ease both;
        }
        .gl-stat-card {
          flex: 1;
          background: rgba(200,168,122,0.06);
          border: 1px solid rgba(200,168,122,0.18);
          border-radius: 14px;
          padding: 14px 10px;
          text-align: center;
          max-width: 90px;
        }
        .gl-stat-year {
          font-family: 'Fraunces', serif;
          font-size: 18px; font-weight: 900;
          color: #c8a87a; letter-spacing: -0.5px;
          line-height: 1;
          margin-bottom: 4px;
        }
        .gl-stat-count {
          font-size: 10px; font-weight: 600;
          color: rgba(238,230,219,0.45);
          letter-spacing: 1px; text-transform: uppercase;
        }

        /* ── FILTER TABS ── */
        .gl-filter-wrap {
          padding: 0 20px;
          margin: 32px 0 24px;
          animation: glFadeUp 0.5s 0.45s ease both;
        }
        .gl-filter-scroll {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: none;
          padding-bottom: 4px;
        }
        .gl-filter-scroll::-webkit-scrollbar { display: none; }
        .gl-filter-btn {
          flex-shrink: 0;
          padding: 9px 22px;
          border-radius: 100px;
          border: 1.5px solid rgba(238,230,219,0.18);
          background: transparent;
          color: rgba(238,230,219,0.55);
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 12px; font-weight: 600;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.22s ease;
          white-space: nowrap;
        }
        .gl-filter-btn:hover {
          border-color: rgba(200,168,122,0.45);
          color: #c8a87a;
        }
        .gl-filter-btn.active {
          background: #c8a87a;
          border-color: #c8a87a;
          color: #212f52;
          font-weight: 700;
          box-shadow: 0 4px 18px rgba(200,168,122,0.35);
        }

        /* ── GALLERY GRID ── */
        .gl-grid-wrap {
          padding: 0 16px 80px;
        }
        .gl-section-label {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
          padding: 0 4px;
        }
        .gl-section-line {
          flex: 1; height: 1px;
          background: rgba(200,168,122,0.2);
        }
        .gl-section-text {
          font-size: 9px; font-weight: 700;
          letter-spacing: 2.5px; text-transform: uppercase;
          color: rgba(200,168,122,0.6);
          white-space: nowrap;
        }

        .gl-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-auto-flow: dense;
          gap: 10px;
        }
        .gl-item {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          cursor: pointer;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(200,168,122,0.1);
          aspect-ratio: 4/3;
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }
        .gl-item-wide {
          grid-column: span 2;
          aspect-ratio: 16/9;
        }
        .gl-item:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 28px rgba(0,0,0,0.35), 0 0 0 1px rgba(200,168,122,0.3);
        }
        .gl-item img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }
        .gl-item:hover img { transform: scale(1.06); }

        .gl-item-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(33,47,82,0.75) 0%, transparent 55%);
          opacity: 0;
          transition: opacity 0.22s ease;
          display: flex;
          align-items: flex-end;
          padding: 12px;
        }
        .gl-item:hover .gl-item-overlay { opacity: 1; }
        .gl-item-year-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(200,168,122,0.92);
          border-radius: 100px;
          padding: 4px 10px;
        }
        .gl-item-year-text {
          font-size: 9px; font-weight: 700;
          letter-spacing: 1.5px; text-transform: uppercase;
          color: #212f52;
        }
        .gl-item-expand {
          position: absolute;
          top: 10px; right: 10px;
          width: 28px; height: 28px;
          border-radius: 50%;
          background: rgba(33,47,82,0.75);
          border: 1px solid rgba(200,168,122,0.4);
          display: flex; align-items: center; justify-content: center;
          opacity: 0;
          transition: opacity 0.22s ease;
          color: #c8a87a;
          font-size: 12px;
        }
        .gl-item:hover .gl-item-expand { opacity: 1; }

        /* ── PHOTO ENTRY ANIMATION ── */
        .gl-anim-in {
          animation: glPhotoIn 0.4s ease both;
        }
        @keyframes glPhotoIn {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ── EMPTY STATE ── */
        .gl-empty {
          text-align: center;
          padding: 60px 20px;
          color: rgba(238,230,219,0.35);
          font-size: 13px;
          line-height: 1.8;
        }
        .gl-empty-icon {
          font-size: 36px;
          margin-bottom: 12px;
          opacity: 0.5;
        }

        /* ── LIGHTBOX ── */
        .gl-lb-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(10,16,30,0.96);
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: glLbIn 0.22s ease both;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        @keyframes glLbIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .gl-lb-inner {
          position: relative;
          width: 100%;
          max-width: 430px;
          max-height: 100dvh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 16px;
          gap: 16px;
        }
        .gl-lb-top {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 4px 0;
        }
        .gl-lb-counter {
          font-size: 11px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase;
          color: rgba(200,168,122,0.7);
        }
        .gl-lb-close {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: rgba(200,168,122,0.1);
          border: 1px solid rgba(200,168,122,0.3);
          color: #c8a87a;
          font-size: 18px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
        }
        .gl-lb-close:hover { background: rgba(200,168,122,0.22); }
        .gl-lb-img-wrap {
          width: 100%;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 24px 60px rgba(0,0,0,0.6);
          border: 1px solid rgba(200,168,122,0.18);
        }
        .gl-lb-img {
          width: 100%;
          max-height: 65dvh;
          object-fit: contain;
          background: #0d1526;
          display: block;
        }
        .gl-lb-meta {
          text-align: center;
        }
        .gl-lb-year {
          font-family: 'Fraunces', serif;
          font-size: 13px; font-style: italic;
          color: #c8a87a;
          letter-spacing: 0.5px;
        }
        .gl-lb-nav {
          display: flex;
          gap: 12px;
          padding-bottom: 24px;
        }
        .gl-lb-nav-btn {
          width: 48px; height: 48px;
          border-radius: 50%;
          background: rgba(200,168,122,0.08);
          border: 1.5px solid rgba(200,168,122,0.28);
          color: #c8a87a;
          font-size: 20px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          user-select: none;
        }
        .gl-lb-nav-btn:hover {
          background: rgba(200,168,122,0.2);
          transform: scale(1.08);
        }

        /* ── BACK BUTTON ── */
        .gl-back {
          position: fixed;
          bottom: 24px; left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 22px;
          border-radius: 100px;
          border: 1.5px solid rgba(238,230,219,0.22);
          background: rgba(33,47,82,0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: rgba(238,230,219,0.75);
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 12px; font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          box-shadow: 0 8px 28px rgba(0,0,0,0.3);
        }
        .gl-back:hover {
          border-color: rgba(200,168,122,0.5);
          color: #c8a87a;
          transform: translateX(-50%) translateY(-2px);
        }
        .gl-back-arrow { font-size: 14px; }

        @keyframes glFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="gl-root">
        <Navbar />

        {/* HERO */}
        <section className="gl-hero">
          <div className="gl-hero-glow" />
          <div className="gl-hero-label">
            <div className="gl-hero-line" />
            <span className="gl-hero-label-text">Improvity Generation</span>
            <div className="gl-hero-line r" />
          </div>
          <h1 className="gl-hero-title">
            <em>Galeri</em>
            <br />
            Kebersamaan
          </h1>
          <p className="gl-hero-sub">
            {PHOTOS.length} foto dari perjalanan Buka Bersama Akbar
          </p>

          {/* Year stats */}
          <div className="gl-stats">
            {yearCounts.map(({ year, count }) => (
              <div
                className="gl-stat-card"
                key={year}
                onClick={() => handleFilter(String(year))}
                style={{ cursor: "pointer" }}>
                <div className="gl-stat-year">{year}</div>
                <div className="gl-stat-count">{count} foto</div>
              </div>
            ))}
          </div>
        </section>

        {/* FILTER TABS */}
        <div className="gl-filter-wrap">
          <div className="gl-filter-scroll">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`gl-filter-btn${active === f ? " active" : ""}`}
                onClick={() => handleFilter(f)}>
                {f}
                {f !== "Semua" && (
                  <span style={{ marginLeft: 6, opacity: 0.65 }}>
                    ({PHOTOS.filter((p) => p.year === parseInt(f)).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* GRID */}
        <div className="gl-grid-wrap">
          <div className="gl-section-label">
            <div className="gl-section-line" />
            <span className="gl-section-text">
              {active === "Semua" ? "Semua Tahun" : `Angkatan ${active}`}{" "}
              &mdash; {filtered.length} Foto
            </span>
            <div className="gl-section-line" />
          </div>

          {filtered.length === 0 ? (
            <div className="gl-empty">
              <div className="gl-empty-icon">✦</div>
              Belum ada foto untuk tahun ini.
            </div>
          ) : (
            <div className="gl-grid">
              {filtered.map((photo, idx) => (
                <div
                  key={`${photo.id}-${animKey}`}
                  className={`gl-item${wideMap[idx] ? " gl-item-wide" : ""}${visible ? " gl-anim-in" : ""}`}
                  style={{ animationDelay: `${idx * 0.055}s` }}
                  onClick={() => openLightbox(idx)}>
                  <img
                    src={`/galeri/${photo.file}`}
                    alt={`Foto Buka Bersama ${photo.year} - ${idx + 1}`}
                    loading="lazy"
                  />
                  <div className="gl-item-overlay">
                    <div className="gl-item-year-badge">
                      <span className="gl-item-year-text">{photo.year}</span>
                    </div>
                  </div>
                  <div className="gl-item-expand">⤢</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* BACK BUTTON */}
        <button className="gl-back" onClick={() => navigate("/")}>
          <span className="gl-back-arrow">←</span>
          Kembali ke Beranda
        </button>

        {/* LIGHTBOX */}
        {lightbox !== null && (
          <div
            className="gl-lb-backdrop"
            onClick={(e) => e.target === e.currentTarget && closeLightbox()}>
            <div className="gl-lb-inner">
              <div className="gl-lb-top">
                <span className="gl-lb-counter">
                  {lightbox + 1} / {filtered.length}
                </span>
                <button className="gl-lb-close" onClick={closeLightbox}>
                  ×
                </button>
              </div>

              <div className="gl-lb-img-wrap">
                <img
                  className="gl-lb-img"
                  src={`/galeri/${filtered[lightbox].file}`}
                  alt={`Foto ${filtered[lightbox].year}`}
                  key={filtered[lightbox].id}
                />
              </div>

              <div className="gl-lb-meta">
                <span className="gl-lb-year">
                  Buka Bersama Akbar {filtered[lightbox].year}
                </span>
              </div>

              <div className="gl-lb-nav">
                <button className="gl-lb-nav-btn" onClick={prevPhoto}>
                  ←
                </button>
                <button className="gl-lb-nav-btn" onClick={nextPhoto}>
                  →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
