import { Link } from "react-router-dom";

import "./gameInList.css"

const GameInlist = ({game = {}}) => {

    let basePriceColor = "black";
    let basePriceDecoration = "";
    let discountedPriceColor = "green";
    let basePrice = game.basePrice;

    if (game.currentDiscountedPrice != null) {
        basePriceColor = "red";
        basePriceDecoration = "line-through" 
    }

    if (game.currentDiscountedPrice == game.lowestPrice) discountedPriceColor = "rgb(255, 196, 0)";

    if (basePrice == 0) basePrice = "Free Game"
    else basePrice = basePrice + "€"


    return (
        <Link className="game-link" to={"/videogame/" + game.title}>
            <div className="img-container">
                <img className="img" src={"data:image/png;base64," + game.cover}/>
                <div>
                    <p className="game-title">{game.title}</p>
                    <p className="game-base-price" style={{color: basePriceColor, textDecorationLine: basePriceDecoration, textDecorationColor: "black" }}>{basePrice}</p>
                    <p className="game-discounted-price" style={{color: discountedPriceColor }}>{game.currentDiscountedPrice}</p>
                </div>
            </div>
        </Link>
    )

}

export default GameInlist;