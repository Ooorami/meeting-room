import React from "react";

const Radio = ({name, value, handleRadioChange}) => {

    return (
        <label>
                <span>
                    <input type="radio" name={name} value={value} onChange={handleRadioChange}></input>
                    <span>{value}</span>
                </span>
        </label>
    );
};

export default Radio;