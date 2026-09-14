import React, { Component } from "react";
import MovieCard from "../MovieCard/MovieCard.js";
import { Link } from "react-router-dom";

const API_KEY = '44409d458b80c6cd77fa1ee8e33830c6';

class MovieSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peliculas: null,
        }
    }

    componentDidMount() {
        fetch(`https://api.themoviedb.org/3/movie/${this.props.endpoint}?api_key=${API_KEY}&language=es-AR`)
            .then(response => response.json())
            .then(data => {
                this.setState({ peliculas: data.results });
            })
            .catch(error => console.log('El error fue: ' + error));
    }

    render() {
        let peliculasAMostrar = this.state.peliculas
            ? this.state.peliculas.filter((pelicula, indice) => indice < 4)
            : [];
        return (
            <>
                <h2 className="alert alert-primary">{this.props.titulo}</h2>
                <section className="row cards">
                    {this.state.peliculas
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
                <Link to={`/peliculas/${this.props.endpoint}`} className="btn btn-info">
                    Ver todas
                </Link>
            </>
        );
    }
}

export default MovieSection;