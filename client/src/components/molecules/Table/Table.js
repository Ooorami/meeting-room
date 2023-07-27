import React from "react";

import "./Table.css"

import ContentRows from "./ContentRows/ContentRows";

const Table = ({headerData, reservation, handleRemove, handleEdit, meetingroom}) => {
    return (
        <div>
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
                        {/*예약된 리스트에서 아이콘을 누르는 행위를 통해 예약을 취소, 변경시키기 위한 함수 handleRemove와 handleEdit를 화면에 제공하는 부분*/}
                        <ContentRows reservation={reservation} handleRemove={handleRemove}
                                     handleEdit={handleEdit} meetingroom={meetingroom}></ContentRows>
                    </div>
                </table>
            </div>
        </div>
    );
};
export default Table; 