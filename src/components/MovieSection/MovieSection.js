import React, { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard.js";
import { Link } from "react-router-dom";

const API_KEY = '44409d458b80c6cd77fa1ee8e33830c6';

// Reemplazo la estructura de Class por una funcion.
function MovieSection(props) {
    const [peliculas, setPeliculas] = useState(null);

    // Reemplazo de componentDidMount: busca las películas de este endpoint una sola vez
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${props.endpoint}?api_key=${API_KEY}&language=es-AR`)
            .then(response => response.json())
            .then(data => setPeliculas(data.results))
            .catch(error => console.log('El error fue: ' + error));
    }, []);

    // Esto antes vivía adentro de render(). Como ya no hay render(),
    // queda como una variable derivada más, calculada en cada render.
    let peliculasAMostrar = peliculas
        ? peliculas.filter((pelicula, indice) => indice < 5) // solo mostramos las primeras 5
        : [];

    return (
        <>
            <h2 className="alert alert-primary">{props.titulo}</h2>
            <section className="row cards">
                {peliculas
                    ? peliculasAMostrar.map(pelicula => {
                        return (
                            <MovieCard
                                key={pelicula.id}
                                pelicula={pelicula}
                            />
                        );
                    })
                    : <p>Cargando...</p>
                }
            </section>
            <Link to={`/peliculas/${props.endpoint}`} className="btn btn-info">
                Ver todas
            </Link>
        </>
    );
}

export default MovieSection;