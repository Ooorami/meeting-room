import React, {useState} from "react";

import "./Reservation.css";
import "../../../color.css";
import Home from "../../../img/Home.png"

import ReservationHeader from "../../ReservationHeader";
import {TIME} from "../../../constants/Time"
import {DAY} from "../../../constants/Day"
import {MEETINGROOM} from "../../../constants/MeetingRoom";
import AlertModal from "../../modal/AlertModal";
import {useNavigate} from "react-router";
import {ROUTE} from "../../../constants/Route";


const Reservation = () => {

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

    // // 라디오 버튼 클릭했을 떄 색 변경을 위해 넣은 부분
    // const radioButton = document.querySelectorAll('input[type="radio"]');
    //
    // radioButton.forEach(button => {
    //     button.addEventListener('change', () => {
    //         if (button.checked) {
    //             button.style.backgroundColor = '#EFC929';
    //         } else {
    //             button.style.backgroundColor = '';
    //         }
    //     });
    // });

    const formElements = [
        {
            key: "회의실",
            value: Object.values(MEETINGROOM)
                .map((meetingroom) => returnRadio(meetingroom, "meetingroom"))
        },
        {
            key: "요일",
            value: Object.values(DAY)
                .map((day) => returnRadio(day, "day"))
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
        {
            key: "종료 시간",
            value: <>
                <select className="select-end-hour">
                    <option className="disabled-option" value='' disabled selected>-- 선택 --</option>
                    {
                        Object.values(TIME.HOUR)
                            .map((hour) => returnOption(hour))
                    }
                </select> &nbsp;
                <select className="select-end-minute">
                    <option className="disabled-option" value='' disabled selected>-- 선택 --</option>
                    {
                        Object.values(TIME.MINUTE)
                            .map((minute) => returnOption(minute))
                    }
                </select>
            </>
        },
        {
            key: "신청자",
            value: <>
                <input className="input-box" type="text" placeholder="이름을 입력하세요."></input>
            </>
        },
        {
            key: "참여자",
            value: <>
                <input className="input-box" type="text" placeholder="참여자를 입력하세요."></input>
            </>
        },
        {
            key: "회의 주제",
            value: <>
                <input className="input-box" type="text" placeholder="회의 주제를 입력하세요."></input>
            </>
        }
    ];

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div className="reservation">
            <header className="title">
                <ReservationHeader></ReservationHeader>
            </header>
            <body className="body">
            {
                formElements.map((data) => <p><span
                    className="label"> {data.key} &nbsp;:&nbsp; </span> {data.value}</p>)
            }
            <p>
                <button className="reservation-button" onClick={openModal}>예약</button>
                <AlertModal body_text="회의실 예약이 완료되었습니다." isOpen={isOpen}
                            closeModal={closeModal}></AlertModal>
            </p>
            <div>
                <img className="home" src={Home} onClick={useToGoInit} alt="home"/>
            </div>
            </body>
        </div>
    );
};

export default Reservation;