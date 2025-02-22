import { ReactNode } from "react";
import { Sidebar } from "@/components/ui/dashboard/SideBar";
import { SidebarProvider } from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        {/* Sidebar: Fixed to the Left */}
        <div className="w-64 h-screen fixed left-0 top-0 bg-gray-400 shadow-md">
          <Sidebar />
        </div>

        {/* Content: Push Right to Avoid Overlapping */}
        <div className="flex-1 ml-64 bg-gray-400">{children}</div>
      </div>
    </SidebarProvider>
  );
};

export default RootLayout;
