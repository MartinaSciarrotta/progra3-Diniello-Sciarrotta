import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";

const API_KEY = "44409d458b80c6cd77fa1ee8e33830c6";
const cookies = new Cookies();

function SerieDetail(props) {
    const [serie, setSerie] = useState(null);
    const [esFavorito, setEsFavorito] = useState(null);

    // Reemplazo de componentDidMount
    useEffect(() => {
        let id = props.match.params.id;
        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=es-AR`)
            .then(response => response.json())
            .then(data => {
                setSerie(data);

                let storage = JSON.parse(localStorage.getItem("favoritos-series"));
                if (storage !== null) {
                    setEsFavorito(storage.includes(data.id));
                }
            })
            .catch(error => console.log("El error fue: " + error));
    }, []);

    function agregarFav() {
        let storage = JSON.parse(localStorage.getItem("favoritos-series"));

        if (storage !== null) {
            storage.push(serie.id);
        } else {
            storage = [serie.id];
        }

        localStorage.setItem("favoritos-series", JSON.stringify(storage));
        setEsFavorito(true);
    }

    function sacarFav() {
        let storage = JSON.parse(localStorage.getItem("favoritos-series"));
        let storageFiltrado = storage.filter((id) => id !== serie.id);

        localStorage.setItem("favoritos-series", JSON.stringify(storageFiltrado));
        setEsFavorito(false);
    }

    let haySesion = cookies.get("user-auth-cookie");

    return (
        <div className="container">
            {serie === null
                ? <p>Cargando... </p>
                : (
                    <section className="row">
                        <img
                            className="col-md-6"
                            src={`https://image.tmdb.org/t/p/w500/${serie.poster_path}`}
                            alt={serie.name}
                        />
                        <section className="col-md-6 info">
                            <h2 className="alert alert-primary"> {serie.name} </h2>
                            <p> <strong>Clasificacion: </strong> {serie.vote_average} </p>
                            <p> <strong>Fecha de estreno: </strong> {serie.first_air_date} </p>
                            <p> <strong>Temporadas: </strong> {serie.number_of_seasons} </p>
                            <p> <strong>Sinopsis: </strong> {serie.overview} </p>
                            <p> <strong>Genero: </strong>
                                {serie.genres.map(genero => (
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

export default SerieDetail;