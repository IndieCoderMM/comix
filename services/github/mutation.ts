import { gql } from "@apollo/client";

export const STAR_REPO = gql`
  mutation AddStar($repoId: ID!) {
    addStar(input: { starrableId: $repoId }) {
      starrable {
        viewerHasStarred
      }
    }
  }
`;
