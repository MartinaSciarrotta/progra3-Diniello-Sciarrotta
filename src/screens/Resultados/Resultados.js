import React, { useState, useEffect } from "react";
import MovieCard from "../../components/MovieCard/MovieCard.js";
import SerieCard from "../../components/SerieCard/SerieCard.js";

const API_KEY = "44409d458b80c6cd77fa1ee8e33830c6";

function Resultados(props) {
    // "texto" sale directo de props, ya no hace falta guardarlo en estado
    // mismo que "endpoint" en Movies.js y Series.js
    const texto = props.match.params.texto;

    const [peliculas, setPeliculas] = useState(null);
    const [series, setSeries] = useState(null);

    function buscar() {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=APIKEY&language=es-AR&query={texto}`)
            .then(response => response.json())
            .then(data => {
                setPeliculas(data.results);
            })
            .catch(error => console.log("El error fue: " + error));

        fetch(`https://api.themoviedb.org/3/search/tv?api_key=APIKEY&language=es-AR&query={texto}`)
            .then(response => response.json())
            .then(data => {
                setSeries(data.results);
            })
            .catch(error => console.log("El error fue: " + error));
    }

    // Reemplazo de componentDidMount + componentDidUpdate:
    // corre al montar y cada vez que cambia "texto" (nueva búsqueda)
    useEffect(() => {
        setPeliculas(null);
        setSeries(null);
        buscar();
    }, [texto]);

    return (
        <div className="container">
            <h2 className="alert alert-primary">
                Resultados para: {texto}
            </h2>

            <h3>Películas</h3>
            {peliculas === null
                ? <p>Cargando películas...</p>
                : peliculas.length === 0
                    ? <p>No se encontraron películas</p>
                    : (
                        <section className="row cards">
                            {peliculas.map(pelicula => (
                                <MovieCard key={pelicula.id} pelicula={pelicula} />
                            ))}
                        </section>
                    )
            }

            <h3>Series</h3>
            {series === null
                ? <p>Cargando series...</p>
                : series.length === 0
                    ? <p>No se encontraron series</p>
                    : (
                        <section className="row cards">
                            {series.map(serie => (
                                <SerieCard key={serie.id} serie={serie} />
                            ))}
                        </section>
                    )
            }
        </div>
    );
}

export default Resultados;