"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const fellowshipGroups = [
  "Church Members", "Children", "Choir", "Communicants", "Development", "Elim",
  "Kama", "MU", "Kayo", "PCC", "Praise and Worship", "Titus", "Ephesus",
];

export default function AddMemberForm() {
  const supabase = createClientComponentClient();

  const [formData, setFormData] = useState({
    name: "",
    family_no: "",
    contact: "",
    felowship_group: "",
    profession: "",
    baptized: "",
    communicant: "",
    married_customary: "",
    married_church: "",
    confirmed: "",
    address: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("church_members").insert([
      {
        ...formData,
        family_no: parseInt(formData.family_no),
        contact: parseInt(formData.contact),
      },
    ]);

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Member added successfully!");
      setFormData({
        name: "",
        family_no: "",
        contact: "",
        felowship_group: "",
        profession: "",
        baptized: "",
        communicant: "",
        married_customary: "",
        married_church: "",
        confirmed: "",
        address: "",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
      <Input name="family_no" placeholder="Family Number" value={formData.family_no} onChange={handleChange} />
      <Input name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} />
      <Input name="profession" placeholder="Profession" value={formData.profession} onChange={handleChange} />

      <Select onValueChange={(value) => setFormData({ ...formData, felowship_group: value })}>
        <SelectTrigger>
          <SelectValue placeholder="Select Fellowship Group" />
        </SelectTrigger>
        <SelectContent>
          {fellowshipGroups.map((group) => (
            <SelectItem key={group} value={group}>{group}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input name="baptized" placeholder="Baptized (Yes/No)" value={formData.baptized} onChange={handleChange} />
      <Input name="communicant" placeholder="Communicant (Yes/No)" value={formData.communicant} onChange={handleChange} />
      <Input name="confirmed" placeholder="Confirmed (Yes/No)" value={formData.confirmed} onChange={handleChange} />
      <Input name="married_customary" placeholder="Married Customary (Yes/No)" value={formData.married_customary} onChange={handleChange} />
      <Input name="married_church" placeholder="Married Church (Yes/No)" value={formData.married_church} onChange={handleChange} />
      <Input name="address" placeholder="Address" value={formData.address} onChange={handleChange} />

      <Button type="submit">Add Member</Button>
    </form>
  );
}
