import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class MovieCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mostrarDescripcion: false,
        }
    }

    alternarDescripcion(){
        this.setState({mostrarDescripcion: !this.state.mostrarDescripcion });
    }

    render() {
        let pelicula = this.props.pelicula;
        let haySesion = cookies.get('user-auth-cookie');

        return(
            <article className="single-card-movie">
                <img 
                    src={`https://image.tmdb.org/t/p/w342/${pelicula.poster_path}`}
                    className='card-img-top'
                    alt={pelicula.title}
                />

                <div className="cardBody"> 
                    <h5 className='card-title'>{pelicula.title}</h5>

                    {this.state.mostrarDescripcion &&
                        <p className='card-text'>{pelicula.overview}</p>
                    }

                    <button
                        className='btn btn-secondary'
                        onClick={() => this.alternarDEscripcion()}
                    >
                        Ver descripcion
                    </button>

                    <Link to={`/pelicula/${pelicula.id}`} className="btn btn-primary">
                        Ir a detalle
                    </Link>

                    {haySesion &&
                        <button className='btn alert-primary'>Favorito</button>
                    }

                </div>
            </article>
        );
    }
}

export default MovieCard;