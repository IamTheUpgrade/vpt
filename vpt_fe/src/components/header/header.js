import React from 'react';

import "./header.css"; 

const Header = () => {
    return (
        <header>
            <div className='container-title'>
                <span className="material-symbols-outlined logo">bar_chart</span>
                <h1 className='title'>VIDEOGAMES PRICE TRACKER</h1>
            </div>
            <div className='description'>
                This is a huge video games price tracker that shows the price trend of each individual game, 
                when it is at a discount or at its lowest, having an extensive filtering and sorting system.
            </div>
        </header>
    )
}

export default Header;