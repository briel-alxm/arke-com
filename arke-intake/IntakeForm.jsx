/* global React */
const { useState } = React;

function IntakeForm({ onSubmit }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    region: "Charleston, SC",
    caseType: "Personal Injury",
    urgency: "moderate",
    description: ""
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const urgencies = [
    { id: "low", label: "Routine", meta: "≥ 30 days" },
    { id: "moderate", label: "Moderate", meta: "7–30 days" },
    { id: "high", label: "Urgent", meta: "≤ 7 days" },
    { id: "critical", label: "Critical", meta: "Statute risk" }
  ];

  return (
    <div className="ai-form-wrap">
      <div className="ai-form-header">
        <h2>Case Intake</h2>
        <span className="ai-form-meta">24h response · signal-scored</span>
      </div>

      <p style={{fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.7, color: 'var(--soft-graphite)', margin: '0 0 28px', maxWidth: 540}}>
        Tell us about your case in your own words. We read every intake personally and respond within 24 hours — there's no chatbot on the other side.
      </p>
      <div className="ai-section-label">§ 01 · About you</div>
      <div className="ai-row">
        <div className="ai-field">
          <label>Full Name</label>
          <input value={form.fullName} onChange={e => set("fullName", e.target.value)} placeholder="Surname, given name"/>
        </div>
        <div className="ai-field">
          <label>Region</label>
          <input value={form.region} onChange={e => set("region", e.target.value)}/>
        </div>
      </div>
      <div className="ai-row">
        <div className="ai-field">
          <label>Email</label>
          <input type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="name@firm.com"/>
        </div>
        <div className="ai-field">
          <label>Phone</label>
          <input value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="(843) 000 0000"/>
        </div>
      </div>

      <div className="ai-section-label">§ 02 · What happened</div>
      <div className="ai-row">
        <div className="ai-field">
          <label>Case Type</label>
          <select value={form.caseType} onChange={e => set("caseType", e.target.value)}>
            <option>Personal Injury</option>
            <option>Workers' Compensation</option>
            <option>Medical Malpractice</option>
            <option>Premises Liability</option>
            <option>Other</option>
          </select>
        </div>
        <div className="ai-field">
          <label>Urgency Signal</label>
          <span className="hint">Maps to scoring weight</span>
        </div>
      </div>
      <div className="ai-radios" style={{marginBottom: 14}}>
        {urgencies.map(u => (
          <div
            key={u.id}
            className={"ai-radio " + (form.urgency === u.id ? "is-active" : "")}
            onClick={() => set("urgency", u.id)}
          >
            <span className="ai-radio-label">{u.label}</span>
            <span className="ai-radio-meta">{u.meta}</span>
          </div>
        ))}
      </div>
      <div className="ai-row ai-row--single">
        <div className="ai-field">
          <label>Case Description</label>
          <textarea rows="4" value={form.description} onChange={e => set("description", e.target.value)} placeholder="A paragraph or two is plenty. What happened, when, and what's the situation right now."/>
          <span className="hint">Plain language · we'd rather hear it as you'd tell a friend</span>
        </div>
      </div>

      <div className="ai-form-actions">
        <span className="ai-form-note">Reviewed within 24 hours · by a person</span>
        <button className="ai-btn" onClick={() => onSubmit(form)}>Submit Case →</button>
      </div>
    </div>
  );
}

window.IntakeForm = IntakeForm;
