/* global React */
function ExpectationsTimeline() {
  const steps = [
    { state: "now", when: "Now", what: "You submit", detail: "Tell us about your case — a paragraph is plenty." },
    { state: "next", when: "Today", what: "We read it", detail: "A real person reviews and scores for signal." },
    { state: "next", when: "By tomorrow", what: "You hear back", detail: "Qualification decision, by email or phone." }
  ];
  return (
    <div className="ai-timeline">
      <div className="ai-timeline-head">What to expect</div>
      <div className="ai-timeline-track">
        {steps.map((s, i) => (
          <div className={"ai-timeline-step " + (s.state === "now" ? "is-now" : s.state === "done" ? "is-done" : "")} key={i}>
            <div className="ai-timeline-dot">{i + 1}</div>
            <div className="ai-timeline-when">{s.when}</div>
            <div className="ai-timeline-what">{s.what}</div>
            <div className="ai-timeline-detail">{s.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
window.ExpectationsTimeline = ExpectationsTimeline;
