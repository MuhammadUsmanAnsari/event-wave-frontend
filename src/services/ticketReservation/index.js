import { post, get, del, put } from "services/http";
const root = process.env.REACT_APP_EVENT_WAVE_ROOT_URL;


export const addTicketReservation = (id, body) => {
    return post(`${root}/api/v1/booking/addReservation?id=${id}`, body);
};
export const myBookedSeats = (id) => {
    return get(`${root}/api/v1/booking/mySeats?id=${id}`);
};
export const makePayment = (body) => {
    return post(`${root}/api/v1/booking/make-payment`, body);
};