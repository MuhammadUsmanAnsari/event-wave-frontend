import { post, get, del, put } from "services/http";
const root = process.env.REACT_APP_EVENT_WAVE_ROOT_URL;


export const addEvent = (body) => {
    return post(`${root}/api/v1/event/add`, body);
};
export const uploadImage = (body) => {
    return post(`${root}/api/v1/event/uploadImage`, body);
};
export const getMyEvents = () => {
    return get(`${root}/api/v1/event/getMyEvents`);
};
export const delEvent = (id) => {
    return del(`${root}/api/v1/event?id=${id}`);
};
export const getEditEvent = (id) => {
    return get(`${root}/api/v1/event?id=${id}`);
};
export const updateEvent = (id, body) => {
    return put(`${root}/api/v1/event?id=${id}`, body);
};