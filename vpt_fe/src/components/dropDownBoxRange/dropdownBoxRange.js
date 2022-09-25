import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const DropDownBoxRange = ({isDropdownBoxDisplayed = "none", leftSpaceFromWindow, text = "", addOrRemoveRange = () => {}, onMouseLeave = () => {}}) => {

    let min = "0";
    let max;
    let minPlaceholder;
    let maxPlaceholder;
    let minField;
    let maxField;

    if (text === "price") {
        max = "999";
        minPlaceholder = min + " €";
        maxPlaceholder = max + " €";
        minField = "minPrice";
        maxField = "maxPrice";
    }
    else if (text === "discount") {
        max = "100";
        minPlaceholder = min + "%";
        maxPlaceholder = max + "%";
        minField = "minDiscount";
        maxField = "maxDiscount";
    }
    else if (text === "release year") {
        min = "2000";
        max = new Date().getFullYear().toString();
        minPlaceholder = min;
        maxPlaceholder = max;
        minField = "minYear";
        maxField = "maxYear";
    }

    let [searchParam, setSearchParam] = useSearchParams();

    let defaultMinValue = "";
    if (searchParam.get(minField) != null) defaultMinValue =  searchParam.get(minField);
    else defaultMinValue = "";

    let defaultMaxValue = "";
    if (searchParam.get(maxField) != null) defaultMaxValue =  searchParam.get(maxField);
    else defaultMaxValue = "";

    const [minValue, setMinValue] = useState(defaultMinValue);
    const [maxValue, setMaxValue] = useState(defaultMaxValue);

    const onChangeMin = e => {
        setMinValue(e.target.value);
    }

    const onChangeMax = e => {
        setMaxValue(e.target.value)
    }

    const onClick = () => {
        addOrRemoveRange(text, minValue, maxValue);
    }
    
    return (
        <div style={{display: isDropdownBoxDisplayed, left: leftSpaceFromWindow}} className="dropdown-box-range" >
            <div className="dropdown-box-range-inner" onMouseLeave={onMouseLeave}>
                <p>from</p>
                <input type="number" min={min} max={max} placeholder={minPlaceholder} value={minValue} onChange={onChangeMin} />
                <p>to</p>
                <input type="number" min={min} max={max} placeholder={maxPlaceholder} value={maxValue} onChange={onChangeMax} />
                <p><button onClick={onClick}>GO</button></p>
            </div>
        </div>
    )
}

export default DropDownBoxRange;