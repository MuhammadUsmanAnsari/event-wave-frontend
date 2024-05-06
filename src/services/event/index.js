import { post, get, del, put } from "services/http";
const root = process.env.REACT_APP_EVENT_WAVE_ROOT_URL;


export const addEvent = (body) => {
    return post(`${root}/api/v1/event/add`, body);
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
export const getEvent = (id) => {
    return get(`${root}/api/v1/event?id=${id}`);
};
export const updateEvent = (id, body) => {
    return put(`${root}/api/v1/event?id=${id}`, body);
};

export const getPopularEvents = (type) => {
    return get(`${root}/api/v1/event/popular/${type}`);
};
export const addView = (id) => {
    return put(`${root}/api/v1/event/addView?id=${id}`);
};
export const addLike = (id) => {
    return put(`${root}/api/v1/event/addLike?id=${id}`);
};
export const addComment = (id, body) => {
    return post(`${root}/api/v1/event/comment?id=${id}`, body);
};
export const getComments = (id, page) => {
    return get(`${root}/api/v1/event/comment?id=${id}&limit=10&page=${page}`);
};
export const deleteComment = (id) => {
    return del(`${root}/api/v1/event/comment?id=${id}`);
};
export const getMyLikedEvents = () => {
    return get(`${root}/api/v1/event/getMyLikedEvents`);
};
export const getMyEventComments = () => {
    return get(`${root}/api/v1/event/getMyEventComments`);
};


// admin
export const getAdminPendingEvents = () => {
    return get(`${root}/api/v1/event/getPendingEvents`);
};
export const rejectEvent = (id, reason) => {
    return del(`${root}/api/v1/event/rejectEventByAdmin?id=${id}&reason=${reason}`);
};
export const publishEventByAdmin = (id) => {
    return put(`${root}/api/v1/event/publishEventByAdmin?id=${id}`);
};
export const getUpcomingEvents = (page) => {
    return get(`${root}/api/v1/event/upcoming?limit=20&page=${page}`);
};
export const getEventsUsingCategory = (page, category) => {
    return get(`${root}/api/v1/event/category?category=${category}&limit=20&page=${page}`);
};
export const getGalleryImages = (more) => {
    return get(`${root}/api/v1/event/gallery?more=${more}`);
};