import gql from "graphql-tag";

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      webcamCount
      savedWebcams {
        # _id
        webcamId
        title
        image
        link
        lat
        lon
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;