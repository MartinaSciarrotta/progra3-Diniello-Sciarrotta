import React from "react";
import Header from "./components/Header/Header.js";
import CreateAccount from "./components/CreateAccount/CreateAccount.js";
import Login from "./components/Login/Login.js";
import Home from "./Pages/Home/Home.js";
import Error from "./Pages/Error/Error.js";
import Movies from "./Pages/Movies/Movies.js";
import Footer from "./components/Footer/Footer.js";

import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <Header />

      <main>
        <Switch>
          <Route path="/registro" exact={true} component={CreateAccount} />
          <Route path="/login" exact={true} component={Login} />
          <Route path="/" exact={true} component={Home} />
          <Route path="/peliculas/:endpoint" exact={true} component={Movies} />
          <Route path="" component={Error} />
        </Switch>
      </main>

      <Footer />
    </div>
  )
}

export default App;