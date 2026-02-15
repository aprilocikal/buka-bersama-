import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        .nb-root {
          position: sticky;
          top: 0;
          z-index: 100;
          width: 100%;
          max-width: 430px;
          margin: 0 auto;
        }

        .nb-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          background: #212f52;
          border-bottom: 2px solid rgba(238, 230, 219, 0.15);
          box-shadow: 0 4px 20px rgba(33, 47, 82, 0.35);
        }

        /* ── Brand ── */
        .nb-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          flex: 1;
          min-width: 0;
        }

        /* Logo trio */
        .nb-logos {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-shrink: 0;
        }

        .nb-logo-side {
          width: 32px;
          height: 32px;
          object-fit: contain;
          border-radius: 6px;
          filter: brightness(1.05);
        }

        .nb-logo-center {
          width: 40px;
          height: 40px;
          object-fit: contain;
          border-radius: 6px;
          filter: brightness(1.05);
        }

        /* Divider line between logos and text */
        .nb-divider {
          width: 1px;
          height: 32px;
          background: rgba(238, 230, 219, 0.25);
          margin: 0 6px;
          flex-shrink: 0;
        }

        /* Brand text */
        .nb-brand-text {
          display: flex;
          flex-direction: column;
          gap: 1px;
          min-width: 0;
        }

        .nb-brand-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #c8a87a;
          white-space: nowrap;
        }

        .nb-brand-name {
          font-family: 'Playfair Display', serif;
          font-size: 15px;
          font-weight: 700;
          color: #eee6db;
          letter-spacing: -0.2px;
          line-height: 1.15;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* ── Home button ── */
        .nb-actions {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          margin-left: 8px;
        }

        .nb-home-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 7px 14px;
          border-radius: 100px;
          border: 1.5px solid rgba(238, 230, 219, 0.35);
          background: rgba(238, 230, 219, 0.1);
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: #eee6db;
          cursor: pointer;
          transition: all 0.18s ease;
          white-space: nowrap;
          letter-spacing: 0.2px;
        }
        .nb-home-btn:hover {
          background: rgba(238, 230, 219, 0.2);
          border-color: rgba(238, 230, 219, 0.6);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .nb-home-btn:active {
          transform: translateY(0);
        }

        .nb-home-icon {
          width: 13px;
          height: 13px;
          flex-shrink: 0;
        }

        /* Dot indicator when on home */
        .nb-dot-wrap {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 7px 12px;
          border-radius: 100px;
          background: rgba(200, 168, 122, 0.18);
          border: 1.5px solid rgba(200, 168, 122, 0.4);
        }

        .nb-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #c8a87a;
          animation: dotPulse 2s ease-in-out infinite;
        }

        .nb-dot-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: #c8a87a;
          letter-spacing: 0.5px;
        }

        @keyframes dotPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>

      <nav className="nb-root">
        <div className="nb-bar">

          {/* Brand */}
          <div className="nb-brand" onClick={() => navigate("/")}>

            {/* 3 logos */}
            <div className="nb-logos">
              <img src="/logokiri.png"  alt="" className="nb-logo-side" />
              <img src="/logo5.png"     alt="Logo Utama" className="nb-logo-center" />
              <img src="/logokanan.jpeg" alt="" className="nb-logo-side" />
            </div>

            {/* Divider */}
            <div className="nb-divider" />

            {/* Text */}
            <div className="nb-brand-text">
              <span className="nb-brand-sub">Buka Bersama</span>
              <span className="nb-brand-name">Akbar 2026</span>
            </div>

          </div>

          {/* Actions */}
          <div className="nb-actions">
            {isHome ? (
              <div className="nb-dot-wrap">
                <div className="nb-dot" />
                <span className="nb-dot-label">Home</span>
              </div>
            ) : (
              <button className="nb-home-btn" onClick={() => navigate("/")}>
                <svg
                  className="nb-home-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
                  <path d="M9 21V12h6v9" />
                </svg>
                Home
              </button>
            )}
          </div>

        </div>
      </nav>
    </>
  );
}