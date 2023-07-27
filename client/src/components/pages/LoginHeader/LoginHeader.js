import React, {useEffect, useRef} from "react";

import "./LoginHeader.css"

import Text from "../../molecules/Text";
import {useLocation} from "react-router-dom";
import {ROUTE} from "../../../constants/Route";
import {useNavigate} from "react-router";

const LoginHeader = (props) => {

    const location = useLocation();
    const path = location.pathname;

    useEffect(() => {
        if (path === ROUTE.SIGNUP) {
            signupTitleRef.current.style.backgroundColor = 'var(--primary-color-white)';
            signupTitleRef.current.style.color = 'var(--primary-color-tiffanyBlue)';
        } else if (path === ROUTE.LOGIN) {
            loginTitleRef.current.style.backgroundColor = 'var(--primary-color-white)';
            loginTitleRef.current.style.color = 'var(--primary-color-tiffanyBlue)';
        }
    }, [path]);

    const signupTitleRef = useRef(null);
    const loginTitleRef = useRef(null);

    const navigate = useNavigate();

    const useToGoSignup = () => {
        navigate(ROUTE.SIGNUP)
    };

    const useToGoLogin = () => {
        navigate(ROUTE.LOGIN)
    };

    let defaultClassName = "loginHeader"

    if (props.className) {
        defaultClassName = defaultClassName + props.className;
    } else {
        defaultClassName = defaultClassName + "-header";
    }

    return (
        <div className={defaultClassName}>
            <div className="title-signup" ref={signupTitleRef} onClick={useToGoSignup}>
                <Text textClassName={"signupTitlePage-text"} text='회원가입'></Text>
            </div>
            <div className="title-login" ref={loginTitleRef} onClick={useToGoLogin}>
                <Text textClassName={"loginTitlePage-text"} text='로그인'></Text>
            </div>
        </div>

    );
};
export default LoginHeader;