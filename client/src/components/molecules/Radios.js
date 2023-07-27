import React from "react";

import Radio from "./Radio";

const Radios = ({list, name, handleRadioChange}) => {
    return (
        <span>
            {
                list.map((value) =>
                    <Radio name={name} value={value} handleRadioChange={handleRadioChange}></Radio>)
            }
        </span>
    );
};
export default Radios;