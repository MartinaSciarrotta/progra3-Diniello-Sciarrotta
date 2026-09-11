import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class SearchForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            texto: "",
        }
    }

    ejecutarBusqueda(event){
        event.preventDefault();
        this.props.history.push("/buscar/" + this.state.texto);
    }

    controlarCambios(event){
        this.setState({
            texto: event.targer.value,
        });
    }

    render(){
        return (
            <form className='search-form' onSubmit={(event) => this.ejecutarBusqueda(event) } >
                <input
                    type="text"
                    name="searchData"
                    placeholder='Buscar...'
                    value={this.state.texto}
                    onChange={(event) => this.controlarCambios(event) }
                />
                <button type='submit' className='btn btn-success btn-sm'>Buscar</button>
            </form>
        );
    }
}

export default withRouter(SearchForm);