import { post, get, del, put } from "services/http";
const root = process.env.REACT_APP_EVENT_WAVE_ROOT_URL;


export const addBlog = (body) => {
    return post(`${root}/api/v1/blog`, body);
};

export const getMyBlogs = () => {
    return get(`${root}/api/v1/blog/getMyBlogs`);
};

export const updateBlog = (id, body) => {
    return put(`${root}/api/v1/blog?id=${id}`, body);
};
export const getEditBlog = (id) => {
    return get(`${root}/api/v1/blog?id=${id}`);
};
// conatact page
export const sendContactMsg = (body) => {
    return post(`${root}/api/v1/contact`, body);
};
