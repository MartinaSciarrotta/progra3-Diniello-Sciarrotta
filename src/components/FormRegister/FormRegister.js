import React, { useState } from "react";

// Reemplazo la estructura de Class por una funcion
function FormRegister(props) {
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

        let usuarioACrear = {
            email: email,
            password: password,
        };

        if (!email.includes("@")) {
            setError("El email ingresado no es válido");
            return;
        }

        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        let usersStorage = localStorage.getItem("users");

        if (usersStorage !== null) {
            let usersParseado = JSON.parse(usersStorage);
            let usersFiltrado = usersParseado.filter(function (user) {
                return user.email === usuarioACrear.email;
            });

            if (usersFiltrado.length > 0) {
                setError("Ya existe un usuario con ese email");
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

        props.history.push("/login");
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

            <input type="submit" value="Crear cuenta" className="btn btn-primary" />
            {error === "" ? null : <p className="error">{error}</p>}
        </form>
    );
}

export default FormRegister;