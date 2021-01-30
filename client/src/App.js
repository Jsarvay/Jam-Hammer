import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NoMatch from './pages/NoMatch';
import Nav from './components/Nav';
import Register from './pages/Register';
import Recording from './pages/Recording';
import Uploading from './pages/Uploading';
import Login from './pages/Login';
import Userpage from './pages/Userpage';
import Search from './pages/Search';
import './style.css';

function App() {
  return (
    <Router>
      <div className="background-color">
        <Nav />
        <Switch>
          <Route exact path={'/'}>
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/upload">
            <Uploading />
          </Route>
          <Route exact path="/recording">
            <Recording />
          </Route>
          <Route exact path="/user">
            <Userpage />
          </Route>
          <Route exact path="/search">
            <Search />
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
