import React, { Component } from "react";
import Cookies from "universal-cookie";

const API_KEY = "44409d458b80c6cd77fa1ee8e33830c6";

const cookies = new Cookies();

class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pelicula: null,
            esFavorito: null,
        }
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=es-AR`)
            .then(response => response.json())
            .then(data => {
                this.setState({ pelicula: data });

                let storage = JSON.parse(localStorage.getItem("favoritos-peliculas"));
                if (storage !== null) {
                    this.setState({esFavorito: storage.includes(data.id)});
                }
            })
            .catch(error => console.log("El error fue: " + error));
    }

    agregarFav() {
        let storage = JSON.parse(localStorage.getItem("favoritos-peliculas"));

        if (storage !== null) {
            storage.push(this.state.pelicula.id)
        } else {
            storage = [this.state.pelicula.id];
        }

        localStorage.setItem("favoritos-peliculas", JSON.stringify(storage));
        this.setState({ esFavorito: true });
    }

    sacarFav() {
        let storage = JSON.parse(localStorage.getItem("favoritos-peliculas"));
        let storageFiltrado = storage.filter((id) => id !== this.state.pelicula.id);

        localStorage.setItem("favoritos-peliculas", JSON.stringify(storageFiltrado));
        this.setState({ esFavorito: false });
    }

    render() {
        let pelicula = this.state.pelicula;
        let haySesion = cookies.get("user-auth-cookie");

        return (
            <div className="container">
                {pelicula === null
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
                                    ? (this.state.esFavorito
                                        ? <button className="btn btn-primary" onClick={() => this.sacarFav()}>Sacar de Favoritos</button>
                                        : <button className="btn btn-primary" onClick={() => this.agregarFav()}>Agregar a Favoritos</button>
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

}

export default MovieDetail;