"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { getGithubRepos, trackRepositories } from "./actions";
import { Button } from "@/components/ui/button";
import { FolderGit2Icon, LockIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef, useState } from "react";
import { GhRepository } from "@/lib/github/schemas";
import { Tables } from "@/lib/supabase/types";

export function RepoManagementDialog({
  open,
  onSubmit,
  onClose,
  trackedRepos,
}: {
  open?: boolean;
  onSubmit?: () => void;
  onClose?: () => void;
  trackedRepos: Tables<"repositories">[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  const {
    data: ghRepos,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["github", "repositories", debouncedSearchTerm],
    queryFn: async ({ queryKey }) => {
      const search = queryKey[2];
      const repos = await getGithubRepos();

      if (search) {
        return repos.filter((repo) =>
          repo.full_name.toLowerCase().includes(search.toLowerCase())
        );
      }

      return repos;
    },
  });

  const [checkedRepos, setCheckedRepos] = useState<GhRepository[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (checkedRepos.length > 0) {
      await trackRepositories(
        checkedRepos.map((repo) => ({
          id: repo.id,
          name: repo.name,
          full_name: repo.full_name,
          private: repo.private,
          url: repo.html_url,
          description: repo.description,
          created_at: repo.created_at,
          updated_at: repo.updated_at,
          pushed_at: repo.pushed_at,
          forks_count: repo.forks_count,
          stargazers_count: repo.stargazers_count,
          watchers_count: repo.watchers_count,
          main_language: repo.language,
        }))
      );
      onSubmit?.();
    }
  };

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setSearchTerm(e.target.value);

    timeoutRef.current = setTimeout(() => {
      setDebouncedSearchTerm(e.target.value);
    }, 400);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          onClose?.();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Track repositories</DialogTitle>
          <DialogDescription>
            Search through you repositories and select the ones you would like
            to create content from.
          </DialogDescription>
        </DialogHeader>

        <Input
          type="search"
          placeholder="Search a repository"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        {isLoading ? (
          <span>Loading...</span>
        ) : error || !ghRepos ? (
          <span>Error</span>
        ) : (
          <form onSubmit={handleSubmit}>
            <fieldset name="repositories">
              <legend className="sr-only">Track repositories</legend>

              <div className="flex flex-col max-h-72 overflow-y-auto">
                {ghRepos.map((repo) => {
                  if (trackedRepos.some((r) => r.id === repo.id)) {
                    return (
                      <RepositoryCheckButton
                        key={repo.id}
                        repo={repo}
                        checked={true}
                        disabled={true}
                      />
                    );
                  }

                  return (
                    <RepositoryCheckButton
                      key={repo.id}
                      repo={repo}
                      checked={checkedRepos.some((r) => r.id === repo.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setCheckedRepos((prev) => [...prev, repo]);
                        } else {
                          setCheckedRepos((prev) =>
                            prev.filter((r) => r.id !== repo.id)
                          );
                        }
                      }}
                    />
                  );
                })}
              </div>
            </fieldset>

            <Button type="submit" disabled={checkedRepos.length === 0}>
              Track {checkedRepos.length} repositories
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function RepositoryCheckButton({
  repo,
  onCheckedChange,
  checked = false,
  disabled = false,
}: {
  repo: GhRepository;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckedChange?.(e.target.checked);
  };

  return (
    <Button
      variant="ghost"
      className="justify-start group"
      disabled={disabled}
      asChild
    >
      <label
        htmlFor={`repo-${repo.id}`}
        className="group-disabled:cursor-not-allowed"
      >
        <input
          type="checkbox"
          id={`repo-${repo.id}`}
          name="repositories"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
        />
        <FolderGit2Icon />
        {repo.full_name}

        {repo.private && (
          <Badge className="ml-auto" variant="outline">
            <LockIcon className="size-2" />
            Private
          </Badge>
        )}
      </label>
    </Button>
  );
}
