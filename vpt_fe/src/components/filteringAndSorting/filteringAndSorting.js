import React, { useState } from 'react';

import './filteringAndSorting.css';

import FilterItem from '../filterItem/filterItem';
import Sorting from '../sorting/sorting';


const FilteringAndSorting = ({onChangeSorting = () => {}, setSearchParams = () => {}, searchParams = {}, currentSorting = [], setCurrentSorting = () => {}}) => {

    let defaultHistoricalLow = searchParams.get("historicalLow");
    let defaultHistoricalLowBackground;
    let defaultHistoricalLowTextColor;

    defaultHistoricalLow == "true" ? defaultHistoricalLow = true : defaultHistoricalLow = false;
    defaultHistoricalLow ? defaultHistoricalLowBackground = "#0474db" : defaultHistoricalLowBackground = "rgb(236, 236, 236)";
    defaultHistoricalLow ? defaultHistoricalLowTextColor = "rgb(236, 236, 236)" : defaultHistoricalLowTextColor = "#0474db";

    let defaultSystems = [];
    if (searchParams.get("systems") != null) defaultSystems = searchParams.get("systems").split(",");

    const [types, setTypes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [systems, setSystems] = useState(defaultSystems);

    const [isHistoricalLow, setIsHistoricalLow] = useState(defaultHistoricalLow);
    const [historicalLowBackground, setHistoricalLowBackground] = useState(defaultHistoricalLowBackground);
    const [historicalLowTextColor, setHistoricalLowTextColor] = useState(defaultHistoricalLowTextColor);

    const addOrRemoveField = (filter, field) => {
        let fieldsCopy;
        if (filter === "types") {
            fieldsCopy = [...types];
            types.includes(field) ? fieldsCopy = fieldsCopy.filter(n => n != field) : fieldsCopy.push(field);
            setTypes(fieldsCopy);
        } else if (filter === "categories") {
            fieldsCopy = [...categories];
            categories.includes(field) ? fieldsCopy = fieldsCopy.filter(n => n != field) : fieldsCopy.push(field);
            setCategories(fieldsCopy);
        } else if (filter === "systems") {
            fieldsCopy = [...systems];
            systems.includes(field) ? fieldsCopy = fieldsCopy.filter(n => n != field) : fieldsCopy.push(field);
            setSystems(fieldsCopy);
        }

        if (fieldsCopy.length == 0) {
            const {[filter]: deleted, ...newSearchParam} = Object.fromEntries([...searchParams]);
            setSearchParams(newSearchParam);
        }
        else setSearchParams({ ...Object.fromEntries([...searchParams]), [filter]: fieldsCopy.join()});
    }

    const addOrRemoveRange = (filter, min, max) => {
        if (filter === "price") {
            if (min === "" && max === "") {
                const {minPrice, maxPrice, ...newSearchParam} = Object.fromEntries([...searchParams]);
                setSearchParams(newSearchParam);
            }
            else if (min === "") {
                const {minPrice, ...newSearchParam} = Object.fromEntries([...searchParams]);
                setSearchParams({ ...newSearchParam, maxPrice: max});
            } else if (max === "") {
                const {maxPrice, ...newSearchParam} = Object.fromEntries([...searchParams]);
                setSearchParams({ ...newSearchParam, minPrice: min});
            } else {
                setSearchParams({ ...Object.fromEntries([...searchParams]), minPrice: min, maxPrice: max});
            }
        } else if (filter === "release year") {
            if (min === "" && max === "") {
                const {minYear, maxYear, ...newSearchParam} = Object.fromEntries([...searchParams]);
                setSearchParams(newSearchParam);
            }
            else if (min === "") {
                const {minYear, ...newSearchParam} = Object.fromEntries([...searchParams]);
                setSearchParams({ ...newSearchParam, maxYear: max});
            } else if (max === "") {
                const {maxYear, ...newSearchParam} = Object.fromEntries([...searchParams]);
                setSearchParams({ ...newSearchParam, minYear: min});
            } else {
                setSearchParams({ ...Object.fromEntries([...searchParams]), minYear: min, maxYear: max});
            }
        } else if (filter === "discount") {
            if (min === "" && max === "") {
                const {minDiscount, maxDiscount, ...newSearchParam} = Object.fromEntries([...searchParams]);
                setSearchParams(newSearchParam);
            }
            else if (min === "") {
                const {minDiscount, ...newSearchParam} = Object.fromEntries([...searchParams]);
                setSearchParams({ ...newSearchParam, maxDiscount: max});
            } else if (max === "") {
                const {maxDiscount, ...newSearchParam} = Object.fromEntries([...searchParams]);
                setSearchParams({ ...newSearchParam, minDiscount: min});
            } else {
                setSearchParams({ ...Object.fromEntries([...searchParams]), minDiscount: min, maxDiscount: max});
            }
        }
    }

    const historicalLowOnClick = () => {
        setSearchParams({ ...Object.fromEntries([...searchParams]), historicalLow: !isHistoricalLow});
        setIsHistoricalLow(!isHistoricalLow);
        (historicalLowBackground === "rgb(236, 236, 236)") ? setHistoricalLowBackground("#0474db") : setHistoricalLowBackground("rgb(236, 236, 236)");
        (historicalLowTextColor === "rgb(236, 236, 236)") ? setHistoricalLowTextColor("#0474db") : setHistoricalLowTextColor("rgb(236, 236, 236)");
    }

    return (
        <div id='filter-sorting-container'>

            <div id='filter-sorting-bar'>

                <FilterItem text="types" addOrRemoveField={addOrRemoveField} />
                <FilterItem text="categories" addOrRemoveField={addOrRemoveField} />
                <FilterItem text="price" addOrRemoveRange={addOrRemoveRange} />
                <FilterItem text="discount" addOrRemoveRange={addOrRemoveRange} />
                <FilterItem text="systems" addOrRemoveField={addOrRemoveField} />
                <FilterItem text="release year" addOrRemoveRange={addOrRemoveRange} />

                <div className='filter-sorting-item' id='historicalLow' onClick={historicalLowOnClick}>
                    <p style={{whiteSpace: "nowrap", backgroundColor: historicalLowBackground, color: historicalLowTextColor}}>historical low</p>
                </div>

                <Sorting onChangeSorting={onChangeSorting} currentSorting={currentSorting} setCurrentSorting={setCurrentSorting}/>

                <div id='filter-sorting-bar-right-space' ></div>

            </div>

            <div id='arrow'>
                <a href='#' ><span className="material-symbols-outlined">arrow_upward</span></a>
            </div>
        </div>
    )

}

export default FilteringAndSorting;