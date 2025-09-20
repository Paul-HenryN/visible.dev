import { GhRepository } from "@/lib/types";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export function RepoCard({ repo }: { repo: GhRepository }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{repo.name}</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          {repo.description}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex items-center gap-4 mt-2">
        <span>⭐ {repo.stargazersCount}</span>
        <span>🍴 {repo.forksCount}</span>
        <span>{repo.language}</span>
      </CardFooter>
    </Card>
  );
}
