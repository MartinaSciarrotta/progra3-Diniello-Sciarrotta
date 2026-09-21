import React, { Component } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class FormLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: "",
        }
    }

    controlarEmail(event) {
        this.setState({ email: event.target.value });
    }

    controlarPassword(event) {
        this.setState({ password: event.target.value });
    }

    submit(event) {
        event.preventDefault();

        let usersSorage = localStorage.getItem("users");

        if (usersSorage === null) {
            this.setState({ error: "No hay usuarios registrados" });
            return;
        }

        let usersParseado = JSON.parse(usersSorage);

        let usuarioEncontrado = usersParseado.filter (function (user) {
            return user.email === this.state.email && user.password === this.state.password;
        }.bind(this)); 

        if (usuarioEncontrado.length === 0) {
            this.setState({ error: "Usuario o contraseña incorrectos" });
            return;
        }

        cookies.set('user-auth-cookie', usuarioEncontrado[0].email, { path: '/' });

        this.props.history.push("/");
    }

    render() {
        return (
            <form onSubmit={(event) => this.submit(event)}>
                <label>Email:</label>
                <input
                    type="email"
                    value={this.state.email}
                    onChange={(event) => this.controlarEmail(event)}
                />
                <label>Password:</label>
                <input
                    type="password"
                    value={this.state.password}
                    onChange={(event) => this.controlarPassword(event)}
                />
                <input type="submit" value="Ingresar" className="btn btn-primary"/>
                {this.state.error === "" ? null : <p className="error">{this.state.error}</p>}
            </form>
        );
    }
}

export default FormLogin;