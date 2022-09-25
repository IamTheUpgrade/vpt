import React from 'react';

import './homePage.css';

import Header from '../../components/header/header';
import Navbar from '../../components/navbar/navbar';
import SquareLink from '../../components/squareLink/squareLink';
import Footer from '../../components/footer/footer';

const HomePage = ({user = false, setUser = () => {}, navbarSearch = () => {}}) => {

    let currentYear = new Date().getFullYear();

    return (
        <>
        <Header />
        <Navbar user={user} setUser={setUser} navbarSearch={navbarSearch}/>
        <div id='main'>

            <SquareLink to={"/videogamesAll/?historicalLow=false"} color={"#A79AF5"} text="all games">
                <span className="material-symbols-outlined icon" id='icon-all'>content_copy</span>
            </SquareLink>

            <SquareLink to={"/videogamesAll/?historicalLow=false&minDiscount=0&maxDiscount=100"} color={"#A4FB95"} text="all discount" >
                <span className="material-symbols-outlined icon" id='icon-percent'>percent</span>
            </SquareLink>

            <SquareLink to={"/videogamesAll/?historicalLow=false&maxPrice=0"} color={"#FF9B63"} text="free games" >
            <span className="material-symbols-outlined icon" id='icon-free'>redeem</span>
            </SquareLink>

            <SquareLink to={"/videogamesAll/?historicalLow=true"} color={"#FFE0E0"} text="historical low" >
                <span className="material-symbols-outlined icon" id='icon-low' >trending_down</span>
            </SquareLink>

            <SquareLink to={"/videogamesAll/?historicalLow=false&minDiscount=50"} color={"#FF5454"} text="huge discount" >
                <span className="material-symbols-outlined icon" id='icon-huge' >local_fire_department</span>
            </SquareLink>

            <SquareLink to={"/videogamesAll/?historicalLow=false&minYear=" + currentYear} color={"#C6FFFC"} text="last releases" >
                <span className="material-symbols-outlined icon" id='icon-last'>timer</span>
            </SquareLink>

            <SquareLink to={"/videogamesAll/?historicalLow=false&systems=Windows"} color={"#FDFF9B"} text="windows" >
                <i className="fa-brands fa-windows icon" id='icon-windows'></i>
            </SquareLink>

            <SquareLink to={"/videogamesAll/?historicalLow=false&systems=MacOS"} color={"#FD92FF"} text="mac" >
                <i className="fa-brands fa-apple icon" id='icon-macOS'></i>
            </SquareLink>
        </div>
        <Footer />
        </>
    )
}

export default HomePage;