import React from "react";
import Header from "./components/Header/Header.js";
import CreateAccount from "./components/CreateAccount/CreateAccount.js";
import Login from "./components/Login/Login.js";
import Home from "./Pages/Home/Home.js";
import Error from "./Pages/Error/Error.js";
import Movies from "./Pages/Movies/Movies.js";
import MovieDetail from "./Pages/MovieDetail/MovieDetail.js";
import Series from "./Pages/Series/Series.js";
import SerieDetail from "./Pages/SerieDetail/SerieDetail.js";
import Favoritos from "./Pages/Favoritos/Favoritos.js";
import Footer from "./components/Footer/Footer.js";

import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <Header />

      <main>
        <Switch>
          <Route path="/registro" component={CreateAccount} />
          <Route path="/login" component={Login} />

          <Route path="/" exact={true} component={Home} />

          <Route path="/peliculas/:endpoint" component={Movies} />
          <Route path="/pelicula/:id" component={MovieDetail} />

          <Route path="/series/:endpoint" component={Series} />
          <Route path="/serie/:id" component={SerieDetail} />

          {/* acá iría resultados de la búsqueda */}

          <Route path="/favoritos" component={Favoritos}/>

          <Route path="" component={Error} />
        </Switch>
      </main>

      <Footer />
    </div>
  )
}

export default App;