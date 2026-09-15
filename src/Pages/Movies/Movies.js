import React, { Component } from "react";
import MovieCard from "../../components/MovieCard/MovieCard.js";

const API_KEY = "44409d458b80c6cd77fa1ee8e33830c6";

class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peliculas: [],
            pagina: 1,
            filtro: "",
        }
    }

    componentDidMount() {
        this.buscarPeliculas(1);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.endpoint !== this.props.match.params.endpoint) {
            this.setState({ peliculas: [], pagina: 1 });
            this.buscarPeliculas(1);
        }
    }

    buscarPeliculas(pagina) {
        let endpoint = this.props.match.params.endpoint;
        fetch(`https://api.themoviedb.org/3/movie/${endpoint}?api_key=${API_KEY}&language=es-AR&page=${pagina}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    peliculas: [...this.state.peliculas, ...data.results],
                    pagina: pagina,
                });
            })
            .catch(error => console.log("El error fue: " + error));
    }

    cargarMas() {
        this.buscarPeliculas(this.state.pagina + 1);
    }

    controlarFiltro(event) {
        this.setState({ filtro: event.target.value });
    }

    render() {
        let peliculasFiltradas = this.state.peliculas.filter(pelicula =>
            pelicula.title.toLowerCase().includes(this.state.filtro.toLowerCase())
        );
        return (
            <div className="container">
                <h2 className="alert alert-primary">Todas las peliculas</h2>

                <form className="filter-form px-0 mb-3">
                    <input
                        type="text"
                        placeholder="Buscar dentro de la lista"
                        value={this.state.filtro}
                        onChange={(event) => this.controlarFiltro(event)}
                    />
                </form>
                <button className="btn btn-info" onClick={() => this.cargarMas()}>Cargar Mas</button>

                <section className="row cards all-movies">
                    {peliculasFiltradas.map(pelicula => (
                        <MovieCard key={pelicula.id} pelicula={pelicula} />
                    ))}
                </section>

            </div>
        );
    }
}

export default Movies; 