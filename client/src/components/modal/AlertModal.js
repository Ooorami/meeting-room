import React from "react";
import Modal from "react-modal";

import "./AlertModal.css";
import Text from "../Text";

const AlertModal = ({isOpen, closeModal, body_text}) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal} className="alert-modal" contentLabel="Alert Modal">
            <Text text={body_text}></Text>
            <button onClick={closeModal}>확인</button>
        </Modal>
    );
};

export default AlertModal;
