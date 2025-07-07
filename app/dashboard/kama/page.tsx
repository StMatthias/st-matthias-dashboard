"use client";

import DashboardHeader from "../dashboard_header/page";
import LayoutPage from "../Layout";
import AppBar from "@/components/layout/AppBar";
import KamaComponent from "@/components/pages/KamaDashboard";

export default function Page() {
  return (
    <LayoutPage>
      <div className="flex flex-col w-[86vw] h-screen mx-auto overflow-hidden">
        <AppBar />
        <div className="flex flex-1 w-full h-full p-6 bg-gray-400">
          <div className="w-full h-full bg-gray-400 rounded-lg shadow-lg p-6 overflow-auto">
            <DashboardHeader />

            <KamaComponent/>
          </div>
        </div>
      </div>
    </LayoutPage>
  );
}
