import React, {useEffect, useState} from "react";

import "./Reservation.css";
import "../../../color.css";

import Home from "../../../assets/img/Home.png"
import ReservationHeader from "../../ReservationHeader";
import {TIME} from "../../../constants/Time"
import AlertModal from "../../modal/AlertModal";
import {useNavigate} from "react-router";
import {ROUTE} from "../../../constants/Route";
import {getMeetinroom, postReservation} from "../../../services/axios";
import {ApiStatusCode} from "../../../types/api/Common/ApiStatusCode";
import Radios from "../../molecules/Radios";
import Select from "../../molecules/Select";
import type {Informations} from "../../../types/ReservationInformations";


const Reservation = () => {

    const [isOpenFailReservationAlertModal, setIsOpenFailReservationAlertModal] = useState(false);
    const [isOpenNetworkFailReservationAlertModal, setIsOpenNetworkFailReservationAlertModal] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const [isOpen, setIsOpen] = useState(false);

    const [meetingroom, setMeetingroom] = useState([{
        roomCode: "",
        roomName: ""
    }]);

    const [informations, setInformations] = useState({
        meetingroom: "",
        date: "",
        startHour: "",
        startMinute: "",
        endHour: "",
        endMinute: "",
        applicant: "",
        participants: "",
        topic: ""
    });

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await getMeetinroom();
                const fetchedRoomList = response.data.data.roomList;
                setMeetingroom(fetchedRoomList);
                console.log(fetchedRoomList);
            } catch (err) {
                console.error(err);
            }
        };
        getData();
    }, []);

    const openSuccessReservationModal = () => {
        setIsOpen(true);
    }

    const closeSuccessReservationModal = () => {
        setIsOpen(false);
    };

    const openFailReservationModal = () => {
        setAlertMessage(alertMessage);
        setIsOpenFailReservationAlertModal(true);
    };

    const closeFailReservationModal = () => {
        setIsOpenFailReservationAlertModal(false);
    };

    const openNetworkFailReservationModal = () => {
        setIsOpenNetworkFailReservationAlertModal(true);
    };

    const closeNetworkFailReservationModal = () => {
        setIsOpenNetworkFailReservationAlertModal(true);
    };

    const postReservationInformatios = async () => {

        const room_cd = () => {
            const selectedRoom = meetingroom.find(room => room.roomName === informations.meetingroom);
            if (selectedRoom) {
                return selectedRoom.roomCd.toString();
            } else {
                return "";
            }
        };
        const start_tm = `${informations.startHour} ${informations.startMinute}`
        const end_tm = `${informations.endHour} ${informations.endMinute}`
        const reservation_dt = informations.date.split("-").join("")
        const checker = `${informations.applicant}`
        const topic = `${informations.topic}`
        const participants = `${informations.participants}`

        const request: Informations = {
            ROOM_CD: room_cd(),
            START_TM: start_tm,
            END_TM: end_tm,
            RESERVATION_DT: reservation_dt,
            CHECKER: checker,
            TOPIC: topic,
            PARTICIPANT: participants
        }

        console.log(request)

        return await postReservation(request).then((response) => {
            if (!response) {
                openNetworkFailReservationModal();
                return false;
            }

            console.log(response)

            if (response.data.statusCode !== ApiStatusCode.SUCCESS) {
                openFailReservationModal(response.message);
                return false;
            }
            return true;
        })
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInformations((prevInformations) => ({
            ...prevInformations,
            [name]: value,
        }));
    };

    const handleOnClickButton = async () => {
        const reservationSuccess = await postReservationInformatios();
        if (reservationSuccess) {
            openSuccessReservationModal();
        }
    };

    const formElements = [
        {
            key: "회의실",
            value: <Radios list={meetingroom.map(room => room.roomName)} name="meetingroom"
                           handleRadioChange={handleChange}></Radios>
        },
        {
            key: "예약 날짜",
            value:
                <span>
                    <input type="date" value={informations.date} id="dateInput" onChange={handleChange} className="date"
                           name="date"></input>
                </span>
        },
        {
            key: "시작 시간",
            value: <>
                <Select list={Object.values(TIME.HOUR)} name={"startHour"}
                        handleOptionChange={handleChange}></Select> &nbsp;
                <Select list={Object.values(TIME.MINUTE)} name={"startMinute"}
                        handleOptionChange={handleChange}></Select>
            </>
        },
        {
            key: "종료 시간",
            value: <>
                <Select list={Object.values(TIME.HOUR)} name={"endHour"}
                        handleOptionChange={handleChange}></Select> &nbsp;
                <Select list={Object.values(TIME.MINUTE)} name={"endMinute"}
                        handleOptionChange={handleChange}></Select>
            </>
        },
        {
            key: "신청자",
            value: <>
                <input onChange={handleChange} className="input-box" name="applicant" type="text"
                       placeholder="이름을 입력하세요."></input>
            </>
        },
        {
            key: "참여자",
            value: <>
                <input onChange={handleChange} className="input-box" name="participants" type="text"
                       placeholder="참여자를 입력하세요."></input>
            </>
        },
        {
            key: "회의 주제",
            value: <>
                <input onChange={handleChange} className="input-box" name="topic" type="text"
                       placeholder="회의 주제를 입력하세요."></input>
            </>
        }
    ];

    const navigate = useNavigate();

    const useToGoInit = () => {
        navigate(ROUTE.INIT);
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
                <button className="reservation-button" onClick={handleOnClickButton}>예약</button>
                <AlertModal body_text="회의실 예약이 완료되었습니다." isOpen={isOpen}
                            closeModal={closeSuccessReservationModal}></AlertModal>
            </p>
            <div>
                <img className="home" src={Home} onClick={useToGoInit} alt="home"/>
            </div>
            </body>
            <AlertModal isOpen={isOpenFailReservationAlertModal} body_text={"회의실 예약에 실패했습니다."}
                        closeModal={closeFailReservationModal}></AlertModal>
            <AlertModal isOpen={isOpenNetworkFailReservationAlertModal} body_text={"회의실 예약에 실패했습니다.\n네트워크를 확인해주세요."}
                        closeModal={closeNetworkFailReservationModal}></AlertModal>
        </div>
    );
};

export default Reservation;