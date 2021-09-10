const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }
  type Webcam {
    _id: ID!
    webcamId: String
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
    title: String
    webcamId: String
    image: String
    link: String
  }
  type Query {
    me: User
    users: [User]
    user(username: String!): User
    categories: [Category]
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
