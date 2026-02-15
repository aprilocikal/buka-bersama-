import { useState } from "react";
import Swal from "sweetalert2";
import { supabase } from "../supabase";

const daftarAngkatan = [
  { label: "Al Fawwaz", value: "Al Fawwaz Generation" },
  { label: "El Faradis", value: "El Faradis Generation" },
  { label: "Al Azhaar", value: "Al Azhaar Generation" },
  { label: "El Muchtar", value: "El Muchtar Generation" },
  { label: "Improvity", value: "Improvity Generation" },
  { label: "Scientists", value: "The Scientists Generation" },
  { label: "7th Generation", value: "7th Generation" },
  { label: "8th Generation", value: "8th Generation" },
];

export default function RegisterModal({ close }) {
  const [nama, setNama] = useState("");
  const [angkatan, setAngkatan] = useState("");
  const [keterangan, setKeterangan] = useState("Hadir");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!angkatan) {
      Swal.fire({
        icon: "warning",
        title: "Please select your generation",
        confirmButtonColor: "#c8a87a",
        background: "#1a2540",
        color: "#eee6db",
      });
      return;
    }

    setLoading(true);

    // ── Cek apakah nama sudah terdaftar (case-insensitive) ──
    const { data: existing, error: checkError } = await supabase
      .from("peserta")
      .select("id")
      .ilike("nama", nama.trim())
      .limit(1);

    if (checkError) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: checkError.message,
        confirmButtonColor: "#c8a87a",
        background: "#1a2540",
        color: "#eee6db",
      });
      return;
    }

    if (existing && existing.length > 0) {
      setLoading(false);
      Swal.fire({
        icon: "warning",
        title: "Already Registered!",
        text: `"${nama.trim()}" has already been registered. Each name can only register once.`,
        confirmButtonColor: "#c8a87a",
        background: "#1a2540",
        color: "#eee6db",
      });
      return;
    }

    // ── Nama belum ada, lanjut insert ──
    const { error } = await supabase
      .from("peserta")
      .insert([{ nama: nama.trim(), angkatan, status: keterangan }]);

    setLoading(false);

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
        confirmButtonColor: "#c8a87a",
        background: "#1a2540",
        color: "#eee6db",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Registration Successful!",
      text: "Thank you for registering. We are excited to see you at the event!",
      confirmButtonColor: "#c8a87a",
      background: "#1a2540",
      color: "#eee6db",
    });

    setNama("");
    setAngkatan("");
    setKeterangan("Hadir");
    close();
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,900;1,9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .rm-overlay {
          position: fixed;
          inset: 0;
          background: rgba(10, 15, 30, 0.75);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 1000;
          animation: overlayIn 0.25s ease;
        }
        @keyframes overlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .rm-sheet {
          background: #1a2540;
          border-radius: 28px 28px 0 0;
          width: 100%;
          max-width: 430px;
          padding: 12px 24px 44px;
          animation: sheetUp 0.38s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          max-height: 92vh;
          overflow-y: auto;
          scrollbar-width: none;
          border-top: 1px solid rgba(200,168,122,0.18);
          box-shadow: 0 -16px 60px rgba(0,0,0,0.5);
        }
        .rm-sheet::-webkit-scrollbar { display: none; }

        @keyframes sheetUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .rm-sheet::before {
          content: '';
          position: absolute;
          top: -40px;
          left: 50%;
          transform: translateX(-50%);
          width: 260px;
          height: 160px;
          background: radial-gradient(ellipse, rgba(200,168,122,0.1) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .rm-handle {
          width: 40px;
          height: 4px;
          background: rgba(200,168,122,0.3);
          border-radius: 100px;
          margin: 0 auto 22px;
          position: relative;
          z-index: 1;
        }

        .rm-header {
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
        }
        .rm-eyebrow {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }
        .rm-eyebrow-line {
          width: 20px;
          height: 1px;
          background: rgba(200,168,122,0.5);
        }
        .rm-eyebrow-text {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #c8a87a;
        }
        .rm-title {
          font-family: 'Fraunces', serif;
          font-optical-sizing: auto;
          font-size: 30px;
          font-weight: 900;
          color: #eee6db;
          line-height: 1.05;
          letter-spacing: -0.5px;
        }
        .rm-title em {
          font-style: italic;
          color: #c8a87a;
        }
        .rm-header-line {
          margin-top: 16px;
          height: 1px;
          background: rgba(200,168,122,0.12);
        }

        .rm-field {
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }
        .rm-label {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(200,168,122,0.7);
          margin-bottom: 10px;
          display: block;
        }

        /* ── Input wrapper with icon ── */
        .rm-input-wrap {
          position: relative;
        }
        .rm-input {
          width: 100%;
          padding: 14px 16px;
          border-radius: 14px;
          border: 1.5px solid rgba(200,168,122,0.2);
          background: rgba(255,255,255,0.06);
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 15px;
          font-weight: 400;
          color: #eee6db;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .rm-input::placeholder { color: rgba(238,230,219,0.3); }
        .rm-input:focus {
          border-color: #c8a87a;
          box-shadow: 0 0 0 3px rgba(200,168,122,0.12);
          background: rgba(255,255,255,0.08);
        }

        /* ── Duplicate warning hint ── */
        .rm-input-hint {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 7px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          color: rgba(200,168,122,0.5);
          letter-spacing: 0.2px;
        }
        .rm-input-hint svg {
          flex-shrink: 0;
          opacity: 0.7;
        }

        .rm-gen-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .rm-gen-btn {
          padding: 9px 16px;
          border-radius: 100px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          border: 1.5px solid rgba(200,168,122,0.22);
          background: rgba(255,255,255,0.04);
          color: rgba(238,230,219,0.6);
          cursor: pointer;
          transition: all 0.18s ease;
          white-space: nowrap;
          letter-spacing: 0.2px;
        }
        .rm-gen-btn:hover {
          border-color: rgba(200,168,122,0.55);
          color: #eee6db;
        }
        .rm-gen-btn.active {
          background: #c8a87a;
          border-color: #c8a87a;
          color: #212f52;
          font-weight: 700;
          box-shadow: 0 4px 14px rgba(200,168,122,0.28);
        }

        .rm-status-toggle {
          display: flex;
          gap: 10px;
        }
        .rm-status-opt {
          flex: 1;
          padding: 13px;
          border-radius: 14px;
          border: 1.5px solid rgba(200,168,122,0.2);
          background: rgba(255,255,255,0.04);
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: rgba(238,230,219,0.55);
          cursor: pointer;
          text-align: center;
          transition: all 0.18s ease;
          letter-spacing: 0.2px;
        }
        .rm-status-opt:hover {
          border-color: rgba(200,168,122,0.5);
          color: #eee6db;
        }
        .rm-status-opt.active-hadir {
          background: rgba(45,138,78,0.15);
          border-color: rgba(45,138,78,0.45);
          color: #5fcf85;
          font-weight: 700;
        }
        .rm-status-opt.active-tidak {
          background: rgba(192,57,43,0.13);
          border-color: rgba(192,57,43,0.38);
          color: #f07070;
          font-weight: 700;
        }

        .rm-divider {
          height: 1px;
          background: rgba(200,168,122,0.1);
          margin: 6px 0 22px;
          position: relative;
          z-index: 1;
        }

        .rm-btn-submit {
          width: 100%;
          padding: 17px;
          border-radius: 100px;
          border: none;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.3px;
          cursor: pointer;
          background: #c8a87a;
          color: #212f52;
          box-shadow: 0 6px 24px rgba(200,168,122,0.35);
          transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
          margin-bottom: 10px;
          position: relative;
          overflow: hidden;
          z-index: 1;
        }
        .rm-btn-submit::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.18), transparent);
          pointer-events: none;
        }
        .rm-btn-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(200,168,122,0.45);
        }
        .rm-btn-submit:active {
          transform: translateY(0);
          box-shadow: 0 4px 14px rgba(200,168,122,0.3);
        }
        .rm-btn-submit:disabled {
          opacity: 0.55;
          cursor: not-allowed;
          transform: none;
        }

        .rm-btn-cancel {
          width: 100%;
          padding: 16px;
          border-radius: 100px;
          border: 1.5px solid rgba(238,230,219,0.18);
          background: transparent;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: rgba(238,230,219,0.55);
          cursor: pointer;
          transition: all 0.18s ease;
          position: relative;
          z-index: 1;
          letter-spacing: 0.2px;
        }
        .rm-btn-cancel:hover {
          border-color: rgba(200,168,122,0.45);
          color: #c8a87a;
        }
        .rm-btn-cancel:active { transform: translateY(1px); }

        .rm-spinner {
          display: inline-block;
          width: 14px;
          height: 14px;
          border: 2px solid rgba(33,47,82,0.3);
          border-top-color: #212f52;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          vertical-align: middle;
          margin-right: 8px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="rm-overlay" onClick={(e) => e.target === e.currentTarget && close()}>
        <div className="rm-sheet">

          <div className="rm-handle" />

          {/* Header */}
          <div className="rm-header">
            <div className="rm-eyebrow">
              <div className="rm-eyebrow-line" />
              <span className="rm-eyebrow-text">Buka Bersama Akbar 2026</span>
            </div>
            <h2 className="rm-title">
              <em>Registration</em><br />Form
            </h2>
            <div className="rm-header-line" />
          </div>

          <form onSubmit={handleSubmit}>

            {/* Nickname */}
            <div className="rm-field">
              <label className="rm-label">Nickname</label>
              <div className="rm-input-wrap">
                <input
                  className="rm-input"
                  type="text"
                  placeholder="Enter your nickname"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  required
                />
              </div>
              {/* hint text */}
              <p className="rm-input-hint">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                Each nickname can only be registered once
              </p>
            </div>

            {/* Generation */}
            <div className="rm-field">
              <label className="rm-label">Generation</label>
              <div className="rm-gen-grid">
                {daftarAngkatan.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    className={`rm-gen-btn${angkatan === item.value ? " active" : ""}`}
                    onClick={() => setAngkatan(item.value)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="rm-field">
              <label className="rm-label">Attendance Status</label>
              <div className="rm-status-toggle">
                <button
                  type="button"
                  className={`rm-status-opt${keterangan === "Hadir" ? " active-hadir" : ""}`}
                  onClick={() => setKeterangan("Hadir")}
                >
                  ✓ &nbsp;Attending
                </button>
                <button
                  type="button"
                  className={`rm-status-opt${keterangan === "Tidak Hadir" ? " active-tidak" : ""}`}
                  onClick={() => setKeterangan("Tidak Hadir")}
                >
                  ✕ &nbsp;Not Attending
                </button>
              </div>
            </div>

            <div className="rm-divider" />

            <button type="submit" className="rm-btn-submit" disabled={loading}>
              {loading && <span className="rm-spinner" />}
              {loading ? "Checking & Registering..." : "✦  Register Now"}
            </button>
          </form>

          <button className="rm-btn-cancel" onClick={close}>
            Cancel
          </button>

        </div>
      </div>
    </>
  );
}