import { gql } from "@apollo/client";

export const GET_PUBLIC_REPO = gql`
  query ($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      id
      name
      nameWithOwner
      url
      owner {
        login
      }
      description
      createdAt
      stargazerCount
      forkCount
      openIssues: issues(states: OPEN) {
        totalCount
      }
    }
  }
`;

export const GET_OWNER_REPO = gql`
  query ($login: String!, $name: String!) {
    repository(owner: $login, name: $name) {
      id
      name
      url
    }
  }
`;

export const GET_BASE_REPO = gql`
  query ($owner: String!, $name: String!, $after: String) {
    repository(owner: $owner, name: $name) {
      id
      stargazers(first: 100, after: $after) {
        edges {
          node {
            id
            login
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

export const GET_REPOS = gql`
  query ($login: String!, $cursor: String) {
    user(login: $login) {
      repositories(
        isFork: false
        first: 100
        after: $cursor
        orderBy: { field: STARGAZERS, direction: DESC }
      ) {
        totalCount
        nodes {
          name
          stargazerCount
          forkCount
          diskUsage
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }

      pullRequests(states: MERGED) {
        totalCount
      }
    }
  }
`;

export const GET_USER_ID = gql`
  query ($login: String!) {
    user(login: $login) {
      id
      createdAt
    }
  }
`;

export const GET_COMMITS = gql`
  query ($name: String!, $owner: String!, $cursor: String) {
    repository(name: $name, owner: $owner) {
      defaultBranchRef {
        target {
          ... on Commit {
            history(first: 100, after: $cursor) {
              totalCount
              edges {
                node {
                  ... on Commit {
                    committedDate
                    deletions
                    additions
                  }
                  committer {
                    user {
                      id
                    }
                  }
                }
                cursor
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_UPDATED_REPOS = gql`
  query ($login: String!, $cursor: String) {
    user(login: $login) {
      id
      repositories(
        first: 50
        after: $cursor
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        edges {
          node {
            id
            name
            updatedAt
            url
            description
          }
          cursor
        }
      }
    }
  }
`;

export const GET_YEARS = gql`
  query ($login: String!) {
    user(login: $login) {
      id
      contributionsCollection {
        contributionYears
      }
    }
  }
`;

export const GET_CONTRIBUTIONS = gql`
  query ($login: String!, $from: DateTime, $to: DateTime) {
    user(login: $login) {
      id
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

export const GET_LANGUAGES = gql`
  query ($login: String!) {
    user(login: $login) {
      id
      repositories(first: 100, isFork: false, ownerAffiliations: OWNER) {
        edges {
          node {
            id
            primaryLanguage {
              name
              color
            }
          }
        }
      }
    }
  }
`;
