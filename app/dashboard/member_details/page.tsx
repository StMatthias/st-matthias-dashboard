"use client";

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

export default function MemberDetails({ member }: { member: Member | null }) {
  if (!member) {
    return (
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Member Details</h3>
        <p className="text-gray-600">Select a member to view their details.</p>
      </div>
    );
  }

  return (
    <div className="mt-6 p-4 border rounded bg-white shadow">
      <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
      <p><strong>Family No:</strong> {member.family_no}</p>
      <p><strong>Contact:</strong> {member.contact}</p>
      <p><strong>Group:</strong> {member.fellowship_group}</p>
      <p><strong>Baptized:</strong> {member.baptized}</p>
      <p><strong>Address:</strong> {member.address}</p>
      <p><strong>Married in Church:</strong> {member.married_church}</p>
      <p><strong>Married in Customary:</strong> {member.married_customary}</p>
      <p><strong>Confirmed:</strong> {member.confirmed}</p>
      <p><strong>Profession:</strong> {member.profession}</p>
      <p><strong>Communicant:</strong> {member.communicant}</p>

    </div>
  );
}
