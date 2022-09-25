import { useState, useEffect } from "react"

import Footer from "../../components/footer/footer";
import Navbar from "../../components/navbar/navbar"
import WatchListItem from "../../components/watchListItem/watchListItem";

import './watchListPage.css'

const WatchListPage = ({user = false, setUser = () => {}, navbarSearch = () => {}}) => {

    const [watchList, setWatchList] = useState([]);
    const [noGames, setNoGames] = useState("none")

    useEffect(
        () => {
            const watchList = [];
            let responseCounter = 0;
            let responseExpected = user.userList.length;
            if (responseExpected === 0) setNoGames("block")
            for (const item of user.userList) {
                fetch("http://localhost:8081/videogame?id=" + item.videogameId)
                .then(response => response.json())
                .then(responseJSON => {
                    watchList.push(responseJSON);
                    responseCounter++;
                    if (responseCounter == responseExpected) {
                        setWatchList(watchList);
                    }
                });
            }

        }, []
    )

    return (
        <>
        <Navbar user={user} setUser={setUser} navbarSearch={navbarSearch}/>
        <div id="watchlist-message">You will receive a notification when the price for the game in your watchlist will drop.</div>
        <div id="watchlist-noGames" style={{display: noGames}}>Add games to receive a notification</div>
        <div id="watchList-container" >
            {watchList.map(game => <WatchListItem key={game.title} game={game}/>)}
        </div>
        <Footer />
        </>

    )
}

export default WatchListPage;