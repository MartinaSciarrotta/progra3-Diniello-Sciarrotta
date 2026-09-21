import React, { Component } from "react";
import Cookies from "universal-cookie";

const API_KEY = "44409d458b80c6cd77fa1ee8e33830c6";

const cookies = new Cookies();

class SerieDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serie: null,
            esFavorito: null,
        }
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=es-AR`)
            .then(response => response.json())
            .then(data => {
                this.setState({ serie: data });

                let storage = JSON.parse(localStorage.getItem("favoritos-series"));
                if (storage !== null) {
                    this.setState({esFavorito: storage.includes(data.id)});
                }
            })
            .catch(error => console.log("El error fue: " + error));
    }

    agregarFav() {
        let storage = JSON.parse(localStorage.getItem("favoritos-series"));

        if (storage !== null) {
            storage.push(this.state.serie.id)
        } else {
            storage = [this.state.serie.id];
        }

        localStorage.setItem("favoritos-series", JSON.stringify(storage));
        this.setState({ esFavorito: true });
    }

    sacarFav() {
        let storage = JSON.parse(localStorage.getItem("favoritos-series"));
        let storageFiltrado = storage.filter((id) => id !== this.state.serie.id);

        localStorage.setItem("favoritos-series", JSON.stringify(storageFiltrado));
        this.setState({ esFavorito: false });
    }

    render() {
        let serie = this.state.serie;
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

export default SerieDetail;