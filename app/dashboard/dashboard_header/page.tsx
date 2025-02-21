"use client";

import { SidebarTrigger } from "@/components/ui/sidebar"
import LayoutPage from "../Layout";

export default function DashboardHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
      <div className="flex items-center">
        <LayoutPage>
            <SidebarTrigger />
        </LayoutPage>
        <h1 className="ml-4 text-2xl font-bold">Church Database Dashboard</h1>
      </div>
    </header>
  );
}

