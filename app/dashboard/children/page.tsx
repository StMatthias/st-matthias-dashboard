"use client";

import DashboardHeader from "@/components/pages/DashboardHeader";
import LayoutPage from "../Layout";
import AppBar from "@/components/layout/AppBar";
import KidsComponent from "@/components/pages/ChildrenDashboard";

export default function Page() {
  return (
    <LayoutPage>
      <div className="flex flex-col w-full md:w-[86vw] min-h-screen mx-auto overflow-y-auto">
          <AppBar />
              <div className="flex flex-1 w-full p-3 md:p-6 bg-gray-100">
                <div className="w-full bg-gray-100 rounded-lg shadow-lg p-3 md:p-6">
            <DashboardHeader />

            <KidsComponent/>
          </div>
        </div>
      </div>
    </LayoutPage>
  );
}
