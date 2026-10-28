import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function SerieCard(props) {
    const [mostrarDescripcion, setMostrarDescripcion] = useState(false); // Arranca oculta: se muestra recién con el click en "Ver descripción"
    const [esFavorito, setEsFavorito] = useState(false); // Valor por defecto hasta que el useEffect confirme si está en localStorage

    // Reemplazo de componentDidMount
    useEffect(() => {
        let storage = JSON.parse(localStorage.getItem('favoritos-series'));

        if (storage !== null) {
            let yaEsFavorito = storage.includes(props.serie.id);
            setEsFavorito(yaEsFavorito);
        }
    }, []);

    function alternarDescripcion() {
        setMostrarDescripcion(!mostrarDescripcion);
    }

    function agregarFav() {
        let storage = JSON.parse(localStorage.getItem("favoritos-series"));

        if (storage !== null) {
            storage.push(props.serie.id);
        } else {
            storage = [props.serie.id];
        }

        localStorage.setItem("favoritos-series", JSON.stringify(storage));
        setEsFavorito(true);
    }

    function sacarFav() {
        let storage = JSON.parse(localStorage.getItem("favoritos-series"));
        let storageFiltrado = storage.filter((id) => id !== props.serie.id);

        localStorage.setItem("favoritos-series", JSON.stringify(storageFiltrado));
        setEsFavorito(false);

        if (props.alSacarFav) {
            props.alSacarFav();
        }
    }

    let serie = props.serie;
    let haySesion = cookies.get('user-auth-cookie');

    return (
        <article className="single-card-movie">
            <img
                src={`https://image.tmdb.org/t/p/w342/${serie.poster_path}`}
                className='card-img-top'
                alt={serie.name}
            />

            <div className="cardBody">
                <h5 className='card-title'>{serie.name}</h5>

                {mostrarDescripcion
                    ? <p className='card-text'>{serie.overview}</p>
                    : ''
                }

                <button
                    className='btn btn-secondary'
                    onClick={() => alternarDescripcion()}
                >
                    Ver descripcion
                </button>

                <Link to={`/serie/${serie.id}`} className="btn btn-primary">Ir a detalle</Link>

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

export default SerieCard;