import React, { useState } from 'react';

import DropdownBoxCheckbox from '../dropDownCheckbox/dropdownBoxCheckbox';
import DropDownBoxRange from '../dropDownBoxRange/dropdownBoxRange';

const FilterItem = ({text = "", addOrRemoveField = () => {}, addOrRemoveRange = () => {}}) => {

    const [isDropdownBoxDisplayed, setIsDropdownBoxDisplayed] = useState("none");
    const [leftSpaceFromWindow, setLeftSpaceFromWindow] = useState(0);

    const mouseLeave = e => {
        setIsDropdownBoxDisplayed("none");
    }

    let dropdown;
    if (text === "types" || text === "categories" || text == "systems")
        dropdown = <DropdownBoxCheckbox isDropdownBoxDisplayed={isDropdownBoxDisplayed} leftSpaceFromWindow={leftSpaceFromWindow} text={text} addOrRemoveField={addOrRemoveField} onMouseLeave={mouseLeave}/>
    else dropdown = <DropDownBoxRange isDropdownBoxDisplayed={isDropdownBoxDisplayed} leftSpaceFromWindow={leftSpaceFromWindow} text={text} addOrRemoveRange={addOrRemoveRange} onMouseLeave={mouseLeave}/>


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

    return (
        <div className='filter-sorting-item' onClick={changeDisplayOnClick} >
            {text}
            {dropdown}
        </div>
    )

}

export default FilterItem;