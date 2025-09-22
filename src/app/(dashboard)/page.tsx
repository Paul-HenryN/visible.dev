import { Navigation } from "@/components/navigation";
import { PostSuggestionsFeed } from "./post-suggestions-feed";
import { RepoManagement } from "./repo-management";
import { getTrackedRepositories } from "@/lib/supabase/db";
import { RepoManagementDialog } from "./repo-management-dialog";

export default async function HomePage() {
  const trackedRepos = await getTrackedRepositories();

  return (
    <div className="min-h-screen bg-background">
      {trackedRepos.length === 0 && (
        <RepoManagementDialog trackedRepos={trackedRepos} />
      )}

      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          <div className="xl:col-span-2">
            <PostSuggestionsFeed />
          </div>
          <div className="xl:col-span-1">
            <RepoManagement trackedRepos={trackedRepos} />
          </div>
        </div>
      </main>
    </div>
  );
}
