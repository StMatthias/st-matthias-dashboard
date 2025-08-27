"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Member {
  id: string;
  name: string;
  family_no: string;
  contact: string;
  fellowship_group: string;
}

export default function MemberSearch({ onSelect }: { onSelect: (member: Member) => void }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Member[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/members?search=${encodeURIComponent(searchTerm)}`);
    const data = await res.json();
    setResults(data);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </form>

      <ul className="space-y-2">
        {results.map((member) => (
          <li
            key={member.id}
            className="p-2 border rounded cursor-pointer hover:bg-gray-100"
            onClick={() => onSelect(member)}   // ✅ pass selected member
          >
            {member.name} ({member.family_no})
          </li>
        ))}
      </ul>
    </div>
  );
}
