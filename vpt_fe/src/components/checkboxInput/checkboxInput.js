import { useState } from "react";

const CheckboxInput = ({addOrRemoveField = () => {} , item = [], text = ""}) => {

    const [isChecked, setIsChecked] = useState(item[1])

    const onChange = e => {
        setIsChecked(e.target.checked);
        addOrRemoveField(text, item[0])
    }

    return (
        <div className="dropdown-box-checkbox-item">
            <input type="checkbox" checked={isChecked} onChange={onChange}/>
            <p>{item[0]}</p>
        </div>
    )

}

export default CheckboxInput;