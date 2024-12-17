import { gql } from "@apollo/client";

export const GET_REPOS = gql`
  query ($login: String!) {
    user(login: $login) {
      id
      repositories(
        isFork: false
        first: 100
        orderBy: { field: STARGAZERS, direction: DESC }
      ) {
        id
        totalCount
        nodes {
          stargazerCount
          forkCount
          name
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
