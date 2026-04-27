import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import CertEditor from "../components/editors/CertEditor";
import WorkEditor from "../components/editors/WorkEditor";
import SkillsEditor from "../components/editors/SkillsEditor";
import ConfigEditor from "../components/editors/ConfigEditor";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />
      <main className="dashboard__main">
        <Routes>
          <Route index element={<Navigate to="certifications" replace />} />
          <Route path="certifications" element={<CertEditor />} />
          <Route path="work"           element={<WorkEditor />} />
          <Route path="skills"         element={<SkillsEditor />} />
          <Route path="config"         element={<ConfigEditor />} />
          <Route path="*"              element={<Navigate to="certifications" replace />} />
        </Routes>
      </main>
    </div>
  );
}
