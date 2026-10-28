import React, { useState, useEffect } from "react";
import MovieCard from "../../components/MovieCard/MovieCard.js";

const API_KEY = "44409d458b80c6cd77fa1ee8e33830c6";

function Movies(props) {
    const [peliculas, setPeliculas] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [filtro, setFiltro] = useState("");
    const [cargando, setCargando] = useState(true);
    const [endpoint, setEndpoint] = useState(props.match.params.endpoint);

    function buscarPeliculas(paginaABuscar) {
        let endpoint = props.match.params.endpoint;
        fetch(`https://api.themoviedb.org/3/movie/${endpoint}?api_key=${API_KEY}&language=es-AR&page=${pagina}`)
            .then(response => response.json())
            .then(data => {
                let peliculasAcumuladas = peliculas;
                data.results.map(pelicula => peliculasAcumuladas.push(pelicula));
                setPeliculas(peliculasAcumuladas);
                setPagina(pagina);
                setCargando(false);
                })
            .catch(error => console.log("El error fue: " + error));
    }

    useEffect(() => {
        setPeliculas([]);
        setPagina(1);
        setCargando(true);
        buscarPeliculas(1);
    }, [endpoint]);

    function cargarMas() {
        buscarPeliculas(pagina + 1);
    }
    
    function controlarFiltro(event) {
        setFiltro(event.target.value);
    }

    let peliculasFiltradas = peliculas.filter(pelicula =>
        pelicula.title.toLowerCase().includes(filtro.toLowerCase())
    );

    return (
        <div className="container">
            <h2 className="alert alert-primary">Todas las peliculas</h2>

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
                        {peliculasFiltradas.map(pelicula => (
                            <MovieCard key={pelicula.id} pelicula={pelicula} />
                        ))}
                    </section>
                )
            }

            <button className="btn btn-info" onClick={() => cargarMas()}>Cargar Mas</button>

        </div>
    );
}

export default Movies; 