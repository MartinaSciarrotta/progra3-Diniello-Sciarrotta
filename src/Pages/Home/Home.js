import React from "react";
import SearchForm from "../../components/SearchForm/SearchForm";
import MovieSection from "../../components/MovieSection/MovieSection";


function Home () {
    return (
        <div className="container">
            <SearchForm />
            <MovieSection
                titulo="Películas más vistas esta semana"
                endpoint="popular"
            />
            <MovieSection
                titulo="Películas en cartelera"
                endpoint="now_playing"
            />
        </div>
    );
}

export default Home;