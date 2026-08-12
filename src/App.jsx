import { useState } from "react";
import Nav from "./components/Nav";
import CareerPage from "./components/CareerPage";
import JobDetailPage from "./components/JobDetailPage";
import ApplyPage from "./components/ApplyPage";

// page: "careers" | "detail" | "apply"
export default function App() {
  const [page, setPage]               = useState("careers");
  const [selectedRole, setSelectedRole] = useState("");

  const goDetail = (role) => { setSelectedRole(role); setPage("detail"); };
  const goApply  = (role) => { setSelectedRole(role); setPage("apply"); };
  const goBack   = ()     => setPage("careers");

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      <Nav onLogoClick={goBack} />
      {page === "careers" && <CareerPage onApply={goDetail} />}
      {page === "detail"  && (
        <JobDetailPage
          jobTitle={selectedRole}
          onApply={() => goApply(selectedRole)}
          onBack={goBack}
        />
      )}
      {page === "apply" && (
        <ApplyPage
          preselectedRole={selectedRole}
          onBack={goBack}
        />
      )}
    </div>
  );
}
