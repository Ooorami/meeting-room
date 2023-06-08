import React from "react";
import "./Td.css";

const Td = ({item, handleRemove, handleEdit}) => {

    const onRemove = () => {
        handleRemove(item.order);
    }

    const onEdit = () => {
        handleEdit(item);
    }

    return (
        <>
            <tr>
                <td>
                    <div>
                        {item.order}
                    </div>
                </td>
                <td>
                    <div>
                        {item.roomCd}
                    </div>
                </td>
                <td>
                    <div>
                        {item.reservationDt}
                    </div>
                </td>
                <td>
                    <div>
                        {item.startTm}
                    </div>
                </td>
                <td>
                    <div>
                        {item.endTm}
                    </div>
                </td>
                <td>
                    <div>
                        {item.checker}
                    </div>
                </td>
                {/*<td onClick={onEdit} className='text-center text-purple-400 cursor-pointer show-modal'>*/}
                {/*    <i className="far fa-edit"></i>*/}
                {/*</td>*/}
                {/*<td onClick={onRemove} className='text-center text-purple-400 cursor-pointer'>*/}
                {/*    <i className="far fa-trash-alt"></i>*/}
                {/*</td>*/}
            </tr>
        </>
    );
};
export default Td;