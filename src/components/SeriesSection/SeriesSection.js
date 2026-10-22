import React, { Component } from "react";
import SerieCard from "../SerieCard/SerieCard.js";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

const API_KEY = '44409d458b80c6cd77fa1ee8e33830c6';


// Reemplazo la estructura de Class por una funcion
function SeriesSection(props) {
    const [series, setSeries] = useState([]);

    // Reemplazo de componentDidMount
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/tv/${this.props.endpoint}?api_key=${API_KEY}&language=es-AR`)
            .then( response => response.json() )
            .then( data => setSeries(data.results))
            .catch( error => console.log('El error fue: ' + error));
    }, [])

    // render() {
    //     let seriesAMostrar = this.state.series
    //         ? this.state.series.filter((serie, indice) => indice < 5)
    //         : [];

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