import type { ReactNode } from "react";
import DashboardShell from "../components/dashboard/DashboardShell";
interface DashboardLayoutProps {
  children: ReactNode;
}
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return <DashboardShell>{children}</DashboardShell>;
};

export default DashboardLayout;
