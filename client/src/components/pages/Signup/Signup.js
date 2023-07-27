import React, {useState} from "react";

import "./Signup.css";

import Home from "../../../assets/img/Home.png";
import {useNavigate} from "react-router-dom";
import {ROUTE} from "../../../constants/Route";
import LoginHeader from "../LoginHeader/LoginHeader";
import {postSignup} from "../../../services/axios";
import {ApiStatusCode} from "../../../types/api/Common/ApiStatusCode";
import type {MemberInformations} from "../../../types/MemberInformations";
import AlertModal from "../../modal/AlertModal/AlertModal";

const Signup = () => {

    const [isOpenFailSignupAlertModal, setIsOpenFailSignupAlertModal] = useState(false);
    const [isOpenNetworkFailSignupAlertModal, setIsOpenNetworkFailSignupAlertModal] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const [isOpen, setIsOpen] = useState(false);

    const [memberInformations, setMemberInformations] = useState({
        name: "",
        id: "",
        password1: "",
        password2: ""
    });

    const openSuccessSignupModal = () => {
        setIsOpen(true);
    }

    const closeSuccessSignupModal = () => {
        setIsOpen(false);
    };

    const openFailSignupModal = () => {
        setAlertMessage(alertMessage);
        setIsOpenFailSignupAlertModal(true);
    };

    const closeFailSignupModal = () => {
        setIsOpenFailSignupAlertModal(false);
    };

    const openNetworkFailSignupModal = () => {
        setIsOpenNetworkFailSignupAlertModal(true);
    };

    const closeNetworkFailSignupModal = () => {
        setIsOpenNetworkFailSignupAlertModal(true);
    };

    const postSignupInformations = async () => {

        const name = `${memberInformations.name}`
        const id = `${memberInformations.id}`
        const password = `${memberInformations.password1}` === `${memberInformations.password2}`
            ? `${memberInformations.password1}` : "";

        const request: MemberInformations = {
            NAME: name,
            USER_ID: id,
            USER_PW: password
        }

        console.log(request)

        return await postSignup(request).then((response) => {
            if (!response) {
                openNetworkFailSignupModal();
                return false;
            }

            console.log(response);

            if (response.data.statusCode !== ApiStatusCode.SUCCESS) {
                openFailSignupModal(response.message);
                return false;
            }
            return true;
        })
    }

    const handleOnSubmitSignup = (event) => {
        event.preventDefault();
        handleOnClickSignupButton();
    }

    const checkExistData = (value, dataName) => {
        if (value === '') {
            alert(dataName + "입력해주세요!");
            return false;
        }
        return true;
    }

    const checkId = (id) => {
        if (!checkExistData(id, "아이디를")) {
            return false;
        }
        const idReqExp = /^[a-zA-Z0-9!@#$%^&*()-=_+]{1,30}$/;
        if (!idReqExp.test(id)) {
            alert("아이디는 영문 대소문자, 숫자 및 특수문자 1~30자리로 입력해야만 합니다!")
            setMemberInformations(prevMemberInformations => ({
                ...prevMemberInformations,
                id: ""
            }))
            return false;
        }
        return true;
    }

    const checkPassword = (id, password1, password2) => {
        if (!checkExistData(password1, "비밀번호를")) {
            return false;
        }
        if (!checkExistData(password2, "비밀번호 확인란을")) {
            return false;
        }
        const passwordReqExp = /^[a-zA-Z0-9!@#$%^&*()-=_+]{6,12}$/;
        if (!passwordReqExp.test(id)) {
            alert("비밀번호는 영문 대소문자, 숫자 및 특수문자 6~12자리로 입력해야만 합니다!")
            setMemberInformations(prevMemberInformations => ({
                ...prevMemberInformations,
                password1: ""
            }))
            return false;
        }
        if (password1 !== password2) {
            alert("비밀번호가 일치하지 않습니다.");
            setMemberInformations(prevMemberInformations => ({
                ...prevMemberInformations,
                password1: "",
                password2: ""
            }));
            return false;
        }
        if (id === password1) {
            alert("아이디와 비밀번호는 같을 수 없습니다!");
            setMemberInformations(prevMemberInformations => ({
                ...prevMemberInformations,
                password1: "",
                password2: ""
            }));
            return false;
        }
        return true;
    };

    const checkInformaions = () => {
        // 회원가입 페이지에서 입력한 정보를 유효성 검사하는 역할
        if (!checkId(memberInformations.password1)) {
            return false;
        } else if (!checkPassword(memberInformations.id, memberInformations.password1, memberInformations.password2)) {
            return false;
        }
        return true;
    }

    const handleOnClickSignupButton = async () => {
        // 입력한 정보의 유효성 검사
        checkInformaions();
        // 회원가입 유저 생성
        const signupSuccess = await postSignupInformations();
        if (signupSuccess) {
            openSuccessSignupModal();
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setMemberInformations((prevMemberInformations) => ({
            ...prevMemberInformations,
            [name]: value,
        }));
    };

    const formElements = [
        {
            key: "이름",
            value: <>
                <input onChange={handleChange} className="signup-input-box" name="name" type="text"
                       placeholder="이름을 입력하세요."></input>
            </>
        },
        {
            key: "ID",
            value: <>
                <input onChange={handleChange} className="signup-input-box" name="id" type="text"
                       placeholder="ID를 입력하세요."></input>
                <div className='constraint'>(단, 영문 대소문자, 숫자 및 특수문자로만 입력이 가능합니다.)</div>
            </>
        },
        {
            key: "비밀번호",
            value: <>
                <input onChange={handleChange} className="signup-input-box" name="password1" type="password"
                       placeholder="비밀번호를 입력하세요."></input>
                <div className='constraint'>(단, 6~12자의 영문 대소문자, 숫자 및 특수문자로만 입력이 가능합니다.)</div>
            </>
        },
        {
            key: "비밀번호 확인",
            value: <>
                <input onChange={handleChange} className="signup-input-box" name="password2" type="password"
                       placeholder="비밀번호를 다시 입력하세요."></input>
                <div className='constraint'>(단, 6~12자의 영문 대소문자, 숫자 및 특수문자로만 입력이 가능합니다.)</div>
            </>
        }
    ];

    const navigate = useNavigate();

    const useToGoInitLogin = () => {
        navigate(ROUTE.INITLOGIN);
    };

    return (
        <div className='signup'>
            <header className="title">
                <LoginHeader></LoginHeader>
            </header>
            <form name='form' className='signupForm' onSubmit={handleOnSubmitSignup}>
                <body className='body'>
                {
                    formElements.map((data) => <p><span
                        className="signup-label"> {data.key} &nbsp;:&nbsp; </span> {data.value}</p>)
                }
                <p>
                    <button type='submit' className="signup-button">회원가입</button>
                </p>
                <div>
                    <img className="home" src={Home} onClick={useToGoInitLogin} alt="home"/>
                </div>
                </body>
                <AlertModal body_text="회원가입이 완료되었습니다." isOpen={isOpen}
                            closeModal={closeSuccessSignupModal}></AlertModal>
                <AlertModal isOpen={isOpenFailSignupAlertModal} body_text={"회원가입에 실패했습니다."}
                            closeModal={closeFailSignupModal}></AlertModal>
                <AlertModal isOpen={isOpenNetworkFailSignupAlertModal}
                            body_text={"회원가입에 실패했습니다.\n네트워크를 확인해주세요."}
                            closeModal={closeNetworkFailSignupModal}></AlertModal>
            </form>
        </div>
    );
};
export default Signup;