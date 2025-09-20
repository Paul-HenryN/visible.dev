import { createClient } from "./server";

export async function getGithubToken() {
  const supabase = await createClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error("Error getting session:", error.message);
    return null;
  }

  if (!session) {
    return null;
  }

  return session.provider_token || null;
}
