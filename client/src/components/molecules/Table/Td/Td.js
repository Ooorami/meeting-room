import React from "react";

import "./Td.css";

const Td = ({item, handleRemove, handleEdit}) => {

    const onRemove = () => {
        handleRemove(item.order);
    }

    const onEdit = () => {
        handleEdit(item);
    }

    //  코드 리뷰
    // const itemValues = Object.values(item);
    // console.log(item)

    return (
        <>
            <tr>
                <td>
                    <div className="order">
                        {item.order}
                    </div>
                </td>
                <td>
                    <div className="roomCd">
                        {item.roomCd}
                    </div>
                </td>
                <td>
                    <div className="reservationDt">
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
                    <div className="checker">
                        {item.checker}
                    </div>
                </td>
                <td>
                    <div onClick={onEdit}></div>
                </td>
                <td>
                    <div onClick={onRemove}></div>
                </td>
            </tr>
        </>
        // 코드 리뷰
        // <>
        //     <tr>
        //         {itemValues.map((value, index) => {
        //             let className = '';
        //             if (index === 0) {
        //                 className = 'order';
        //             } else if (index === 1) {
        //                 className = 'roomCd';
        //             } else if (index === 2) {
        //                 className = 'reservationDt';
        //             }
        //
        //             return (
        //                 <td key={index}>
        //                     <div className={className}>{value}</div>
        //                 </td>
        //             );
        //         })}
        //     </tr>
        // </>
    );
};
export default Td;