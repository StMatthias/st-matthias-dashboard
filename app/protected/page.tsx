import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import Index from "@/components/pages/Index";

export default async function HomePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <Index />
      {!user && (
        <div className="flex justify-center mt-6">
          <p className="text-gray-500">
            You are not signed in.{" "}
            <a href="/sign-in" className="text-blue-600 underline">
              Sign in here
            </a>
            .
          </p>
        </div>
      )}
    </>
  );
}
