import React, { Component } from "react";
import FormLogin from "../FormLogin/FormLogin";

class Login extends Component {
    render() {
        return (
            <>
                <h2 className="alert alert-primary">Iniciar Sesión</h2>
                <FormLogin history={this.props.history} />
            </>
        );
    }
}   

export default Login;