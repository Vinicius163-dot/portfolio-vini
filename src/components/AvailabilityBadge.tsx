import { siteData } from "../data/siteData";

export default function AvailabilityBadge() {
  const { status, label } = siteData.availability;

  return (
    <span className={`availability availability--${status}`}>
      <span className="availability__dot" aria-hidden="true" />
      {label}
    </span>
  );
}
