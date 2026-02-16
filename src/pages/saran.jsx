import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Lock,
  Lightbulb,
  FileText,
  Megaphone,
  Send,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import Navbar from "../components/Navbar";

export default function Saran() {
  const navigate = useNavigate();
  const [feedbackType, setFeedbackType] = useState("Saran");
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [feedbackStatus, setFeedbackStatus] = useState("idle"); // idle | loading | success | error

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
    { key: "Saran", icon: <Lightbulb size={22} />, label: "Saran" },
    { key: "Kritik", icon: <FileText size={22} />, label: "Kritik" },
    { key: "Pengaduan", icon: <Megaphone size={22} />, label: "Pengaduan" },
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
          min-height: 100vh;
          background: #212f52;
          font-family: 'Plus Jakarta Sans', sans-serif;
          max-width: 430px;
          margin: 0 auto;
          overflow-x: hidden;
        }

        /* ── Back button ── */
        .sr-back {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 16px 24px;
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
        .sr-back:hover { color: #c8a87a; }

        /* ── Hero header ── */
        .sr-header {
          padding: 8px 28px 40px;
          position: relative;
        }
        .sr-header-glow {
          position: absolute;
          top: -40px; left: 50%;
          transform: translateX(-50%);
          width: 260px; height: 200px;
          background: radial-gradient(ellipse, rgba(200,168,122,0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .sr-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }
        .sr-eline { flex: 1; height: 1px; background: rgba(200,168,122,0.22); }
        .sr-etext {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 3.5px;
          text-transform: uppercase;
          color: rgba(200,168,122,0.6);
          white-space: nowrap;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .sr-title {
          font-family: 'Fraunces', serif;
          font-optical-sizing: auto;
          font-size: 38px;
          font-weight: 900;
          color: #eee6db;
          line-height: 1.0;
          letter-spacing: -1px;
          margin-bottom: 14px;
        }
        .sr-title em {
          font-style: italic;
          color: #c8a87a;
        }

        .sr-desc {
          font-size: 13px;
          color: rgba(238,230,219,0.55);
          line-height: 1.8;
          font-family: 'Plus Jakarta Sans', sans-serif;
          margin-bottom: 20px;
        }

        /* Anon badge */
        .sr-anon {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(200,168,122,0.09);
          border: 1px solid rgba(200,168,122,0.22);
          border-radius: 100px;
          padding: 7px 16px;
        }
        .sr-anon-icon { color: #c8a87a; flex-shrink: 0; }
        .sr-anon-text {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #c8a87a;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        /* ── Form card ── */
        .sr-card {
          background: #eee6db;
          border-radius: 28px 28px 0 0;
          padding: 36px 24px 48px;
          min-height: calc(100vh - 280px);
          position: relative;
        }
        .sr-card::before {
          content: '';
          position: absolute;
          top: -1px; left: 0; right: 0;
          height: 36px;
          background: #212f52;
          clip-path: ellipse(52% 100% at 50% 0%);
        }

        /* Section label */
        .sr-label {
          display: block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #8b6e4e;
          margin-bottom: 12px;
          margin-top: 8px;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        /* Type selector */
        .sr-types {
          display: flex;
          gap: 10px;
          margin-bottom: 28px;
        }
        .sr-type-btn {
          flex: 1;
          padding: 14px 8px 12px;
          border-radius: 16px;
          border: 1.5px solid rgba(33,47,82,0.15);
          background: rgba(255,255,255,0.5);
          color: #8b6e4e;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 7px;
        }
        .sr-type-btn.active {
          border-color: #212f52;
          background: #212f52;
          color: #c8a87a;
          box-shadow: 0 6px 18px rgba(33,47,82,0.22);
        }
        .sr-type-btn:hover:not(.active) {
          border-color: rgba(33,47,82,0.3);
          background: rgba(255,255,255,0.8);
          color: #3d2e1e;
        }
        .sr-type-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Textarea */
        .sr-textarea {
          width: 100%;
          min-height: 150px;
          padding: 18px;
          border-radius: 18px;
          border: 1.5px solid rgba(33,47,82,0.15);
          background: rgba(255,255,255,0.75);
          color: #212f52;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.75;
          resize: none;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s;
          margin-bottom: 8px;
        }
        .sr-textarea:focus {
          border-color: #c8a87a;
          box-shadow: 0 0 0 3px rgba(200,168,122,0.15);
          background: #fff;
        }
        .sr-textarea::placeholder { color: rgba(33,47,82,0.3); }

        .sr-counter {
          font-size: 10px;
          color: rgba(33,47,82,0.3);
          text-align: right;
          margin-bottom: 20px;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .sr-counter.warn { color: #c0773a; }

        /* Error banner */
        .sr-error {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          color: #b94040;
          padding: 12px 14px;
          background: rgba(185,64,64,0.08);
          border: 1px solid rgba(185,64,64,0.2);
          border-radius: 12px;
          margin-bottom: 14px;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        /* Submit */
        .sr-submit {
          width: 100%;
          padding: 17px;
          border-radius: 100px;
          border: none;
          background: #212f52;
          color: #c8a87a;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.3px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 6px 24px rgba(33,47,82,0.22);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          position: relative;
          overflow: hidden;
        }
        .sr-submit::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.06), transparent);
          pointer-events: none;
        }
        .sr-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(33,47,82,0.32);
          background: #1a2540;
        }
        .sr-submit:active { transform: translateY(0); }
        .sr-submit:disabled { opacity: 0.55; cursor: not-allowed; }

        .sr-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Privacy note */
        .sr-privacy {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          margin-top: 18px;
          padding: 12px 14px;
          background: rgba(33,47,82,0.05);
          border-radius: 12px;
        }
        .sr-privacy-icon { color: #8b6e4e; flex-shrink: 0; margin-top: 1px; }
        .sr-privacy-text {
          font-size: 11px;
          color: #8b6e4e;
          line-height: 1.7;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        /* ── Success State ── */
        .sr-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 40px 20px 32px;
          text-align: center;
        }
        .sr-success-ring {
          width: 80px; height: 80px;
          border-radius: 50%;
          background: rgba(33,47,82,0.08);
          border: 1.5px solid rgba(33,47,82,0.14);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #212f52;
          margin-bottom: 4px;
        }
        .sr-success-title {
          font-family: 'Fraunces', serif;
          font-size: 26px;
          font-weight: 900;
          color: #212f52;
          letter-spacing: -0.5px;
        }
        .sr-success-sub {
          font-size: 13px;
          color: #5a4535;
          line-height: 1.75;
          max-width: 260px;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .sr-success-again {
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 11px 24px;
          border-radius: 100px;
          border: 1.5px solid rgba(33,47,82,0.2);
          background: transparent;
          color: #212f52;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          letter-spacing: 0.2px;
        }
        .sr-success-again:hover {
          background: #212f52;
          color: #c8a87a;
          border-color: #212f52;
        }
        .sr-success-home {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 11px 24px;
          border-radius: 100px;
          border: none;
          background: #212f52;
          color: #c8a87a;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          letter-spacing: 0.2px;
        }
        .sr-success-home:hover {
          background: #1a2540;
          transform: translateY(-1px);
        }
      `}</style>

      <div className="sr-root">
        <Navbar />

        {/* ── Back Button ── */}
        <button className="sr-back" onClick={() => navigate("/")}>
          <ArrowLeft size={16} />
          Kembali ke Beranda
        </button>

        {/* ── Header ── */}
        <div className="sr-header">
          <div className="sr-header-glow" />

          <div className="sr-eyebrow">
            <div className="sr-eline" />
            <span className="sr-etext">Aspirasi Anda</span>
            <div className="sr-eline" />
          </div>

          <h1 className="sr-title">
            Saran &amp;
            <br />
            <em>Pengaduan</em>
          </h1>

          <p className="sr-desc">
            Sampaikan saran, kritik, atau pengaduanmu terkait acara ini.
            Identitasmu terjaga sepenuhnya.
          </p>

          <div className="sr-anon">
            <Lock size={14} className="sr-anon-icon" />
            <span className="sr-anon-text">100% Anonim · Tanpa Identitas</span>
          </div>
        </div>

        {/* ── Form Card ── */}
        <div className="sr-card">
          {feedbackStatus === "success" ? (
            /* ── Success State ── */
            <div className="sr-success">
              <div className="sr-success-ring">
                <CheckCircle2 size={38} />
              </div>
              <p className="sr-success-title">Terima Kasih!</p>
              <p className="sr-success-sub">
                Pesanmu telah diterima oleh panitia secara anonim. Masukan
                kamu sangat berarti untuk acara yang lebih baik.
              </p>
              <button
                className="sr-success-again"
                onClick={() => setFeedbackStatus("idle")}
              >
                <RotateCcw size={13} />
                Kirim lagi
              </button>
              <button
                className="sr-success-home"
                onClick={() => navigate("/")}
              >
                <ArrowLeft size={13} />
                Kembali ke Beranda
              </button>
            </div>
          ) : (
            /* ── Form ── */
            <>
              {/* Type Selector */}
              <span className="sr-label">Jenis Pesan</span>
              <div className="sr-types">
                {types.map(({ key, icon, label }) => (
                  <button
                    key={key}
                    className={`sr-type-btn${feedbackType === key ? " active" : ""}`}
                    onClick={() => setFeedbackType(key)}
                  >
                    <span className="sr-type-icon">{icon}</span>
                    {label}
                  </button>
                ))}
              </div>

              {/* Textarea */}
              <span className="sr-label">Pesan Kamu</span>
              <textarea
                className="sr-textarea"
                placeholder={placeholders[feedbackType]}
                value={feedbackMsg}
                onChange={(e) => {
                  if (e.target.value.length <= 500) setFeedbackMsg(e.target.value);
                }}
                maxLength={500}
              />
              <p className={`sr-counter${feedbackMsg.length > 450 ? " warn" : ""}`}>
                {feedbackMsg.length} / 500
              </p>

              {/* Error */}
              {feedbackStatus === "error" && (
                <div className="sr-error">
                  <AlertCircle size={15} />
                  Gagal mengirim pesan. Coba lagi beberapa saat.
                </div>
              )}

              {/* Submit */}
              <button
                className="sr-submit"
                onClick={handleSubmit}
                disabled={!feedbackMsg.trim() || feedbackStatus === "loading"}
              >
                {feedbackStatus === "loading" ? (
                  <>
                    <Loader2 size={16} className="sr-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Kirim {feedbackType}
                  </>
                )}
              </button>

              {/* Privacy note */}
              <div className="sr-privacy">
                <ShieldCheck size={14} className="sr-privacy-icon" />
                <p className="sr-privacy-text">
                  Pesanmu dikirim tanpa nama, email, atau identitas apapun.
                  Panitia tidak dapat mengetahui siapa pengirimnya.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}