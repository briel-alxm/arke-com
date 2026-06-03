/* global React */
function Confirmation({ submission, onReturn }) {
  return (
    <div className="ai-confirm-wrap">
      <div className="ai-confirm">
        <div className="ai-confirm-mark">✓</div>
        <h1>Intake Received</h1>
        <p className="lead">Thank you{submission && submission.fullName ? ", " + submission.fullName.split(" ")[0] : ""}. Your case has been submitted for review. We'll contact you within 24 hours with a qualification decision.</p>
        <div className="ai-next-steps">
          <h3>What happens next</h3>
          <ol>
            <li><strong>Initial screening</strong> — our team reviews intake for completeness.</li>
            <li><strong>Qualification score</strong> — your case receives a signal-based score (0–100).</li>
            <li><strong>Decision &amp; contact</strong> — we call or email within 24h with the result.</li>
          </ol>
        </div>
        <button className="ai-btn ai-btn--sec" onClick={onReturn}>Return to ARKE</button>
      </div>
    </div>
  );
}

window.Confirmation = Confirmation;
