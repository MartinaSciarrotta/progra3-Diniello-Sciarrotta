import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";

const API_KEY = "44409d458b80c6cd77fa1ee8e33830c6";

const cookies = new Cookies();

function MovieDetail(props) {
    const [pelicula, setPelicula] = useState(null); //igual que en la version de clase, arranca en null y se llena con la info de la pelicula cuando termina el fetch
    const [esFavorito, setEsFavorito] = useState(null);

    useEffect(() => {
        let id = props.match.params.id;
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=es-AR`)
            .then(response => response.json())
            .then(data => {
                setPelicula(data);

                let storage = JSON.parse(localStorage.getItem("favoritos-peliculas"));
                if (storage !== null) {
                    setEsFavorito(storage.includes(data.id));
                }
            })
            .catch(error => console.log("El error fue: " + error));
    }, []);

    function agregarFav() {
        let storage = JSON.parse(localStorage.getItem("favoritos-peliculas"));

        if (storage !== null) {
            storage.push(pelicula.id)
        } else {
            storage = [pelicula.id];
        }

        localStorage.setItem("favoritos-peliculas", JSON.stringify(storage));
        setEsFavorito(true);
    }

    function sacarFav() {
        let storage = JSON.parse(localStorage.getItem("favoritos-peliculas"));
        let storageFiltrado = storage.filter((id) => id !== pelicula.id);

        localStorage.setItem("favoritos-peliculas", JSON.stringify(storageFiltrado));
        setEsFavorito(false);
    }

    let haySesion = cookies.get("user-auth-cookie");

    return (
        <div className="container">
            {pelicula === null
            // Mientras "pelicula" sigue en null ( y el fetch todavía no respondiío) entonces se muestra cargando...
                ? <p>Cargando... </p>
                : (
                    <section className="row">
                        <img
                            className="col-md-6"
                            src={`https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`}
                            alt={pelicula.title}
                        />
                        <section className="col-md-6 info">
                            <h2 className="alert alert-primary"> {pelicula.title} </h2>
                            <p> <strong>Clasificacion: </strong> {pelicula.vote_average} </p>
                            <p> <strong>Fecha de estreno: </strong> {pelicula.release_date} </p>
                            <p> <strong>Duracion: </strong> {pelicula.runtime} minutos </p>
                            <p> <strong>Sinopsis: </strong> {pelicula.overview} </p>
                            <p> <strong>Genero: </strong>
                                {pelicula.genres.map(genero => (
                                    <span key={genero.id}>{genero.name} </span>
                                ))}
                            </p>

                            {haySesion
                                ? (esFavorito
                                    ? <button className="btn btn-primary" onClick={() => sacarFav()}>Sacar de Favoritos</button>
                                    : <button className="btn btn-primary" onClick={() => agregarFav()}>Agregar a Favoritos</button>
                                )
                                   
                                : ''
                            }
                        </section>
                    </section>
                )
            }
        </div>
    );
}

export default MovieDetail;