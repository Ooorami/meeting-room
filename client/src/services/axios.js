import {API} from "../constants/ApiList";
import axios from "axios";

const customAxios = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export const getMeetinroom = async () => {
    const responseMeetinroom = await customAxios.get(API.MEETINGROOM.CHECK);
    return await customAxios.get(API.MEETINGROOM.CHECK)
        .catch(err => Promise.reject(err));
}

export const postMeetingroom = async (meetingroomInformations) => {
    return await customAxios.post(API.MEETINGROOM.CREATE, meetingroomInformations)
        .catch(err => Promise.reject(err));
}

export const postReservation = async (informations) => {
    return await customAxios.post(API.RESERVATION.REGISTRATION, informations, {timeout: 5000})
        .catch(err => Promise.reject(err));
}

export const getReservation = async () => {
    const responseReservation = await customAxios.get(API.RESERVATION.CHECK);
    return await customAxios.get(API.RESERVATION.CHECK)
        .catch(err => Promise.reject(err));
}

export const postCancelReservation = async (cancelInformations) => {
    return await customAxios.post(API.RESERVATION.CANCEL, cancelInformations)
        .catch(err => Promise.reject(err));
}