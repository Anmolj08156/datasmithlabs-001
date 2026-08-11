/**
 * The numbered marker that rides the left edge of each section.
 * Hidden below xl, where there is no gutter to put it in.
 */
export function SectionRail({ num, label }: { num: string; label: string }) {
  return (
    <div className="rail" aria-hidden="true">
      <div className="rail-line" />
      <div className="rail-marker">
        <span className="rail-dot" />
        <span className="rail-num">{num}</span>
        <span className="rail-label">{label}</span>
      </div>
    </div>
  );
}
