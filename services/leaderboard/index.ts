import { connectRedis, getLeaderboardUserKey, KEYS } from "@/lib/redis";

class LeaderboardService {
  async getLeaderboardWithMetadata(limit: number) {
    const client = await connectRedis();

    const leaderboard = await client.zRangeWithScores(
      KEYS.LEADERBOARD,
      0,
      limit - 1,
      { REV: true },
    );

    const userMetadataPromises = leaderboard.map(async (entry) => {
      const metadata = await client.hGetAll(getLeaderboardUserKey(entry.value));
      return {
        userId: entry.value,
        score: entry.score,
        metadata,
      };
    });

    const leaderboardWithMetadata = await Promise.all(userMetadataPromises);
    return leaderboardWithMetadata;
  }

  async addUserToLeaderboard(
    userId: string,
    score: number,
    metadata: Record<string, string>,
  ) {
    const client = await connectRedis();

    const pipeline = client.multi();

    pipeline.zAdd(KEYS.LEADERBOARD, [{ score, value: userId }]);

    pipeline.hSet(getLeaderboardUserKey(userId), metadata);

    await pipeline.exec();
  }
}

export const leaderboardService = new LeaderboardService();
