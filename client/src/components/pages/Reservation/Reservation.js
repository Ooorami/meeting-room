import React from "react";

import "./Reservation.css";
import ReservationHeader from "../../ReservationHeader";
import { TIME } from "../../../constants/Time"
import { DAY } from "../../../constants/Day"
import { MEETINGROOM } from "../../../constants/MeetingRoom";

const Reservation = () => {

    const returnOption = (string) => {
        return <option>{string}</option>
    };

    const returnRadio = (string) => {
        return (<label>
            <input type="radio" name="contact"></input>
            <span>{string}</span>
        </label>);
    };

    const alertSuccess = () => {
        alert("회의실 예약이 완료되었습니다.");
    };

    return (
        <div className = "reservation">
            <header className = "title">
                <ReservationHeader></ReservationHeader>
            </header>
            <body className = "body">
            <p>
                회의실 &nbsp;: &nbsp;
                {
                    Object.values(MEETINGROOM)
                        .map((meetingroom) => returnRadio(meetingroom))
                }
            </p>
            <p>
                요일 &nbsp;: &nbsp;
                {
                    Object.values(DAY)
                        .map((day) => returnRadio(day))
                }
            </p>
            <p>
                시작시간 &nbsp;: &nbsp;
                <select className = "select-start-hour">
                    <option value = '' selected>-- 선택 --</option>
                    {
                        Object.values(TIME.HOUR)
                            .map((hour) => returnOption(hour))
                    }
                </select> &nbsp;
                <select className = "select-start-minute">
                    <option value = '' selected>-- 선택 --</option>
                    {
                        Object.values(TIME.MINUTE)
                            .map((minute) => returnOption(minute))
                    }
                </select>
            </p>
            <p>
                종료시간 &nbsp;: &nbsp;
                <select className = "select-end-hour">
                    <option value = '' selected>-- 선택 --</option>
                    {
                        Object.values(TIME.HOUR)
                            .map((hour) => returnOption(hour))
                    }
                </select> &nbsp;
                <select className = "select-end-minute">
                    <option value = '' selected>-- 선택 --</option>
                    {
                        Object.values(TIME.MINUTE)
                            .map((minute) => returnOption(minute))
                    }
                </select>
            </p>
            <p>
                신청자 &nbsp;: &nbsp;
                <input className type = "text"></input>
            </p>
            <p>
                회의 주제 &nbsp;: &nbsp;
                <input className type = "text"></input>
            </p>
            <button onClick={alertSuccess}>예약</button>
            </body>
        </div>
    );
};

export default Reservation;