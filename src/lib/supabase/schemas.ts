import z from "zod";

export const CreateRepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  full_name: z.string(),
  description: z.string().nullable(),
  url: z.url(),
  private: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
  pushed_at: z.string(),
  forks_count: z.number(),
  stargazers_count: z.number(),
  watchers_count: z.number(),
  main_language: z.string().nullable(),
});
