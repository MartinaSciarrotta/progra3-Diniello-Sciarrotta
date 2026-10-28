import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import MovieCard from "../../components/MovieCard/MovieCard.js";
import SerieCard from "../../components/SerieCard/SerieCard.js";

const API_KEY = "44409d458b80c6cd77fa1ee8e33830c6";
const cookies = new Cookies();

function Favoritos(props) {
    const [peliculas, setPeliculas] = useState(null);
    const [series, setSeries] = useState(null);

    // Reemplazo de componentDidMount
    useEffect(() => {
        let haySesion = cookies.get("user-auth-cookie");
        if (!haySesion) {
            props.history.push("/");
            return;
        }

        // Películas
        let storagePeliculas = JSON.parse(localStorage.getItem("favoritos-peliculas"));

        if (storagePeliculas === null) {
            storagePeliculas = [];
        }

        if (storagePeliculas.length > 0) {
            let peliculasRecuperadas = [];

            storagePeliculas.map((id) => {
                fetch(`https://api.themoviedb.org/3/movie/id?apikey={API_KEY}&language=es-AR`)
                    .then(response => response.json())
                    .then(data => {
                        peliculasRecuperadas.push(data);
                        setPeliculas([...peliculasRecuperadas]); // copia nueva del array para que React detecte el cambio
                    })
                    .catch(error => console.log("El error fue: " + error));
            });
        } else {
            setPeliculas([]);
        }

        // Series
        let storageSeries = JSON.parse(localStorage.getItem("favoritos-series"));

        if (storageSeries === null) {
            storageSeries = [];
        }

        if (storageSeries.length > 0) {
            let seriesRecuperadas = [];

            storageSeries.map((id) => {
                fetch(`https://api.themoviedb.org/3/tv/id?apikey={API_KEY}&language=es-AR`)
                    .then(response => response.json())
                    .then(data => {
                        seriesRecuperadas.push(data);
                        setSeries([...seriesRecuperadas]);
                    })
                    .catch(error => console.log("El error fue: " + error));
            });
        } else {
            setSeries([]);
        }
    }, []);

    function quitarPelicula(id) {
        let peliculasFiltradas = peliculas.filter(pelicula => pelicula.id !== id);
        setPeliculas(peliculasFiltradas);
    }

    function quitarSerie(id) {
        let seriesFiltradas = series.filter(serie => serie.id !== id);
        setSeries(seriesFiltradas);
    }

    return (
        <div>
            <h2 className="alert alert-primary">Mis Favoritos</h2>
            <h3>Peliculas favoritas</h3>
            {peliculas === null
                ? <p>Cargando peliculas...</p>
                : peliculas.length === 0
                    ? <p>No tenés peliculas agregadas a favoritos</p>
                    : (
                        <section className="row cards">
                            {peliculas.map(pelicula => {
                                return (
                                    <MovieCard
                                        key={pelicula.id}
                                        pelicula={pelicula}
                                        alSacarFav={() => quitarPelicula(pelicula.id)}
                                    />
                                );
                            })}
                        </section>
                    )
            }

            <h3>Series favoritas</h3>
            {series === null
                ? <p>Cargando series...</p>
                : series.length === 0
                    ? <p>No tenés series agregadas a favoritos</p>
                    : (
                        <section className="row cards">
                            {series.map(serie => {
                                return (
                                    <SerieCard
                                        key={serie.id}
                                        serie={serie}
                                        alSacarFav={() => quitarSerie(serie.id)}
                                    />
                                );
                            })}
                        </section>
                    )
            }
        </div>
    );
}

export default Favoritos;