"use client";

import { SidebarTrigger } from "@/components/ui/sidebar"
import AppBar from "@/components/layout/AppBar";

export default function DashboardHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-500 border-b mt-16">

      <div className="flex items-center">
          <AppBar/>
            <SidebarTrigger />
        <h1 className="ml-4 text-2xl font-bold">Church Database Dashboard</h1>
      </div>
    </header>
  );
}

