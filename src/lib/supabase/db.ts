import { z } from "zod";
import { createClient } from "./server";
import { Tables } from "./types";
import { CreateRepoSchema } from "./schemas";

export async function getTrackedRepositories() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("repositories").select("*");

  if (error) {
    console.error("Error fetching tracked repositories:", error.message);
    throw error;
  }

  return data;
}

export async function createRepos(repos: z.infer<typeof CreateRepoSchema>[]) {
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.error("Error fetching user:", userError.message);
    throw userError;
  }

  const { error } = await supabase
    .from("repositories")
    .insert<Tables<"repositories">>(
      repos.map((repo) => ({
        ...repo,
        user_id: userData.user.id,
        tracking_started_at: null,
        tracking_updated_at: null,
      }))
    );

  if (error) {
    throw error;
  }
}
