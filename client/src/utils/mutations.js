import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        webcamCount
        savedWebcams {
          webcamId
          title
          description
          authors
          image
          link
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!, $email: String!) {
    addUser(username: $username, password: $password, email: $email) {
      token
      user {
        _id
        username
        email
        webcamCount
        savedWebcams {
          webcamId
          title
          description
          authors
          image
          link
        }
      }
    }
  }
`;

export const SAVE_WEBCAM = gql`
  mutation saveWebcam($input: savedWebcam!) {
    saveWebcam(input: $input) {
      _id
      username
      email
      webcamCount
      savedWebcams {
        # _id
        webcamId
        title
        description
        authors
        image
        link
      }
    }
  }
`;

export const REMOVE_WEBCAM = gql`
  mutation removeWebcam($webcamId: ID!) {
    removeWebcam(webcamId: $webcamId) {
      _id
      username
      email
      webcamCount
      savedWebcams {
        # _id
        webcamId
        title
        description
        authors
        image
        link
      }
    }
  }
`;
