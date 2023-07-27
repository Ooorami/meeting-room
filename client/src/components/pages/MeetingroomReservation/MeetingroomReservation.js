import React, {useState} from "react";

import "./MeetingroomReservation.css";

import Home from "../../../assets/img/Home.png";
import ReservationHeader from "../ReservationHeader/ReservationHeader";
import AlertModal from "../../modal/AlertModal/AlertModal";
import {postMeetingroom} from "../../../services/axios";
import {ApiStatusCode} from "../../../types/api/Common/ApiStatusCode";
import {useNavigate} from "react-router";
import {ROUTE} from "../../../constants/Route";
import {MeetingroomInformations} from "../../../types/MeetingroomReservationInformatios";

const MeetingroomReservation = () => {

    const [isOpenFailMeetingroomReservationAlertModal, setIsOpenFailMeetingroomReservationAlertModal] = useState(false);
    const [isOpenNetworkFailMeetingroomReservationAlertModal, setIsOpenNetworkFailMeetingroomReservationAlertModal] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const [isOpen, setIsOpen] = useState(false);

    const [meetingroomInformations, setMeetingroomInformations] = useState({
        roomName: ""
    });

    const openSuccessMeetingroomReservationModal = () => {
        setIsOpen(true);
    }

    const closeSuccessMeetingroomReservationModal = () => {
        setIsOpen(false);
    };

    const openFailMeetingroomReservationModal = () => {
        setAlertMessage(alertMessage);
        setIsOpenFailMeetingroomReservationAlertModal(true);
    };

    const closeFailMeetingroomReservationModal = () => {
        setIsOpenFailMeetingroomReservationAlertModal(false);
    };

    const openNetworkFailMeetingroomReservationModal = () => {
        setIsOpenNetworkFailMeetingroomReservationAlertModal(true);
    };

    const closeNetworkFailMeetingroomReservationModal = () => {
        setIsOpenNetworkFailMeetingroomReservationAlertModal(true);
    };

    const postMeetingroomReservationInformatios = async () => {

        const roomName = `${meetingroomInformations.roomName}`

        const request: MeetingroomInformations = {
            ROOM_NM: roomName
        }

        console.log(request)

        return await postMeetingroom(request).then((response) => {
            if (!response) {
                openNetworkFailMeetingroomReservationModal();
                return false;
            }

            console.log(response)

            if (response.data.statusCode !== ApiStatusCode.SUCCESS) {
                openFailMeetingroomReservationModal(response.message);
                return false;
            }
            return true;
        })
    }

    const handleOnSubmitMeetingroomReservation = (event) => {
        event.preventDefault();
        handleOnClickMeetingroomReservationButton();
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setMeetingroomInformations((prevMeetingroomInformations) => ({
            ...prevMeetingroomInformations,
            [name]: value,
        }));
    };

    const handleOnClickMeetingroomReservationButton = async () => {
        const meetingroomReservationSuccess = await postMeetingroomReservationInformatios();
        if (meetingroomReservationSuccess) {
            openSuccessMeetingroomReservationModal();
        }
    };

    const formElements = [
        {
            key: "회의실",
            value: <>
                <input onChange={handleChange} className="input-box" name="roomName" type="text"
                       placeholder="등록할 회의실 입력하세요."></input>
            </>
        }
    ];

    const navigate = useNavigate();

    const useToGoInitReservation = () => {
        navigate(ROUTE.INITRESERVATION);
    };

    return (
        <div className="meetingroomReservation">
            <header className="title">
                <ReservationHeader></ReservationHeader>
            </header>
            <form onSubmit={handleOnSubmitMeetingroomReservation}>
                <body className="body">
                {
                    formElements.map((data) => <p><span
                        className="label"> {data.key} &nbsp;:&nbsp; </span> {data.value}</p>)
                }
                <p>
                    <button type='submit' className="meetingroomReservation-button">등록</button>
                    <AlertModal body_text="회의실 등록이 완료되었습니다." isOpen={isOpen}
                                closeModal={closeSuccessMeetingroomReservationModal}></AlertModal>
                </p>
                <div>
                    <img className="home" src={Home} onClick={useToGoInitReservation} alt="home"/>
                </div>
                </body>
                <AlertModal isOpen={isOpenFailMeetingroomReservationAlertModal} body_text={"회의실 등록에 실패했습니다."}
                            closeModal={closeFailMeetingroomReservationModal}></AlertModal>
                <AlertModal isOpen={isOpenNetworkFailMeetingroomReservationAlertModal}
                            body_text={"회의실 등록에 실패했습니다.\n네트워크를 확인해주세요."}
                            closeModal={closeNetworkFailMeetingroomReservationModal}></AlertModal>
            </form>
        </div>
    );
};
export default MeetingroomReservation;