"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const groups = ["Church Members","Children","Choir","Communicants","Development","Elim","Kama","MU","Kayo","PCC","Praise and Worship","Titus"];

export default function AddMemberForm() {
  const [formData, setFormData] = useState({ name: "", familyNumber: "", contact: "", group: "", role: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log("Added:", data);
    setFormData({ name: "", familyNumber: "", contact: "", group: "", role: "" }); // reset
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input name="name" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
      <Input name="familyNumber" placeholder="Family Number" value={formData.familyNumber} onChange={(e) => setFormData({ ...formData, familyNumber: e.target.value })} />
      <Input name="contact" placeholder="Contact" value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} />
      <Select onValueChange={(value) => setFormData({ ...formData, group: value })}>
        <SelectTrigger><SelectValue placeholder="Select a group" /></SelectTrigger>
        <SelectContent>
          {groups.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
        </SelectContent>
      </Select>
      <Input name="role" placeholder="Role (if applicable)" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
      <Button type="submit">Add Member</Button>
    </form>
  );
}
