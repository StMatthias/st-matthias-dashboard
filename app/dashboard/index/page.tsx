"use client";

import { useState } from "react";
import DashboardHeader from "../dashboard_header/page";
import MemberSearch from "../member_search/page";
import AddMemberForm from "../member_form/page";
import MemberDetails from "../member_details/page";
import LayoutPage from "../Layout";
import AppBar from "@/components/layout/AppBar";

export default function DashboardPage() {
  const [selectedMember, setSelectedMember] = useState<any>(null);

  return (
    <LayoutPage>
      <div className="flex flex-col w-[86vw] h-screen mx-auto overflow-hidden">
        <AppBar />

        <div className="flex flex-1 w-full h-full p-6 bg-gray-400">
          <div className="w-full h-full bg-gray-400 rounded-lg shadow-lg p-6 overflow-auto">
            <DashboardHeader />
            <main className="h-full">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Left Column: Member Search */}
                <div className="flex flex-col">
                  <h2 className="text-2xl font-bold mb-4">Search Members</h2>
                  <MemberSearch onSelect={setSelectedMember} />
                  <MemberDetails member={selectedMember} />
                </div>

                {/* Right Column: Add Member Form */}
                <div className="flex flex-col">
                  <h2 className="text-2xl font-bold mb-4">Add New Member</h2>
                  <AddMemberForm />
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </LayoutPage>
  );
}
