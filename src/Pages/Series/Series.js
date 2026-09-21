import React, { Component } from "react";
import SerieCard from "../../components/SerieCard/SerieCard.js";

const API_KEY = "44409d458b80c6cd77fa1ee8e33830c6";

class Series extends Component {
    constructor(props) {
        super(props);
        this.state = {
            series: [],
            pagina: 1,
            filtro: "",
            cargando: true,
        }
    }

    componentDidMount() {
        this.buscarSeries(1);
    }

    componentDidUpdate() {
        if (this.state.endpoint !== this.props.match.params.endpoint) {
            this.setState(
                { endpoint: this.props.match.params.endpoint, series: [], pagina: 1, cargando: true },
                () => this.buscarSeries(1)
            );
        }
    }



    buscarSeries(pagina) {
        let endpoint = this.props.match.params.endpoint;
        fetch(`https://api.themoviedb.org/3/tv/${endpoint}?api_key=${API_KEY}&language=es-AR&page=${pagina}`)
            .then(response => response.json())
            .then(data => {
                let seriesAcumuladas = this.state.series;
                data.results.map(serie => seriesAcumuladas.push(serie));
                this.setState({
                    series: seriesAcumuladas,
                    pagina: pagina,
                    cargando: false,
                });
            })
            .catch(error => console.log("El error fue: " + error));

    }

cargarMas() {
    this.buscarSeries(this.state.pagina + 1);
}

controlarFiltro(event) {
    this.setState({ filtro: event.target.value });
}

render() {
    let seriesFiltradas = this.state.series.filter(serie =>
        serie.name.toLowerCase().includes(this.state.filtro.toLowerCase())
    );
    return (
        <div className="container">
            <h2 className="alert alert-primary">Todas las series</h2>

            <form className="filter-form px-0 mb-3">
                <input
                    type="text"
                    placeholder="Buscar dentro de la lista"
                    value={this.state.filtro}
                    onChange={(event) => this.controlarFiltro(event)}
                />
            </form>
            {this.state.cargando
                ? <p>Cargando...</p>
                : (
                    <section className="row cards all-movies">
                        {seriesFiltradas.map(serie => (
                            <SerieCard key={serie.id} serie={serie} />
                        ))}
                    </section>
                )
            }

            <button className="btn btn-info" onClick={() => this.cargarMas()}>Cargar Mas</button>

        </div>
    );
}
}

export default Series; 