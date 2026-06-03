/* global React */
const QueueData = {
  sidebarSections: [
    { label: "Queue", items: [
      { id: "new", label: "New", count: 7 },
      { id: "review", label: "In Review", count: 3 },
      { id: "qualified", label: "Qualified", count: 12 },
      { id: "declined", label: "Declined", count: 4 }
    ]},
    { label: "Operations", items: [
      { id: "dashboard", label: "Dashboard", count: null },
      { id: "decisions", label: "Decision Queue", count: 3 },
      { id: "intakes", label: "All Intakes", count: 26 }
    ]}
  ],
  cases: [
    { id: "C-0146", name: "Maren K. Halloway", sub: "Workers' comp denial · carrier dispute", region: "Charleston, SC", score: 91, scoreBand: "high", status: "review", age: "2h" },
    { id: "C-0145", name: "Devon Pritchard", sub: "Personal injury · truck collision, I-26", region: "Mt. Pleasant, SC", score: 84, scoreBand: "high", status: "new", age: "5h" },
    { id: "C-0144", name: "Anika Boudreau", sub: "Med mal · misdiagnosis, post-surgical", region: "Summerville, SC", score: 76, scoreBand: "med", status: "new", age: "9h" },
    { id: "C-0143", name: "R. Quentin Yoo", sub: "Premises liability · commercial slip", region: "North Charleston", score: 62, scoreBand: "med", status: "review", age: "1d" },
    { id: "C-0142", name: "Solène Acheson", sub: "PI · cyclist struck, Lowcountry Hwy", region: "Goose Creek, SC", score: 58, scoreBand: "med", status: "new", age: "1d" },
    { id: "C-0141", name: "James E. Tovar", sub: "Workers' comp · refused light duty", region: "Hanahan, SC", score: 41, scoreBand: "low", status: "new", age: "2d" },
    { id: "C-0140", name: "Eleanor Mossback", sub: "Auto · rear-end, low-speed, soft tissue", region: "Charleston, SC", score: 28, scoreBand: "low", status: "declined", age: "2d" }
  ]
};

function QueueShell({ active, onSelect, children }) {
  return (
    <div className="ai-shell" data-screen-label="ARKE Intake / Queue">
      <aside className="ai-sidebar">
        <div className="ai-side-brand">
          <div className="mark">◆</div>
          <div className="word">ARKE</div>
        </div>
        {QueueData.sidebarSections.map(sec => (
          <div key={sec.label}>
            <div className="ai-side-section">{sec.label}</div>
            {sec.items.map(it => (
              <div
                key={it.id}
                className={"ai-side-link " + (active === it.id ? "is-active" : "")}
                onClick={() => onSelect && onSelect(it.id)}
              >
                <span>{it.label}</span>
                {it.count != null && <span className="ai-side-count">{it.count}</span>}
              </div>
            ))}
          </div>
        ))}
        <div className="ai-side-footer">
          OPERATOR · WENDY BRIEL<br/>
          STATUS · OPERATIONAL<br/>
          BRIELOS · v1
        </div>
      </aside>
      <main className="ai-main">{children}</main>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    new: "New",
    review: "In Review",
    qualified: "Qualified",
    declined: "Declined"
  };
  return (
    <span className={"ai-status ai-status--" + status}>
      <span className="ai-status-dot"/>{map[status]}
    </span>
  );
}

function SignalScore({ score, band }) {
  return (
    <span className={"ai-score ai-score--" + band}>
      <span className="ai-score-bar"><span className="ai-score-fill" style={{ width: score + "%" }}/></span>
      {score}
    </span>
  );
}

function CaseTable({ cases, activeId, onPick }) {
  return (
    <div className="ai-cases">
      <div className="ai-case-head">
        <div>ID</div>
        <div>Claimant · Matter</div>
        <div>Region</div>
        <div>Signal</div>
        <div>Status</div>
        <div style={{textAlign: 'right'}}>Age</div>
      </div>
      {cases.map(c => (
        <div
          key={c.id}
          className={"ai-case-row " + (activeId === c.id ? "is-active" : "")}
          onClick={() => onPick && onPick(c.id)}
        >
          <div className="ai-case-id">{c.id}</div>
          <div>
            <div className="ai-case-name">{c.name}</div>
            <div className="ai-case-sub">{c.sub}</div>
          </div>
          <div className="ai-case-region">{c.region}</div>
          <div className="ai-case-score-cell"><SignalScore score={c.score} band={c.scoreBand}/></div>
          <div><StatusBadge status={c.status}/></div>
          <div className="ai-case-age">{c.age}</div>
        </div>
      ))}
    </div>
  );
}

function CaseDetail({ caseId, onBack }) {
  const c = QueueData.cases.find(x => x.id === caseId) || QueueData.cases[0];
  const breakdown = [
    { k: "Urgency", v: 28, w: 30 },
    { k: "Liability Clarity", v: 22, w: 25 },
    { k: "Damages Potential", v: 24, w: 25 },
    { k: "Recoverability", v: 17, w: 20 }
  ];
  return (
    <>
      <div className="ai-main-head">
        <div>
          <a className="ai-back" style={{color: 'var(--ether-gold)', marginBottom: 10, display: 'inline-block'}} onClick={onBack}>← Back to queue</a>
          <h1 className="ai-main-title">{c.name}</h1>
          <div className="ai-main-meta">{c.id} · {c.sub}</div>
        </div>
        <div className="ai-status-bar">
          <div className="ai-stat">
            <span className="ai-stat-value" style={{color: 'var(--ether-gold)'}}>{c.score}</span>
            <span className="ai-stat-label">Signal</span>
          </div>
          <div className="ai-stat">
            <span className="ai-stat-value">{c.age}</span>
            <span className="ai-stat-label">Age</span>
          </div>
        </div>
      </div>

      <div className="ai-detail-grid">
        <div className="ai-detail-card">
          <h3>Case Substrate</h3>
          <div className="ai-detail-row">
            <div className="ai-detail-key">Claimant</div>
            <div className="ai-detail-val serif">{c.name}</div>
          </div>
          <div className="ai-detail-row">
            <div className="ai-detail-key">Region</div>
            <div className="ai-detail-val">{c.region}</div>
          </div>
          <div className="ai-detail-row">
            <div className="ai-detail-key">Matter</div>
            <div className="ai-detail-val">{c.sub}</div>
          </div>
          <div className="ai-detail-row">
            <div className="ai-detail-key">Filed</div>
            <div className="ai-detail-val">05.20.2026  ·  {c.age} ago</div>
          </div>
          <div className="ai-detail-row">
            <div className="ai-detail-key">Status</div>
            <div className="ai-detail-val"><StatusBadge status={c.status}/></div>
          </div>
          <div className="ai-detail-row">
            <div className="ai-detail-key">Distortion</div>
            <div className="ai-detail-val">Carrier denied claim citing missed reporting window — claimant had documented continuing-care notes that should have extended the window. Substrate failure at intake side.</div>
          </div>
        </div>

        <div className="ai-detail-card">
          <h3>Signal Score · {c.score}/100</h3>
          <div className="ai-score-headline">{c.score}<span>/100</span></div>
          <div className="ai-score-block">
            {breakdown.map(b => (
              <div className="ai-score-line" key={b.k}>
                <div className="ai-score-line-label"><span className="k">{b.k}</span><span className="v">{b.v}/{b.w}</span></div>
                <div className="ai-score-line-bar"><div style={{ width: (b.v / b.w * 100) + "%" }}/></div>
              </div>
            ))}
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 8, marginTop: 14}}>
            <button className="ai-btn" style={{background: 'var(--ether-gold)', borderColor: 'var(--ether-gold)', color: 'var(--obsidian-ink)'}}>Qualify Case →</button>
            <button className="ai-btn ai-btn--sec" style={{borderColor: '#2B3137', color: '#B7B0A4'}}>Request More Signal</button>
          </div>
        </div>
      </div>
    </>
  );
}

window.QueueShell = QueueShell;
window.CaseTable = CaseTable;
window.CaseDetail = CaseDetail;
window.QueueData = QueueData;
window.StatusBadge = StatusBadge;
window.SignalScore = SignalScore;
