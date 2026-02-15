// PesertaDetailModal.jsx
// Usage: import PesertaDetailModal from "./PesertaDetailModal";
// <PesertaDetailModal peserta={selectedPeserta} onClose={() => setSelectedPeserta(null)} />

const IconCheck = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconX = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconClose = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconArrowLeft = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

export default function PesertaDetailModal({ peserta, onClose }) {
  if (!peserta) return null;

  const isHadir = peserta.status === "Hadir";

  const initials = peserta.nama
    ? peserta.nama
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase())
        .join("")
    : "?";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

        .pdm-backdrop {
          position: fixed;
          inset: 0;
          z-index: 999;
          background: rgba(15, 20, 40, 0.75);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          animation: pdmBackdropIn 0.25s ease both;
        }
        @keyframes pdmBackdropIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .pdm-sheet {
          width: 100%;
          max-width: 430px;
          background: #1a2644;
          border-top: 1px solid rgba(200, 168, 122, 0.2);
          border-radius: 28px 28px 0 0;
          padding: 0 0 44px;
          position: relative;
          overflow: hidden;
          animation: pdmSheetUp 0.35s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes pdmSheetUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }

        .pdm-sheet::before {
          content: '';
          position: absolute;
          top: -40px;
          right: -40px;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(200,168,122,0.1) 0%, transparent 70%);
          pointer-events: none;
        }
        .pdm-sheet::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: -60px;
          width: 180px;
          height: 180px;
          background: radial-gradient(circle, rgba(200,168,122,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        .pdm-handle {
          width: 36px;
          height: 4px;
          border-radius: 100px;
          background: rgba(200,168,122,0.3);
          margin: 14px auto 0;
        }

        .pdm-close {
          position: absolute;
          top: 18px;
          right: 20px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(200,168,122,0.25);
          background: rgba(255,255,255,0.06);
          color: rgba(238,230,219,0.6);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.18s ease;
          z-index: 2;
        }
        .pdm-close:hover {
          background: rgba(200,168,122,0.15);
          color: #c8a87a;
          border-color: rgba(200,168,122,0.5);
          transform: rotate(90deg);
        }

        .pdm-hero {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 28px 24px 0;
          animation: pdmFadeUp 0.45s 0.1s ease both;
        }

        .pdm-avatar-ring {
          width: 84px;
          height: 84px;
          border-radius: 50%;
          padding: 3px;
          background: linear-gradient(135deg, #c8a87a 0%, rgba(200,168,122,0.2) 100%);
          margin-bottom: 16px;
          position: relative;
        }
        .pdm-avatar-ring::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 1px dashed rgba(200,168,122,0.2);
          animation: pdmRingSpin 12s linear infinite;
        }
        @keyframes pdmRingSpin {
          to { transform: rotate(360deg); }
        }
        .pdm-avatar {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: #212f52;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Fraunces', serif;
          font-weight: 900;
          font-size: 26px;
          color: #c8a87a;
          letter-spacing: -0.5px;
        }

        .pdm-name {
          font-family: 'Fraunces', serif;
          font-weight: 900;
          font-size: 28px;
          color: #eee6db;
          letter-spacing: -0.8px;
          text-transform: capitalize;
          text-align: center;
          margin-bottom: 6px;
        }

        .pdm-gen-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 14px;
          border-radius: 100px;
          background: rgba(200,168,122,0.1);
          border: 1px solid rgba(200,168,122,0.2);
          font-size: 11px;
          font-weight: 600;
          color: rgba(200,168,122,0.85);
          letter-spacing: 0.3px;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .pdm-gen-tag::before {
          content: '✦';
          font-size: 7px;
        }

        .pdm-divider {
          margin: 24px 24px 0;
          position: relative;
          z-index: 1;
          animation: pdmFadeUp 0.45s 0.18s ease both;
        }
        .pdm-divider-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(200,168,122,0.2), transparent);
        }

        .pdm-info-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          padding: 20px 24px 0;
          animation: pdmFadeUp 0.45s 0.22s ease both;
        }

        .pdm-info-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(200,168,122,0.12);
          border-radius: 16px;
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .pdm-info-card.full { grid-column: 1 / -1; }

        .pdm-info-label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(200,168,122,0.55);
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .pdm-info-value {
          font-size: 15px;
          font-weight: 600;
          color: #eee6db;
          font-family: 'Plus Jakarta Sans', sans-serif;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .pdm-info-value.mono {
          font-family: 'Fraunces', serif;
          font-size: 20px;
          font-weight: 900;
          color: #c8a87a;
        }

        .pdm-status-card {
          position: relative;
          z-index: 1;
          margin: 10px 24px 0;
          border-radius: 16px;
          padding: 16px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          animation: pdmFadeUp 0.45s 0.28s ease both;
          overflow: hidden;
        }
        .pdm-status-card.hadir {
          background: rgba(45,138,78,0.12);
          border: 1px solid rgba(45,138,78,0.25);
        }
        .pdm-status-card.tidak {
          background: rgba(192,57,43,0.1);
          border: 1px solid rgba(192,57,43,0.22);
        }
        
        .pdm-status-card.hadir::before { background: #5fcf85; }
        .pdm-status-card.tidak::before { background: #f07070; }

        .pdm-status-left {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .pdm-status-sublabel {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(238,230,219,0.4);
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .pdm-status-text {
          font-family: 'Fraunces', serif;
          font-weight: 900;
          font-size: 20px;
          letter-spacing: -0.5px;
        }
        .pdm-status-card.hadir .pdm-status-text { color: #5fcf85; }
        .pdm-status-card.tidak .pdm-status-text { color: #f07070; }

        .pdm-status-icon {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .pdm-status-card.hadir .pdm-status-icon {
          background: rgba(45,138,78,0.2);
          color: #5fcf85;
        }
        .pdm-status-card.tidak .pdm-status-icon {
          background: rgba(192,57,43,0.18);
          color: #f07070;
        }

        .pdm-action {
          position: relative;
          z-index: 1;
          padding: 20px 24px 0;
          animation: pdmFadeUp 0.45s 0.34s ease both;
        }
        .pdm-close-btn {
          width: 100%;
          padding: 16px;
          border-radius: 100px;
          border: 1.5px solid rgba(200,168,122,0.3);
          background: rgba(200,168,122,0.08);
          color: #c8a87a;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.3px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .pdm-close-btn:hover {
          background: rgba(200,168,122,0.15);
          border-color: rgba(200,168,122,0.6);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(200,168,122,0.15);
        }
        .pdm-close-btn:active { transform: translateY(0); }

        @keyframes pdmFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .pdm-deco-star {
          position: absolute;
          color: #c8a87a;
          font-size: 8px;
          opacity: 0.25;
          animation: pdmStarPulse 3s ease-in-out infinite;
          pointer-events: none;
          z-index: 0;
        }
        .pdm-deco-star-1 { top: 56px; left: 28px; animation-delay: 0s; }
        .pdm-deco-star-2 { top: 72px; right: 64px; animation-delay: 1s; font-size: 6px; }
        @keyframes pdmStarPulse {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50%       { opacity: 0.45; transform: scale(1.4); }
        }
      `}</style>

      <div className="pdm-backdrop" onClick={onClose}>
        <div className="pdm-sheet" onClick={(e) => e.stopPropagation()}>
          <div className="pdm-handle" />

          <button className="pdm-close" onClick={onClose}>
            <IconClose />
          </button>

          <span className="pdm-deco-star pdm-deco-star-1">✦</span>
          <span className="pdm-deco-star pdm-deco-star-2">✦</span>

          {/* Avatar + name */}
          <div className="pdm-hero">
            <div className="pdm-avatar-ring">
              <div className="pdm-avatar">{initials}</div>
            </div>
            <h2 className="pdm-name">{peserta.nama}</h2>
            <span className="pdm-gen-tag">{peserta.angkatan}</span>
          </div>

          {/* Divider */}
          <div className="pdm-divider">
            <div className="pdm-divider-line" />
          </div>

          {/* Info grid */}
          <div className="pdm-info-grid">
            <div className="pdm-info-card">
              <span className="pdm-info-label">Participant ID</span>
              <span className="pdm-info-value mono">
                #{String(peserta.id).padStart(3, "0")}
              </span>
            </div>
            <div className="pdm-info-card">
              <span className="pdm-info-label">Angkatan</span>
              <span className="pdm-info-value" style={{ fontSize: 12 }}>
                {peserta.angkatan?.replace(" Generation", "") || "—"}
              </span>
            </div>
            <div className="pdm-info-card full">
              <span className="pdm-info-label">Full Name</span>
              <span
                className="pdm-info-value"
                style={{ textTransform: "capitalize" }}
              >
                {peserta.nama}
              </span>
            </div>
          </div>

          {/* Status highlight */}
          <div className={`pdm-status-card ${isHadir ? "hadir" : "tidak"}`}>
            <div className="pdm-status-left">
              <span className="pdm-status-sublabel">Attendance Status</span>
              <span className="pdm-status-text">
                {isHadir ? "Will Attend" : "Cannot Attend"}
              </span>
            </div>
            <div className="pdm-status-icon">
              {isHadir ? <IconCheck /> : <IconX />}
            </div>
          </div>

          {/* Close action */}
          <div className="pdm-action">
            <button className="pdm-close-btn" onClick={onClose}>
              <IconArrowLeft />
              Close Detail
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
