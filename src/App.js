import React from "react";
import Home from "./Pages/Home/Home.js";
import Error from "./Pages/Error/Error.js";

import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <>
      <main>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="" component={Error} />

        </Switch>
      </main>
    </>
  )
}

export default App;