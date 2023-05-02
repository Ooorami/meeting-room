import React from "react";

import {useNavigate} from "react-router";
import {ROUTE} from "../constants/Route";

import "./ReservationHeader.css"
import Text from "./Text";

const ReservationHeader = (props) => {

    let defaultClassName = "reservationHeader"

    if (props.className) {
        defaultClassName = defaultClassName + props.className;
    }
    else {
        defaultClassName = defaultClassName + "-header";
    }

    const navigate = useNavigate();

    const useToGoReservation = () => {
        document.getElementById("title-reservation").style.backgroundColor = "lightslategray";
        navigate(ROUTE.RESERVATION)
    };

    const useToGoCancelReservation = () => {
        document.getElementById("title-cancelReservation").style.backgroundColor = "lightslategray";
        navigate(ROUTE.CANCELRESERVATION)
    };

    return (
        <div className ={ defaultClassName }>
            <div className = "title-reservation" id = "title-reservation" onClick = {useToGoReservation}>
                    <Text text = "예약"></Text>
            </div>
            <div className = "title-cancelReservation" id = "title-cancelReservation" onClick = {useToGoCancelReservation}>
                <Text text = "예약 취소"></Text>
            </div>
        </div>
    );
};

export default ReservationHeader;