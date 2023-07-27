import React, {useState} from "react";

import "./EditModal.css"

import X from "../../../assets/img/x.png"

const EditModal = ({selectedData, handleCancel, handleEditSubmit}) => {

    const [edited, setEdited] = useState(selectedData);

    const onCancel = () => {
        handleCancel();
    }

    const onEditChange = (e) => {
        const {name, value} = e.target
        setEdited({
            ...edited,
            [name]: value,
        })
    }

    const onSubmitEdit = (e) => {
        e.preventDefault();
        handleEditSubmit(edited);
    }

    const formElements = [
        {
            key: "Order",
            value: <div className='formContents'>
                <span className='modalLabel'>Order &nbsp;:&nbsp;</span>
                {edited.order}</div>
        },
        {
            key: "신청자",
            value:
                <div className='formContents'>
                    <span className='modalLabel'>신청자 &nbsp;:&nbsp;</span>
                    {edited.checker}</div>
        },
        {
            key: "회의실 코드",
            value: (
                <div className='formContents'>
                    <span className='modalLabel'>회의실 코드 &nbsp;:&nbsp;</span>
                    <input type='text' name='roomCd' value={edited.roomCd} placeholder="변경할 회의실 코드를 입력하세요."
                           onChange={onEditChange}></input>
                </div>
            )
        },
        {
            key: "예약 날짜",
            value: (
                <div className='formContents'>
                    <span className='modalLabel'>예약 날짜 &nbsp;:&nbsp;</span>
                    <input type='text' name='reservationDt' value={edited.reservationDt}
                           placeholder="변경할 예약 날짜를 입력하세요."
                           onChange={onEditChange}></input>
                </div>
            )
        },
        {
            key: "시작 시간",
            value: (
                <div className='formContents'>
                    <span className='modalLabel'>시작 시간 &nbsp;:&nbsp;</span>
                    <input type='text' name='startTm' value={edited.startTm} placeholder="변경할 시작 시간를 입력하세요."
                           onChange={onEditChange}></input>
                    <div className='constraint'>(단, 10분 단위로만 입력이 가능합니다.)</div>
                </div>
            )
        },
        {
            key: "종료 시간",
            value: (
                <div className='formContents'>
                    <span className='modalLabel'>종료 시간 &nbsp;:&nbsp;</span>
                    <input type='text' name='endTm' value={edited.endTm} placeholder="변경할 종료 시간를 입력하세요."
                           onChange={onEditChange}></input>
                    <div className='constraint'>(단, 10분 단위로만 입력이 가능합니다.)</div>
                </div>
            )
        }
    ];

    return (
        <div className="edit-modal">
            <div>
                <div>
                    <div className='meeringroomReservationEdit'>회의실 예약 변경하기</div>
                    <img class='x' src={X} onClick={onCancel} alt="x"></img>
                </div>
                <form onSubmit={onSubmitEdit}>
                    <div>
                        {formElements.map((data) => (
                            <div key={data.key}>{data.value}</div>
                        ))}
                    </div>
                    <div className='buttons'>
                        <button className='cancelButton' onClick={onCancel}>취소</button>
                        <button className='editButton' type='submit'>변경</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditModal;