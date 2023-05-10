import React, {useEffect} from "react";

import {useNavigate} from "react-router";
import {ROUTE} from "../constants/Route";
import {useLocation} from "react-router-dom";

import "./ReservationHeader.css";
import "../color.css";
import Text from "./Text";

const ReservationHeader = (props) => {

    const location = useLocation();
    const path = location.pathname;

    let defaultClassName = "reservationHeader"

    if (props.className) {
        defaultClassName = defaultClassName + props.className;
    } else {
        defaultClassName = defaultClassName + "-header";
    }

    const navigate = useNavigate();

    const useToGoReservation = () => {
        document.getElementById("title-reservation").style.backgroundColor = "var(--primary-color-white)";
        document.getElementById("title-reservation").style.color = "var(--primary-color-tiffanyBlue)";
        navigate(ROUTE.RESERVATION)
    };

    useEffect(() => {
        if (path === ROUTE.RESERVATION) {
            document.getElementById("title-reservation").style.backgroundColor = "var(--primary-color-white)";
            document.getElementById("title-reservation").style.color = "var(--primary-color-tiffanyBlue)";
        } else if (path === ROUTE.CANCELRESERVATION) {
            document.getElementById("title-cancelReservation").style.backgroundColor = "var(--primary-color-white)";
            document.getElementById("title-cancelReservation").style.color = "var(--primary-color-tiffanyBlue)";
        }
    }, [path]);

    const useToGoCancelReservation = () => {
        document.getElementById("title-cancelReservation").style.backgroundColor = "var(--primary-color-white)";
        document.getElementById("title-cancelReservation").style.color = "var(--primary-color-tiffanyBlue)";
        navigate(ROUTE.CANCELRESERVATION)
    };

    return (
        <div className={defaultClassName}>
            <div className="title-reservation" id="title-reservation" onClick={useToGoReservation}>
                <Text text="예약"></Text>
            </div>
            <div className="title-cancelReservation" id="title-cancelReservation" onClick={useToGoCancelReservation}>
                <Text text="예약 취소"></Text>
            </div>
        </div>
    );
};

export default ReservationHeader;