"use server"
import { createClient } from "@/utils/supabase/server"

// 1. Add a new member
export async function addMember(data: {
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
  }) {

    const supabase = await createClient();
  
    const { error } = await supabase.from("church_members").insert([data]);
  
    if (error) {
      console.error("Error adding member:", error.message);
      return { success: false, error: error.message };
    }
  
    return { success: true };
  }

// 2. Search members by name
// Search members by name (partial match, case-insensitive)
export async function searchMembers(name: string) {
    const supabase = await createClient();
  
    const { data, error } = await supabase
      .from("church_members")
      .select("id, name, felowship_group, contact, family_no")
      .ilike("name", `%${name}%`);
  
    if (error) {
      console.error("Search error:", error.message);
      return [];
    }
  
    return data;
  }

// 3. Get one member by ID
// Get one member by ID
export async function getMemberDetails(id: number) {
    const supabase = await createClient();
  
    const { data, error } = await supabase.from("church_members")
      .select(`
        id,
        name,
        family_no,
        contact,
        felowship_group,
        profession,
        baptized,
        communicant,
        married_customary,
        married_church,
        confirmed,
        address,
        created_at
      `)
      .eq("id", id)
      .single();
  
    if (error) {
      console.error("Fetch member details error:", error.message);
      return null;
    }
  
    return data;
  }

// 4. Get all members
// Get all members (e.g. for listing in a table)
export async function getAllMembers() {
    const supabase = await createClient();
  
    const { data, error } = await supabase
      .from("church_members")
      .select(`*`)
      .order("created_at", { ascending: false });
  
    if (error) {
      console.error("Error fetching all members:", error.message);
      return [];
    }
  
    return data;
  }