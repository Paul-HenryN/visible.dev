"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  Edit3,
  Copy,
  Share2,
  Calendar,
  GitCommit,
  BookOpen,
  Lightbulb,
  MessageSquare,
  Plus,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for post suggestions
const mockPosts = [
  {
    id: 1,
    type: "Overview",
    title: "Building a React Component Library with TypeScript",
    preview:
      "Learn how I created a reusable component library from scratch, including setup with TypeScript, Storybook integration, and publishing to npm. This post covers the architecture decisions and best practices I discovered along the way.",
    repository: "ui-components",
    language: "TypeScript",
    commits: 12,
    createdAt: "2 days ago",
  },
  {
    id: 2,
    type: "Lesson",
    title: "Why I Switched from Redux to Zustand",
    preview:
      "After years of using Redux, I decided to try Zustand for state management. Here's what I learned about the differences, migration process, and when each tool makes sense for different project sizes.",
    repository: "task-manager",
    language: "JavaScript",
    commits: 8,
    createdAt: "5 days ago",
  },
  {
    id: 3,
    type: "Advice",
    title: "Database Optimization Techniques That Actually Work",
    preview:
      "Performance issues in your database? I've been there. This post shares practical optimization techniques I used to reduce query times by 80% in a production application with millions of records.",
    repository: "analytics-api",
    language: "Python",
    commits: 15,
    createdAt: "1 week ago",
  },
];

const getPostTypeIcon = (type: string) => {
  switch (type) {
    case "Overview":
      return <BookOpen className="h-4 w-4" />;
    case "Lesson":
      return <Lightbulb className="h-4 w-4" />;
    case "Advice":
      return <MessageSquare className="h-4 w-4" />;
    default:
      return <BookOpen className="h-4 w-4" />;
  }
};

const getPostTypeColor = (type: string) => {
  switch (type) {
    case "Overview":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "Lesson":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "Advice":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
};

export function PostSuggestionsFeed() {
  const [posts] = useState(mockPosts);

  if (posts.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-bold text-2xl">Post Suggestions</h2>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Generate New
          </Button>
        </div>

        <Card className="p-12 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <GitCommit className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="font-heading font-semibold text-lg">
                No posts yet
              </h3>
              <p className="text-muted-foreground max-w-md">
                Connect a repository to start generating content from your
                commits and coding activity.
              </p>
            </div>
            <Button className="mt-4">Connect a Repository</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-bold text-2xl">Post Suggestions</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Generate New</span>
          <span className="sm:hidden">New</span>
        </Button>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <Badge
                    variant="secondary"
                    className={`${getPostTypeColor(
                      post.type
                    )} flex items-center space-x-1 flex-shrink-0`}
                  >
                    {getPostTypeIcon(post.type)}
                    <span className="hidden sm:inline">{post.type}</span>
                  </Badge>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground min-w-0">
                    <Calendar className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{post.createdAt}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground flex-shrink-0">
                  <GitCommit className="h-3 w-3" />
                  <span className="hidden sm:inline">
                    {post.commits} commits
                  </span>
                  <span className="sm:hidden">{post.commits}</span>
                </div>
              </div>
              <CardTitle className="text-lg font-heading font-semibold leading-tight pr-4">
                {post.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="pt-0">
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3 sm:line-clamp-none">
                {post.preview}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 min-w-0 flex-1">
                  <Badge
                    variant="outline"
                    className="text-xs truncate max-w-24 sm:max-w-none"
                  >
                    {post.repository}
                  </Badge>
                  <Badge variant="outline" className="text-xs flex-shrink-0">
                    {post.language}
                  </Badge>
                </div>

                <div className="hidden md:flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit3 className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>

                <div className="md:hidden">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Full
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
