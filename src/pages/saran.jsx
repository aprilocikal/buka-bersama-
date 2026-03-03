import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Lightbulb,
  FileText,
  Megaphone,
  Send,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Loader2,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import Navbar from "../components/Navbar";

export default function Saran() {
  const navigate = useNavigate();
  const [feedbackType, setFeedbackType] = useState("Saran");
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [feedbackStatus, setFeedbackStatus] = useState("idle");

  const handleSubmit = async () => {
    if (!feedbackMsg.trim()) return;
    setFeedbackStatus("loading");
    try {
      const res = await fetch("https://formspree.io/f/xpqjdvdw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `[${feedbackType}] Anonim — Buka Bersama Akbar 2026`,
          Tipe: feedbackType,
          Pesan: feedbackMsg,
        }),
      });
      if (res.ok) {
        setFeedbackStatus("success");
        setFeedbackMsg("");
      } else {
        setFeedbackStatus("error");
      }
    } catch {
      setFeedbackStatus("error");
    }
  };

  const types = [
    { key: "Saran", icon: <Lightbulb size={18} />, label: "Saran" },
    { key: "Kritik", icon: <FileText size={18} />, label: "Kritik" },
    { key: "Pengaduan", icon: <Megaphone size={18} />, label: "Pengaduan" },
  ];

  const placeholders = {
    Saran: "Tulis saranmu untuk acara ini...",
    Kritik: "Tulis kritikmu secara konstruktif...",
    Pengaduan: "Ceritakan pengaduanmu di sini...",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,700;1,9..144,900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .sr-root {
          height: 100vh;
          height: 100dvh;
          overflow: hidden;
          background: #212f52;
          font-family: 'Plus Jakarta Sans', sans-serif;
          max-width: 430px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
        }

        /* ── Header ── */
        .sr-header {
          padding: 76px 24px 20px;
          position: relative;
          flex-shrink: 0;
        }
        .sr-header-glow {
          position: absolute;
          top: 40px; left: 50%;
          transform: translateX(-50%);
          width: 280px; height: 180px;
          background: radial-gradient(ellipse, rgba(200,168,122,0.1) 0%, transparent 70%);
          pointer-events: none;
        }
        .sr-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }
        .sr-eline { flex: 1; height: 1px; background: rgba(200,168,122,0.22); }
        .sr-etext {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 3.5px;
          text-transform: uppercase;
          color: rgba(200,168,122,0.6);
          white-space: nowrap;
        }
        .sr-title {
          font-family: 'Fraunces', serif;
          font-size: 32px;
          font-weight: 900;
          color: #eee6db;
          line-height: 1.0;
          letter-spacing: -1px;
          margin-bottom: 8px;
        }
        .sr-title em { font-style: italic; color: #c8a87a; }
        .sr-desc {
          font-size: 12px;
          color: rgba(238,230,219,0.45);
          line-height: 1.6;
          margin-bottom: 12px;
        }
        .sr-anon {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(200,168,122,0.08);
          border: 1px solid rgba(200,168,122,0.2);
          border-radius: 100px;
          padding: 5px 14px;
        }
        .sr-anon-icon { color: #c8a87a; flex-shrink: 0; }
        .sr-anon-text {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #c8a87a;
        }

        /* ── Form area ── */
        .sr-form {
          padding: 0 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }
        .sr-label {
          display: block;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(200,168,122,0.55);
          margin-bottom: 10px;
          flex-shrink: 0;
        }

        /* ── Type selector ── */
        .sr-types {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
          flex-shrink: 0;
        }
        .sr-type-btn {
          flex: 1;
          padding: 12px 6px 10px;
          border-radius: 14px;
          border: 1.5px solid rgba(200,168,122,0.15);
          background: rgba(200,168,122,0.04);
          color: rgba(238,230,219,0.5);
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
        }
        .sr-type-btn.active {
          border-color: #c8a87a;
          background: rgba(200,168,122,0.12);
          color: #c8a87a;
          box-shadow: 0 4px 16px rgba(200,168,122,0.15);
        }
        .sr-type-btn:hover:not(.active) {
          border-color: rgba(200,168,122,0.3);
          color: rgba(238,230,219,0.7);
        }

        /* ── Textarea ── */
        .sr-textarea {
          width: 100%;
          flex: 1;
          min-height: 0;
          padding: 16px;
          border-radius: 16px;
          border: 1.5px solid rgba(200,168,122,0.15);
          background: rgba(200,168,122,0.04);
          color: #eee6db;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px;
          font-weight: 400;
          line-height: 1.7;
          resize: none;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          margin-bottom: 6px;
        }
        .sr-textarea:focus {
          border-color: rgba(200,168,122,0.5);
          box-shadow: 0 0 0 3px rgba(200,168,122,0.08);
          background: rgba(200,168,122,0.06);
        }
        .sr-textarea::placeholder { color: rgba(238,230,219,0.2); }

        .sr-counter {
          font-size: 9px;
          color: rgba(238,230,219,0.25);
          text-align: right;
          margin-bottom: 14px;
          flex-shrink: 0;
        }
        .sr-counter.warn { color: #c0773a; }

        /* ── Error ── */
        .sr-error {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          color: #e87070;
          padding: 10px 14px;
          background: rgba(232,112,112,0.08);
          border: 1px solid rgba(232,112,112,0.18);
          border-radius: 12px;
          margin-bottom: 12px;
          flex-shrink: 0;
        }

        /* ── Submit ── */
        .sr-submit {
          width: 100%;
          padding: 15px;
          border-radius: 100px;
          border: none;
          background: #c8a87a;
          color: #212f52;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.3px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 6px 24px rgba(200,168,122,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
        }
        .sr-submit::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.18), transparent);
          pointer-events: none;
        }
        .sr-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(200,168,122,0.45);
        }
        .sr-submit:active { transform: translateY(0); }
        .sr-submit:disabled { opacity: 0.45; cursor: not-allowed; }

        .sr-spin { animation: spin 1s linear infinite; }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* ── Privacy ── */
        .sr-privacy {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 10px;
          padding: 10px 14px;
          background: rgba(200,168,122,0.04);
          border: 1px solid rgba(200,168,122,0.1);
          border-radius: 12px;
          flex-shrink: 0;
        }
        .sr-privacy-icon { color: rgba(200,168,122,0.5); flex-shrink: 0; }
        .sr-privacy-text {
          font-size: 10px;
          color: rgba(238,230,219,0.35);
          line-height: 1.6;
        }

        /* ── Back button ── */
        .sr-back-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin: 12px 24px 20px;
          padding: 13px;
          border-radius: 100px;
          border: 1.5px solid rgba(238,230,219,0.15);
          background: rgba(238,230,219,0.05);
          color: rgba(238,230,219,0.55);
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .sr-back-btn:hover {
          border-color: rgba(200,168,122,0.4);
          color: #c8a87a;
          transform: translateY(-1px);
        }

        /* ── Success ── */
        .sr-success {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 24px;
          text-align: center;
        }
        .sr-success-ring {
          width: 72px; height: 72px;
          border-radius: 50%;
          background: rgba(200,168,122,0.1);
          border: 1.5px solid rgba(200,168,122,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c8a87a;
          margin-bottom: 4px;
        }
        .sr-success-title {
          font-family: 'Fraunces', serif;
          font-size: 24px;
          font-weight: 900;
          color: #eee6db;
          letter-spacing: -0.5px;
        }
        .sr-success-sub {
          font-size: 12px;
          color: rgba(238,230,219,0.5);
          line-height: 1.7;
          max-width: 260px;
        }
        .sr-success-again {
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 22px;
          border-radius: 100px;
          border: 1.5px solid rgba(200,168,122,0.3);
          background: transparent;
          color: #c8a87a;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .sr-success-again:hover {
          background: rgba(200,168,122,0.12);
          border-color: rgba(200,168,122,0.5);
        }
        .sr-success-home {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 22px;
          border-radius: 100px;
          border: 1.5px solid rgba(238,230,219,0.15);
          background: transparent;
          color: rgba(238,230,219,0.5);
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .sr-success-home:hover {
          border-color: rgba(238,230,219,0.3);
          color: rgba(238,230,219,0.85);
        }
      `}</style>

      <div className="sr-root">
        <Navbar />

        {feedbackStatus === "success" ? (
          /* ── Success State ── */
          <div className="sr-success">
            <div className="sr-success-ring">
              <CheckCircle2 size={34} />
            </div>
            <p className="sr-success-title">Terima Kasih!</p>
            <p className="sr-success-sub">
              Pesanmu telah diterima secara anonim. Masukan kamu sangat berarti.
            </p>
            <button
              className="sr-success-again"
              onClick={() => setFeedbackStatus("idle")}>
              <RotateCcw size={12} />
              Kirim lagi
            </button>
            <button
              className="sr-success-home"
              onClick={() => navigate("/")}>
              <ArrowLeft size={12} />
              Kembali ke Beranda
            </button>
          </div>
        ) : (
          <>
            {/* ── Header ── */}
            <div className="sr-header">
              <div className="sr-header-glow" />
              <div className="sr-eyebrow">
                <div className="sr-eline" />
                <span className="sr-etext">Aspirasi Anda</span>
                <div className="sr-eline" />
              </div>
              <h1 className="sr-title">
                <em>Saran</em> &<br />
                Pengaduan
              </h1>
              <p className="sr-desc">
                Sampaikan saran, kritik, atau pengaduanmu. Identitasmu terjaga
                sepenuhnya.
              </p>
              <div className="sr-anon">
                <ShieldCheck size={12} className="sr-anon-icon" />
                <span className="sr-anon-text">100% Anonim</span>
              </div>
            </div>

            {/* ── Form ── */}
            <div className="sr-form">
              <span className="sr-label">Jenis Pesan</span>
              <div className="sr-types">
                {types.map(({ key, icon, label }) => (
                  <button
                    key={key}
                    className={`sr-type-btn${feedbackType === key ? " active" : ""}`}
                    onClick={() => setFeedbackType(key)}>
                    <span>{icon}</span>
                    {label}
                  </button>
                ))}
              </div>

              <span className="sr-label">Pesan Kamu</span>
              <textarea
                className="sr-textarea"
                placeholder={placeholders[feedbackType]}
                value={feedbackMsg}
                onChange={(e) => {
                  if (e.target.value.length <= 500)
                    setFeedbackMsg(e.target.value);
                }}
                maxLength={500}
              />
              <p className={`sr-counter${feedbackMsg.length > 450 ? " warn" : ""}`}>
                {feedbackMsg.length} / 500
              </p>

              {feedbackStatus === "error" && (
                <div className="sr-error">
                  <AlertCircle size={14} />
                  Gagal mengirim. Coba lagi beberapa saat.
                </div>
              )}

              <button
                className="sr-submit"
                onClick={handleSubmit}
                disabled={!feedbackMsg.trim() || feedbackStatus === "loading"}>
                {feedbackStatus === "loading" ? (
                  <>
                    <Loader2 size={15} className="sr-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    Kirim {feedbackType}
                  </>
                )}
              </button>

              <div className="sr-privacy">
                <ShieldCheck size={13} className="sr-privacy-icon" />
                <p className="sr-privacy-text">
                  Pesanmu dikirim tanpa identitas apapun.
                </p>
              </div>
            </div>

            {/* ── Back Button ── */}
            <button className="sr-back-btn" onClick={() => navigate("/")}>
              <ArrowLeft size={14} />
              Kembali ke Beranda
            </button>
          </>
        )}
      </div>
    </>
  );
}