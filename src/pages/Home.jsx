import logo from "/logokanan.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import RegisterModal from "../components/RegisterModal";
import Navbar from "../components/Navbar";

export default function Home() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,700;1,9..144,900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .hm-root {
          min-height: 100vh;
          background: #212f52;
          font-family: 'Plus Jakarta Sans', sans-serif;
          max-width: 430px;
          margin: 0 auto;
          overflow-x: hidden;
        }

        /* ══════════════════════════════
           HERO
        ══════════════════════════════ */
        .hm-hero {
          position: relative;
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 28px 60px;
          overflow: hidden;
          text-align: center;
        }

        .hm-hero::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -52%);
          width: 360px;
          height: 360px;
          background: radial-gradient(circle, rgba(200,168,122,0.16) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .hm-corner {
          position: absolute;
          width: 48px;
          height: 48px;
          z-index: 0;
          opacity: 0.35;
        }
        .hm-corner-tl { top: 80px; left: 24px; border-top: 1.5px solid #c8a87a; border-left: 1.5px solid #c8a87a; }
        .hm-corner-tr { top: 80px; right: 24px; border-top: 1.5px solid #c8a87a; border-right: 1.5px solid #c8a87a; }
        .hm-corner-bl { bottom: 60px; left: 24px; border-bottom: 1.5px solid #c8a87a; border-left: 1.5px solid #c8a87a; }
        .hm-corner-br { bottom: 60px; right: 24px; border-bottom: 1.5px solid #c8a87a; border-right: 1.5px solid #c8a87a; }

        .hm-star {
          position: absolute;
          color: #c8a87a;
          animation: twinkle 3s ease-in-out infinite;
          opacity: 0.5;
          z-index: 0;
          user-select: none;
          pointer-events: none;
        }
        .hm-star-1 { top: 125px; left: 42px; font-size: 13px; animation-delay: 0s; }
        .hm-star-2 { top: 160px; right: 38px; font-size: 9px; animation-delay: 0.6s; }
        .hm-star-3 { bottom: 145px; left: 52px; font-size: 9px; animation-delay: 1.2s; }
        .hm-star-4 { bottom: 105px; right: 46px; font-size: 13px; animation-delay: 1.8s; }
        .hm-star-5 { top: 48%; left: 16px; font-size: 7px; animation-delay: 0.9s; }
        .hm-star-6 { top: 44%; right: 14px; font-size: 7px; animation-delay: 1.5s; }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.25); }
        }

        .hm-dots-bg { position: absolute; inset: 0; pointer-events: none; overflow: hidden; z-index: 0; }
        .hm-dot-p {
          position: absolute;
          width: 4px; height: 4px;
          border-radius: 50%;
          background: #c8a87a;
          opacity: 0.18;
          animation: floatDot 8s ease-in-out infinite;
        }
        .hm-dot-p:nth-child(1) { left: 12%; top: 18%; animation-delay: 0s; }
        .hm-dot-p:nth-child(2) { left: 82%; top: 28%; animation-delay: 1.2s; }
        .hm-dot-p:nth-child(3) { left: 28%; top: 76%; animation-delay: 2.2s; }
        .hm-dot-p:nth-child(4) { left: 72%; top: 68%; animation-delay: 3s; }
        .hm-dot-p:nth-child(5) { left: 50%; top: 8%; animation-delay: 1.5s; width: 6px; height: 6px; }
        @keyframes floatDot {
          0%, 100% { transform: translateY(0); opacity: 0.15; }
          50% { transform: translateY(-14px); opacity: 0.4; }
        }

        .hm-logo-wrap {
          position: relative;
          z-index: 1;
          margin-bottom: 28px;
          animation: logoIn 0.9s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        .hm-logo-ring {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 1.5px solid rgba(200,168,122,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(33,47,82,0.8);
          box-shadow:
            0 0 0 8px rgba(200,168,122,0.07),
            0 0 48px rgba(200,168,122,0.18),
            0 12px 40px rgba(0,0,0,0.5);
        }
        .hm-logo-img {
          width: 92px;
          height: 92px;
          object-fit: contain;
          border-radius: 50%;
        }
        @keyframes logoIn {
          from { opacity: 0; transform: scale(0.65); }
          to { opacity: 1; transform: scale(1); }
        }

        .hm-gen-label {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
          width: 100%;
          animation: fadeUp 0.6s 0.2s ease both;
        }
        .hm-gen-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(200,168,122,0.5));
        }
        .hm-gen-line.r { background: linear-gradient(to left, transparent, rgba(200,168,122,0.5)); }
        .hm-gen-text {
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #c8a87a;
          white-space: nowrap;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .hm-title {
          position: relative;
          z-index: 1;
          font-family: 'Fraunces', serif;
          font-optical-sizing: auto;
          font-size: 46px;
          font-weight: 900;
          color: #eee6db;
          line-height: 1.0;
          letter-spacing: -1.5px;
          margin-bottom: 20px;
          animation: fadeUp 0.6s 0.35s ease both;
        }
        .hm-title em {
          font-style: italic;
          color: #c8a87a;
        }

        .hm-tagline {
          position: relative;
          z-index: 1;
          font-size: 14px;
          font-weight: 400;
          color: rgba(238,230,219,0.6);
          line-height: 1.7;
          max-width: 280px;
          margin: 0 auto 36px;
          animation: fadeUp 0.6s 0.5s ease both;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .hm-tagline strong {
          display: block;
          color: #eee6db;
          font-weight: 700;
          font-family: 'Fraunces', serif;
          font-optical-sizing: auto;
          font-style: italic;
          font-size: 20px;
          letter-spacing: -0.5px;
          margin-bottom: 6px;
        }

        .hm-ctas {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
          max-width: 300px;
          animation: fadeUp 0.6s 0.65s ease both;
        }

        .hm-btn-primary {
          width: 100%;
          padding: 16px;
          border-radius: 100px;
          border: none;
          background: #c8a87a;
          color: #212f52;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.3px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 6px 24px rgba(200,168,122,0.35);
          position: relative;
          overflow: hidden;
        }
        .hm-btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.18), transparent);
          pointer-events: none;
        }
        .hm-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(200,168,122,0.48);
        }
        .hm-btn-primary:active { transform: translateY(0); }

        .hm-btn-secondary {
          width: 100%;
          padding: 15px;
          border-radius: 100px;
          border: 1.5px solid rgba(238,230,219,0.28);
          background: transparent;
          color: #eee6db;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          letter-spacing: 0.2px;
        }
        .hm-btn-secondary:hover {
          border-color: rgba(200,168,122,0.6);
          color: #c8a87a;
          transform: translateY(-1px);
        }

        .hm-btn-gallery {
          width: 100%;
          padding: 14px;
          border-radius: 100px;
          border: 1.5px solid rgba(200,168,122,0.4);
          background: rgba(200,168,122,0.07);
          color: #c8a87a;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          letter-spacing: 0.3px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .hm-btn-gallery:hover {
          background: rgba(200,168,122,0.14);
          border-color: rgba(200,168,122,0.7);
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(200,168,122,0.2);
        }
        .hm-btn-gallery-icon {
          font-size: 15px;
          line-height: 1;
        }

        .hm-btn-divider {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
        }
        .hm-btn-divider-line {
          flex: 1;
          height: 1px;
          background: rgba(200,168,122,0.18);
        }
        .hm-btn-divider-text {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(200,168,122,0.35);
          white-space: nowrap;
        }

        .hm-scroll {
          position: relative;
          z-index: 1;
          margin-top: 44px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          animation: fadeUp 0.6s 0.85s ease both;
        }
        .hm-scroll-line {
          width: 1px;
          height: 28px;
          background: linear-gradient(to bottom, rgba(200,168,122,0.6), transparent);
        }
        .hm-scroll-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #c8a87a;
          animation: bounce 1.6s ease-in-out infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(7px); opacity: 0.35; }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ══════════════════════════════
           TENTANG KAMI
        ══════════════════════════════ */
        .hm-about {
          background: #eee6db;
          padding: 60px 28px 52px;
          position: relative;
          overflow: hidden;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .hm-about::before {
          content: '';
          position: absolute;
          top: -1px; left: 0; right: 0;
          height: 44px;
          background: #212f52;
          clip-path: ellipse(55% 100% at 50% 0%);
        }

        .hm-about-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          margin-top: 14px;
        }
        .hm-about-eline { flex: 1; height: 1px; background: rgba(33,47,82,0.18); }
        .hm-about-etext {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 3.5px;
          text-transform: uppercase;
          color: #8b6e4e;
          white-space: nowrap;
        }

        .hm-about-title {
          font-family: 'Fraunces', serif;
          font-optical-sizing: auto;
          font-size: 32px;
          font-weight: 900;
          color: #212f52;
          line-height: 1.05;
          margin-bottom: 10px;
          letter-spacing: -0.5px;
        }
        .hm-about-accent {
          width: 44px;
          height: 3px;
          background: #c8a87a;
          border-radius: 100px;
          margin-bottom: 24px;
        }

        .hm-about-p {
          font-size: 14px;
          line-height: 1.9;
          color: #3d2e1e;
          margin-bottom: 20px;
          font-weight: 400;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .hm-about-card {
          background: #212f52;
          border-radius: 20px;
          padding: 22px 22px 18px;
          position: relative;
          overflow: hidden;
          margin: 4px 0 24px;
          border: 1px solid rgba(200,168,122,0.18);
          box-shadow: 0 8px 28px rgba(33,47,82,0.18);
        }
        .hm-about-card-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(200,168,122,0.14);
          border: 1px solid rgba(200,168,122,0.28);
          border-radius: 100px;
          padding: 5px 12px;
          margin-bottom: 14px;
        }
        .hm-about-card-badge-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #c8a87a;
          flex-shrink: 0;
        }
        .hm-about-card-badge-text {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #c8a87a;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .hm-about-card-text {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: rgba(238,230,219,0.9);
          line-height: 1.9;
          position: relative;
          z-index: 1;
          letter-spacing: 0.1px;
        }
        .hm-about-card-author {
          margin-top: 16px;
          padding-top: 14px;
          border-top: 1px solid rgba(200,168,122,0.22);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #c8a87a;
          position: relative;
          z-index: 1;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .hm-about-closing {
          margin-top: 4px;
          text-align: center;
        }

        .hm-about-closing-text {
          font-family: 'Fraunces', serif;
          font-optical-sizing: auto;
          font-size: 15px;
          font-style: italic;
          color: #5a4535;
          line-height: 1.8;
          font-weight: 400;
          text-align: center;
        }

        /* ══════════════════════════════
           LOKASI / MAPS SECTION
        ══════════════════════════════ */
        .hm-location {
          background: #212f52;
          padding: 56px 28px 52px;
          position: relative;
          overflow: hidden;
        }
        .hm-location::before {
          content: '';
          position: absolute;
          top: -1px; left: 0; right: 0;
          height: 44px;
          background: #eee6db;
          clip-path: ellipse(55% 100% at 50% 0%);
        }
        .hm-location-glow {
          position: absolute;
          bottom: 0; left: 50%;
          transform: translateX(-50%);
          width: 280px; height: 180px;
          background: radial-gradient(ellipse, rgba(200,168,122,0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .hm-location-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          margin-top: 18px;
          position: relative;
          z-index: 1;
        }
        .hm-location-eline {
          flex: 1; height: 1px;
          background: rgba(200,168,122,0.25);
        }
        .hm-location-etext {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 3.5px;
          text-transform: uppercase;
          color: rgba(200,168,122,0.65);
          white-space: nowrap;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .hm-location-title {
          font-family: 'Fraunces', serif;
          font-optical-sizing: auto;
          font-size: 30px;
          font-weight: 900;
          color: #eee6db;
          line-height: 1.1;
          margin-bottom: 8px;
          letter-spacing: -0.5px;
          position: relative;
          z-index: 1;
        }
        .hm-location-title em {
          font-style: italic;
          color: #c8a87a;
        }
        .hm-location-accent {
          width: 44px;
          height: 3px;
          background: #c8a87a;
          border-radius: 100px;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        /* Info card above map */
        .hm-location-info {
          background: rgba(200,168,122,0.07);
          border: 1px solid rgba(200,168,122,0.22);
          border-radius: 16px;
          padding: 16px 18px;
          margin-bottom: 16px;
          display: flex;
          align-items: flex-start;
          gap: 14px;
          position: relative;
          z-index: 1;
        }
        .hm-location-pin {
          width: 38px; height: 38px;
          border-radius: 50%;
          background: rgba(200,168,122,0.14);
          border: 1px solid rgba(200,168,122,0.35);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          font-size: 17px;
        }
        .hm-location-detail {}
        .hm-location-name {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #eee6db;
          margin-bottom: 3px;
          line-height: 1.3;
        }
        .hm-location-addr {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px;
          font-weight: 400;
          color: rgba(238,230,219,0.5);
          line-height: 1.6;
        }
        .hm-location-plus {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(200,168,122,0.12);
          border: 1px solid rgba(200,168,122,0.25);
          border-radius: 100px;
          padding: 3px 9px;
          margin-top: 6px;
        }
        .hm-location-plus-text {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #c8a87a;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        /* Map embed */
        .hm-map-wrap {
          position: relative;
          z-index: 1;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(200,168,122,0.22);
          box-shadow: 0 12px 40px rgba(0,0,0,0.35);
          height: 240px;
        }
        .hm-map-wrap iframe {
          width: 100%;
          height: 100%;
          border: none;
          display: block;
          filter: brightness(0.9) saturate(0.9);
        }

        /* Open in Maps button */
        .hm-open-maps {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 14px;
          margin-top: 14px;
          border-radius: 100px;
          border: 1.5px solid rgba(200,168,122,0.38);
          background: rgba(200,168,122,0.08);
          color: #c8a87a;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s ease;
          letter-spacing: 0.3px;
          position: relative;
          z-index: 1;
        }
        .hm-open-maps:hover {
          background: rgba(200,168,122,0.16);
          border-color: rgba(200,168,122,0.65);
          transform: translateY(-1px);
          box-shadow: 0 4px 18px rgba(200,168,122,0.2);
        }

        /* ══════════════════════════════
           BOTTOM CTA
        ══════════════════════════════ */
        .hm-bottom {
          background: #212f52;
          padding: 44px 28px 56px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgba(200,168,122,0.12);
        }
        .hm-bottom-title {
          font-family: 'Fraunces', serif;
          font-optical-sizing: auto;
          font-size: 24px;
          font-weight: 700;
          color: #eee6db;
          text-align: center;
          position: relative;
          z-index: 1;
          margin-top: 8px;
          margin-bottom: 2px;
          letter-spacing: -0.3px;
        }
        .hm-bottom-sub {
          font-size: 11px;
          color: rgba(238,230,219,0.45);
          text-align: center;
          position: relative;
          z-index: 1;
          margin-bottom: 6px;
          letter-spacing: 0.5px;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .hm-bottom .hm-btn-primary,
        .hm-bottom .hm-btn-secondary {
          position: relative;
          z-index: 1;
          max-width: 300px;
          width: 100%;
        }
      `}</style>

      <div className="hm-root">
        <Navbar />

        {/* ── HERO ── */}
        <section className="hm-hero">
          <div className="hm-dots-bg">
            <div className="hm-dot-p" />
            <div className="hm-dot-p" />
            <div className="hm-dot-p" />
            <div className="hm-dot-p" />
            <div className="hm-dot-p" />
          </div>
          <div className="hm-corner hm-corner-tl" />
          <div className="hm-corner hm-corner-tr" />
          <div className="hm-corner hm-corner-bl" />
          <div className="hm-corner hm-corner-br" />
          <span className="hm-star hm-star-1">✦</span>
          <span className="hm-star hm-star-2">✦</span>
          <span className="hm-star hm-star-3">✦</span>
          <span className="hm-star hm-star-4">✦</span>
          <span className="hm-star hm-star-5">·</span>
          <span className="hm-star hm-star-6">·</span>

          <div className="hm-logo-wrap">
            <div className="hm-logo-ring">
              <img
                src={logo}
                alt="Logo Improvity Generation"
                className="hm-logo-img"
              />
            </div>
          </div>

          <div className="hm-gen-label">
            <div className="hm-gen-line" />
            <span className="hm-gen-text">
              Pondok Pesantren Modern Al-Muchtari
            </span>
            <div className="hm-gen-line r" />
          </div>

          <h1 className="hm-title">
            <em>Buka Bersama</em>
            <br />
            Akbar 2026
          </h1>

          <div className="hm-tagline">
            <strong>
              "Keep the iman,
              <br />
              enjoy the iftar"
            </strong>
            Kepanitiaan Angkatan 5
          </div>

          <div className="hm-ctas">
            <button
              className="hm-btn-primary"
              onClick={() => setOpenModal(true)}
            >
              ✦ &nbsp;Registration
            </button>
            <button
              className="hm-btn-secondary"
              onClick={() => navigate("/peserta")}
            >
              View Participants
            </button>

            {/* ── Divider ── */}
            <div className="hm-btn-divider">
              <div className="hm-btn-divider-line" />
              <span className="hm-btn-divider-text">Kenangan</span>
              <div className="hm-btn-divider-line" />
            </div>

            {/* ── Gallery Button ── */}
            <button
              className="hm-btn-gallery"
              onClick={() => navigate("/galeri")}
            >
              <span className="hm-btn-gallery-icon"></span>
              Lihat Galeri Foto
            </button>
          </div>

          <div className="hm-scroll">
            <div className="hm-scroll-line" />
            <div className="hm-scroll-dot" />
          </div>
        </section>

        {/* ── TENTANG ── */}
        <section className="hm-about">
          <div className="hm-about-eyebrow">
            <div className="hm-about-eline" />
            <span className="hm-about-etext">Tentang Acara</span>
            <div className="hm-about-eline" />
          </div>

          <h2 className="hm-about-title">
            Tujuan Buka
            <br />
            Bersama
          </h2>
          <div className="hm-about-accent" />

          <p className="hm-about-p">
            Kegiatan Buka Bersama ini diselenggarakan sebagai sarana untuk
            mempererat tali silaturahmi serta memperkuat rasa kebersamaan di
            antara seluruh alumni maupun alumnus. Momentum bulan suci Ramadhan menjadi waktu
            yang penuh makna untuk saling berkumpul, menjalin kembali kedekatan,
            serta memperkuat hubungan yang telah terbangun. Melalui kebersamaan
            ini, diharapkan tercipta suasana yang hangat dan penuh keberkahan,
            sehingga nilai persaudaraan dan kekeluargaan dapat terus terjaga.
          </p>

          <div className="hm-about-card">
            <div className="hm-about-card-badge">
              <div className="hm-about-card-badge-dot" />
              <span className="hm-about-card-badge-text">
                Panitia Pelaksana
              </span>
            </div>
            <p className="hm-about-card-text">
              Pada kesempatan ini, Angkatan ke-5 Pondok Pesantren Modern
              Al-Muchtari diberikan kepercayaan untuk menjadi panitia pelaksana
              kegiatan Buka Bersama. Kesempatan ini menjadi pengalaman yang
              berharga bagi kami untuk belajar bekerja sama, saling membantu,
              dan bertanggung jawab dalam menyelenggarakan sebuah kegiatan
              kebersamaan. Kami berharap melalui usaha dan kebersamaan ini,
              acara Buka Bersama dapat menjadi momen yang menyenangkan,
              bermakna, serta meninggalkan kesan baik bagi semua yang hadir.
            </p>
            <p className="hm-about-card-author">— Improvity Generation</p>
          </div>

          <div className="hm-about-closing">
            <p className="hm-about-closing-text">
              "Jangan biarkan kesibukan menghalangi kita untuk menjaga
              silaturahmi, Ramadhan adalah waktu terbaik untuk saling menyapa
              dan berbagi keberkahan."
            </p>
          </div>
        </section>

        {/* ── LOKASI ── */}
        <section className="hm-location">
          <div className="hm-location-glow" />

          <div className="hm-location-eyebrow">
            <div className="hm-location-eline" />
            <span className="hm-location-etext">Lokasi Acara</span>
            <div className="hm-location-eline" />
          </div>

          <h2 className="hm-location-title">
            Temukan
            <br />
            <em>Kami di Sini</em>
          </h2>
          <div className="hm-location-accent" />

          {/* Info Card */}
          <div className="hm-location-info">
            <div className="hm-location-pin">📍</div>
            <div className="hm-location-detail">
              <div className="hm-location-name">
                Pondok Pesantren Modern Al-Muchtari
              </div>
              <div className="hm-location-addr">
                Jl. Cilotoh, Lemah Duhur, Kec. Caringin,<br />
                Kabupaten Bogor, Jawa Barat 16730
              </div>
              <div className="hm-location-plus">
                <span className="hm-location-plus-text">Plus Code: 7RRQ+V3F</span>
              </div>
            </div>
          </div>

          {/* Map Embed */}
          <div className="hm-map-wrap">
            <iframe
              title="Lokasi Buka Bersama Akbar"
              src="https://www.google.com/maps?q=7RRQ%2BV3F+Caringin+Bogor+Jawa+Barat&output=embed"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Open in Google Maps */}
          <a
            className="hm-open-maps"
            href="https://maps.google.com/?q=7RRQ+V3F+Caringin+Bogor"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span></span>
            Buka di Google Maps
          </a>
        </section>

        {/* ── BOTTOM CTA ── */}
        <div className="hm-bottom">
          <h3 className="hm-bottom-title">Selamat menunaikan ibadah puasa 1447 Hijriah</h3>
          <p className="hm-bottom-sub">
            Buka Bersama Akbar 2026 · Improvity Generation
          </p>
        </div>

        {openModal && <RegisterModal close={() => setOpenModal(false)} />}
      </div>
    </>
  );
}