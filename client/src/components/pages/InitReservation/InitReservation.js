import {useNavigate} from "react-router";
import {ROUTE} from "../../../constants/Route";
import Logo from "../../../assets/img/Logo.png";
import ReservationHeader from "../ReservationHeader/ReservationHeader";
import React from "react";

import './InitReservation.css'

const InitReservation = () => {

    const navigate = useNavigate();

    const useToGoMeetingroomReservation = () => {
        navigate(ROUTE.MEETINGROOMRESERVATION);
    }

    const useToGoReservationList = () => {
        navigate(ROUTE.RESERVATIONLIST);
    }

    const useToGoLogout = () => {
        // 로그아웃 시 로컬 스토리지에서 로그인 상태를 제거
        localStorage.removeItem("isLoggedIn");
        // 로그아웃 후 로그인 페이지로 이동
        navigate(ROUTE.INITLOGIN);
    };

    return (
        <div className="initReservation">
            <div>
                <div className="navigateCollection">
                    <div className="meetingroomReservationInit" onClick={useToGoMeetingroomReservation}>회의실 등록</div>
                    <div className="ReservationListInit" onClick={useToGoReservationList}>예약 현황</div>
                    <div className="logoutInit" onClick={useToGoLogout}>로그아웃</div>
                </div>
                <div>
                    <img className="logo" src={Logo} alt="logo"/>
                </div>
                <p className="font">
                    회의실 예약 시스템
                </p>
            </div>
            <ReservationHeader className="-footer"></ReservationHeader>
        </div>
    );
};

export default InitReservation;