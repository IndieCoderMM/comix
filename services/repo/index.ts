import * as repoQuery from "@/db/query/repo";

class RepoService {
  async createRepo(repo: repoQuery.NewRepo) {
    const [existingRepo] = await repoQuery.getRepoByOwnerName(
      repo.owner,
      repo.name,
    );
    if (existingRepo && existingRepo.name === repo.name) {
      throw new Error("Repo already exists");
    }

    return repoQuery.createRepo(repo);
  }

  async deleteRepoById(repoId: number, ownerId: number) {
    return repoQuery.deleteRepoById(repoId, ownerId);
  }

  async getAllRepos() {
    return repoQuery.getAllRepos();
  }

  async getRepoByOwnerName(owner: string, name: string) {
    return repoQuery.getRepoByOwnerName(owner, name);
  }

  async boostRepoById(userId: number, repoId: number, boost: number) {
    return repoQuery.boostRepoById(userId, repoId, boost);
  }
}

export const repoService = new RepoService();
