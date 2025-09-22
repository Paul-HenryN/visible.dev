"use server";

import { getRepos } from "@/lib/github/client";
import { createRepos } from "@/lib/supabase/db";
import { CreateRepoSchema } from "@/lib/supabase/schemas";
import z from "zod";

export async function getGithubRepos() {
  const { data, error } = await getRepos();

  if (error) throw error;

  return data;
}

export async function trackRepositories(
  repos: z.infer<typeof CreateRepoSchema>[]
) {
  return createRepos(repos);
}
