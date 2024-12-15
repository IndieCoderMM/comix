import { gql } from "@apollo/client";

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
