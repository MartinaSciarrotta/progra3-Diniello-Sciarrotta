import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

// Reemplazo la estructura de Class por una funcion
function MovieCard(props) {
    const [mostrarDescripcion, setMostrarDescripcion] = useState(false); // Arranca oculta: se muestra recién con el click en "Ver descripción"
    const [esFavorito, setEsFavorito] = useState(false); // Valor por defecto hasta que el useEffect confirme si está en localStorage

    // Reemplazo de componentDidMount
    useEffect(() => {
        let storage = JSON.parse(localStorage.getItem('favoritos-peliculas'));

        if (storage !== null) {
            let yaEsFavorito = storage.includes(props.pelicula.id); // "props", no "this.props": acá no hay this
            setEsFavorito(yaEsFavorito);
        }
    }, []); // array vacío = corre una sola vez al montar, igual que componentDidMount

    function alternarDescripcion() {
        setMostrarDescripcion(!mostrarDescripcion);
    }

    function agregarFav() {
        let storage = JSON.parse(localStorage.getItem("favoritos-peliculas"));

        if (storage !== null) {
            storage.push(props.pelicula.id);
        } else {
            storage = [props.pelicula.id];
        }

        localStorage.setItem("favoritos-peliculas", JSON.stringify(storage));
        setEsFavorito(true); // reemplazo de this.setState({ esFavorito: true })
    }

    function sacarFav() {
        let storage = JSON.parse(localStorage.getItem("favoritos-peliculas"));
        let storageFiltrado = storage.filter((id) => id !== props.pelicula.id);

        localStorage.setItem("favoritos-peliculas", JSON.stringify(storageFiltrado));
        setEsFavorito(false);

        if (props.alSacarFav) {
            props.alSacarFav();
        }
    }

    let pelicula = props.pelicula;
    let haySesion = cookies.get('user-auth-cookie');

    return (
        <article className="single-card-movie">
            <img
                src={`https://image.tmdb.org/t/p/w342/${pelicula.poster_path}`}
                className='card-img-top'
                alt={pelicula.title}
            />

            <div className="cardBody">
                <h5 className='card-title'>{pelicula.title}</h5>

                {/* Antes era this.state.mostrarDescripcion, ahora es directo la variable */}
                {mostrarDescripcion
                    ? <p className='card-text'>{pelicula.overview}</p>
                    : ''
                }

                <button className='btn btn-secondary' onClick={() => alternarDescripcion()}>
                    Ver descripcion
                </button>

                <Link to={`/pelicula/${pelicula.id}`} className="btn btn-primary">Ir a detalle</Link>

                {haySesion
                    ? (esFavorito
                        ? <button className='btn alert-primary' onClick={() => sacarFav()}>Sacar de Favoritos</button>
                        : <button className='btn alert-primary' onClick={() => agregarFav()}>Agregar a Favoritos</button>
                    )
                    : ''
                }
            </div>
        </article>
    );
}

export default MovieCard;