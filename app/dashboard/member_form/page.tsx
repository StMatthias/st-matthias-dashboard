"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const groups = ["Church Members","Children","Choir","Communicants","Development","Elim","Berea","Kama","MU","Kayo","PCC","Praise and Worship","Titus"];

const yesNo = ["Yes", "No"];

export default function AddMemberForm() {
  const [formData, setFormData] = useState({
    name: "",
    familyNumber: "",
    contact: "",
    profession: "",
    fellowshipGroup: "",
    baptized: "",
    communicant: "",
    confirmed: "",
    marriedCustomary: "",
    marriedChurch: "",
    address: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      family_no: formData.familyNumber,
      contact: formData.contact,
      profession: formData.profession,
      fellowship_group: formData.fellowshipGroup,
      baptized: formData.baptized,
      communicant: formData.communicant,
      confirmed: formData.confirmed,
      married_customary: formData.marriedCustomary,
      married_church: formData.marriedChurch,
      address: formData.address,
    };

    try {
      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("Non-JSON response:", text);
        toast.error("Something went wrong — unexpected server response");
        return;
      }

      if (!res.ok) {
        console.error("Failed to add member:", data.error || data);
        toast.error(data.error || "Failed to add member");
        return;
      }

      console.log("Added:", data);
      toast.success(`${data.name} was added successfully`);

      setFormData({
        name: "",
        familyNumber: "",
        contact: "",
        profession: "",
        fellowshipGroup: "",
        baptized: "",
        communicant: "",
        confirmed: "",
        marriedCustomary: "",
        marriedChurch: "",
        address: "",
      });
    } catch (networkErr) {
      console.error("Network error:", networkErr);
      toast.error("Network error — check your connection");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
      <Input placeholder="Family Number" value={formData.familyNumber} onChange={(e) => setFormData({ ...formData, familyNumber: e.target.value })} />
      <Input placeholder="Contact" value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} />
      <Input placeholder="Profession" value={formData.profession} onChange={(e) => setFormData({ ...formData, profession: e.target.value })} />

      <Select onValueChange={(value) => setFormData({ ...formData, fellowshipGroup: value })}>
        <SelectTrigger><SelectValue placeholder="Select Fellowship Group" /></SelectTrigger>
        <SelectContent>
          {groups.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => setFormData({ ...formData, baptized: value })}>
        <SelectTrigger><SelectValue placeholder="Baptized (Yes/No)" /></SelectTrigger>
        <SelectContent>
          {yesNo.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => setFormData({ ...formData, communicant: value })}>
        <SelectTrigger><SelectValue placeholder="Communicant (Yes/No)" /></SelectTrigger>
        <SelectContent>
          {yesNo.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => setFormData({ ...formData, confirmed: value })}>
        <SelectTrigger><SelectValue placeholder="Confirmed (Yes/No)" /></SelectTrigger>
        <SelectContent>
          {yesNo.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => setFormData({ ...formData, marriedCustomary: value })}>
        <SelectTrigger><SelectValue placeholder="Married Customary (Yes/No)" /></SelectTrigger>
        <SelectContent>
          {yesNo.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => setFormData({ ...formData, marriedChurch: value })}>
        <SelectTrigger><SelectValue placeholder="Married Church (Yes/No)" /></SelectTrigger>
        <SelectContent>
          {yesNo.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
        </SelectContent>
      </Select>

      <Input placeholder="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />

      <Button type="submit">Add Member</Button>
    </form>
  );
}