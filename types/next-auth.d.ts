import "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      name: string;
      email: string | null;
      image: string;
      accessToken?: string;
      profile: UserProfile;
    };
  }
}
