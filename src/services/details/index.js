import { post, get, del, put } from "services/http";
const root = process.env.REACT_APP_EVENT_WAVE_ROOT_URL;


export const getHomeDetails = () => {
    return get(`${root}/api/v1/details/homePage`);
};

