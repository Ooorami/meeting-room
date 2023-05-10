import React, {useState} from "react";

import "./CancalReservation.css";
import "../../../color.css";

import ReservationHeader from "../../ReservationHeader";
import {MEETINGROOM} from "../../../constants/MeetingRoom";
import {TIME} from "../../../constants/Time";
import AlertModal from "../../modal/AlertModal";
import Home from "../../../img/Home.png";
import {useNavigate} from "react-router";
import {ROUTE} from "../../../constants/Route";


const CancelReservation = () => {

    const navigate = useNavigate();

    const useToGoInit = () => {
        navigate(ROUTE.INIT)
    };

    const returnOption = (string) => {
        return <option>{string}</option>
    };

    const returnRadio = (string, name) => {
        return (<label>
            <input type="radio" name={name} onChange={(e) => {
                const button = e.target;
                if (button.checked) {
                    button.style.backgroundColor = 'var(--secondary-color-yellow)';
                } else {
                    button.style.backgroundColor = '';
                }
            }}></input>
            <span>{string}</span>
        </label>);
    };

    const formElements = [
        {
            key: "회의실",
            value: Object.values(MEETINGROOM)
                .map((meetingroom) => returnRadio(meetingroom, "meetingroom"))
        },
        {
            key: "시작 시간",
            value: <>
                <select className="select-start-hour">
                    <option className="disabled-option" value='' disabled selected>-- 선택 --</option>
                    {Object.values(TIME.HOUR)
                        .map((hour) => returnOption(hour))}
                </select> &nbsp;
                <select className="select-start-minute">
                    <option className="disabled-option" value='' disabled selected>-- 선택 --</option>
                    {Object.values(TIME.MINUTE)
                        .map((minute) => returnOption(minute))}
                </select>
            </>
        },

    ];

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div className="cancelReservation">
            <header className="title">
                <ReservationHeader></ReservationHeader>
            </header>
            <body className="body">
            {
                formElements.map((data) => <p><span
                    className="label"> {data.key} &nbsp;:&nbsp; </span> {data.value}</p>)
            }
            <p>
                <button className="cancelReservation-button" onClick={openModal}>예약 취소</button>
                <AlertModal body_text="회의실 예약 취소가 완료되었습니다." isOpen={isOpen}
                            closeModal={closeModal}></AlertModal>
            </p>
            <div>
                <img className="home" src={Home} onClick={useToGoInit} alt="home"/>
            </div>
            </body>
        </div>
    );
};

export default CancelReservation;