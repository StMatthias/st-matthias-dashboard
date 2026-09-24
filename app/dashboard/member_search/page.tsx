// app/dashboard/member_details/page.tsx
"use client";

import { useState } from "react";
import MemberSearch from "@/components/pages/MemberSearch";
import MemberDetails from "@/components/pages/MemberDetails";
import { Member } from "@/app/types/member";

export default function MemberDetailsPage() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  return (
    <div className="p-6">
      <MemberSearch onSelect={setSelectedMember} />
      <MemberDetails
        member={selectedMember}
        onUpdated={(updated) => setSelectedMember(updated)}
      />
    </div>
  );
}