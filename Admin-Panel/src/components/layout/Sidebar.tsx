import { NavLink } from "react-router-dom";

const NAV = [
  { to: "/admin/certifications", label: "Certifications", icon: "🏅" },
  { to: "/admin/work",           label: "Work",           icon: "💼" },
  { to: "/admin/skills",         label: "Skills",         icon: "🛠" },
  { to: "/admin/config",         label: "Config",         icon: "⚙️" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__logo">vp</span>
        <span className="sidebar__title">Admin</span>
      </div>

      <nav className="sidebar__nav">
        {NAV.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }: { isActive: boolean }) =>
              `sidebar__link${isActive ? " sidebar__link--active" : ""}`
            }
          >
            <span className="sidebar__icon" aria-hidden="true">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      <a
        className="sidebar__portfolio-link"
        href="/"
        target="_blank"
        rel="noreferrer"
      >
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        View portfolio
      </a>
    </aside>
  );
}
