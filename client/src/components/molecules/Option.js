import React from "react";

const Option = ({value, handleOptionChange}) => {
    return (
        <option value={value} onChange={handleOptionChange}>{value}</option>
    );
};

export default Option;