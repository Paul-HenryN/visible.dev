import { RepoCard } from "@/components/repo-card";
import { getRepos } from "@/lib/github/client";

export default async function Home() {
  const { data: repos, error: reposError } = await getRepos();

  if (reposError) {
    return <div className="text-red-500">Error loading repositories</div>;
  }

  return (
    <div className="container mx-auto grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-2">
      {repos.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  );
}
