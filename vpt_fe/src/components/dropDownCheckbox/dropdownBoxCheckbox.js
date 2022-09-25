import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import CheckboxInput from '../checkboxInput/checkboxInput';

const DropdownBoxCheckbox = ({isDropdownBoxDisplayed = "none", leftSpaceFromWindow, text = "", addOrRemoveField = () => {}, onMouseLeave = () => {}}) => {

    const [list, setList] = useState([])

    let [searchParam, setSearchParam] = useSearchParams();

    let fields = [];
    if (searchParam.get(text) != null) fields =  searchParam.get(text).split(",");

    useEffect(
        () => {

            fetch("http://localhost:8081/" + text)
            .then(response => response.json())
            .then(responseJSON => {

                let list = []
    
                for (const field of responseJSON) {
                    if (fields.includes(field)) list.push([field, true])
                    else list.push([field, false])
                }

                setList(list)
            })
        }, []
    )
    
    return (
        <div style={{display: isDropdownBoxDisplayed, left: leftSpaceFromWindow}} className="dropdown-box-checkbox" >
            <div className='dropdown-box-checkbox-inner' onMouseLeave={onMouseLeave}>
                {list.map(item => <CheckboxInput key={item} item={item} addOrRemoveField={addOrRemoveField} text={text}/> )}
            </div>
        </div>
    )
}

export default DropdownBoxCheckbox;