/* global React */
function IntakeHeader({ onBack }) {
  return (
    <header className="ai-header">
      <div className="ai-container ai-header-row">
        <div className="ai-brand" onClick={onBack}>
          <div className="ai-brand-mark">◆</div>
          <div className="ai-brand-word">ARKE</div>
          <div className="ai-brand-rubric">Intake · Case Qualification</div>
        </div>
        <a className="ai-back" onClick={onBack}>← Back to BrielOS</a>
      </div>
    </header>
  );
}

function IntakeFooter() {
  return (
    <footer className="ai-footer">
      <p>ARKE · Intake Qualification System · arke.systems</p>
    </footer>
  );
}

window.IntakeHeader = IntakeHeader;
window.IntakeFooter = IntakeFooter;
