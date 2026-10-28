import React, { useState, useEffect } from "react";
import SerieCard from "../SerieCard/SerieCard.js";
import { Link } from "react-router-dom";

const API_KEY = '44409d458b80c6cd77fa1ee8e33830c6';

function SeriesSection(props) {
    const [series, setSeries] = useState(null);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/tv/${props.endpoint}?api_key=${API_KEY}&language=es-AR`)
            .then(response => response.json())
            .then(data => setSeries(data.results))
            .catch(error => console.log('El error fue: ' + error));
    }, []);

    let seriesAMostrar = series
        ? series.filter((serie, indice) => indice < 5)
        : [];

    return (
        <>
            <h2 className="alert alert-primary">{props.titulo}</h2>
            <section className="row cards">
                {series
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
            <Link to={`/series/${props.endpoint}`} className="btn btn-info">
                Ver todas
            </Link>
        </>
    );
}

export default SeriesSection;