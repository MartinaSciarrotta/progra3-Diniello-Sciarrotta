import React, { Component } from "react";

class FormRegister extends Component {
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

        let usuarioACrear = {
            email: this.state.email,
            password: this.state.password,
        };

        if (!this.state.email.includes("@")) {
            this.setState({ error: "El email ingresado no es válido" });
            return;
        }

        if (this.state.password.length < 6) {
            this.setState({ error: "La contraseña debe tener al menos 6 caracteres" });
            return;
        }

        let usersStorage = localStorage.getItem("users")

        if (usersStorage !== null) {
            let usersParseado = JSON.parse(usersStorage);
            let usersFiltrado = usersParseado.filter(function (user) {
                return user.email === usuarioACrear.email;
            });

            if (usersFiltrado.length > 0) {
                this.setState({ error: "Ya existe un usuario con ese email" });
                return;
            } else {
                usersParseado.push(usuarioACrear);
                let usersEnJson = JSON.stringify(usersParseado);
                localStorage.setItem("users", usersEnJson);
            }
        } else {
            let usersInicial = [usuarioACrear];
            let usersEnJson = JSON.stringify(usersInicial);
            localStorage.setItem("users", usersEnJson);
        }

        this.props.history.push("/login");
    }

    render(){
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

                <input type="submit" value="Crear cuenta" className="btn btn-primary" />
                {this.state.error === "" ? null : <p className="error">{this.state.error}</p>}
            </form>
        );
    }
}

export default FormRegister;