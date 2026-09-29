"use client";

import { ReactNode, useState } from "react";
import { Sidebar } from "@/components/ui/dashboard/SideBar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const LayoutPage = ({ children }: DashboardLayoutProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar — visible always on desktop, hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile menu button + slide-in sidebar */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main content area */}
      <div className="flex-1 bg-gray-100 p-0 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default LayoutPage;