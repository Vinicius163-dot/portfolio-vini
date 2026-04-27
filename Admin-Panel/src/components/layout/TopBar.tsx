import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface TopBarProps {
  title: string;
}

export default function TopBar({ title }: TopBarProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/admin/login", { replace: true });
  }

  return (
    <header className="topbar">
      <h2 className="topbar__title">{title}</h2>
      <button className="btn btn--ghost btn--sm" onClick={handleLogout}>
        Sign out
      </button>
    </header>
  );
}
