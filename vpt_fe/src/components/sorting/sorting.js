import React, { useState } from 'react';

const Sorting = ({onChangeSorting = () => {}, setCurrentSorting, currentSorting}) => {

    const [isDropdownBoxDisplayed, setIsDropdownBoxDisplayed] = useState("none");

    const [leftSpaceFromWindow, setLeftSpaceFromWindow] = useState(0);

    const changeDisplayOnClick = e => {
        if (isDropdownBoxDisplayed === "none") {
            setIsDropdownBoxDisplayed("block");
            if (e.target == e.currentTarget) setLeftSpaceFromWindow(e.target.getBoundingClientRect().left);
            else setLeftSpaceFromWindow(e.currentTarget.getBoundingClientRect().left)
        }
        else {
            if (e.target == e.currentTarget) setIsDropdownBoxDisplayed("none")
        }
    }

    let sortingList = [
        ["A-Z", "A - Z"],
        ["Z-A", "Z - A"],
        ["asc", "PRICE ASC"],
        ["desc", "PRICE DESC"],
        ["oldest", "RELEASE DATE ↑"],
        ["newest", "RELEASE DATE ↓"],
    ]

    const onChangeSortingClick = (e) => {
        onChangeSorting(e);
        let currentSortingCopy = [...currentSorting];

        for (let i = 0; i < currentSortingCopy.length; i++) {
            if (i == e.target.dataset.index) currentSortingCopy[i] = true;
            else currentSortingCopy[i] = false;
        }

        setCurrentSorting(currentSortingCopy)
    }

    return (
        <div id='sorting-container' className='filter-sorting-item' onClick={changeDisplayOnClick} >
            sorting
            <div id='dropdown-sorting' style={{display: isDropdownBoxDisplayed, left: leftSpaceFromWindow}} >
                <div id='dropdown-sorting-inner' onMouseLeave={() => setIsDropdownBoxDisplayed("none")}>
                    {sortingList.map((el, index) => <div key={index} className="dropdown-sorting-item">
                        <input type="radio" name='sorting' data-index={index}  value={el[0]} checked={currentSorting[index]} onChange={onChangeSortingClick}/>
                        <p>{el[1]}</p>
                    </div>)}
                </div>
            </div>
        </div>
    )
}

export default Sorting;