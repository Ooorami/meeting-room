import React, {useEffect, useState} from "react";

import "./ReservationList.css"
import {getMeetinroom, getReservation, postCancelReservation, postChangeReservation} from "../../../services/axios";
import {useNavigate} from "react-router";
import {ROUTE} from "../../../constants/Route";
import ReservationHeader from "../ReservationHeader/ReservationHeader";
import Table from "../../molecules/Table/Table";
import AlertModal from "../../modal/AlertModal/AlertModal";
import Home from "../../../assets/img/Home.png";
import EditModal from "../../modal/EditModal/EditModal";
import type {CancelInformations} from "../../../types/CancelReservationInformations";
import {ApiStatusCode} from "../../../types/api/Common/ApiStatusCode";
import type {ChangeReservationInformations} from "../../../types/ChangeReservationInformations";
import {getCurrentDate} from "../../../util/date";
import {convertTimeToMinutesReservatonList} from "../../../constants/Time";

const ReservationList = () => {
    const [isOpenCancelReservationAlertModal, setIsOpenCancelReservationAlertModal] = useState(false);
    const [isOpenFailCancelReservationAlertModal, setIsOpenFailCancelReservationAlertModal] = useState(false);
    const [isOpenNetworkFailCancelReservationAlertModal, setIsOpenNetworkFailCancelReservationAlertModal] = useState(false);
    const [isOpenChangeReservationAlertModal, setIsOpenChangeReservationAlertModal] = useState(false);
    const [isOpenFailChangeReservationAlertModal, setIsOpenFailChangeReservationAlertModal] = useState(false);
    const [isOpenNetworkFailChangeReservationAlertModal, setIsOpenNetworkFailChangeReservationAlertModal] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);

    const [alertMessage, setAlertMessage] = useState("");

    // 예약된 리스트에서 아이콘을 누르는 행위를 통해 예약을 변경시키기 위해 필요한 setSelected
    const [selected, setSelected] = useState('');

    const [meetingroom, setMeetingroom] = useState([{
        roomCd: "",
        roomName: ""
    }]);

    const [cancelInformations, setCancelInformations] = useState({
        RESERVATION_ID: "",
        order: ""
    });

    const [reservation, setReservation] = useState([{
        reservationId: "",
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

    console.log(meetingroom)

    useEffect(() => {
        const getReservationData = async () => {
            try {
                const response = await getReservation();
                const fetchedReservationList = response.data.data.reservationList;
                const updatedReservation = fetchedReservationList.filter(reservation =>
                    reservation.useYn !== 'N'
                );
                setReservation(updatedReservation);
                updateReservationStatus(fetchedReservationList);
            } catch (err) {
                console.error(err);
            }
        };
        getReservationData();
    }, []);

    const openSuccessCancelReservationModal = () => {
        setIsOpenCancelReservationAlertModal(true);
    };

    const closeSuccessCancelReservationModal = () => {
        setIsOpenCancelReservationAlertModal(false);
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

    const openSuccessChangeReservationModal = () => {
        setIsOpenChangeReservationAlertModal(true);
    };

    const closeSuccessChangeReservationModal = () => {
        setIsOpenChangeReservationAlertModal(false);
    };

    const openFailChangeReservationModal = () => {
        setAlertMessage(alertMessage);
        setIsOpenFailChangeReservationAlertModal(true);
    };

    const closeFailChangeReservationModal = () => {
        setIsOpenFailChangeReservationAlertModal(false);
    };

    const openNetworkFailChangeReservationModal = () => {
        setIsOpenNetworkFailChangeReservationAlertModal(true);
    };

    const closeNetworkFailChangeReservationModal = () => {
        setIsOpenNetworkFailChangeReservationAlertModal(true);
    };

    const postCancelReservationInformatios = async (selectedOrder) => {

        const targetReservation = reservation[selectedOrder - 1]
        console.log(targetReservation)
        const cancelRequest: CancelInformations = {
            RESERVATION_ID: targetReservation.reservationId
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

    const postChangeReservationInformatios = async (targetChangeReservation) => {

        console.log("targetChangeReservation: ", targetChangeReservation);

        const changeRequest: ChangeReservationInformations = {
            order: targetChangeReservation.order,
            roomCd: targetChangeReservation.roomCd,
            RESERVATION_ID: targetChangeReservation.reservationId,
            RESERVATION_DT: targetChangeReservation.reservationDt,
            START_TM: targetChangeReservation.startTm,
            END_TM: targetChangeReservation.endTm,
            CHECKER: targetChangeReservation.checker,
        };

        console.log("changeRequest: ", changeRequest);

        return await postChangeReservation(changeRequest).then((response) => {
            if (!response) {
                openNetworkFailChangeReservationModal();
                return false;
            }

            console.log(response);

            if (response.data.statusCode !== ApiStatusCode.SUCCESS) {
                openFailChangeReservationModal(response.message);
                return false;
            }
            return true;
        })
    };

    const updateReservationStatus = (reservation) => {
        const currentDate = getCurrentDate();
        reservation.forEach((el) => {
            const reservationDate = (el.reservationDt);
            if (reservationDate < currentDate) {
                el.useYn = 'N';
            }
        });

        const updatedReservation = reservation.filter((reservation) => reservation.useYn !== 'N');
        setReservation(updatedReservation);
    };

    const deleteReservation = async () => {
        const response = await getReservation();
        const fetchedReservationList = response.data.data.reservationList;
        const updatedReservation = fetchedReservationList.filter((reservation) => reservation.useYn !== 'N');
        setReservation(updatedReservation);
    }

    const updateReservation = async () => {
        const response = await getReservation();
        const fetchedReservationList = response.data.data.reservationList;
        const updatedReservation = fetchedReservationList.filter((reservation) => reservation.useYn !== 'N');
        setReservation(updatedReservation);
    }

    // 예약된 리스트에서 아이콘을 누르는 행위를 통해 예약을 변경시키기 위한 함수 handleEdit
    const handleEdit = (item) => {
        setIsOpenEditModal(true);
        const selectedData = {
            order: item.order,
            roomCd: item.roomCd,
            reservationId: item.reservationId,
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
            deleteReservation(); // 예약 정보 삭제
        }
    }

    const handleCancel = () => {
        setIsOpenEditModal(false);
    }

    const checkDate = (date) => {
        const currentDate = () => {
            const date = new Date();
            const year = date.getFullYear().toString();
            let month = (date.getMonth() + 1).toString().padStart(2, "0");
            let day = date.getDate().toString().padStart(2, "0");

            return `${year}${month}${day}`;
        };
        if (date < currentDate()) {
            alert("회의실 변경은 오늘부터 가능합니다!");
            return false;
        }
        return true;
    }

    const checkTime = (startTm, endTm) => {
        const startTime = convertTimeToMinutesReservatonList(startTm);
        const endTime = convertTimeToMinutesReservatonList(endTm);
        if (endTime <= startTime) {
            alert("종료 시간은 시작 시간보다 빠를 수 없습니다.");
            return false;
        }
        return true;
    };

    // 예약 변경 시 겹치는 예약이 있는지 체크하는 함수
    const checkReservationListChange = (targetDate, targetRoomCd, targetStartTime, targetEndTime) => {
        // 변경하려는 예약 정보와 겹치는 다른 예약들을 필터링
        const overlappingReservations = reservation.filter(
            (res) =>
                res.roomCd === targetRoomCd && // 같은 회의실인 경우
                res.reservationDt === targetDate && // 같은 날짜인 경우
                ((res.startTm <= targetStartTime && res.endTm >= targetStartTime) || // 시작 시간이 겹치는 경우
                    (res.startTm <= targetEndTime && res.endTm >= targetEndTime) || // 종료 시간이 겹치는 경우
                    (res.startTm >= targetStartTime && res.endTm <= targetEndTime)) // 변경하려는 예약을 완전히 포함하는 경우
        );
        // 겹치는 예약이 있는 경우, 겹치는 예약 정보를 출력하거나 처리할 수 있음
        if (overlappingReservations.length > 0) {
            alert("해당 시간대에 이미 예약이 있습니다. 다른 시간을 선택해주세요.");
            return false;
        }
        return true;
    };

    const handleEditSubmit = async (item) => {
        console.log("item: ", item);

        // 변경된 예약 정보를 업데이트
        setReservation((prevReservation) =>
            prevReservation.map((row) =>
                item.order === row.order
                    ? {
                        RESERVATION_ID: item.reservationId,
                        RESERVATION_DT: item.reservationDt,
                        START_TM: item.startTm,
                        END_TM: item.endTm,
                        CHECKER: item.checker,
                    }
                    : row
            )
        );

        try {
            // 예약 변경 조건 제한: 겹치는 예약이 없는지 확인
            const isReservationChangePossible = checkReservationListChange(item.reservationDt, item.roomCd, item.startTm, item.endTm);

            if (!checkDate(item.reservationDt)) {
                return openFailChangeReservationModal();
            } else if (!checkTime(item.startTm, item.endTm)) {
                return openFailChangeReservationModal();
            } else if (!isReservationChangePossible) {
                return openFailChangeReservationModal();
            }

            // 예약 정보를 서버로 전송하여 예약을 변경
            const changeReservationSuccess = await postChangeReservationInformatios(item);

            if (changeReservationSuccess) {
                // 예약 변경 성공 시, 모달을 닫고 예약 정보를 업데이트
                setIsOpenEditModal(false);
                openSuccessChangeReservationModal();
                updateReservation();
            }
        } catch (err) {
            console.error(err);
            openFailChangeReservationModal();
        }
    };

    const headerData = ["order", "회의실 이름", "예약 날짜", "시작 시간", "종료 시간", "신청자", "예약 변경", "예약 취소"];

    const navigate = useNavigate();

    const useToGoInitReservation = () => {
        navigate(ROUTE.INITRESERVATION)
    };

    return (
        <div className="cancelReservation">
            <header className="title">
                <ReservationHeader></ReservationHeader>
            </header>
            <body className="body">
            <div class='reservationList-table-container'>
                <Table headerData={headerData} reservation={reservation} handleEdit={handleEdit}
                       meetingroom={meetingroom} handleRemove={handleRemove}></Table>
            </div>
            <div>
                <img className="home" src={Home} onClick={useToGoInitReservation} alt="home"/>
            </div>
            </body>
            <AlertModal isOpen={isOpenFailCancelReservationAlertModal} body_text={"회의실 예약 취소에 실패했습니다."}
                        closeModal={closeFailCancelReservationModal}></AlertModal>
            <AlertModal isOpen={isOpenNetworkFailCancelReservationAlertModal}
                        body_text={"회의실 예약 취소에 실패했습니다.\n네트워크를 확인해주세요."}
                        closeModal={closeNetworkFailCancelReservationModal}></AlertModal>
            <AlertModal body_text="회의실 예약 취소가 완료되었습니다." isOpen={isOpenCancelReservationAlertModal}
                        closeModal={closeSuccessCancelReservationModal}></AlertModal>
            <AlertModal isOpen={isOpenFailChangeReservationAlertModal} body_text={"회의실 예약 변경에 실패했습니다."}
                        closeModal={closeFailChangeReservationModal}></AlertModal>
            <AlertModal isOpen={isOpenNetworkFailChangeReservationAlertModal}
                        body_text={"회의실 변경에 실패했습니다.\n네트워크를 확인해주세요."}
                        closeModal={closeNetworkFailChangeReservationModal}></AlertModal>
            {isOpenEditModal && <EditModal selectedData={selected} handleCancel={handleCancel}
                                           handleEditSubmit={handleEditSubmit}></EditModal>}
            <AlertModal body_text="회의실 예약 변경이 완료되었습니다." isOpen={isOpenChangeReservationAlertModal}
                        closeModal={closeSuccessChangeReservationModal}></AlertModal>
        </div>
    );
};
export default ReservationList;