import React from "react";

import "./ContentRow.css";
import Edit from "../../../../assets/img/Edit.png";
import Delete from "../../../../assets/img/Delete.png";

const ContentRow = ({item, handleRemove, handleEdit, meetingroom}) => {

    const onEdit = () => {
        handleEdit(item);
    }

    const onRemove = () => {
        handleRemove(item.order);
    }

    const meetingroomName = meetingroom.find((room) => room.roomCd === Number(item.roomCd))?.roomName;


    return (
        <>
            <tr>
                <td>
                    <div className="order">{item.order}</div>
                </td>
                <td>
                    <div className="roomName">{meetingroomName}</div>
                </td>
                <td>
                    <div className="reservationDt">{item.reservationDt}</div>
                </td>
                <td>
                    <div>{item.startTm}</div>
                </td>
                <td>
                    <div>{item.endTm}</div>
                </td>
                <td>
                    <div className="checker">{item.checker}</div>
                </td>
                <td>
                    <div onClick={onEdit}>
                        <img className="edit" src={Edit} alt="edit"/>
                    </div>
                </td>
                <td>
                    <div onClick={onRemove}>
                        <img className="delete" src={Delete} alt="delete"/>
                    </div>
                </td>
            </tr>
        </>
    );
};
export default ContentRow;