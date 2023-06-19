import React from "react";

import Option from "./Option";

const Select = ({list, name, handleOptionChange}) => {
    return (
        <select name={name} onChange={handleOptionChange}>
            <option className="disabled-option" value='' disabled selected>--선택--</option>
            {
                list.map((value) =>
                    <Option value={value}></Option>)
            }
        </select>
    );
};

export default Select;