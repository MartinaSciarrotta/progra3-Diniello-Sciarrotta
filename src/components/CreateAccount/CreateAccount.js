import React, { Component } from "react";
import FormRegister from "../FormRegister/FormRegister";

class CreateAccount extends Component {
    render() {
        return (
            <>
            <h2 className="alert alert-primary">Crear Cuenta</h2>
            <FormRegister history={this.props.history}/>
            </>
        );
    }
}

export default CreateAccount;