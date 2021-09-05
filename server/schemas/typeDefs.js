const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Webcam {
    _id: ID!
    webcamId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }
  type User {
    _id: ID
    username: String
    email: String
    webcamCount: Int
    savedWebcams: [Webcam]
  }
  input savedWebcam {
    description: String
    title: String
    webcamId: String
    image: String
    link: String
    authors: [String]
  }
  type Query {
    me: User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveWebcam(input: savedWebcam!): User
    removeWebcam(webcamId: ID!): User
  }
  type Auth {
    token: ID
    user: User
  }
`;

module.exports = typeDefs;
