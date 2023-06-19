import React from "react";

import Td from "../Td/Td";

import "./Tr.css"

const Tr = ({reservation, handleRemove, handleEdit}) => {
    return (
        <tbody>
        {
            reservation.map((item, index) => {
                item.order = index + 1;
                return (
                    <Td key={item.order} item={item} handleRemove={handleRemove} handleEdit={handleEdit}></Td>
                )
            })
        }
        </tbody>
    );
};
export default Tr;