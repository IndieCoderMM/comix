declare type UserProfile = {
  id: string;
  name: string;
  email: string | null;
  image: string;
  login: string;
  followers: number;
  following: number;
  public_repos: number;
  public_gists: number;
  total_private_repos?: number;
  owned_private_repos?: number;
  disk_usage?: number;
};
