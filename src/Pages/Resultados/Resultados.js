import React, { Component } from "react";
import MovieCard from "../../components/MovieCard/MovieCard.js";
import SerieCard from "../../components/SerieCard/SerieCard.js";

const API_KEY = "44409d458b80c6cd77fa1ee8e33830c6";

class Resultados extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peliculas: null,
            series: null,
            texto: this.props.match.params.texto,
        }
    }

    componentDidMount() {
        this.buscar();
    }

    componentDidUpdate() {
        if (this.state.texto !== this.props.match.params.texto) {
            this.setState(
                {texto: this.props.match.params.texto, peliculas: null, series: null},
                () => this.buscar()
            );
        }
    }

    buscar() {
        let texto = this.props.match.params.texto;

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=es-AR&query=${texto}`)
            .then(response => response.json())
            .then(data => {
                this.setState({ peliculas: data.results });
            })
            .catch(error => console.log("El error fue: " + error));

        fetch(`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=es-AR&query=${texto}`)
            .then(response => response.json())
            .then(data => {
                this.setState({ series: data.results });
            })
            .catch(error => console.log("El error fue: " + error));
    }

    render() {
        let texto = this.props.match.params.texto;

        return (
            <div className="container">
                <h2 className="alert alert-primary">
                    Resultados para: {texto}
                </h2>

                <h3>Películas</h3>
                {this.state.peliculas === null
                    ? <p>Cargando películas...</p>
                    : this.state.peliculas.length === 0
                        ? <p>No se encontraron películas</p>
                        : (
                            <section className="row cards">
                                {this.state.peliculas.map(pelicula => (
                                    <MovieCard key={pelicula.id} pelicula={pelicula} />
                                ))}
                            </section>
                        )
                }

                <h3>Series</h3>
                {this.state.series === null
                        ? <p>Cargando series...</p>
                        : this.state.series.length === 0
                            ? <p>No se encontraron series</p>
                            : (
                                <section className="row cards">
                                    {this.state.series.map(serie => (
                                        <SerieCard key={serie.id} serie={serie} />
                                    ))}
                                </section>
                            )
                    }

            </div>
        );

    }
}

export default Resultados;