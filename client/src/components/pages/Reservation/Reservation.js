import React, {useEffect, useState} from "react";

import "./Reservation.css";
import "../../../color.css";

import Home from "../../../assets/img/Home.png"
import ReservationHeader from "../ReservationHeader/ReservationHeader";
import {convertTimeToMinutes, convertTimeToMinutesReservatonList, TIME} from "../../../constants/Time"
import AlertModal from "../../modal/AlertModal/AlertModal";
import {useNavigate} from "react-router";
import {ROUTE} from "../../../constants/Route";
import {getMeetinroom, getReservation, postReservation} from "../../../services/axios";
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

    const [reservationList, setReservationList] = useState([{
        reservationId: "",
        order: "",
        roomCd: "",
        reservationDt: "",
        startTm: "",
        endTm: "",
        checker: "",
        useYn: ""
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

    useEffect(() => {
        const getReservationListData = async () => {
            try {
                const response = await getReservation();
                const fetchedReservationList = response.data.data.reservationList;
                const updatedReservation = fetchedReservationList.filter(reservation =>
                    reservation.useYn !== 'N');
                setReservationList(updatedReservation);
                console.log(updatedReservation);
            } catch (err) {
                console.error(err);
            }
        };
        getReservationListData();
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

    const checkDate = (date) => {
        const currentDate = () => {
            const date = new Date();
            const year = date.getFullYear().toString();
            let month = (date.getMonth() + 1).toString().padStart(2, "0");
            let day = date.getDate().toString().padStart(2, "0");

            return `${year}-${month}-${day}`;
        };
        if (date < currentDate()) {
            alert("회의실 예약은 오늘부터 가능합니다!");
            return false;
        }
        return true;
    }

    const checkTime = (startHour, startMinute, endHour, endMinute) => {
        const startTime = convertTimeToMinutes(startHour, startMinute);
        const endTime = convertTimeToMinutes(endHour, endMinute);
        if (endTime <= startTime) {
            alert("종료 시간은 시작 시간보다 빠를 수 없습니다!");
            return false;
        }
        return true;
    };

    const checkReservationList = () => {
        const targetDate = informations.date.split("-").join("");
        const targetRoomCd = meetingroom.find((room) => room.roomName === informations.meetingroom)?.roomCd;
        const targetStartTime = convertTimeToMinutes(informations.startHour, informations.startMinute);
        const targetEndTime = convertTimeToMinutes(informations.endHour, informations.endMinute);

        // 이미 예약된 리스트에서 같은 날짜와 회의실에 해당하는 예약 정보 필터링
        const reservedMeetings = reservationList.filter(
            (item) =>
                item.reservationDt === targetDate &&
                parseInt(item.roomCd) === targetRoomCd &&
                item.useYn === "Y"
        );

        // 이미 예약된 회의실 중 예약 가능 여부 확인
        for (const meeting of reservedMeetings) {

            // 선택한 예약 리스트의 시작 시간을 변환하여 가져옴
            const startTime = convertTimeToMinutesReservatonList(meeting.startTm);
            const endTime = convertTimeToMinutesReservatonList(meeting.endTm);

            if (
                (targetStartTime >= startTime && targetStartTime < endTime) ||
                (targetEndTime > startTime && targetEndTime <= endTime) ||
                (targetStartTime <= startTime && targetEndTime >= endTime)
            ) {
                // 예약이 불가능한 시간대일 경우
                alert("해당 시간대에 이미 예약이 있습니다. 다른 시간을 선택해주세요.");
                return false;
            }
        }
        // 예약 가능한 시간대일 경우
        return true;
    };

    const reservationConstraints = () => {
        if (!checkDate(informations.date)) {
            return false;
        } else if (!checkTime(informations.startHour, informations.startMinute, informations.endHour, informations.endMinute)) {
            return false;
        } else if (!checkReservationList()) {
            return false;
        }
        return true;
    };

    const handleOnClickReservationButton = async () => {
        // 예약 조건 제한
        if (!reservationConstraints()) {
            return openFailReservationModal();
        }
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
                <Select list={Object.values(TIME.HOUR).map(TIME => TIME.label)} name={"startHour"}
                        handleOptionChange={handleChange}></Select> &nbsp;
                <Select list={Object.values(TIME.MINUTE).map(TIME => TIME.label)} name={"startMinute"}
                        handleOptionChange={handleChange}></Select>
            </>
        },
        {
            key: "종료 시간",
            value: <>
                <Select list={Object.values(TIME.HOUR).map(TIME => TIME.label)} name={"endHour"}
                        handleOptionChange={handleChange}></Select> &nbsp;
                <Select list={Object.values(TIME.MINUTE).map(TIME => TIME.label)} name={"endMinute"}
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

    const useToGoInitReservation = () => {
        navigate(ROUTE.INITRESERVATION);
    };

    return (
        <div className="reservation">
            <header className="title">
                <ReservationHeader></ReservationHeader>
            </header>
            <body className="body">
            {
                formElements.map((data) => <p><span
                    className="reservationLabel"> {data.key} &nbsp;:&nbsp; </span> {data.value}</p>)
            }
            <p>
                <button className="reservation-button" onClick={handleOnClickReservationButton}>예약</button>
                <AlertModal body_text="회의실 예약이 완료되었습니다." isOpen={isOpen}
                            closeModal={closeSuccessReservationModal}></AlertModal>
            </p>
            <div>
                <img className="home" src={Home} onClick={useToGoInitReservation} alt="home"/>
            </div>
            </body>
            <AlertModal isOpen={isOpenFailReservationAlertModal} body_text={"회의실 예약에 실패했습니다."}
                        closeModal={closeFailReservationModal}></AlertModal>
            <AlertModal isOpen={isOpenNetworkFailReservationAlertModal} body_text={"회의실 예약에 실패했습니다.\n네트워크를 확인해주세요."}
                        closeModal={closeNetworkFailReservationModal}></AlertModal>
        </div>
    );
}
export default Reservation;