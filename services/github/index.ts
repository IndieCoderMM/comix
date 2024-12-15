import { getSession } from "@/utils/auth";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { extractContributions, extractLanguages } from "./helper";
import { GET_CONTRIBUTIONS, GET_LANGUAGES } from "./query";

class GithubService {
  private client: ApolloClient<any> | null = null;

  private async getClient() {
    if (this.client) return this.client;

    const session = await getSession();
    if (!session?.user?.accessToken) {
      throw new Error("Missing access token");
    }

    this.client = new ApolloClient({
      uri: process.env.NEXT_PUBLIC_GITHUB_GQL_API,
      cache: new InMemoryCache(),
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    });

    return this.client;
  }

  async getContributions(login: string) {
    const client = await this.getClient();
    // const { data: yearsData } = await client.query({
    //   query: GET_YEARS,
    //   variables: { login },
    // });
    //
    // const years = (
    //   yearsData.user.contributionsCollection.contributionYears as string[]
    // ).map(Number);
    //
    const { data } = await client.query({
      query: GET_CONTRIBUTIONS,
      variables: { login },
    });

    return extractContributions(data);
  }

  async getLanguages(login: string) {
    const client = await this.getClient();
    const { data } = await client.query({
      query: GET_LANGUAGES,
      variables: { login },
    });

    return extractLanguages(data);
  }
}

export const githubService = new GithubService();
