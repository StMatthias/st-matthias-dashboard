"use client";

import DashboardHeader from "../dashboard_header/page";
import MemberSearch from "../member_search/page";
import AddMemberForm from "../member_form/page";
import MemberDetails from "../member_details/page";
import LayoutPage from "../Layout";

export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden">
    <LayoutPage>
      <div className="flex-1 overflow-auto">
        <DashboardHeader />
        <main className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold mb-4">Search Members</h2>
              <MemberSearch />
              <MemberDetails />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Add New Member</h2>
              <AddMemberForm />
            </div>
          </div>
        </main>
      </div>
      </LayoutPage>
    </div>
  );
}

