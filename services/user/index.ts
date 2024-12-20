import {
  addClaimables,
  claimCoins,
  createUser,
  getUserByGhLogin,
  setupNewUser,
} from "@/db/query/user";
import { connectRedis, getUserMetadataKey } from "@/lib/redis";
import { getSession } from "@/utils/auth";
import { calculateLevel, getTitle, parseMetadata } from "./helper";

class UserService {
  /**
   * Get existing user by GitHub login
   * or create a new user if it doesn't exist
   */
  async getAuthUser() {
    const session = await getSession();
    if (!session?.user?.profile) {
      throw new Error("Missing user profile");
    }

    const [user] = await getUserByGhLogin(session.user.profile.login);
    if (user) {
      return user;
    }

    return this.createNewUser();
  }

  /** Direct github profile from session **/
  async getProfile() {
    const session = await getSession();
    if (!session?.user?.profile) {
      throw new Error("Missing user profile");
    }

    return session.user.profile;
  }

  /**
   * Get Cached data from redis
   */
  async getMetadata(userId: string) {
    const client = await connectRedis();

    const rawData = await client.hGetAll(getUserMetadataKey(userId));
    if (Object.keys(rawData).length === 0) {
      return null;
    }

    return parseMetadata(rawData);
  }

  /**
   * Update user metadata in redis
   */
  async updateMetadata(userId: string, metadata: Record<string, string>) {
    const client = await connectRedis();
    const prevMetadata = await client.hGetAll(getUserMetadataKey(userId));
    const updatedMetadata = { ...prevMetadata, ...metadata } as Record<
      string,
      string
    >;

    await client.hSet(getUserMetadataKey(userId), updatedMetadata);

    console.log("Metadata updated", metadata);

    return metadata;
  }

  async addClaimables(coins: number, exp: number) {
    const user = await this.getAuthUser();

    await addClaimables(user.id, coins, exp);
  }

  async claimReward(userId: number, coins: number) {
    const result = await claimCoins(userId, coins);
    console.log("Coins claimed", result);
  }

  /**
   * Store initial contributions and assign level and title
   */
  async setupNewUser(contribution: number) {
    const user = await this.getAuthUser();
    if (user.exp && user.exp > 0) {
      throw new Error("User already setup");
    }
    const { level, title } = this.calculateLevelTitle(contribution);

    const updateUser = await setupNewUser({
      id: user.id,
      level,
      title,
      exp: contribution,
      claimables: contribution,
    });
    console.log("User setup", updateUser);
  }

  /**
   * Calculate user level and title from contribution
   **/
  private calculateLevelTitle(contribution: number) {
    const { level } = calculateLevel(contribution);
    const title = getTitle(level);

    return { level: level, title: title };
  }

  private async createNewUser() {
    const session = await getSession();
    if (!session?.user?.profile) {
      throw new Error("Missing user profile");
    }

    const [newUser] = await createUser({
      ghLogin: session.user.profile.login,
      fullName: session.user.name,
      image: session.user.image,
    });

    return newUser;
  }
}

export const userService = new UserService();
