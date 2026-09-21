import React, { Component } from "react";
import Cookies from "universal-cookie";
import MovieCard from "../../components/MovieCard/MovieCard.js"
import SerieCard from "../../components/SerieCard/SerieCard.js"

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

            storagePeliculas.map((id) => {
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

            storageSeries.map((id) => {
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

    quitarPelicula(id) {
        let peliculasFiltradas = this.state.peliculas.filter(pelicula => pelicula.id !== id);
        this.setState({peliculas: peliculasFiltradas});
    }

    quitarSerie(id) {
        let seriesFiltradas = this.state.series.filter (serie => serie.id !== id);
        this.setState({series: seriesFiltradas});
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
                                            alSacarFav={() => this.quitarPelicula(pelicula.id)}
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
                                        <SerieCard
                                            key={serie.id}
                                            pelicula={serie}
                                            alSacarFav={() => this.quitarSerie(serie.id)}
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
