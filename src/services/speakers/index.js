import { post, get, del, put } from "services/http";
const root = process.env.REACT_APP_EVENT_WAVE_ROOT_URL;


export const getAllGuests = () => {
    return get(`${root}/api/v1/guests/getAll`);
};

export const getGuestEvents = (name) => {
    return get(`${root}/api/v1/guests/guestEvents?name=${name}`);
};