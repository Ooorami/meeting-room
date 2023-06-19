import React, {useEffect, useState} from "react";

import "./CancalReservation.css";
import "../../../color.css";

import ReservationHeader from "../../ReservationHeader";
import AlertModal from "../../modal/AlertModal";
import Home from "../../../assets/img/Home.png";
import {useNavigate} from "react-router";
import {ROUTE} from "../../../constants/Route";
import {getMeetinroom, getReservation, postCancelReservation} from "../../../services/axios";
import {ApiStatusCode} from "../../../types/api/Common/ApiStatusCode";
import Table from "../../molecules/Table/Table";
import {getCurrentDate} from "../../../util/date";
import {CancelInformations} from "../../../types/CancelReservationInformations";

const CancelReservation = () => {
    const [isOpenFailCancelReservationAlertModal, setIsOpenFailCancelReservationAlertModal] = useState(false);
    const [isOpenNetworkFailCancelReservationAlertModal, setIsOpenNetworkFailCancelReservationAlertModal] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const [isOpen, setIsOpen] = useState(false);

    // 예약된 리스트에서 아이콘을 누르는 행위를 통해 예약을 변경시키기 위해 필요한 setSelected
    // const [selected, setSelected] = useState('');

    const [meetingroom, setMeetingroom] = useState([{
        roomCode: "",
        roomName: ""
    }]);

    const [cancelInformations, setCancelInformations] = useState({
        order: ""
    });

    const [reservation, setReservation] = useState([{
        order: "",
        roomCd: "",
        reservationDt: "",
        startTm: "",
        endTm: "",
        checker: "",
        useYn: ""
    }]);

    useEffect(() => {
        const getMeetingroomData = async () => {
            try {
                const response = await getMeetinroom();
                const fetchedRoomList = response.data.data.roomList;
                setMeetingroom(fetchedRoomList);
            } catch (err) {
                console.error(err);
            }
        };
        getMeetingroomData();
    }, []);

    useEffect(() => {
        const getReservationData = async () => {
            try {
                const response = await getReservation();
                const fetchedReservationList = response.data.data.reservationList;
                const updatedReservation = fetchedReservationList.filter(reservation => reservation.useYn !== 'N');
                setReservation(updatedReservation);
                updateReservationStatus(fetchedReservationList);
            } catch (err) {
                console.error(err);
            }
        };
        getReservationData();
    }, []);

    const openSuccessCancelReservationModal = () => {
        setIsOpen(true);
    };

    const closeSuccessCancelReservationModal = () => {
        setIsOpen(false);
    };

    const openFailCancelReservationModal = () => {
        setAlertMessage(alertMessage);
        setIsOpenFailCancelReservationAlertModal(true);
    };

    const closeFailCancelReservationModal = () => {
        setIsOpenFailCancelReservationAlertModal(false);
    };

    const openNetworkFailCancelReservationModal = () => {
        setIsOpenNetworkFailCancelReservationAlertModal(true);
    };

    const closeNetworkFailCancelReservationModal = () => {
        setIsOpenNetworkFailCancelReservationAlertModal(true);
    };

    const postCancelReservationInformatios = async () => {
        const selectedIndex = cancelInformations.order;

        const targetReservation = reservation[selectedIndex - 1]

        const cancelRequest: CancelInformations = {
            ROOM_CD: targetReservation.roomCd,
            START_TM: targetReservation.startTm,
            RESERVATION_DT: targetReservation.reservationDt,
            CHECKER: targetReservation.checker
        }

        console.log(cancelRequest)

        return await postCancelReservation(cancelRequest).then((response) => {
            if (!response) {
                openNetworkFailCancelReservationModal();
                return false;
            }

            console.log(response)

            if (response.data.statusCode !== ApiStatusCode.SUCCESS) {
                openFailCancelReservationModal(response.message);
                return false;
            }
            return true;
        })
    }

    const updateReservationStatus = (reservation) => {
        const currentDate = getCurrentDate();
        reservation.forEach((el) => {
            const reservationDate = (el.reservationDt);
            if (reservationDate < currentDate) {
                el.useYn = 'N';
            }
        });

        const updatedReservation = reservation.filter(reservation => reservation.useYn !== 'N');

        setReservation(updatedReservation);
    };

    const deleteReservation = () => {
        const updatedReservation = reservation.filter(reservation => reservation.useYn !== 'N');

        setReservation(updatedReservation);
    }

    // 예약된 리스트에서 아이콘을 누르는 행위를 통해 예약을 취소시키기 위한 함수 handleRemove
    const handleRemove = (data, order) => {
        setReservation((prev) => {
            return [
                ...prev,
                {
                    order: data.order,
                    roomCd: data.roomCd,
                    reservationDt: data.reservationDt,
                    startTm: data.startTm,
                    endTm: data.endTm,
                    checker: data.checker
                }]
        });
        setReservation(reservation => reservation.filter(item => item.order !== order));
    }

    // 예약된 리스트에서 아이콘을 누르는 행위를 통해 예약을 변경시키기 위한 함수 handleEdit
    const handleEdit = (item) => {
        const selectedData = {
            order: item.order,
            roomCd: item.roomCd,
            reservationDt: item.reservationDt,
            startTm: item.startTm,
            endTm: item.endTm,
            checker: item.checker
        }
        setReservation(selectedData);
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCancelInformations((prevCancelInformations) => ({
            ...prevCancelInformations,
            [name]: value,
        }));
    };

    const handleOnClickButton = async () => {
        const cancelReservationSuccess = await postCancelReservationInformatios();
        if (cancelReservationSuccess) {
            openSuccessCancelReservationModal();
            deleteReservation();
        }
    };

    const headerData = ["order", "회의실 코드", "예약 날짜", "시작 시간", "종료 시간", "신청자", "예약 취소", "예약 변경"];

    const navigate = useNavigate();

    const useToGoInit = () => {
        navigate(ROUTE.INIT)
    };

    return (
        <div className="cancelReservation">
            <header className="title">
                <ReservationHeader></ReservationHeader>
            </header>
            <body className="body">
            <Table headerData={headerData} reservation={reservation} handleRemove={handleRemove}
                   handleEdit={handleEdit}></Table>
            <p>
                <span>
                    order &nbsp;:&nbsp;
                    <input onChange={handleChange} className="input-box" name="order" type="text"
                           placeholder="order를 입력하세요."></input>
                </span>
            </p>
            <p>
                <button className="cancelReservation-button" onClick={handleOnClickButton}>예약 취소</button>
                <AlertModal body_text="회의실 예약 취소가 완료되었습니다." isOpen={isOpen}
                            closeModal={closeSuccessCancelReservationModal}></AlertModal>
            </p>
            <div>
                <img className="home" src={Home} onClick={useToGoInit} alt="home"/>
            </div>
            </body>
            <AlertModal isOpen={isOpenFailCancelReservationAlertModal} body_text={"회의실 예약 취소에 실패했습니다."}
                        closeModal={closeFailCancelReservationModal}></AlertModal>
            <AlertModal isOpen={isOpenNetworkFailCancelReservationAlertModal}
                        body_text={"회의실 예약에 실패했습니다.\n네트워크를 확인해주세요."}
                        closeModal={closeNetworkFailCancelReservationModal}></AlertModal>
        </div>
    );
};
export default CancelReservation;