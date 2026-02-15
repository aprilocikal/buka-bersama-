import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

const daftarAngkatan = [
  { label: "All", value: "All" },
  { label: "Al Fawwaz", value: "Al Fawwaz Generation" },
  { label: "El Faradis", value: "El Faradis Generation" },
  { label: "Al Azhaar", value: "Al Azhaar Generation" },
  { label: "El Muchtar", value: "El Muchtar Generation" },
  { label: "Improvity", value: "Improvity Generation" },
  { label: "Scientists", value: "The Scientists Generation" },
  { label: "7th Gen", value: "7th Generation" },
  { label: "8th Gen", value: "8th Generation" },
];

export default function Peserta() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [animKey, setAnimKey] = useState(0);

  async function fetchData() {
    setLoading(true);
    const { data: result, error } = await supabase
      .from("peserta")
      .select("*")
      .order("id", { ascending: true });
    if (!error) setData(result);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
    const channel = supabase
      .channel("peserta-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "peserta" },
        () => fetchData(),
      )
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, []);

  const handleFilter = (val) => {
    setFilter(val);
    setAnimKey((k) => k + 1);
  };

  const filteredData =
    filter === "All" ? data : data.filter((i) => i.angkatan === filter);
  const attending = filteredData.filter((i) => i.status === "Hadir").length;
  const notAttending = filteredData.filter((i) => i.status !== "Hadir").length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .pa-root {
          min-height: 100vh;
          background: #212f52;
          font-family: 'Plus Jakarta Sans', sans-serif;
          max-width: 430px;
          margin: 0 auto;
          position: relative;
          overflow-x: hidden;
        }

        /* ── Radial glow like hero ── */
        .pa-root::before {
          content: '';
          position: fixed;
          top: -60px;
          right: -60px;
          width: 280px;
          height: 280px;
          background: radial-gradient(circle, rgba(200,168,122,0.12) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        .pa-root::after {
          content: '';
          position: fixed;
          bottom: 60px;
          left: -80px;
          width: 240px;
          height: 240px;
          background: radial-gradient(circle, rgba(200,168,122,0.07) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── Corner brackets (matching hero) ── */
        .pa-corner {
          position: fixed;
          width: 40px;
          height: 40px;
          z-index: 0;
          opacity: 0.25;
          pointer-events: none;
        }
        .pa-corner-tl { top: 56px; left: 16px; border-top: 1.5px solid #c8a87a; border-left: 1.5px solid #c8a87a; }
        .pa-corner-tr { top: 56px; right: 16px; border-top: 1.5px solid #c8a87a; border-right: 1.5px solid #c8a87a; }
        .pa-corner-bl { bottom: 24px; left: 16px; border-bottom: 1.5px solid #c8a87a; border-left: 1.5px solid #c8a87a; }
        .pa-corner-br { bottom: 24px; right: 16px; border-bottom: 1.5px solid #c8a87a; border-right: 1.5px solid #c8a87a; }

        /* ── Floating stars ── */
        .pa-star {
          position: fixed;
          color: #c8a87a;
          animation: paStar 3s ease-in-out infinite;
          opacity: 0.3;
          z-index: 0;
          pointer-events: none;
          user-select: none;
        }
        .pa-star-1 { top: 80px; left: 30px; font-size: 11px; animation-delay: 0s; }
        .pa-star-2 { top: 110px; right: 28px; font-size: 8px; animation-delay: 0.7s; }
        .pa-star-3 { bottom: 80px; left: 40px; font-size: 8px; animation-delay: 1.4s; }
        .pa-star-4 { bottom: 50px; right: 32px; font-size: 11px; animation-delay: 2.1s; }
        @keyframes paStar {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }

        /* ── Header ── */
        .pa-header {
          position: relative;
          z-index: 1;
          padding: 56px 24px 0;
          animation: fadeUp 0.55s ease both;
        }

        .pa-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }
        .pa-eyebrow-line {
          width: 28px;
          height: 1px;
          background: rgba(200,168,122,0.5);
        }
        .pa-eyebrow-text {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 3.5px;
          text-transform: uppercase;
          color: #c8a87a;
        }

        .pa-title {
          font-family: 'Fraunces', serif;
          font-optical-sizing: auto;
          font-size: 38px;
          font-weight: 900;
          color: #eee6db;
          line-height: 1.0;
          letter-spacing: -1px;
          margin-bottom: 6px;
        }
        .pa-title em {
          font-style: italic;
          color: #c8a87a;
        }
        .pa-title-sub {
          font-size: 12px;
          color: rgba(238,230,219,0.4);
          font-weight: 400;
          letter-spacing: 0.3px;
          margin-bottom: 28px;
        }

        /* ── Stats ── */
        .pa-stats {
          display: flex;
          gap: 10px;
          padding: 0 24px 24px;
          position: relative;
          z-index: 1;
          animation: fadeUp 0.55s 0.1s ease both;
        }

        .pa-stat-card {
          flex: 1;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(200,168,122,0.15);
          border-radius: 16px;
          padding: 14px 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          backdrop-filter: blur(8px);
        }

        .pa-stat-number {
          font-family: 'Fraunces', serif;
          font-optical-sizing: auto;
          font-size: 30px;
          font-weight: 900;
          color: #c8a87a;
          line-height: 1;
          letter-spacing: -1px;
        }
        .pa-stat-label {
          font-size: 10px;
          font-weight: 500;
          color: rgba(238,230,219,0.45);
          letter-spacing: 0.3px;
        }

        /* ── Filter chips ── */
        .pa-filter-wrap {
          position: relative;
          z-index: 1;
          padding: 0 24px 20px;
          animation: fadeUp 0.55s 0.18s ease both;
        }
        .pa-filter-label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(200,168,122,0.6);
          margin-bottom: 10px;
        }
        .pa-filter-scroll {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 4px;
          scrollbar-width: none;
        }
        .pa-filter-scroll::-webkit-scrollbar { display: none; }

        .pa-chip {
          flex-shrink: 0;
          padding: 8px 16px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 600;
          font-family: 'Plus Jakarta Sans', sans-serif;
          border: 1.5px solid rgba(200,168,122,0.25);
          background: rgba(255,255,255,0.05);
          color: rgba(238,230,219,0.6);
          cursor: pointer;
          transition: all 0.18s ease;
          white-space: nowrap;
          letter-spacing: 0.2px;
        }
        .pa-chip:hover {
          border-color: rgba(200,168,122,0.55);
          color: #eee6db;
        }
        .pa-chip.active {
          background: #c8a87a;
          border-color: #c8a87a;
          color: #212f52;
          font-weight: 700;
          box-shadow: 0 4px 14px rgba(200,168,122,0.3);
        }

        /* ── List card ── */
        .pa-card {
          position: relative;
          z-index: 1;
          margin: 0 16px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(200,168,122,0.12);
          border-radius: 24px;
          overflow: hidden;
          backdrop-filter: blur(12px);
          animation: fadeUp 0.55s 0.25s ease both;
        }

        .pa-table-head {
          display: grid;
          grid-template-columns: 32px 1fr 1.5fr 80px;
          padding: 12px 18px;
          background: rgba(200,168,122,0.08);
          border-bottom: 1px solid rgba(200,168,122,0.12);
          gap: 8px;
        }
        .pa-th {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(200,168,122,0.7);
        }

        .pa-table-body {
          overflow-y: auto;
          max-height: 360px;
        }
        .pa-table-body::-webkit-scrollbar { width: 3px; }
        .pa-table-body::-webkit-scrollbar-track { background: transparent; }
        .pa-table-body::-webkit-scrollbar-thumb { background: rgba(200,168,122,0.3); border-radius: 100px; }

        .pa-row {
          display: grid;
          grid-template-columns: 32px 1fr 1.5fr 80px;
          padding: 14px 18px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          align-items: center;
          gap: 8px;
          animation: rowIn 0.3s ease both;
          transition: background 0.15s;
        }
        .pa-row:last-child { border-bottom: none; }
        .pa-row:hover { background: rgba(200,168,122,0.05); }

        @keyframes rowIn {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .pa-num {
          font-size: 11px;
          color: rgba(200,168,122,0.5);
          font-weight: 600;
          font-variant-numeric: tabular-nums;
        }
        .pa-name {
          font-size: 14px;
          font-weight: 600;
          color: #eee6db;
          text-transform: capitalize;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .pa-gen {
          font-size: 11px;
          color: rgba(238,230,219,0.4);
          font-weight: 400;
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .pa-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 5px 10px;
          border-radius: 100px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2px;
          width: fit-content;
        }
        .pa-badge.hadir {
          background: rgba(45,138,78,0.18);
          color: #5fcf85;
          border: 1px solid rgba(45,138,78,0.3);
        }
        .pa-badge.tidak {
          background: rgba(192,57,43,0.15);
          color: #f07070;
          border: 1px solid rgba(192,57,43,0.25);
        }
        .pa-badge::before {
          content: '';
          width: 4px; height: 4px;
          border-radius: 50%;
          background: currentColor;
          flex-shrink: 0;
        }

        /* ── Empty / Loading ── */
        .pa-empty {
          padding: 52px 24px;
          text-align: center;
          color: rgba(238,230,219,0.35);
        }
        .pa-empty-icon { font-size: 32px; margin-bottom: 10px; }
        .pa-empty-text { font-size: 13px; }

        .pa-loading-dots {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-bottom: 10px;
        }
        .pa-loading-dots span {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #c8a87a;
          animation: dotPulse 1.2s ease-in-out infinite;
        }
        .pa-loading-dots span:nth-child(2) { animation-delay: 0.2s; }
        .pa-loading-dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes dotPulse {
          0%, 80%, 100% { transform: scale(0.55); opacity: 0.35; }
          40% { transform: scale(1); opacity: 1; }
        }

        /* ── Footer ── */
        .pa-footer {
          position: relative;
          z-index: 1;
          padding: 20px 16px 44px;
          animation: fadeUp 0.55s 0.35s ease both;
        }

        .pa-back-btn {
          width: 100%;
          padding: 16px;
          border-radius: 100px;
          border: 1.5px solid rgba(238,230,219,0.22);
          background: transparent;
          color: #eee6db;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.2px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .pa-back-btn:hover {
          border-color: rgba(200,168,122,0.55);
          color: #c8a87a;
          transform: translateY(-1px);
        }
        .pa-back-btn:active { transform: translateY(0); }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="pa-root">
        {/* Corner brackets */}
        <div className="pa-corner pa-corner-tl" />
        <div className="pa-corner pa-corner-tr" />
        <div className="pa-corner pa-corner-bl" />
        <div className="pa-corner pa-corner-br" />

        {/* Stars */}
        <span className="pa-star pa-star-1">✦</span>
        <span className="pa-star pa-star-2">✦</span>
        <span className="pa-star pa-star-3">✦</span>
        <span className="pa-star pa-star-4">✦</span>

        {/* Header */}
        <div className="pa-header">
          <div className="pa-eyebrow">
            <div className="pa-eyebrow-line" />
            <span className="pa-eyebrow-text">Bukber Akbar 2026</span>
          </div>
          <h1 className="pa-title">
            <em>Attendance</em>
            <br />
            List
          </h1>
          <p className="pa-title-sub">Improvity Generation · Angkatan ke-5</p>
        </div>

        {/* Stats */}
        <div className="pa-stats">
          <div className="pa-stat-card">
            <span className="pa-stat-number">{attending}</span>
            <span className="pa-stat-label">Attending</span>
          </div>
          <div className="pa-stat-card">
            <span className="pa-stat-number">{notAttending}</span>
            <span className="pa-stat-label">Not Attending</span>
          </div>
          <div className="pa-stat-card">
            <span className="pa-stat-number">{filteredData.length}</span>
            <span className="pa-stat-label">Total</span>
          </div>
        </div>

        {/* Filter */}
        <div className="pa-filter-wrap">
          <p className="pa-filter-label">Filter Angkatan</p>
          <div className="pa-filter-scroll">
            {daftarAngkatan.map((item) => (
              <button
                key={item.value}
                className={`pa-chip${filter === item.value ? " active" : ""}`}
                onClick={() => handleFilter(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="pa-card">
          <div className="pa-table-head">
            <span className="pa-th">#</span>
            <span className="pa-th">Name</span>
            <span className="pa-th">Generation</span>
            <span className="pa-th">Status</span>
          </div>

          <div className="pa-table-body" key={animKey}>
            {loading ? (
              <div className="pa-empty">
                <div className="pa-loading-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <p className="pa-empty-text">Loading data...</p>
              </div>
            ) : filteredData.length === 0 ? (
              <div className="pa-empty">
                <div className="pa-empty-icon"></div>
                <p className="pa-empty-text">No data for this filter</p>
              </div>
            ) : (
              filteredData.map((item, index) => (
                <div
                  className="pa-row"
                  key={item.id}
                  style={{ animationDelay: `${index * 45}ms` }}
                >
                  <span className="pa-num">{index + 1}</span>
                  <span className="pa-name">{item.nama}</span>
                  <span className="pa-gen">{item.angkatan}</span>
                  <span
                    className={`pa-badge ${item.status === "Hadir" ? "hadir" : "tidak"}`}
                  >
                    {item.status === "Hadir" ? "Attend" : "Absent"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Back */}
        <div className="pa-footer">
          <button className="pa-back-btn" onClick={() => navigate("/")}>
            ← Back to Home
          </button>
        </div>
      </div>
    </>
  );
}
