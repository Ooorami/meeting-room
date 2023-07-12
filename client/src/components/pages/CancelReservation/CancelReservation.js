import React, {useEffect, useState} from "react";

import "./CancalReservation.css";
import "../../../color.css";

import ReservationHeader from "../ReservationHeader/ReservationHeader";
import AlertModal from "../../modal/AlertModal/AlertModal";
import Home from "../../../assets/img/Home.png";
import {useNavigate} from "react-router";
import {ROUTE} from "../../../constants/Route";
import {getMeetinroom, getReservation, postCancelReservation} from "../../../services/axios";
import {ApiStatusCode} from "../../../types/api/Common/ApiStatusCode";
import Table from "../../molecules/Table/Table";
import {getCurrentDate} from "../../../util/date";
import EditModal from "../../modal/EditModal/EditModal";

const CancelReservation = () => {
    const [isOpenFailCancelReservationAlertModal, setIsOpenFailCancelReservationAlertModal] = useState(false);
    const [isOpenNetworkFailCancelReservationAlertModal, setIsOpenNetworkFailCancelReservationAlertModal] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);

    const [alertMessage, setAlertMessage] = useState("");

    const [isOpen, setIsOpen] = useState(false);

    // 예약된 리스트에서 아이콘을 누르는 행위를 통해 예약을 변경시키기 위해 필요한 setSelected
    const [selected, setSelected] = useState('');

    const [meetingroom, setMeetingroom] = useState([{
        roomCode: "",
        roomName: ""
    }]);

    const [cancelInformations, setCancelInformations] = useState({
        id: "",
        order: ""
    });

    const [reservation, setReservation] = useState([{
        id: "",
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

    const postCancelReservationInformatios = async (selectedOrder) => {

        const targetReservation = reservation[selectedOrder - 1]
        console.log(targetReservation)
        const cancelRequest = {
            RESERVATION_ID: targetReservation.reservationId,
            ROOM_CD: targetReservation.roomCd,
            START_TM: targetReservation.startTm,
            RESERVATION_DT: targetReservation.reservationDt,
            CHECKER: targetReservation.checker
        }

        console.log("cancelRequest: ", cancelRequest)

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

    // 예약 정보를 수정하기 위한 함수 handleSave
    const handleSave = (data) => {
        // 받아온 데이터의 order가 있을 경우, 가져온 order가 기존 table의 order가 같으면 가져온 데이터를 반영할 것
        if (data.order) {
            setReservation(
                reservation.map(row => data.order === row.order ? {
                    id: data.id,
                    order: data.order,
                    roomCd: data.roomCd,
                    reservationDt: data.reservationDt,
                    startTm: data.startTm,
                    endTm: data.endTm,
                    checker: data.checker
                } : row))
        }
    }

    // 예약된 리스트에서 아이콘을 누르는 행위를 통해 예약을 변경시키기 위한 함수 handleEdit
    const handleEdit = (item) => {
        setIsOpenEditModal(true);
        const selectedData = {
            id: item.id,
            order: item.order,
            roomCd: item.roomCd,
            reservationDt: item.reservationDt,
            startTm: item.startTm,
            endTm: item.endTm,
            checker: item.checker
        }
        console.log(selectedData);
        setSelected(selectedData);
    }

    // 예약된 리스트에서 아이콘을 누르는 행위를 통해 예약을 취소시키기 위한 함수 handleRemove
    const handleRemove = async (order) => {
        setReservation(reservation => reservation.filter(item => item.order !== order));

        const cancelReservationSuccess = await postCancelReservationInformatios(order);
        if (cancelReservationSuccess) {
            openSuccessCancelReservationModal();
            deleteReservation();
        }
    }

    const handleCancel = () => {
        setIsOpenEditModal(false);
    }

    const handleEditSubmit = (item) => {
        console.log(item);
        handleSave(item);
        setIsOpenEditModal(false);
    }

    const handleOnSubmitCancelReservation = (event) => {
        event.preventDefault();
        handleOnClickButtonCancelReservation();
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCancelInformations((prevCancelInformations) => ({
            ...prevCancelInformations,
            [name]: value,
        }));
    };

    const handleOnClickButtonCancelReservation = async () => {
        const cancelReservationSuccess = await postCancelReservationInformatios(cancelInformations.order);
        if (cancelReservationSuccess) {
            openSuccessCancelReservationModal();
            deleteReservation();
        }
    };

    const headerData = ["order", "회의실 코드", "예약 날짜", "시작 시간", "종료 시간", "신청자", "예약 변경", "예약 취소"];

    const navigate = useNavigate();

    const useToGoInitReservation = () => {
        navigate(ROUTE.INITRESERVATION)
    };

    return (
        <div className="cancelReservation">
            <header className="title">
                <ReservationHeader></ReservationHeader>
            </header>
            <form onSubmit={handleOnSubmitCancelReservation}>
                <body className="body">
                <div class='Table-container'>
                    <Table headerData={headerData} reservation={reservation} handleEdit={handleEdit}
                           handleRemove={handleRemove}></Table>
                </div>
                <p>
                <span>
                    order &nbsp;:&nbsp;
                    <input onChange={handleChange} className="cancelReservation-input-box" name="order" type="text"
                           placeholder="order를 입력하세요."></input>
                </span>
                </p>
                <p>
                    <button className="cancelReservation-button">예약 취소</button>
                    <AlertModal body_text="회의실 예약 취소가 완료되었습니다." isOpen={isOpen}
                                closeModal={closeSuccessCancelReservationModal}></AlertModal>
                </p>
                <div>
                    <img className="home" src={Home} onClick={useToGoInitReservation} alt="home"/>
                </div>
                </body>
                <AlertModal isOpen={isOpenFailCancelReservationAlertModal} body_text={"회의실 예약 취소에 실패했습니다."}
                            closeModal={closeFailCancelReservationModal}></AlertModal>
                <AlertModal isOpen={isOpenNetworkFailCancelReservationAlertModal}
                            body_text={"회의실 예약에 실패했습니다.\n네트워크를 확인해주세요."}
                            closeModal={closeNetworkFailCancelReservationModal}></AlertModal>
                {isOpenEditModal && <EditModal selectedData={selected} handleCancel={handleCancel}
                                               handleEditSubmit={handleEditSubmit}></EditModal>}
            </form>
        </div>
    );
};
export default CancelReservation;