import { Avatar, Modal } from 'antd'
import './_blogs.scss';
import React, { useEffect, useState } from 'react'
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import { UserOutlined } from '@ant-design/icons';
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';
import { getEditBlog } from 'services/blogs';

export default function ViewBlog({ open, setOpen, id }) {
    const [blog, setBlog] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getBlog()
    }, [])

    const getBlog = async () => {
        try {
            let { data } = await getEditBlog(id);
            setBlog(data?.data);
        } catch (error) {
            console.log(error);
            let msg = "Some error occured";
            let { status, data } = error.response;
            if (status == 400 || status == 401 || status == 500 || status == 413) {
                msg = data.message || data.msg;
                window.toastify(msg, "error");
            }
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div >
            <Modal
                title={''}
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
                footer={[]}
                className='event-modal my-2'
            >
                <div className="container-fluid">
                    {isLoading
                        ? <div className="row">
                            <div className="col">
                                <div className='my-5 text-center'>
                                    <div className="spinner-grow bg-info"></div>
                                    <div className="spinner-grow bg-warning mx-3"></div>
                                    <div className="spinner-grow bg-info"></div>
                                    <div>Loading...</div>
                                </div>
                            </div>
                        </div>
                        :
                        <>
                            {/* <div className="row mt-5">
                                <div className="col">
                                    <img src={blog?.image} alt="event image" className='w-100 img-fluid rounded-3' />
                                </div>
                            </div> */}
                            <div className="row mt-3">
                                <div className="col-12 mb-4">
                                    <div className='d-block d-sm-flex justify-content-between'>
                                        <h4>{blog?.title}</h4>
                                        <div className='ms-2'>
                                            <span className='d-flex align-items-center'>
                                                <VisibilityTwoToneIcon fontSize='small' className='me-1 text-secondary' />
                                                <span className='text-secondary'>{blog?.views?.length}</span>
                                                <FavoriteTwoToneIcon fontSize='small' className='ms-3 me-1 text-danger' />
                                                <span className='text-danger'>{blog?.likes?.length}</span>
                                                <ChatBubbleTwoToneIcon fontSize='small' className='ms-3 me-1 text-primary' />
                                                <span className='text-primary'>{blog?.comments?.length}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 mt-4 mt-sm-0">
                                    <strong className='text-warning'>Category: </strong>{blog?.category}
                                </div>
                                <div className="col-12 col-sm-6 mt-2 mt-sm-0">
                                    <strong className='text-warning'>Status: </strong>{blog?.status}
                                </div>

                                <div className="col-12 mt-4">
                                    <strong className='text-warning'>Description</strong>
                                    <div className='mt-3 border rounded p-3' dangerouslySetInnerHTML={{ __html: blog?.description ? blog?.description : "No description added yet" }} />
                                </div>
                            </div>
                        </>
                    }
                </div>

            </Modal>
        </div>
    )
}
