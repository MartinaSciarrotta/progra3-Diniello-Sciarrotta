import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class SerieCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mostrarDescripcion: false,
            esFavorito: false,
        }
    }

    componentDidMount() {
        let storage = JSON.parse(localStorage.getItem('favoritos-series'));

        if (storage !== null) {
            let yaEsFavorito = storage.includes(this.props.serie.id);
            this.setState({ esFavorito: yaEsFavorito });
        }
    }

    alternarDescripcion() {
        this.setState({mostrarDescripcion: !this.state.mostrarDescripcion});
    }

    agregarFav() {
        let storage = JSON.parse(localStorage.getItem("favoritos-series"));

        if (storage !== null) {
            storage.push(this.props.serie.id)
        } else {
            storage = [this.props.serie.id];
        }

        localStorage.setItem("favoritos-series", JSON.stringify(storage));
        this.setState({ esFavorito: true });
    }

    sacarFav() {
        let storage = JSON.parse(localStorage.getItem("favoritos-series"));
        let storageFiltrado = storage.filter((id) => id !== this.props.serie.id);

        localStorage.setItem("favoritos-series", JSON.stringify(storageFiltrado));
        this.setState({ esFavorito: false });
    }

    render() {
        let serie = this.props.serie;
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

                    {this.state.mostrarDescripcion
                        ? <p className='card-text'>{serie.overview}</p>
                        : ''
                    }

                    <button
                        className='btn btn-secondary'
                        onClick={() => this.alternarDescripcion()}
                    >
                        Ver descripcion
                    </button>

                    <Link to={`/serie/${serie.id}`} className="btn btn-primary">Ir a detalle</Link>

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

export default SerieCard;