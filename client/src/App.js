import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Recording from "./pages/Recording";
import Uploading from "./pages/Uploading"

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path={"/"}>
            <Uploading />
          </Route>
          <Route exact path="/recording">
            <Recording />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
