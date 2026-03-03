import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  X,
  Newspaper,
} from "lucide-react";
import Navbar from "../components/Navbar";

const NEWS_ITEMS = [
  {
    id: 1,
    category: "Merchandise",
    title: "Gantungan Kunci Eksklusif Bukber Akbar 2026",
    description: "Merchandise resmi berdesain Ramadhan untuk semua peserta.",
    image: "/berita/gantungan-kunci.jpg",
  },
  {
    id: 2,
    category: "Info Acara",
    title: "Detail Acara Buka Bersama Akbar 2026",
    description:
      "Sabtu, 14 Maret 2026 · CIFOS Ciawi · 16.00 s/d selesai · Dresscode Navy x Cream · HTM Rp 60.000/orang",
    image: "/galeri/251.jpeg",
  },
  {
    id: 3,
    category: "Kebersamaan",
    title: "Momen Silaturahmi Alumni PPM Al-Muchtari",
    description: "Ajang berkumpul dan mempererat silaturahmi antar angkatan.",
    image: "/galeri/252.jpeg",
  },
];

export default function Berita() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const w = scrollRef.current.offsetWidth * 0.82;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -w : w,
      behavior: "smooth",
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,700;1,9..144,900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .br-root {
          height: 100vh;
          height: 100dvh;
          overflow: hidden;
          background: #212f52;
          font-family: 'Plus Jakarta Sans', sans-serif;
          max-width: 430px;
          margin: 0 auto;
          overflow-x: hidden;
        }

        /* ── Back ── */
        .br-back {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 76px 24px 16px;
          background: transparent;
          border: none;
          color: rgba(200,168,122,0.7);
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.2s;
          letter-spacing: 0.2px;
        }
        .br-back:hover { color: #c8a87a; }

        /* ── Hero ── */
        .br-header {
          padding: 72px 28px 20px;
          position: relative;
        }
        .br-header-glow {
          position: absolute;
          top: -40px; left: 50%;
          transform: translateX(-50%);
          width: 260px; height: 200px;
          background: radial-gradient(ellipse, rgba(200,168,122,0.1) 0%, transparent 70%);
          pointer-events: none;
        }
        .br-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }
        .br-eline { flex: 1; height: 1px; background: rgba(200,168,122,0.22); }
        .br-etext {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 3.5px;
          text-transform: uppercase;
          color: rgba(200,168,122,0.6);
          white-space: nowrap;
        }
        .br-title {
          font-family: 'Fraunces', serif;
          font-size: 38px;
          font-weight: 900;
          color: #eee6db;
          line-height: 1.0;
          letter-spacing: -1px;
          margin-bottom: 8px;
        }
        .br-title em { font-style: italic; color: #c8a87a; }
        .br-desc {
          font-size: 13px;
          color: rgba(238,230,219,0.55);
          line-height: 1.8;
          margin-bottom: 0;
        }

        /* ── Carousel Section ── */
        .br-carousel-section {
          padding: 0 0 16px;
        }
        .br-carousel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 28px;
          margin-bottom: 14px;
        }
        .br-carousel-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(200,168,122,0.55);
        }
        .br-carousel-navs {
          display: flex;
          gap: 8px;
        }
        .br-carousel-nav {
          width: 34px; height: 34px;
          border-radius: 50%;
          background: rgba(200,168,122,0.08);
          border: 1.5px solid rgba(200,168,122,0.25);
          color: #c8a87a;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .br-carousel-nav:hover {
          background: rgba(200,168,122,0.18);
          border-color: rgba(200,168,122,0.5);
        }

        /* ── Scroll Container ── */
        .br-scroll {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          padding: 0 28px 8px;
        }
        .br-scroll::-webkit-scrollbar { display: none; }

        /* ── Card ── */
        .br-card {
          flex: 0 0 68%;
          scroll-snap-align: start;
          background: rgba(200,168,122,0.06);
          border: 1px solid rgba(200,168,122,0.18);
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .br-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.3);
        }
        .br-card-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 5/4;
          overflow: hidden;
          cursor: pointer;
          background: rgba(0,0,0,0.2);
        }
        .br-card-img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.35s ease;
        }
        .br-card-img-wrap:hover .br-card-img { transform: scale(1.06); }
        .br-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(33,47,82,0.7) 0%, transparent 50%);
          pointer-events: none;
        }
        .br-card-zoom {
          position: absolute;
          top: 12px; right: 12px;
          width: 32px; height: 32px;
          border-radius: 50%;
          background: rgba(33,47,82,0.7);
          border: 1px solid rgba(200,168,122,0.4);
          display: flex; align-items: center; justify-content: center;
          color: #c8a87a;
          font-size: 16px;
          opacity: 0;
          transition: opacity 0.2s;
          pointer-events: none;
        }
        .br-card-img-wrap:hover .br-card-zoom { opacity: 1; }
        .br-card-cat {
          position: absolute;
          bottom: 14px; left: 14px;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(200,168,122,0.9);
          border-radius: 100px;
          padding: 4px 12px;
          pointer-events: none;
        }
        .br-card-cat-text {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #212f52;
        }

        .br-card-body {
          padding: 12px 14px 14px;
        }
        .br-card-title {
          font-family: 'Fraunces', serif;
          font-size: 14px;
          font-weight: 700;
          color: #eee6db;
          line-height: 1.3;
          margin-bottom: 5px;
          letter-spacing: -0.2px;
        }
        .br-card-desc {
          font-size: 11px;
          color: rgba(238,230,219,0.55);
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-bottom: 8px;
        }
        .br-card-more {
          font-size: 11px;
          font-weight: 700;
          color: #c8a87a;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          letter-spacing: 0.5px;
          transition: opacity 0.2s;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .br-card-more:hover { opacity: 0.7; }

        /* ── Dots indicator ── */
        .br-dots {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-top: 20px;
          padding: 0 28px;
        }

        /* ── Bottom nav ── */
        .br-bottom-back {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin: 8px 28px 28px;
          padding: 14px;
          border-radius: 100px;
          border: 1.5px solid rgba(238,230,219,0.2);
          background: rgba(238,230,219,0.05);
          color: rgba(238,230,219,0.6);
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .br-bottom-back:hover {
          border-color: rgba(200,168,122,0.5);
          color: #c8a87a;
          transform: translateY(-1px);
        }

        /* ── Modal ── */
        .br-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(10,16,30,0.96);
          z-index: 999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          animation: brModalIn 0.22s ease both;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        @keyframes brModalIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .br-modal-inner {
          position: relative;
          width: 100%;
          max-width: 430px;
          padding: 0 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .br-modal-top {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 4px 0;
        }
        .br-modal-title-text {
          font-family: 'Fraunces', serif;
          font-size: 14px;
          font-weight: 700;
          color: #c8a87a;
          font-style: italic;
          letter-spacing: -0.2px;
        }
        .br-modal-close {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: rgba(200,168,122,0.1);
          border: 1px solid rgba(200,168,122,0.3);
          color: #c8a87a;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
        }
        .br-modal-close:hover { background: rgba(200,168,122,0.22); }
        .br-modal-img-wrap {
          width: 100%;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 24px 60px rgba(0,0,0,0.6);
          border: 1px solid rgba(200,168,122,0.18);
        }
        .br-modal-img {
          width: 100%;
          max-height: 65dvh;
          object-fit: contain;
          background: #0d1526;
          display: block;
        }
        .br-modal-caption {
          text-align: center;
          max-width: 340px;
        }
        .br-modal-caption-title {
          font-family: 'Fraunces', serif;
          font-size: 14px;
          font-weight: 700;
          color: #eee6db;
          margin-bottom: 4px;
        }
        .br-modal-caption-desc {
          font-size: 11px;
          color: rgba(238,230,219,0.5);
          line-height: 1.6;
          padding-bottom: 16px;
        }
      `}</style>

      <div className="br-root">
        <Navbar />

        {/* Header */}
        <div className="br-header">
          <div className="br-header-glow" />

          <div className="br-eyebrow">
            <div className="br-eline" />
            <span className="br-etext">Kabar Terbaru</span>
            <div className="br-eline" />
          </div>

          <h1 className="br-title">
            <em>Berita</em> &<br />
            Informasi
          </h1>

          <p className="br-desc">
            Update terbaru seputar Buka Bersama Akbar 2026.
          </p>
        </div>

        {/* Carousel */}
        <div className="br-carousel-section">
          <div className="br-carousel-header">
            <span className="br-carousel-label">
              {NEWS_ITEMS.length} Berita
            </span>
            <div className="br-carousel-navs">
              <button
                className="br-carousel-nav"
                onClick={() => scroll("left")}>
                <ChevronLeft size={16} />
              </button>
              <button
                className="br-carousel-nav"
                onClick={() => scroll("right")}>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="br-scroll" ref={scrollRef}>
            {NEWS_ITEMS.map((item) => (
              <div className="br-card" key={item.id}>
                <div
                  className="br-card-img-wrap"
                  onClick={() => setModal(item)}>
                  <img
                    className="br-card-img"
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                  />
                  <div className="br-card-overlay" />
                  <div className="br-card-zoom">⤢</div>
                  <div className="br-card-cat">
                    <span className="br-card-cat-text">{item.category}</span>
                  </div>
                </div>
                <div className="br-card-body">
                  <h3 className="br-card-title">{item.title}</h3>
                  <p className="br-card-desc">{item.description}</p>
                  <button
                    className="br-card-more"
                    onClick={() => setModal(item)}>
                    Selengkapnya →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Back */}
        <button className="br-bottom-back" onClick={() => navigate("/")}>
          <span style={{ fontSize: 14 }}>←</span>
          Kembali ke Beranda
        </button>
      </div>

      {/* Modal */}
      {modal && (
        <div
          className="br-modal-backdrop"
          onClick={(e) => e.target === e.currentTarget && setModal(null)}>
          <div className="br-modal-inner">
            <div className="br-modal-top">
              <span className="br-modal-title-text">{modal.category}</span>
              <button className="br-modal-close" onClick={() => setModal(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="br-modal-img-wrap">
              <img
                className="br-modal-img"
                src={modal.image}
                alt={modal.title}
              />
            </div>
            <div className="br-modal-caption">
              <h3 className="br-modal-caption-title">{modal.title}</h3>
              <p className="br-modal-caption-desc">{modal.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
