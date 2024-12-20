import { getSession } from "@/utils/auth";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GITHUB_GQL_API,
});

const authLink = setContext(async (_, { headers }) => {
  const session = await getSession();
  const token = session?.user?.accessToken;

  if (!token) {
    throw new Error("Missing access token in apollo client");
  }

  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  };
});

let apolloClient: ApolloClient<any>;

export const getApolloClient = () => {
  if (!apolloClient) {
    apolloClient = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  }

  return apolloClient;
};
