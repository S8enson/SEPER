import React from "react";
import {
  Route,
  NavLink,
  BrowserRouter as Router,
  Redirect,
  Switch,
} from "react-router-dom";

import Home from "./pages/Home";
import SEPractice from "./pages/SE-Practice";
import SubmitArticle from "./pages/Submit-Article";
import NotFoundPage from "./pages/404";
import ModerateArticle from "./pages/Moderate-Article";

const App = () => {
  return (
    <Router>
      <div>
        <h1>SEPER</h1>
        <h2>Software Engineering Practice Evidence Repository</h2>
        <ul className="header">
          <li>
            <NavLink to="/SEPractice">Search</NavLink>
          </li>
          <li>
            <NavLink to="/SubmitArticle">Submit</NavLink>
          </li>
          <li>
            <NavLink to="/Moderation">Moderate</NavLink>
          </li>
        </ul>
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/SEPractice" component={SEPractice} />
            <Route exact path="/SubmitArticle" component={SubmitArticle} />
            <Route exact path="/Moderation" component={ModerateArticle} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
