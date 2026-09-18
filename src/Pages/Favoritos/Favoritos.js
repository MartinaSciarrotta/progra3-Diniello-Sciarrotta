import React, { Component } from "react";
import Cookies from "universal-cookie";
import MovieCard from "../../components/MovieCard/MovieCard.js"
import SeriesCard from "../../components/SeriesCard/SeriesCard.js"

const API_KEY = "44409d458b80c6cd77fa1ee8e33830c6";

const cookies = new Cookies();

class Favoritos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peliculas: null,
            series: null,
        }
    }

    componentDidMount() {
        let haySesion = cookies.get("user-auth-cookie");
        if (!haySesion) {
            this.props.history.push("/");
            return;
        }

        let storagePeliculas = JSON.parse(localStorage.getItem("favoritos-peliculas"));

        if (storagePeliculas !== null && storagePeliculas.length > 0) {
            let peliculasRecuperadas = [];

            storagePeliculas.forEach((id) => {
                fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=es-AR`)
                    .then(response => response.json())
                    .then(data => {
                        peliculasRecuperadas = peliculasRecuperadas.concat(data);
                        this.setState({ peliculas: peliculasRecuperadas });
                    })
                    .catch(error => console.log("El error fue: " + error));
            });
        } else {
            this.setState({ peliculas: [] });
        }

        let storageSeries = JSON.parse(localStorage.getItem("favoritos-series"));
        if (storageSeries !== null && storageSeries.length > 0) {
            let seriesRecuperadas = [];

            storageSeries.forEach((id) => {
                fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=es-AR`)
                    .then(response => response.json())
                    .then(data => {
                        seriesRecuperadas = seriesRecuperadas.concat(data);
                        this.setState({ series: seriesRecuperadas });
                    })
                    .catch(error => console.log("El error fue: " + error));
            });
        } else {
            this.setState({ series: [] });
        }
    }

    render() {
        return (
            <div>
                <h2 className="alert alert-primary">Mis Favoritos</h2>
                <h3>Peliculas favoritas</h3>
                {this.state.peliculas === null
                    ? <p>Cargando peliculas...</p>
                    : this.state.peliculas.length === 0
                        ? <p>No tenés peliculas agregadas a favoritos</p>
                        : (
                            <section className="row cards">
                                {this.state.peliculas.map(pelicula => {
                                    return (
                                        <MovieCard
                                            key={pelicula.id}
                                            pelicula={pelicula}
                                        />
                                    );
                                })}

                            </section>
                        )
                }

                <h3>Series favoritas</h3>
                {this.state.series === null
                    ? <p>Cargando series...</p>
                    : this.state.series.length === 0
                        ? <p>No tenés series agregadas a favoritos</p>
                        : (
                            <section className="row cards">
                                {this.state.series.map(serie => {
                                    return (
                                        <SeriesCard
                                            key={serie.id}
                                            serie={serie}
                                        />
                                    );
                                })}

                            </section>
                        )
                }
            </div>
        );
    }

}
export default Favoritos;
