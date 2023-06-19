import React from "react";

import Init from "./components/pages/Init/Init";
import Reservation from "./components/pages/Reservation/Reservation";
import CancelReservation from "../src/components/pages/CancelReservation/CancelReservation";

import {ROUTE} from "./constants/Route";

import './App.css';
import './color.css';
import {BrowserRouter, Route} from "react-router-dom";
import {Routes} from "react-router";
import Modal from "react-modal";
import MeetingroomReservation from "./components/pages/MeetingroomReservation/MeetingroomReservation";
import Login from "./components/pages/Login/Login";
import Signup from "./components/pages/Signup/Signup";

function App() {

    Modal.setAppElement('#root')

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={ROUTE.INIT} element={<Init/>}/>
                    <Route path={ROUTE.RESERVATION} element={<Reservation/>}/>
                    <Route path={ROUTE.CANCELRESERVATION} element={<CancelReservation/>}/>
                    <Route path={ROUTE.MEETINGROOMRESERVATION} element={<MeetingroomReservation/>}/>
                    <Route path={ROUTE.SIGNUP} element={<Signup/>}/>
                    <Route path={ROUTE.LOGIN} element={<Login/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
