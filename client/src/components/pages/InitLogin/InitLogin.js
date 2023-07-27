import React from "react";

import ".//InitLogin.css";
import Logo from "../../../assets/img/Logo.png"
import LoginHeader from "../LoginHeader/LoginHeader";

const InitLogin = () => {

    return (
        <div className="initLogin">
            <div>
                <div>
                    <img className="logo" src={Logo} alt="logo"/>
                </div>
                <p className="font">
                    회의실 예약 시스템
                </p>
            </div>
            <LoginHeader className="-footer"></LoginHeader>
        </div>
    );
};

export default InitLogin;