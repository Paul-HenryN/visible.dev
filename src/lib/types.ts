export type User = {
  id: number;
  username: string;
  email: string | null;
};

export type GhRepository = {
  id: number;
  name: string;
  fullName: string;
  private: boolean;
  htmlUrl: string;
  description: string | null;
  forksCount: number;
  stargazersCount: number;
  watchersCount: number;
  language: string | null;
};
