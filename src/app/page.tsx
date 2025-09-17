import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data.user) {
    redirect("/login");
  }

  return <div>Welcome, {data.user.email}</div>;
}
