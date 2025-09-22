import { Octokit } from "@octokit/rest";
import { getGithubToken } from "../supabase/auth";
import { User } from "../types";
import { GhRepoSchema, GhRepository } from "./schemas";

export async function createGithubClient() {
  const token = await getGithubToken();

  return new Octokit({ auth: token });
}

type GetUserResult =
  | {
      data: User;
      error: null;
    }
  | {
      data: null;
      error: Error;
    };

export async function getUser(): Promise<GetUserResult> {
  const gh = await createGithubClient();

  try {
    const { data } = await gh.users.getAuthenticated();

    return {
      data: {
        id: data.id,
        username: data.login,
        email: data.email,
      },
      error: null,
    };
  } catch (e) {
    return {
      data: null,
      error: new Error("Failed to fetch user from GitHub", { cause: e }),
    };
  }
}

type GetReposResult =
  | { data: GhRepository[]; error: null }
  | { data: null; error: Error };

export async function getRepos(): Promise<GetReposResult> {
  const gh = await createGithubClient();

  try {
    const repos = await gh.repos.listForAuthenticatedUser({
      per_page: 100,
      sort: "updated",
    });

    const parsed = GhRepoSchema.array().parse(repos.data);

    return { data: parsed, error: null };
  } catch (e) {
    return {
      data: null,
      error: new Error("Failed to fetch repositories from GitHub", {
        cause: e,
      }),
    };
  }
}
