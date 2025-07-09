"use client";

import React, { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface MemberDetailsType {
  id: number;
  name: string;
  family_no: number;
  contact: number;
  felowship_group: string;
  profession?: string;
  baptized?: string;
  communicant?: string;
  married_customary?: string;
  married_church?: string;
  confirmed?: string;
  address?: string;
  created_at: string;
}

export default function MemberDetails() {
  const [member, setMember] = useState<MemberDetailsType | null>(null);

  useEffect(() => {
    const supabase = createClientComponentClient();

    const fetchMember = async () => {
      const id = localStorage.getItem("selectedMemberId");
      if (!id) return;

      const { data, error } = await supabase
        .from("church_members")
        .select(
          `id, name, family_no, contact, felowship_group, profession,
           baptized, communicant, married_customary, married_church, confirmed,
           address, created_at`
        )
        .eq("id", Number(id))
        .single();

      if (error) {
        console.error("Error fetching member:", error.message);
        return;
      }

      setMember(data);
    };

    // initial fetch
    fetchMember();

    // refetch on custom event
    const handler = () => fetchMember();
    window.addEventListener("member-selected", handler);

    return () => {
      window.removeEventListener("member-selected", handler);
    };
  }, []);

  return (
    <div className="mt-6 p-4 border bg-white rounded shadow">
      <h3 className="text-xl font-semibold mb-2">Member Details</h3>

      {!member ? (
        <p className="text-gray-600">Select a member to view their details.</p>
      ) : (
        <div className="space-y-1 text-sm">
          <p><strong>Name:</strong> {member.name}</p>
          <p><strong>Family No:</strong> {member.family_no}</p>
          <p><strong>Contact:</strong> {member.contact}</p>
          <p><strong>Group:</strong> {member.felowship_group}</p>
          <p><strong>Profession:</strong> {member.profession}</p>
          <p><strong>Baptized:</strong> {member.baptized}</p>
          <p><strong>Communicant:</strong> {member.communicant}</p>
          <p><strong>Confirmed:</strong> {member.confirmed}</p>
          <p><strong>Married (Customary):</strong> {member.married_customary}</p>
          <p><strong>Married (Church):</strong> {member.married_church}</p>
          <p><strong>Address:</strong> {member.address}</p>
          <p><strong>Joined:</strong> {new Date(member.created_at).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
}
