import React from "react";

import ReservationHeader from "../../ReservationHeader";
import "../Init/Init.css";
import Logo from "../../../img/Logo.png"

const Init = () => {
    return (
        <div className="init">
            <div>
                <div>
                    <img className="logo" src = {Logo} alt = "logo"/>
                </div>
                <p className="font">
                    회의실 예약 시스템
                </p>
            </div>
            <ReservationHeader className = "-footer"></ReservationHeader>
        </div>
    );
};

export default Init;