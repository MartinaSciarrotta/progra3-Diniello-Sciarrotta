import React from "react";
import SearchForm from "../../components/SearchForm/SearchForm";
import MovieSection from "../../components/MovieSection/MovieSection";


function Home () {
    return (
        <div className="container">
            <SearchForm />
            <MovieSection
                titulo="Popular movies this week"
                endpoint="popular"
            />
            <MovieSection
                titulo="Movie now playing"
                endpoint="now_playing"
            />
        </div>
    );
}

export default Home;