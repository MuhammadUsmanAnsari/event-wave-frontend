import { post, get, del, put } from "services/http";
const root = process.env.REACT_APP_EVENT_WAVE_ROOT_URL;


export const addFeedback = (body) => {
    return post(`${root}/api/v1/feedback`, body);
};

export const getFeedbacks = (limit) => {
    return get(`${root}/api/v1/feedback?limit=${limit}`);
};

// conatact page
export const sendContactMsg = (body) => {
    return post(`${root}/api/v1/contact`, body);
};
