import { createUser, getUserByGhLogin } from "@/db/query/user";
import { getSession } from "@/utils/auth";

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
