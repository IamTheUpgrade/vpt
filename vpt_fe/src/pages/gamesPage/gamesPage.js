import React, { useState } from 'react';
import { useSearchParams, Routes, Route } from "react-router-dom";

import './gamesPage.css';

import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import FilteringAndSorting from '../../components/filteringAndSorting/filteringAndSorting';
import Main from '../../components/main/main';
import priceSorting from '../../functions/PriceSorting';

const GamesPage = ({user = false, setUser = () => {}, navbarSearch = () => {}}) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [videogames, setVideogames] = useState([]);
    const [currentSorting, setCurrentSorting] = useState([false, false, false, false, false, false]);
    const [noGames, setNoGames] = useState("none");
    
    const onChangeSorting = event => {
        let sorting = event.target.value;
        let videogamesCopy = [...videogames]
        if (sorting === "A-Z") videogamesCopy.sort((a, b) => a.title.toUpperCase().localeCompare(b.title.toUpperCase()));
        else if (sorting === "Z-A") videogamesCopy.sort((a, b) => b.title.toUpperCase().localeCompare(a.title.toUpperCase()));
        else if (sorting === "asc") videogamesCopy.sort((a, b) => priceSorting(a, b));
        else if (sorting === "desc") videogamesCopy.sort((a, b) => priceSorting(b, a));
        else if (sorting === "oldest") videogamesCopy.sort((a, b) => Number(a.releaseDate.split("-").join("")) - Number(b.releaseDate.split("-").join("")));
        else if (sorting === "newest") videogamesCopy.sort((a, b) => Number(b.releaseDate.split("-").join("")) - Number(a.releaseDate.split("-").join("")));
        setVideogames(videogamesCopy)
    }

    return (
        <>
        <Navbar user={user} setUser={setUser} navbarSearch={navbarSearch}/>
        <FilteringAndSorting onChangeSorting={onChangeSorting} setSearchParams={setSearchParams} searchParams={searchParams} currentSorting={currentSorting} setCurrentSorting={setCurrentSorting} />
        <main>
            <div id='gamesPage-noGames' style={{display: noGames }}>No results found</div>
            <Routes>
                <Route index element={<Main setVideogames={setVideogames} videogames={videogames} searchParams={searchParams} currentSorting={currentSorting} setNoGames={setNoGames}/>} />
                <Route path=":query" element={<Main setVideogames={setVideogames} videogames={videogames} searchParams={searchParams} currentSorting={currentSorting} setNoGames={setNoGames}/>}/>
            </Routes>
        </main>
        <Footer />
        </>
    )
}

export default GamesPage;