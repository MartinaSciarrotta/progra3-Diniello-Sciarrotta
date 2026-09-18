import React, { Component } from "react";
import SeriesCard from "../SeriesCard/SeriesCard.js";
import { Link } from "react-router-dom";

const API_KEY = '44409d458b80c6cd77fa1ee8e33830c6';

class SeriesSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            series: null,
        }
    }

    componentDidMount() {
        fetch(`https://api.themoviedb.org/3/tv/${this.props.endpoint}?api_key=${API_KEY}&language=es-AR`)
            .then(response => response.json())
            .then(data => {
                this.setState({ series: data.results });
            })
            .catch(error => console.log('El error fue: ' + error));
    }

    render() {
        let seriesAMostrar = this.state.series
            ? this.state.series.filter((serie, indice) => indice < 4)
            : [];
        return (
            <>
                <h2 className="alert alert-primary">{this.props.titulo}</h2>
                <section className="row cards">
                    {this.state.series
                        ? seriesAMostrar.map(serie => {
                            return (
                                <SerieCard
                                    key={serie.id}
                                    serie={serie}
                                />
                            );
                        })
                        : <p>Cargando...</p>
                    }
                </section>
                <Link to={`/series/${this.props.endpoint}`} className="btn btn-info">
                    Ver todas
                </Link>
            </>
        );
    }
}

export default SeriesSection;