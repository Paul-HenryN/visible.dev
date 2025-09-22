import { z } from "zod";

export const GhRepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  full_name: z.string(),
  private: z.boolean(),
  html_url: z.string().url(),
  created_at: z.string(),
  updated_at: z.string(),
  pushed_at: z.string(),
  forks_count: z.number(),
  stargazers_count: z.number(),
  watchers_count: z.number(),
  language: z.string().nullable(),
  description: z.string().nullable(),
  permissions: z.object({
    admin: z.boolean(),
    push: z.boolean(),
    pull: z.boolean(),
  }),
});

export type GhRepository = z.infer<typeof GhRepoSchema>;
