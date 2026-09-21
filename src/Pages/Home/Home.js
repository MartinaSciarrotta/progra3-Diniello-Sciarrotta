import React from "react";
import SearchForm from "../../components/SearchForm/SearchForm";
import MovieSection from "../../components/MovieSection/MovieSection";
import SeriesSection from "../../components/SeriesSection/SeriesSection";


function Home () {
    return (
        <div className="container">
            <SearchForm />
            <MovieSection
                titulo="Top 5 películas"
                endpoint="popular"
            />
            <SeriesSection
                titulo="Top 5 series"
                endpoint="popular"
            />
        </div>
    );
}

export default Home;