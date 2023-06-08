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

function App() {

    Modal.setAppElement('#root')

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={ROUTE.INIT} element={<Init/>}/>
                    <Route path={ROUTE.RESERVATION} element={<Reservation/>}/>
                    <Route path={ROUTE.CANCELRESERVATION} element={<CancelReservation/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
