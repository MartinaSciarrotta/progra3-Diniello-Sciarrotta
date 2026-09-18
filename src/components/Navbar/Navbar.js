import React from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies ();

function Navbar () {
    let haySesion = cookies.get('user-auth-cookie');

    return (
        <nav>
            <ul className="nav nav-tabs my-4">

                <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </li> 
                <li className="nav-item">
                    <Link className="nav-link" to="/peliculas/popular">Películas</Link>
                </li> 
                <li className="nav-item">
                    <Link className="nav-link" to="/peliculas/now_playing">Películas en cartelera</Link>
                </li>   
                <li className="nav-item">
                    <Link className="nav-link" to="/series/popular">Series</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/series/on_the_air">Series en emisión</Link>
                </li>

                {haySesion 
                    ? <li className="nav-item">
                        <Link className="nav-link" to="/favoritos">Favoritos</Link>
                    </li>
                    : ''

                }

                {!haySesion
                    ? <li className="nav-item ml-auto">
                        <Link className="nav-link" to="/registro">Registro</Link>
                    </li>
                    : ''
                }

                {!haySesion
                    ? <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    : ''
                }

            </ul>
        </nav>
    )
}

export default Navbar;