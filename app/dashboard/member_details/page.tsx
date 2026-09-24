"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const groups = ["Church Members","Children","Choir","Communicants","Development","Elim","Berea","Kama","MU","Kayo","PCC","Praise and Worship","Titus"];
const yesNo = ["Yes", "No"];

interface Member {
  id: string;
  name: string;
  family_no: string;
  contact: string;
  fellowship_group: string;
  baptized: string;
  address: string;
  married_church: string;
  married_customary: string;
  confirmed: string;
  profession: string;
  communicant: string;
}

// Replace any null/undefined field with an empty string so inputs stay controlled
function sanitizeMember(member: Member): Member {
  return {
    ...member,
    name: member.name ?? "",
    family_no: member.family_no ?? "",
    contact: member.contact ?? "",
    fellowship_group: member.fellowship_group ?? "",
    baptized: member.baptized ?? "",
    address: member.address ?? "",
    married_church: member.married_church ?? "",
    married_customary: member.married_customary ?? "",
    confirmed: member.confirmed ?? "",
    profession: member.profession ?? "",
    communicant: member.communicant ?? "",
  };
}

export default function MemberDetails({
  member,
  onUpdated,
}: {
  member: Member | null;
  onUpdated?: (updated: Member) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Member | null>(
    member ? sanitizeMember(member) : null
  );

  if (member && formData?.id !== member.id) {
    setFormData(sanitizeMember(member));
    if (isEditing) setIsEditing(false);
  }

  if (!member || !formData) {
    return (
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Member Details</h3>
        <p className="text-gray-600">Select a member to view their details.</p>
      </div>
    );
  }

  const handleChange = (field: keyof Member, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = async () => {
    try {
      const { id, ...payload } = formData;

      const res = await fetch(`/api/members?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        toast.error("Unexpected server response");
        return;
      }

      if (!res.ok) {
        toast.error(data.error || "Failed to update member");
        return;
      }

      toast.success(`${data.name} was updated successfully`);
      setFormData(sanitizeMember(data));
      setIsEditing(false);
      onUpdated?.(sanitizeMember(data));
    } catch {
      toast.error("Network error — check your connection");
    }
  };

  const handleCancel = () => {
    setFormData(sanitizeMember(member));
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="mt-6 p-4 border rounded bg-black">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold">{formData.name}</h3>
          <Button size="sm" onClick={() => setIsEditing(true)}>Edit</Button>
        </div>
        <p><strong>Family No:</strong> {formData.family_no}</p>
        <p><strong>Contact:</strong> {formData.contact}</p>
        <p><strong>Group:</strong> {formData.fellowship_group}</p>
        <p><strong>Baptized:</strong> {formData.baptized}</p>
        <p><strong>Address:</strong> {formData.address}</p>
        <p><strong>Married in Church:</strong> {formData.married_church}</p>
        <p><strong>Married in Customary:</strong> {formData.married_customary}</p>
        <p><strong>Confirmed:</strong> {formData.confirmed}</p>
        <p><strong>Profession:</strong> {formData.profession}</p>
        <p><strong>Communicant:</strong> {formData.communicant}</p>
      </div>
    );
  }

  return (
    <div className="mt-6 p-4 border rounded bg-black space-y-4">
      <h3 className="text-xl font-semibold mb-2">Editing {member.name}</h3>

      <Input placeholder="Full Name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
      <Input placeholder="Family Number" value={formData.family_no} onChange={(e) => handleChange("family_no", e.target.value)} />
      <Input placeholder="Contact" value={formData.contact} onChange={(e) => handleChange("contact", e.target.value)} />
      <Input placeholder="Profession" value={formData.profession} onChange={(e) => handleChange("profession", e.target.value)} />

      <Select value={formData.fellowship_group} onValueChange={(v) => handleChange("fellowship_group", v)}>
        <SelectTrigger><SelectValue placeholder="Select Fellowship Group" /></SelectTrigger>
        <SelectContent>{groups.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
      </Select>

      <Select value={formData.baptized} onValueChange={(v) => handleChange("baptized", v)}>
        <SelectTrigger><SelectValue placeholder="Baptized (Yes/No)" /></SelectTrigger>
        <SelectContent>{yesNo.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
      </Select>

      <Select value={formData.communicant} onValueChange={(v) => handleChange("communicant", v)}>
        <SelectTrigger><SelectValue placeholder="Communicant (Yes/No)" /></SelectTrigger>
        <SelectContent>{yesNo.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
      </Select>

      <Select value={formData.confirmed} onValueChange={(v) => handleChange("confirmed", v)}>
        <SelectTrigger><SelectValue placeholder="Confirmed (Yes/No)" /></SelectTrigger>
        <SelectContent>{yesNo.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
      </Select>

      <Select value={formData.married_customary} onValueChange={(v) => handleChange("married_customary", v)}>
        <SelectTrigger><SelectValue placeholder="Married Customary (Yes/No)" /></SelectTrigger>
        <SelectContent>{yesNo.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
      </Select>

      <Select value={formData.married_church} onValueChange={(v) => handleChange("married_church", v)}>
        <SelectTrigger><SelectValue placeholder="Married Church (Yes/No)" /></SelectTrigger>
        <SelectContent>{yesNo.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
      </Select>

      <Input placeholder="Address" value={formData.address} onChange={(e) => handleChange("address", e.target.value)} />

      <div className="flex gap-2">
        <Button onClick={handleSave}>Save Changes</Button>
        <Button variant="outline" onClick={handleCancel}>Cancel</Button>
      </div>
    </div>
  );
}