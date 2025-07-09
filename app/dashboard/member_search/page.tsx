"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Member {
  id: number;
  name: string;
  felowship_group: string;
  contact: number;
  family_no: number;
}

export default function MemberSearch() {
  const supabase = createClientComponentClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Member[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("church_members")
      .select("id, name, felowship_group, contact, family_no")
      .ilike("name", `%${searchTerm}%`);

    if (error) {
      console.error("Search error:", error.message);
    }

    setResults(data || []);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </form>

      {results.length > 0 && (
        <div className="border p-4 rounded-md bg-white shadow">
          <h4 className="font-semibold mb-2">Search Results:</h4>
          <ul className="space-y-2">
            {results.map((member) => (
              <li
                key={member.id}
                className="cursor-pointer hover:underline text-blue-600"
                onClick={() => {
                  localStorage.setItem("selectedMemberId", member.id.toString());
                  window.dispatchEvent(new Event("member-selected"));
                }}
              >
                {member.name} — {member.felowship_group}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
