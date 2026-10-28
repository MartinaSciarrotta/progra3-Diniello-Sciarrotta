import React, { useState } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// Reemplazo la estructura de Class por una funcion
function FormLogin(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function controlarEmail(event) {
        setEmail(event.target.value);
    }

    function controlarPassword(event) {
        setPassword(event.target.value);
    }

    function submit(event) {
        event.preventDefault();

        let usersStorage = localStorage.getItem("users");

        if (usersStorage === null) {
            setError("No hay usuarios registrados");
            return;
        }

        let usersParseado = JSON.parse(usersStorage);
        let emailIngresado = email;

        let usuarioEncontrado = usersParseado.filter(function (user) {
            return user.email === emailIngresado;
        });

        if (usuarioEncontrado.length === 0) {
            setError("Usuario o contraseña incorrectos");
            return;
        }

        if (usuarioEncontrado[0].password !== password) {
            setError("Usuario o contraseña incorrectos");
            return;
        }

        cookies.set('user-auth-cookie', usuarioEncontrado[0].email);

        props.history.push("/");
    }

    return (
        <form onSubmit={(event) => submit(event)}>
            <label>Email:</label>
            <input
                type="email"
                value={email}
                onChange={(event) => controlarEmail(event)}
            />
            <label>Password:</label>
            <input
                type="password"
                value={password}
                onChange={(event) => controlarPassword(event)}
            />
            <input type="submit" value="Ingresar" className="btn btn-primary" />
            {error === "" ? null : <p className="error">{error}</p>}
        </form>
    );
}

export default FormLogin;