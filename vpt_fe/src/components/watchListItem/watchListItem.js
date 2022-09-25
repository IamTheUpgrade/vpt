import { Link } from 'react-router-dom';

import './watchListItem.css';

const WatchListItem = ({game = {}}) => {

    return (
        <Link to={"/videogame/" + game.title} className='watchList-item-container'>
            <div className='watchList-item-img-container'>
                <img src={"data:image/png;base64," + game.cover}/>
            </div>
            <div className='watchList-item-inf-container'>
                <p className='watchList-item-title'>{game.title}</p>
                <p className='watchList-item-days'>{game.currentDiscountEndDate ? "Ends in " + 
                    Math.floor((new Date(game.currentDiscountEndDate) - new Date()) / 86400000) + " days"
                    : ""}
                </p>
            </div>
            <div className='watchList-item-prices-container'>
                <div>
                    <p>base price</p>
                    <p style={{color: game.currentDiscountedPrice ? "red" : "black", 
                                textDecoration: game.currentDiscountedPrice ? "line-through black" : "none" }}>
                        {game.basePrice + "€"}
                    </p>
                </div>
                <div>
                    <p>{game.currentDiscountedPrice ? "discount" : ""}</p>
                    <p style={{color: game.currentDiscountedPrice == game.lowestPrice ? "rgb(255, 196, 0)" : "green" }}>
                        {game.currentDiscountedPrice ? game.currentDiscountedPrice + "€": ""}
                    </p>
                </div>
                <div>
                    <p>{game.currentDiscountedPrice ? "percentage" : ""}</p>
                    <p>{game.currentDiscountedPrice ? Math.round(100 - game.currentDiscountedPrice / (game.basePrice / 100)) + "%" : ""}</p>
                </div>
                <div>
                    <p>{game.currentDiscountEndDate ? "end date" : ""}</p>
                    <p>{game.currentDiscountEndDate ? game.currentDiscountEndDate : ""}</p>
                </div>
                <div>
                    <p>{game.lowestPrice ? "lowest price" : ""}</p>
                    <p>{game.lowestPrice ? game.lowestPrice + "€" : ""}</p>
                </div>
            </div>
        </Link>
    )

}

export default WatchListItem;