/* global React, ReactDOM, IntakeHeader, IntakeFooter, IntakeForm, ExpectationsTimeline, Confirmation, QueueShell, CaseTable, CaseDetail, QueueData */
const { useState } = React;

function IntakeScreen({ onSubmit, onBack }) {
  return (
    <div className="ai-screen ai-screen--vellum" data-screen-label="ARKE Intake / Public Form">
      <IntakeHeader onBack={onBack}/>
      <div className="ai-container">
        <div className="ai-hero">
          <span className="ai-eyebrow">ARKE | Law · Intake</span>
          <h1 className="ai-title">Tell us about your case.</h1>
          <p className="ai-subtitle">A short form, read by a real person. We'll respond within 24 hours — most often with a qualification decision, sometimes with a clarifying question first.</p>
        </div>
        <ExpectationsTimeline/>
        <IntakeForm onSubmit={onSubmit}/>
      </div>
      <IntakeFooter/>
    </div>
  );
}

function ConfirmationScreen({ submission, onReturn }) {
  return (
    <div className="ai-screen ai-screen--vellum" data-screen-label="ARKE Intake / Confirmation">
      <IntakeHeader onBack={onReturn}/>
      <div className="ai-container">
        <Confirmation submission={submission} onReturn={onReturn}/>
      </div>
      <IntakeFooter/>
    </div>
  );
}

function QueueScreen({ onPickCase, onBack }) {
  const [active, setActive] = useState("new");
  const filtered = QueueData.cases.filter(c => {
    if (active === "new") return c.status === "new";
    if (active === "review") return c.status === "review";
    if (active === "qualified") return c.status === "qualified";
    if (active === "declined") return c.status === "declined";
    return true;
  });
  const display = (filtered.length === 0 ? QueueData.cases : filtered);
  const labels = { new: "New Intakes", review: "In Review", qualified: "Qualified", declined: "Declined", dashboard: "Operator Dashboard", decisions: "Decision Queue", intakes: "All Intakes" };
  return (
    <div className="ai-screen ai-screen--obsidian">
      <QueueShell active={active} onSelect={setActive}>
        <div className="ai-main-head">
          <div>
            <h1 className="ai-main-title">{labels[active] || "Queue"}</h1>
            <div className="ai-main-meta">ARKE | Law · Charleston SC region · sprint day 03 / 30</div>
          </div>
          <div className="ai-status-bar">
            <div className="ai-stat"><span className="ai-stat-value">{display.length}</span><span className="ai-stat-label">In View</span></div>
            <div className="ai-stat"><span className="ai-stat-value" style={{color: 'var(--ether-gold)'}}>91</span><span className="ai-stat-label">Top Signal</span></div>
            <div className="ai-stat"><span className="ai-stat-value">24h</span><span className="ai-stat-label">SLA</span></div>
          </div>
        </div>
        <CaseTable cases={display} onPick={onPickCase}/>
        <div style={{marginTop: 28, paddingTop: 18, borderTop: '1px solid #1F2429', display: 'flex', justifyContent: 'space-between'}}>
          <span style={{fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: '#6F7178', textTransform: 'uppercase'}}>END OF QUEUE · {display.length} OF {QueueData.cases.length}</span>
          <a className="ai-back" style={{color: '#6F7178'}} onClick={onBack}>← Exit operator view</a>
        </div>
      </QueueShell>
    </div>
  );
}

function DetailScreen({ caseId, onBack }) {
  return (
    <div className="ai-screen ai-screen--obsidian">
      <QueueShell active="new">
        <CaseDetail caseId={caseId} onBack={onBack}/>
      </QueueShell>
    </div>
  );
}

/* ── Top-level click-through ───────────────────────────── */
function App() {
  const [screen, setScreen] = useState("intake"); // intake | confirm | queue | detail
  const [submission, setSubmission] = useState(null);
  const [activeCase, setActiveCase] = useState(null);

  return (
    <div className="ai-app">
      {screen === "intake" && (
        <IntakeScreen
          onSubmit={(s) => { setSubmission(s); setScreen("confirm"); }}
          onBack={() => setScreen("queue")}
        />
      )}
      {screen === "confirm" && (
        <ConfirmationScreen
          submission={submission}
          onReturn={() => setScreen("queue")}
        />
      )}
      {screen === "queue" && (
        <QueueScreen
          onPickCase={(id) => { setActiveCase(id); setScreen("detail"); }}
          onBack={() => setScreen("intake")}
        />
      )}
      {screen === "detail" && (
        <DetailScreen
          caseId={activeCase}
          onBack={() => setScreen("queue")}
        />
      )}

      {/* Floating navigator — kit-only, helps demo the click-through */}
      <div style={{
        position: 'fixed', bottom: 16, right: 16, zIndex: 999,
        background: 'rgba(17,19,21,0.92)', color: '#F4F1EA',
        padding: '10px 14px', display: 'flex', gap: 12,
        border: '1px solid #2B3137', fontFamily: 'var(--font-mono)',
        fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
        backdropFilter: 'blur(8px)'
      }}>
        <span style={{color: '#6F7178'}}>Click-through</span>
        {["intake","confirm","queue","detail"].map(s => (
          <a key={s}
             onClick={() => setScreen(s)}
             style={{cursor:'pointer', color: screen === s ? 'var(--ether-gold)' : '#B7B0A4'}}>
            {s === "intake" ? "1 · Intake" : s === "confirm" ? "2 · Confirm" : s === "queue" ? "3 · Queue" : "4 · Case"}
          </a>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
