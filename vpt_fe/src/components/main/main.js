import { useParams } from "react-router-dom";
import React, { useState } from 'react';

import GameInlist from "../gameInList/gameInList";
import priceSorting from "../../functions/PriceSorting";


const Main = (props) => {

    let params = useParams();

    const [previousUrl, setPreviousUrl] = useState("http://localhost:3000");

    if (window.location.href != previousUrl) {
        setPreviousUrl(window.location.href);
        getVideogames();
    }

    function getVideogames() {
        let url = "http://localhost:8081/";

        (params.query != undefined) ? url += "videogames/" + params.query : url += "videogamesAll/";

        if (Object.keys(Object.fromEntries([...props.searchParams])).length != 0) {
            url += "?";
            for (const [key, value] of props.searchParams.entries()) {
                url += key + "=";
                if (typeof value == "string") url += value;
                else url += value.join();
                url += "&";
            }
            url = url.substring(0, url.length -1)
        }

        fetch(url)
        .then(response => response.json())
        .then(responseJSON => {

            if (props.currentSorting[0]) responseJSON.sort((a, b) => a.title.toUpperCase().localeCompare(b.title.toUpperCase()));
            else if (props.currentSorting[1]) responseJSON.sort((a, b) => b.title.toUpperCase().localeCompare(a.title.toUpperCase()));
            else if (props.currentSorting[2]) responseJSON.sort((a, b) => priceSorting(a, b));
            else if (props.currentSorting[3]) responseJSON.sort((a, b) => priceSorting(b, a));
            else if (props.currentSorting[4]) responseJSON.sort((a, b) => Number(a.releaseDate.split("-").join("")) - Number(b.releaseDate.split("-").join("")));
            else if (props.currentSorting[5]) responseJSON.sort((a, b) => Number(b.releaseDate.split("-").join("")) - Number(a.releaseDate.split("-").join("")));

            props.setVideogames(responseJSON);

            if (responseJSON.length === 0) props.setNoGames("block")
            else props.setNoGames("none")
        });
    }

    return (
        <>
        {props.videogames.map(v => <GameInlist key={v.videogameId} game={v} />)}
        </>
    )
}

export default Main;