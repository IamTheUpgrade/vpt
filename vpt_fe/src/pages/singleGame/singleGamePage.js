import { useState } from "react";
import { useParams} from "react-router-dom";

import './singleGamePage.css';

import Footer from "../../components/footer/footer";
import GameInlist from "../../components/gameInList/gameInList";
import Navbar from "../../components/navbar/navbar";

const SingleGamePage = ({user = false, setUser = () => {}, navbarSearch = () => {}}) => {

    let param = useParams();

    const [previousUrl, setPreviousUrl] = useState("")

    const [game, setGame] = useState({});
    const [categories, setCategories] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [subtitles, setSubtitles] = useState([]);
    const [systems, setSystems] = useState([]);
    const [contents, setContents] = useState([]);
    const [gameReferenced, setGameReferenced] = useState([]);

    const [prices, setPrices] = useState([]);
    const [dates, setDates] = useState([]);
    const [flexDirection, setFlexDirection] = useState("row-reverse");

    const [bellColor, setBellColor] = useState("black");

    if (window.location.href != previousUrl) {
        setPreviousUrl(window.location.href);
        fetch("http://localhost:8081/videogame/" + param.title)
        .then(response => response.json())
        .then(responseJSON => {
            setGame(responseJSON);

            if (user) {
                (user.userList.find(item => item.videogameId == responseJSON.videogameId)) ? setBellColor("#0474db") : setBellColor("black")
            }

            let categories = [];
            for (const category of responseJSON.categories) {
                categories.push(category.category)
            }
            setCategories(categories);

            let languages = [];
            for (const language of responseJSON.languages) {
                languages.push(language.language)
            }
            setLanguages(languages);

            let subtitles = [];
            for (const subtitle of responseJSON.subtitles) {
                subtitles.push(subtitle.subtitle)
            }
            setSubtitles(subtitles);

            let systems = [];
            for (const system of responseJSON.systems) {
                systems.push(system.system)
            }
            setSystems(systems);

            let contents = [];
            for (const content of responseJSON.contents) {
                contents.push(content.content)
            }
            setContents(contents);

            let priceHistory = [];
            for (const price of responseJSON.priceHistory) {
                priceHistory.push(price)
            }

            (async function getGamesReferenced() {
                let gamesReferenced = [];

                for (const gameReferenced of responseJSON.gameReferenced) {
                    let response = await fetch("http://localhost:8081/videogame?id=" + gameReferenced.reference)
                    let responseJSON = await response.json();
                    gamesReferenced.push(responseJSON)
                }
                setGameReferenced(gamesReferenced);
            })();
            
            createGraphic(priceHistory, responseJSON.releaseDate, responseJSON.basePrice, responseJSON.currentDiscountedPrice)

        });

    }

    const langSub = () => {
        const map = new Map();

        for (const language of languages) {
            map.set(language, [true])
        }
        for (const subtitle of subtitles) {
            if (map.has(subtitle)) map.set(subtitle, [true, true])
            else  map.set(subtitle, [false, true])
        }

        let items = [];

        for (const [key, value] of map.entries()) {
            items.push(<li key={key} className="lang-sub-item">
                <p>{key}</p>
                <p>{value[0] ? <span className="material-symbols-outlined">check</span> : <span className="material-symbols-outlined">close</span>}</p>
                <p>{value[1] ? <span className="material-symbols-outlined">check</span >: <span className="material-symbols-outlined">close</span>}</p>
            </li>)
        }

        return items;

    }

    const createGraphic = (priceHistory, releaseDate, basePrice, currentDiscountedPrice) => {

        let canvasGraphic = document.getElementById("game-priceHistory-graphic");
        let canvasData = document.getElementById("game-priceHistory-data");
        let canvasWidth = canvasGraphic.width;
        let graphic = canvasGraphic.getContext("2d");
        let data = canvasData.getContext("2d");

        canvasGraphic.width = canvasGraphic.width;
        canvasData.width = canvasData.width;


        let prices = [];
        let dates = [];

        let nDates = new Date().getFullYear() - releaseDate.split("-")[0];

        if (nDates == 0) setFlexDirection("row")

        for (let i = 0; i <= nDates; i++) {
            dates.push(<p key={i} style={{fontSize: "1vw"}}>{new Date().getFullYear() - i}</p>)
        }

        setDates(dates)

        let differenceDate = (new Date() - new Date(releaseDate)) / 86400000;

        data.strokeStyle = "rgb(200, 200, 200)";
        data.lineWidth = 1;

        for (let i = 0; i <= (Math.ceil(basePrice) / 10); i++) {
            data.moveTo(0, 300 - (300 / (Math.ceil(basePrice) / 10) * i));
            data.lineTo(1000, 300 - (300 / (Math.ceil(basePrice) / 10) * i));
            let marginTop = ((18.5 - (Math.ceil(basePrice) / 10 + 1)) / (Math.ceil(basePrice) / 10)) - 0.2;
            prices.push(<p key={i} style={{textAlign: "center", marginTop: marginTop + "vw", fontSize: "1vw" }}>{i * 10}</p>)
        }

        setPrices(prices)

        data.stroke()

        graphic.strokeStyle ="#0474db";
        graphic.lineWidth = 3;
        graphic.lineCap = "round";

        if (basePrice == 0) graphic.moveTo(0, 300);
        else graphic.moveTo(0, 0);

        let lastX = 0;


        for (let i = 0; i < priceHistory.length; i++) {
            if (i == 0 ) {
                
                let xStartDiscount = canvasWidth * ((new Date(priceHistory[i].startDate) - new Date(releaseDate)) / 86400000) / differenceDate;
                let yDiscount = 300 - (300 * priceHistory[i].price) / basePrice;
                let xEndDiscount = xStartDiscount + (canvasWidth * ((new Date(priceHistory[i].endDate) - new Date(priceHistory[i].startDate)) / 86400000) / differenceDate);
                lastX = xEndDiscount;

                graphic.lineTo(xStartDiscount, 0)
                graphic.lineTo(xStartDiscount, yDiscount)
                graphic.lineTo(xEndDiscount, yDiscount)

            } else {
                
                if (priceHistory[i].startDate != priceHistory[i - 1].startDate) {

                    let xStartDiscount = canvasWidth * ((new Date(priceHistory[i].startDate) - new Date(priceHistory[i - 1].endDate)) / 86400000) / differenceDate + lastX;
                    let yDiscount = 300 - (300 * priceHistory[i].price) / basePrice;
                    let xEndDiscount = canvasWidth * ((new Date(priceHistory[i].endDate) - new Date(priceHistory[i].startDate)) / 86400000) / differenceDate;

                    graphic.lineTo(lastX, 0);
                    graphic.lineTo(xStartDiscount, 0)
                    graphic.lineTo(xStartDiscount, yDiscount)
                    lastX = xStartDiscount
                    graphic.lineTo(xEndDiscount + lastX, yDiscount)
                    lastX += xEndDiscount;

                } else {

                    let yDiscount = 300 - (300 * priceHistory[i].price) / basePrice;
                    let xEndDiscount = canvasWidth * ((new Date(priceHistory[i].endDate) - new Date(priceHistory[i].startDate)) / 86400000) / differenceDate;

                    graphic.lineTo(lastX, yDiscount);
                    graphic.lineTo(xEndDiscount + lastX, yDiscount);
                    lastX += xEndDiscount;

                }

            }
            
        }

        if (priceHistory.length != 0) {
            if (currentDiscountedPrice == null) {
                graphic.lineTo(lastX, 0)
                graphic.lineTo(canvasWidth * ((new Date() - new Date(priceHistory[priceHistory.length - 1].endDate)) / 86400000) / differenceDate + lastX, 0) // move in horizontal till currentDay
            }
        } else {
            if (basePrice == 0) graphic.lineTo(canvasWidth * ((new Date() - new Date(releaseDate)) / 86400000) / differenceDate, 300)
            else graphic.lineTo(canvasWidth * ((new Date() - new Date(releaseDate)) / 86400000) / differenceDate, 0)
        }

        graphic.stroke()

    }

    const addOrDeleteGameWatchList = () => {
        if (!user) return;
        if (bellColor == "black") {
            fetch("http://localhost:8081/watchlist?videogameId=" + game.videogameId, {
                method: 'POST',
                body: JSON.stringify(user),
                mode: 'cors',
                headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(responseJSON => {
                const userCopy = {...user};
                userCopy.userList.push(responseJSON)
                setUser(userCopy)
            })
            setBellColor("#0474db");
        } else {
            let userCopy = {...user};
            const watchlistItem = userCopy.userList.find(item => item.videogameId == game.videogameId);
            userCopy.userList = userCopy.userList.filter(item => item.videogameId != game.videogameId);
            fetch("http://localhost:8081/watchlist", {
                method: 'DELETE',
                body: JSON.stringify(watchlistItem),
                mode: 'cors',
                headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json'
                }
            })
            setBellColor("black");
            setUser(userCopy);
        }
    }
    
    return (
        <>
            <Navbar user={user} setUser={setUser} navbarSearch={navbarSearch}/>
            <div id="game-container">
                <div id="game-title-container">
                    <p id="game-title">{game.title}</p>
                    <p><i onClick={addOrDeleteGameWatchList} style={{color: bellColor}} id="game-bell" className="fa-regular fa-bell"></i></p>
                </div>
                <div id="game-information-container">
                    <div id="game-information">
                        <div className="game-inf-item">
                            <p className="game-inf-title">type:</p>
                            <p>{game.type}</p>
                        </div>
                        <div className="game-inf-item">
                            <p className="game-inf-title">developer:</p>
                            <p>{game.developer}</p>
                        </div>
                        <div className="game-inf-item">
                            <p className="game-inf-title">publisher:</p>
                            <p>{game.publisher}</p>
                        </div>
                        <div className="game-inf-item">
                            <p className="game-inf-title">release date:</p>
                            <p>{game.releaseDate}</p>
                        </div>
                        <div className="game-inf-item">
                            <p className="game-inf-title">categories:</p>
                            <p>{categories.join(", ")}</p>
                        </div>
                        <div className="game-inf-item">
                            <p className="game-inf-title">systems:</p>
                            <p>{systems.join(", ")}</p>
                        </div>
                        <div id="contents-container">
                            <p id="contents-title">contents:</p>
                            <ul id="contents-list">
                                {contents.map((content, index) => <li key={index}>{content}</li>)}
                            </ul>
                        </div>
                    </div>
                    <div id="img-container">
                        {game.cover == null ? null : <img src={"data:image/png;base64," + game.cover} id="game-img" />}
                    </div>
                </div>
                <div id="game-middle-container">
                    <div id="game-middle-item-text">
                        <div>
                            <p id="description-title">Description</p>
                            <p id="description-text">{game.description}</p>
                        </div>
                    </div>
                    <div id="game-middle-item-lang-sub">
                        <div id="lang-sub-container">
                            <div id="lang-sub-title">
                                <p>lang</p>
                                <p>sub</p>
                            </div>
                            <div>
                                <ul id="lang-sub-list">
                                    {langSub()}
                                </ul>                                
                            </div>
                        </div>
                    </div>
                </div>
                <div id="game-price-container">
                    <div>
                        <p>base price</p>
                        <p>{game.basePrice == 0 ? "free game" : game.basePrice + "€"}</p>
                    </div>
                    <div>
                        <p>discount</p>
                        <p id="game-currentDiscount">{game.currentDiscountedPrice != null ? game.currentDiscountedPrice + "€" : ""}</p>
                    </div>
                    <div>
                        <p>percentage</p>
                        <p>{game.currentDiscountedPrice != null ? Math.round(100 - game.currentDiscountedPrice / (game.basePrice / 100)) + "%" : ""}</p>
                    </div>
                    <div>
                        <p>end date</p>
                        <p>{game.currentDiscountEndDate != null ? game.currentDiscountEndDate : "" }</p>
                    </div>
                    <div>
                        <p>lowest price</p>
                        <p id="game-lowestPrice">{game.lowestPrice != null ? game.lowestPrice + "€" : ""}</p>
                    </div>
                </div>
                <div id="game-priceHistory-container">
                    <canvas height="300" width="1000" id="game-priceHistory-graphic"></canvas>
                    <canvas height="300" width="1000" id="game-priceHistory-data"></canvas>
                    <div id="game-priceHistory-prices">{prices}</div>
                    <div id="game-priceHistory-dates" style={{flexDirection: flexDirection}}>{dates}</div>
                </div>
                <div id="game-gamesReferenced-container">
                    <p id="game-gamesReferenced-title">References</p>
                    <div id="game-gamesReferenced-games" >
                        {gameReferenced.map((game, index) => <GameInlist key={index} game={game}/>)}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )

}

export default SingleGamePage;