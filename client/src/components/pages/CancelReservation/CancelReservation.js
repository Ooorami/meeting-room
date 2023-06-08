import React, {useEffect, useState} from "react";

import "./CancalReservation.css";
import "../../../color.css";

import ReservationHeader from "../../ReservationHeader";
import AlertModal from "../../modal/AlertModal";
import Home from "../../../img/Home.png";
import {useNavigate} from "react-router";
import {ROUTE} from "../../../constants/Route";
import {getMeetinroom, getReservation, postCancelReservation} from "../../../services/axios";
import Tr from "../../molecules/Tr/Tr";
import {ApiStatusCode} from "../../../types/api/Common/ApiStatusCode";

const CancelReservation = () => {

    const navigate = useNavigate();

    const useToGoInit = () => {
        navigate(ROUTE.INIT)
    };

    const [meetingroom, setMeetingroom] = useState([{
        roomCode: "",
        roomName: ""
    }]);

    useEffect(() => {

        const getMeetingroomData = async () => {
            try {
                const response = await getMeetinroom();
                const fetchedRoomList = response.data.data.roomList;
                setMeetingroom(fetchedRoomList);
                console.log(fetchedRoomList);
            } catch (err) {
                console.error(err);
            }
        };
        getMeetingroomData();
    }, []);

    // const [cancelInformations, setCancelInformations] = useState({
    //     meetingroom: "",
    //     startHour: "",
    //     startMinute: ""
    // });
    const [cancelInformations, setCancelInformations] = useState({
        order: ""
    });

    const handleChange = (e) => {
        // setInformations({
        //     ...informations,
        //     [e.target.name]: e.target.value,
        // })
        const {name, value} = e.target;
        // const roomCdValue = room_cd();
        setCancelInformations((prevCancelInformations) => ({
            ...prevCancelInformations,
            [name]: value,
            // roomCd: roomCdValue
        }));
    };

    const [reservation, setReservation] = useState([{
        order: "",
        roomCd: "",
        reservationDt: "",
        startTm: "",
        endTm: "",
        checker: "",
        useYn: ""
    }]);

    const [selected, setSelected] = useState('');

    useEffect(() => {

        const getReservationData = async () => {
            try {
                const response = await getReservation();
                const fetchedReservationList = response.data.data.reservationList;
                const updatedReservation = fetchedReservationList.filter(reservation => reservation.useYn !== 'N');
                setReservation(updatedReservation);
                updateReservationStatus(fetchedReservationList);
                // console.log(fetchedReservationList)
                console.log(updatedReservation);
            } catch (err) {
                console.error(err);
            }
        };
        getReservationData();
    }, []);

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

    const handleEdit = (item) => {
        const selectedData = {
            order: item.order,
            roomCd: item.roomCd,
            reservationDt: item.reservationDt,
            startTm: item.startTm,
            endTm: item.endTm,
            checker: item.checker
        }
        setSelected(selectedData);
    }

    const [alertMessage, setAlertMessage] = useState("");
    const [failCancelReservationAlertModal, setFailCancelReservationAlertModal] = useState(false);
    const [networkFailCancelReservationAlertModal, setNetworkFailCancelReservationAlertModal] = useState(false);

    const closeFailCancelReservationModal = () => {
        setFailCancelReservationAlertModal(false);
    };

    const openFailCancelReservationModal = () => {
        setAlertMessage(alertMessage);
        setFailCancelReservationAlertModal(true);
    };

    const openNetworkFailCancelReservationModal = () => {
        setNetworkFailCancelReservationAlertModal(true);
    };

    const postCancelReservationInformatios = async () => {
        type CancelInformations = {
            ROOM_CD: string,
            START_TM: string,
            RESERVATION_DT: string,
            CHECKER: string,
        };

        const selectedIndex = cancelInformations.order;

        const targetReservation = reservation[selectedIndex - 1]

        const cancelRequest = {
            ROOM_CD: targetReservation.roomCd,
            START_TM: targetReservation.startTm,
            RESERVATION_DT: targetReservation.reservationDt,
            CHECKER: targetReservation.checker
        }

        // const room_cd = () => {
        //     const selectedRoom = meetingroom.find(room => room.roomName === cancelInformations.meetingroom);
        //     if (selectedRoom) {
        //         return selectedRoom.roomCd.toString();
        //     } else {
        //         return "";
        //     }
        // };
        // const start_tm = `${cancelInformations.startHour} ${cancelInformations.startMinute}`
        // const reservation_dt = cancelInformations.date.split("-").join("")
        // const checker = `${cancelInformations.applicant}`
        //
        // const cancelRequest = {
        //     ROOM_CD: room_cd(),
        //     START_TM: start_tm,
        //     RESERVATION_DT: reservation_dt,
        //     CHECKER: checker,
        // }

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

    // const formElements = [
    //     {
    //         key: "회의실",
    //         value: <Radios className="meetingroom" list={Object.values(MEETINGROOM)} name="meetingroom"
    //                        handleRadioChange={handleChange}></Radios>
    //     },
    //     {
    //         key: "예약 날짜",
    //         value:
    //             <span>
    //                 <input type="date" value={cancelInformations.date} id="dateInput" onChange={handleChange}
    //                        className="date"
    //                        name="date"></input>
    //             </span>
    //     },
    //     {
    //         key: "시작 시간",
    //         value: <>
    //             <Select list={Object.values(TIME.HOUR)} name={"startHour"}
    //                     handleOptionChange={handleChange}></Select> &nbsp;
    //             <Select list={Object.values(TIME.MINUTE)} name={"startMinute"}
    //                     handleOptionChange={handleChange}></Select>
    //         </>
    //     },
    //     {
    //         key: "신청자",
    //         value: <>
    //             <input onChange={handleChange} className="input-box" name="applicant" type="text"
    //                    placeholder="이름을 입력하세요."></input>
    //         </>
    //     }
    // ];

    const getCurrentDate = () => {
        const date = new Date();
        const year = date.getFullYear().toString();
        let month = date.getMonth() + 1;
        month = month < 10 ? '0' + month.toString() : month.toString();
        let day = date.getDate();
        day = day < 10 ? '0' + day.toString() : day.toString();

        return year + month + day;
    }

    const updateReservationStatus = (reservation) => {
        const currentDate = getCurrentDate();
        console.log(reservation);
        reservation.forEach((el) => {
            const reservationDate = (el.reservationDt);
            if (reservationDate < currentDate) {
                el.useYn = 'N';
            }
        });
        // 변경된 예약 상태를 업데이트
        const updatedReservation = reservation.filter(reservation => reservation.useYn !== 'N');
        setReservation(updatedReservation);
        setInterval(updateReservationStatus, 86400000); // 24시간에 1번 확인
    };


    const deleteReservation = () => {
        // console.log("reservation", reservation)
        const updatedReservation = reservation.filter(reservation => reservation.useYn !== 'N');
        // 삭제된 예약을 업데이트된 예약 리스트로 사용
        setReservation(updatedReservation);
    }


    const [isOpen, setIsOpen] = useState(false);

    const handleOnClickButton = async () => {
        const cancelReservationSuccess = await postCancelReservationInformatios();
        if (cancelReservationSuccess) {
            openSuccessModal();
            deleteReservation();
        }
    };

    const openSuccessModal = () => {
        setIsOpen(true);
    };

    const openFailModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div className="cancelReservation">
            <header className="title">
                <ReservationHeader></ReservationHeader>
            </header>
            <body className="body">
            <div>
                <div>회의실 예약 현황 :</div>
                <div className="table-container">
                    <table>
                        <thead>
                        <tr>
                            <th>
                                <div>
                                    order
                                </div>
                            </th>
                            <th>
                                <div>
                                    회의실 코드
                                </div>
                            </th>
                            <th>
                                <div>
                                    예약 날짜
                                </div>
                            </th>
                            <th>
                                <div>
                                    시작 시간
                                </div>
                            </th>
                            <th>
                                <div>
                                    종료 시간
                                </div>
                            </th>
                            <th>
                                <div>
                                    신청자
                                </div>
                            </th>
                        </tr>
                        </thead>
                        <div>
                            {/*<Tr reservation={reservation}></Tr>*/}
                            <Tr reservation={reservation}></Tr>
                            {/*<Tr reservation={reservation} handleRemove={handleRemove}*/}
                            {/*    handleEdit={handleEdit}></Tr>*/}
                        </div>
                    </table>
                </div>
            </div>
            <p>
                <span>
                    order &nbsp;:&nbsp;
                    <input onChange={handleChange} className="input-box" name="order" type="text"
                           placeholder="order를 입력하세요."></input>
                </span>
            </p>
            {/*{*/}
            {/*    formElements.map((data) => <p><span*/}
            {/*        className="label"> {data.key} &nbsp;:&nbsp; </span> {data.value}</p>)*/}
            {/*}*/}
            <p>
                <button className="cancelReservation-button" onClick={handleOnClickButton}>예약 취소</button>
                <AlertModal body_text="회의실 예약 취소가 완료되었습니다." isOpen={isOpen}
                            closeModal={closeModal}></AlertModal>
            </p>
            <div>
                <img className="home" src={Home} onClick={useToGoInit} alt="home"/>
            </div>
            </body>
            <AlertModal isOpen={failCancelReservationAlertModal} body_text={"회의실 예약 취소에 실패했습니다."}
                        closeModal={closeFailCancelReservationModal}></AlertModal>
            <AlertModal isOpen={networkFailCancelReservationAlertModal} body_text={"회의실 예약에 실패했습니다.\n네트워크를 확인해주세요."}
                        closeModal={closeFailCancelReservationModal}></AlertModal>
        </div>
    );
};
export default CancelReservation;