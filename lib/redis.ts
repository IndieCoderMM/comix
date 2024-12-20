import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

export const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
  return redisClient;
};

export const KEYS = {
  LEADERBOARD: "leaderboard",
  METADATA: "metadata",
  USER_PREFIX: "user",
};

export const getLeaderboardUserKey = (userId: string) => {
  return `${KEYS.LEADERBOARD}:${KEYS.USER_PREFIX}:${userId}`;
};

export const getUserMetadataKey = (userId: string) => {
  return `${KEYS.METADATA}:${KEYS.USER_PREFIX}:${userId}`;
};
