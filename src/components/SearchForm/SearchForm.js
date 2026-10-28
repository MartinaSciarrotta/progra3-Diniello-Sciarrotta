import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

// Reemplazo la estructura de Class por una funcion
function SearchForm(props) {
    const [texto, setTexto] = useState("");
    const [tipo, setTipo] = useState("movie");

    function ejecutarBusqueda(event) {
        event.preventDefault();
        props.history.push("/buscar/" + texto);
    }

    function controlarCambios(event) {
        setTexto(event.target.value);
    }

    return (
        <form className='search-form' onSubmit={(event) => ejecutarBusqueda(event)}>
            <input
                type="text"
                name="searchData"
                placeholder='Buscar...'
                value={texto}
                onChange={(event) => controlarCambios(event)}
            />
            <button type='submit' className='btn btn-success btn-sm'>Buscar</button>
        </form>
    );
}

export default withRouter(SearchForm);

