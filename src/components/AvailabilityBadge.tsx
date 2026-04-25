import { siteData } from "../data/siteData";
import { useI18n } from "../i18n/I18nContext";

export default function AvailabilityBadge() {
  const { status } = siteData.availability;
  const { t } = useI18n();

  return (
    <span className={`availability availability--${status}`}>
      <span className="availability__dot" aria-hidden="true" />
      {t.availability[status]}
    </span>
  );
}
