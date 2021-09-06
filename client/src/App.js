import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchWebcams from "./pages/SearchWebcams";
import SavedWebcams from "./pages/SavedWebcams";
import ViewWebcam from "./pages/ViewWebcam";
import Navbar from "./components/Navbar";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import GlobalProvider from "./utils/GlobalContext";

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <GlobalProvider>
      <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={SearchWebcams} />
            <Route exact path="/saved" component={SavedWebcams} />
            <Route exact path="/view" component={ViewWebcam} />
            <Route render={() => <h1 className="display-2">Oops! Something went terribly wrong!</h1>} />
          </Switch>
        </Router>
      </GlobalProvider>
    </ApolloProvider>
  );
}

export default App;
