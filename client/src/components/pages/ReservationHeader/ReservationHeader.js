import React, {useEffect, useRef} from "react";

import {useNavigate} from "react-router";
import {ROUTE} from "../../constants/Route";
import {useLocation} from "react-router-dom";

import "./ReservationHeader.css";
import "../../color.css";
import Text from "../molecules/Text";

const ReservationHeader = (props) => {

    const location = useLocation();
    const path = location.pathname;

    useEffect(() => {
        if (path === ROUTE.RESERVATION) {
            reservationTitleRef.current.style.backgroundColor = 'var(--primary-color-white)';
            reservationTitleRef.current.style.color = 'var(--primary-color-tiffanyBlue)';
        } else if (path === ROUTE.CANCELRESERVATION) {
            cancelReservationTitleRef.current.style.backgroundColor = 'var(--primary-color-white)';
            cancelReservationTitleRef.current.style.color = 'var(--primary-color-tiffanyBlue)';
        }
    }, [path]);

    const reservationTitleRef = useRef(null);
    const cancelReservationTitleRef = useRef(null);

    const navigate = useNavigate();

    const useToGoReservation = () => {
        navigate(ROUTE.RESERVATION)
    };

    const useToGoCancelReservation = () => {
        navigate(ROUTE.CANCELRESERVATION)
    };

    let defaultClassName = "reservationHeader"

    if (props.className) {
        defaultClassName = defaultClassName + props.className;
    } else {
        defaultClassName = defaultClassName + "-header";
    }

    return (
        <div className={defaultClassName}>
            <div className="title-reservation" ref={reservationTitleRef} onClick={useToGoReservation}>
                <Text textClassName={"reservationTitlePage-text"} text="예약"></Text>
            </div>
            <div className="title-cancelReservation" ref={cancelReservationTitleRef} onClick={useToGoCancelReservation}>
                <Text textClassName={"cancelReservationTitlePage-text"} text="예약 취소"></Text>
            </div>
        </div>
    );
};

export default ReservationHeader;