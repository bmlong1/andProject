import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <form action="/breweries" method="get">
        Enter city: <input type="text" name="city" placeholder="ex: Harrisburg"></input>
        <br></br>
        Enter state: <input type="text" name="state" placeholder="ex: PA"></input>
        <button type="submit">Go!</button>
      </form>
    </div>
    );
}
