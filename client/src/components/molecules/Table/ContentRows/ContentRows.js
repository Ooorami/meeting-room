import React from "react";

import ContentRow from "../ContentRow/ContentRow";

import "./ContentRows.css"

const ContentRows = ({reservation, handleRemove, handleEdit, meetingroom}) => {
    return (
        <tbody>
        {
            reservation.map((item, index) => {
                item.order = index + 1;

                return (
                    <ContentRow key={item.order} item={item} handleRemove={handleRemove}
                                meetingroom={meetingroom}
                                handleEdit={handleEdit}></ContentRow>
                )
            })
        }
        </tbody>
    );
};
export default ContentRows;