import { getServerSession, NextAuthOptions } from "next-auth";
import GithubProvider, { GithubProfile } from "next-auth/providers/github";

const getProfileInfo = (profile: GithubProfile): UserProfile => {
  return {
    id: profile.id.toString(),
    name: profile.name ?? profile.login,
    email: profile.email,
    bio: profile.bio ?? "",
    login: profile.login,
    image: profile.avatar_url,
    followers: profile.followers,
    following: profile.following,
    public_repos: profile.public_repos,
    public_gists: profile.public_gists,
    total_private_repos: profile.total_private_repos,
    owned_private_repos: profile.owned_private_repos,
    disk_usage: profile.disk_usage,
  };
};

const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      profile(profile) {
        return getProfileInfo(profile);
      },
      authorization: {
        params: {
          scope: "read:user user:email public_repo",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, profile, account }) {
      const newToken = { ...token };
      if (profile) {
        // @ts-ignore
        newToken.profile = getProfileInfo(profile);
      }
      if (account) {
        newToken.accessToken = account.access_token;
      }
      return newToken;
    },
    async session({ session, token }: any) {
      session.user.profile = token.profile;
      session.user.accessToken = token.accessToken;

      return session;
    },
  },
};

const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
