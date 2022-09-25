import React, { useState } from 'react';
import { Link, useSearchParams } from "react-router-dom";

import "./navbar.css"; 

const Navbar = ({user = false, setUser = () => {}, navbarSearch = () => {}}) => {

    let search = "block"
    if (window.innerWidth < 600) search = "none"

    let [searchParam, setSearchParam] = useSearchParams();

    const [searchValue, setSearchValue] = useState(navbarSearch.get());
    const [isCancelDisplayed, setIsCancelDisplayed] = useState("none");
    const [isSearchDisplayed, setIsSearchDisplayed] = useState(search);
    const [isMenuDisplayed, setIsMenuDisplayed] = useState("none");

    const onValueChange = event => {
        setSearchValue(event.target.value);
        navbarSearch.set(event.target.value)
    }

    const url = () => {
        let url = "/videogames/" + searchValue;

            if (Object.keys(Object.fromEntries([...searchParam])).length != 0) {
                url += "?";
                for (const [key, value] of searchParam.entries()) {
                    url += key + "=";
                    if (typeof value == "string") url += value;
                    else url += value.join();
                    url += "&";
                }
                url = url.substring(0, url.length -1)
            } else url += "?historicalLow=false";

        return url;
    }

    const onSearchClick = e => {
        if (searchValue === "") e.preventDefault();
        if (isSearchDisplayed !== "block") {
            setIsSearchDisplayed("block");
            setIsCancelDisplayed("block");
        }
    }
    
    const fixSearchBar = () => {
        setIsSearchDisplayed("none");
        setIsCancelDisplayed("none");
    }

    const fixSearch = () => {
        if (window.innerWidth <= 600) fixSearchBar();
        else setIsSearchDisplayed("block");
    }

    window.addEventListener("resize", fixSearch);

    const changeDisplayMenu = () => {
        if (isMenuDisplayed === "none") showMenu();
        else hideMenu();
    }

    const showMenu = () => setIsMenuDisplayed("block");
    const hideMenu = () => setIsMenuDisplayed("none");

    const fixMenu = () => {
        if (window.innerWidth > 768) hideMenu();
    }

    window.addEventListener("resize", fixMenu);

    const logOutOnClick = () => {
        if (user) setUser(false);
    }

    return (
        <nav>
            <div>
                <Link to="/">
                    <span className="material-symbols-outlined home">home</span>
                </Link>
                <input type="text" className="search" placeholder='search...' value={searchValue} onChange={onValueChange} style={{"display": isSearchDisplayed}}></input>
                <button id='btn-cancel' onClick={fixSearchBar} style={{"display": isCancelDisplayed}}><span className="material-symbols-outlined cancel">close</span></button>
                <Link to={url()} onClick={onSearchClick}><button id="btn-lens"><span className="material-symbols-outlined lens">search</span></button></Link>
            </div>
            <div>
                <Link to={user ? "/watchlist" : "/log-in"} className='user disappear'>{user ? "watchlist" : "Log In"}</Link>
                <Link to={user ? "/" : "/sign-up"} onClick={logOutOnClick} className='user disappear'>{user ? "log out": "Sign Up"}</Link>
                <button id='btn-menu' onClick={changeDisplayMenu}><span className="material-symbols-outlined menu">menu</span></button>
                <div id='overMenu' style={{"display": isMenuDisplayed}} >
                    <Link to={user ? "/watchlist" : "/log-in"} className='user link-menu'>{user ? "watchlist" : "Log In"}</Link>
                    <Link to={user ? "/" : "/sign-up"} onClick={logOutOnClick} className='user link-menu'>{user ? "Log out": "Sign Up"}</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;