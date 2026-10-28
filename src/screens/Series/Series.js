import React, { useState, useEffect } from "react";
import SerieCard from "../../components/SerieCard/SerieCard.js";

const API_KEY = "44409d458b80c6cd77fa1ee8e33830c6";

function Series(props) {
    // "endpoint" sale directo de props, ya no hace falta guardarlo en estado
    const endpoint = props.match.params.endpoint;

    const [series, setSeries] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [filtro, setFiltro] = useState("");
    const [cargando, setCargando] = useState(true);

    function buscarSeries(paginaABuscar) {
        fetch(`https://api.themoviedb.org/3/tv/${endpoint}?api_key=${API_KEY}&language=es-AR&page=${paginaABuscar}`)
            .then(response => response.json())
            .then(data => {
                // Array nuevo con spread, no .push sobre el viejo (igual que en Movies.js)
                setSeries(seriesPrevias => [...seriesPrevias, ...data.results]);
                setPagina(paginaABuscar);
                setCargando(false);
            })
            .catch(error => console.log("El error fue: " + error));
    }

    // Un solo useEffect reemplaza componentDidMount + componentDidUpdate:
    // corre al montar y cada vez que cambia "endpoint" en la URL
    useEffect(() => {
        setSeries([]);
        setPagina(1);
        setCargando(true);
        buscarSeries(1);
    }, [endpoint]);

    function cargarMas() {
        buscarSeries(pagina + 1);
    }

    function controlarFiltro(event) {
        setFiltro(event.target.value);
    }

    // Derivado de series + filtro, no necesita su propio useState
    let seriesFiltradas = series.filter(serie =>
        serie.name.toLowerCase().includes(filtro.toLowerCase())
    );

    return (
        <div className="container">
            <h2 className="alert alert-primary">Todas las series</h2>

            <form className="filter-form px-0 mb-3">
                <input
                    type="text"
                    placeholder="Buscar dentro de la lista"
                    value={filtro}
                    onChange={(event) => controlarFiltro(event)}
                />
            </form>
            {cargando
                ? <p>Cargando...</p>
                : (
                    <section className="row cards all-movies">
                        {seriesFiltradas.map(serie => (
                            <SerieCard key={serie.id} serie={serie} />
                        ))}
                    </section>
                )
            }

            <button className="btn btn-info" onClick={() => cargarMas()}>Cargar Mas</button>

        </div>
    );
}

export default Series;