import React, {useEffect, useState} from "react";

import "./Login.css";
import LoginHeader from "../LoginHeader/LoginHeader";
import Home from "../../../assets/img/Home.png";
import {useNavigate} from "react-router-dom";
import {ROUTE} from "../../../constants/Route";
import type {MemberInformations} from "../../../types/MemberInformations";
import {postLogin} from "../../../services/axios";
import {ApiStatusCode} from "../../../types/api/Common/ApiStatusCode";
import AlertModal from "../../modal/AlertModal/AlertModal";

const Login = () => {

    const [isOpenFailLoginAlertModal, setIsOpenFailLoginAlertModal] = useState(false);
    const [isOpenNetworkFailLoginAlertModal, setIsOpenNetworkFailLoginAlertModal] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const [isOpen, setIsOpen] = useState(false);

    const [memberInformations, setMemberInformations] = useState({
        id: "",
        password: ""
    });

    // localstorage를 사용하는 경우
    useEffect(() => {
        const storedMemberInformations = localStorage.getItem("memberInformations");
        if (storedMemberInformations) {
            setMemberInformations(JSON.parse(storedMemberInformations));
        }
    }, []);

    const openSuccessLoginModal = () => {
        setIsOpen(true);
    }

    const closeSuccessLoginModal = () => {
        setIsOpen(false);
    };

    const handleSuccessLoginModalConfirmation = () => {
        closeSuccessLoginModal();
        navigate(ROUTE.INITRESERVATION);
    };

    const openFailLoginModal = () => {
        setAlertMessage(alertMessage);
        setIsOpenFailLoginAlertModal(true);
    };

    const closeFailLoginModal = () => {
        setIsOpenFailLoginAlertModal(false);
    };

    const openNetworkFailLoginModal = () => {
        setIsOpenNetworkFailLoginAlertModal(true);
    };

    const closeNetworkFailLoginModal = () => {
        setIsOpenNetworkFailLoginAlertModal(true);
    };

    const postLoginInformations = async () => {

        const id = `${memberInformations.id}`
        const password = `${memberInformations.password}`

        const request: MemberInformations = {
            USER_ID: id,
            USER_PW: password
        }

        console.log(request)

        return await postLogin(request).then((response) => {

            // localstorage를 사용하는 경우, 로그인 성공 시 처리하는 코드
            if (response.data.success) {
                setMemberInformations(response.data.name);
                localStorage.setItem("memberInformations", JSON.stringify(memberInformations));
            }

            if (!response) {
                openNetworkFailLoginModal();
                return false;
            }

            console.log(response);

            if (response.data.statusCode !== ApiStatusCode.SUCCESS) {
                openFailLoginModal(response.message);
                return false;
            }
            return true;
        })
    }

    const handleOnSubmitLogin = (event) => {
        event.preventDefault();
        handleOnClickLoginButton();
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setMemberInformations((prevMemberInformations) => ({
            ...prevMemberInformations,
            [name]: value,
        }));
    };

    const handleOnClickLoginButton = async () => {
        const loginSuccess = await postLoginInformations();
        if (loginSuccess) {
            openSuccessLoginModal();
        }
    }

    const formElements = [
        {
            key: "ID",
            value: <>
                <input onChange={handleChange} className="input-box" name="id" type="text"
                       placeholder="ID를 입력하세요."></input>
            </>
        },
        {
            key: "비밀번호",
            value: <>
                <input onChange={handleChange} className="input-box" name="password" type="text"
                       placeholder="비밀번호를 입력하세요."></input>
            </>
        }
    ];

    const navigate = useNavigate();

    const useToGoInitLogin = () => {
        navigate(ROUTE.INITLOGIN);
    };

    return (
        <div className='login'>
            <header className="title">
                <LoginHeader></LoginHeader>
            </header>
            <form className='loginForm' onSubmit={handleOnSubmitLogin}>
                <body className='body'>
                {
                    formElements.map((data) => <p><span
                        className="label"> {data.key} &nbsp;:&nbsp; </span> {data.value}</p>)
                }
                <p>
                    <button type='submit' className="login-button">로그인</button>
                </p>
                <div>
                    <img className="home" src={Home} onClick={useToGoInitLogin} alt="home"/>
                </div>
                </body>
                <AlertModal body_text="로그인이 완료되었습니다." isOpen={isOpen}
                            closeModal={handleSuccessLoginModalConfirmation}></AlertModal>
                <AlertModal isOpen={isOpenFailLoginAlertModal} body_text={"로그인에 실패했습니다."}
                            closeModal={closeFailLoginModal}></AlertModal>
                <AlertModal isOpen={isOpenNetworkFailLoginAlertModal}
                            body_text={"로그인에 실패했습니다.\n네트워크를 확인해주세요."}
                            closeModal={closeNetworkFailLoginModal}></AlertModal>
            </form>
        </div>
    );
};
export default Login;