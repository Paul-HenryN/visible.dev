"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, FolderGit2, Star, Clock, PlusIcon } from "lucide-react";
import { Tables } from "@/lib/supabase/types";
import { RepoManagementDialog } from "./repo-management-dialog";

export function RepoManagement({
  trackedRepos,
}: {
  trackedRepos: Tables<"repositories">[];
}) {
  const [isDialogOpen, setDialogOpen] = useState(false);

  if (trackedRepos.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-bold text-xl">
            Tracked Repositories
          </h2>

          <Button onClick={() => setDialogOpen(true)}>Add Repository</Button>

          <RepoManagementDialog
            open={isDialogOpen}
            onSubmit={() => setDialogOpen(false)}
            trackedRepos={trackedRepos}
          />
        </div>

        <Card className="p-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
              <FolderGit2 className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="font-heading font-semibold">
                No repositories tracked
              </h3>
              <p className="text-muted-foreground text-sm">
                Add repositories to start generating content from your code.
              </p>
            </div>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Repository
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading font-bold text-xl">
            Tracked Repositories
          </h2>
          <p className="text-sm text-muted-foreground">
            {trackedRepos.length} tracked repositories
          </p>
        </div>

        <Button onClick={() => setDialogOpen(true)}>
          <PlusIcon /> Add Repositories
        </Button>

        <RepoManagementDialog
          open={isDialogOpen}
          onClose={() => setDialogOpen(false)}
          trackedRepos={trackedRepos}
        />
      </div>

      <div className="space-y-3">
        {trackedRepos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}

function RepoCard({ repo }: { repo: Tables<"repositories"> }) {
  const formattedPushedData = repo.pushed_at
    ? new Date(repo.pushed_at).toLocaleDateString("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <Card key={repo.id} className="hover:shadow-sm transition-shadow">
      <CardContent className="px-4 py-0">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <FolderGit2 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <h3 className="font-medium text-sm truncate">{repo.full_name}</h3>
              {repo.private && (
                <Badge variant="secondary" className="text-xs flex-shrink-0">
                  Private
                </Badge>
              )}
            </div>

            {repo.description && (
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                {repo.description}
              </p>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-3">
                {repo.main_language && (
                  <div className="flex items-center space-x-1">
                    <Badge variant="secondary">{repo.main_language}</Badge>
                  </div>
                )}

                <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3" />
                    <span>{repo.stargazers_count}</span>
                  </div>
                  {formattedPushedData && (
                    <div className="hidden sm:flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{formattedPushedData}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
