import React from "react";
import Header from "./components/Header/Header.js";
import Resultados from "./screens/Resultados/Resultados.js";
import CreateAccount from "./components/CreateAccount/CreateAccount.js";
import Login from "./components/Login/Login.js";
import Home from "./screens/Home/Home.js";
import Error from "./screens/Error/Error.js";
import Movies from "./Screens/Movies/Movies.js";
import MovieDetail from "./Screens/MovieDetail/MovieDetail.js";
import Series from "./screens/Series/Series.js";
import SerieDetail from "./screens/SerieDetail/SerieDetail.js";
import Favoritos from "./screens/Favoritos/Favoritos.js";
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

          <Route path="/buscar/:texto" component={Resultados} />

          <Route path="/favoritos" component={Favoritos}/>

          <Route path="" component={Error} />
        </Switch>
      </main>

      <Footer />
    </div>
  )
}

export default App;