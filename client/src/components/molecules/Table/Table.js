import React from "react";

import "./Table.css"

import Tr from "../Tr/Tr";

const Table = ({headerData, reservation, handleRemove, handleEdit}) => {
    return (
        <div>
            <div>회의실 예약 현황 :</div>
            <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        {headerData.map((header, index) => (
                            <th key={index}>
                                <div className={header === '신청자' ? 'applicant' : ''}>{header}</div>
                            </th>

                        ))}
                    </tr>
                    </thead>
                    <div>
                        <Tr reservation={reservation}></Tr>
                        {/*예약된 리스트에서 아이콘을 누르는 행위를 통해 예약을 취소, 변경시키기 위한 함수 handleRemove와 handleEdit를 화면에 제공하는 부분*/}
                        {/*<Tr reservation={reservation} handleRemove={handleRemove}*/}
                        {/*    handleEdit={handleEdit}></Tr>*/}
                    </div>
                </table>
            </div>
        </div>
    );
};
export default Table;