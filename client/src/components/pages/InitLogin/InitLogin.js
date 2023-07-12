import React from "react";

import "../Init/Init.css";
import Logo from "../../../assets/img/Logo.png"
import {useNavigate} from "react-router";
import {ROUTE} from "../../../constants/Route";
import ReservationHeader from "../ReservationHeader/ReservationHeader";


const Init = () => {

    const navigate = useNavigate();

    const useToGoMeetingroomReservation = () => {
        navigate(ROUTE.MEETINGROOMRESERVATION);
    }

    const useToGoSignup = () => {
        navigate(ROUTE.SIGNUP);
    }

    const useToGoLogin = () => {
        navigate(ROUTE.LOGIN);
    }

    return (
        <div className="init">
            <div>
                <div className="navigateCollection">
                    <div className="meetingroomReservationInit" onClick={useToGoMeetingroomReservation}>회의실 등록
                    </div>
                    <div className="signupInit" onClick={useToGoSignup}>회원가입</div>
                    <div className="loginInit" onClick={useToGoLogin}>로그인</div>
                    <div className="logout">로그아웃</div>
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

export default Init;