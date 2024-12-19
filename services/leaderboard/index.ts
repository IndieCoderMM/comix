import { connectRedis } from "@/lib/redis";

const LEADERBOARD_KEY = "leaderboard";
const USER_PREFIX = "user";

class LeaderboardService {
  async getLeaderboardWithMetadata(limit: number) {
    const client = await connectRedis();

    const leaderboard = await client.zRangeWithScores(
      LEADERBOARD_KEY,
      0,
      limit - 1,
      { REV: true },
    );

    const userMetadataPromises = leaderboard.map(async (entry) => {
      const metadata = await client.hGetAll(this._getUserKey(entry.value));
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

    pipeline.zAdd(LEADERBOARD_KEY, [{ score, value: userId }]);

    pipeline.hSet(this._getUserKey(userId), metadata);

    await pipeline.exec();
  }

  _getUserKey(userId: string) {
    return `${USER_PREFIX}:${userId}`;
  }
}

export const leaderboardService = new LeaderboardService();
