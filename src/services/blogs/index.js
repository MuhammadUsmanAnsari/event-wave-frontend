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
export const delBlog = (id) => {
    return del(`${root}/api/v1/blog?id=${id}`);
};
export const getLatestBlogs = (page) => {
    return get(`${root}/api/v1/blog/getLatestBlogs?limit=20&page=${page}`);
};
export const getTopLatestBlogs = () => {
    return get(`${root}/api/v1/blog/getTopLatestBlogs`);
};
export const addView = (id) => {
    return put(`${root}/api/v1/blog/addView?id=${id}`);
};
export const addLike = (id) => {
    return put(`${root}/api/v1/blog/addLike?id=${id}`);
};
export const getComments = (id, page) => {
    return get(`${root}/api/v1/blog/comment?id=${id}&limit=10&page=${page}`);
};
export const addComment = (id, body) => {
    return post(`${root}/api/v1/blog/comment?id=${id}`, body);
};
export const deleteComment = (id) => {
    return del(`${root}/api/v1/blog/comment?id=${id}`);
};
export const getMyLikedBlogs = () => {
    return get(`${root}/api/v1/blog/getMyLikedBlogs`);
};
export const getMyBlogComments = () => {
    return get(`${root}/api/v1/blog/getMyBlogComments`);
};

// conatact page
export const sendContactMsg = (body) => {
    return post(`${root}/api/v1/contact`, body);
};
