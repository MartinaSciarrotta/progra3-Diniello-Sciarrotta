import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useState, useEffect } from 'react';

const cookies = new Cookies();

// Reemplazo la estructura de Class por una funcion
function MovieCard(props) {
    const [movieCard, setMovieCard] = useState([]);

    // Reemplazo de componentDidMount
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${this.props.endpoint}?api_key=${API_KEY}&language=es-AR`)
            .then(response => response.json())
            .then(data => setMovies(data.results))
            .catch(error => console.log('El error fue: ' + error))
    }, [])
    useEffect(() => {
        let storage = JSON.parse(localStorage.getItem('favoritos-peliculas'));
    
        if (storage !== null) {
            let yaEsFavorito = storage.includes(this.props.pelicula.id);
            this.setState({ esFavorito: yaEsFavorito });
        }
    }, []) 

}

alternarDescripcion() {
    this.setState({ mostrarDescripcion: !this.state.mostrarDescripcion });
}

agregarFav() {
    let storage = JSON.parse(localStorage.getItem("favoritos-peliculas"));

    if (storage !== null) {
        storage.push(this.props.pelicula.id)
    } else {
        storage = [this.props.pelicula.id];
    }

    localStorage.setItem("favoritos-peliculas", JSON.stringify(storage));
    this.setState({ esFavorito: true });
}

sacarFav() {
    let storage = JSON.parse(localStorage.getItem("favoritos-peliculas"));
    let storageFiltrado = storage.filter((id) => id !== this.props.pelicula.id);

    localStorage.setItem("favoritos-peliculas", JSON.stringify(storageFiltrado));
    this.setState({ esFavorito: false });

    if (this.props.alSacarFav) {
        this.props.alSacarFav();
    }
}

render() {
    let pelicula = this.props.pelicula;
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

                {this.state.mostrarDescripcion
                    ? <p className='card-text'>{pelicula.overview}</p>
                    : ''
                }

                <button
                    className='btn btn-secondary'
                    onClick={() => this.alternarDescripcion()}
                >
                    Ver descripcion
                </button>

                <Link to={`/pelicula/${pelicula.id}`} className="btn btn-primary">Ir a detalle</Link>

                {haySesion
                    ? (this.state.esFavorito
                        ? <button className='btn alert-primary' onClick={() => this.sacarFav()}>Sacar de Favoritos</button>
                        : <button className='btn alert-primary' onClick={() => this.agregarFav()}>Agregar a Favoritos</button>
                    )
                    : ''
                }

            </div>
        </article>
    );
}
}

export default MovieCard;