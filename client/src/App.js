import React from "react";

import InitLogin from "./components/pages/InitLogin/InitLogin";
import Reservation from "./components/pages/Reservation/Reservation";
import CancelReservation from "./components/pages/CancelReservation/CancelReservation";

import {ROUTE} from "./constants/Route";

import './App.css';
import './color.css';
import {BrowserRouter, Route} from "react-router-dom";
import {Routes} from "react-router";
import Modal from "react-modal";
import MeetingroomReservation from "./components/pages/MeetingroomReservation/MeetingroomReservation";
import Login from "./components/pages/Login/Login";
import Signup from "./components/pages/Signup/Signup";
import InitReservation from "./components/pages/InitReservation/InitReservation";
import ReservationList from "./components/pages/ReservationList/ReservationList";

function App() {

    Modal.setAppElement('#root')

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={ROUTE.INITLOGIN} element={<InitLogin/>}/>
                    <Route path={ROUTE.INITRESERVATION} element={<InitReservation/>}/>
                    <Route path={ROUTE.RESERVATION} element={<Reservation/>}/>
                    <Route path={ROUTE.CANCELRESERVATION} element={<CancelReservation/>}/>
                    <Route path={ROUTE.MEETINGROOMRESERVATION} element={<MeetingroomReservation/>}/>
                    <Route path={ROUTE.RESERVATIONLIST} element={<ReservationList/>}/>
                    <Route path={ROUTE.SIGNUP} element={<Signup/>}/>
                    <Route path={ROUTE.LOGIN} element={<Login/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
