import React, { useEffect, useRef, useState } from 'react'
import { useParams, NavLink, Link } from 'react-router-dom'
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import './_eventDetails.scss';
import { getEvent } from 'services/event';
import Banner from 'components/background/Banner';
import moment from 'moment';
import noData from 'assets/gifs/noData.gif';
import { UserOutlined } from '@ant-design/icons';

import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Avatar, Skeleton, Timeline } from 'antd';
import Comments from './Comments';
import LoadingIndicator from 'components/LoadingIndicator';
import { useAuthContext } from 'context/AuthContext';
import { getEditBlog, addView, addLike } from 'services/blogs';

export default function Index() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [blog, setBlog] = useState({})
    const hasAddedView = useRef(false);
    const { user } = useAuthContext()
    const commentRef = useRef(null)


    useEffect(() => {
        window.scroll(0, 0)
        getBlogData()
        addViewInEvent()
    }, [window.location.pathname])

    const addViewInEvent = async () => {
        if (hasAddedView.current) {
            // Prevent running the function again
            return;
        }

        hasAddedView.current = true; // Track if the function has run

        try {
            let { data } = await addView(id);
        } catch (error) {
            console.log(error);
        }
    }

    const getBlogData = async () => {
        setIsLoading(true)
        try {
            let { data } = await getEditBlog(id);
            setBlog(data?.data)
        } catch (error) {
            console.log(error);
            let msg = "Some error occured";
            let { status, data } = error?.response;
            if (status == 400 || status == 401 || status == 500 || status == 413 || status == 404) {
                msg = data.message || data.msg;
                window.toastify(msg, "error");
            }
        } finally {
            setIsLoading(false)
        }
    }


    // format followers and following
    const formatNumber = (num) => {
        num = num ? num : 0
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    };

    const handleLikeEvent = async () => {
        setLoading(true)
        try {
            let { data } = await addLike(id);
            window.toastify(data?.msg, "success");
            getBlogData()
        } catch (error) {
            console.log(error);
            let msg = "Some error occured";
            let { status, data } = error?.response;
            if (status == 400 || status == 401 || status == 500 || status == 413 || status == 404) {
                msg = data.message || data.msg;
                window.toastify(msg, "error");
            }
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Navbar />
            <LoadingIndicator loading={loading} />

            <Banner title={"ALL YOU NEED TO KNOW"} pageTitle={'Blog Details'} page={'Details'} />

            <div className="container my-5 pt-2 " id='event-details'>
                <div className="row">
                    <div className="col-12 col-md-9 col-lg-7 mx-auto">
                        <div className="card p-3 border-0 shadow">
                            {isLoading
                                ? <div className='my-5 text-center'>
                                    <Skeleton.Image className='w-100 mb-2' active style={{ height: 350 }} />
                                    <Skeleton
                                        avatar
                                        active
                                        paragraph={{
                                            rows: 4,
                                        }}
                                    />
                                    {/* <div className="spinner-grow spinner-grow-sm bg-info"></div>
                                    <div className="spinner-grow spinner-grow-sm bg-warning mx-3"></div>
                                    <div className="spinner-grow spinner-grow-sm bg-info"></div> */}
                                </div>
                                : <>
                                    {blog?.status === "Draft"
                                        ? <div className="row">
                                            <div className='col my-4 text-center'>
                                                <img src={noData} alt="no data found" className='img-fluid' />
                                                <h5 className='mt-4 text-warning text-center'>Sorry, the blog you are trying to access is currently not available. The author has changed the status to "Draft," which means it is not ready for public access. Please check back later.</h5>
                                            </div>
                                        </div>
                                        : blog?.status === "Deleted"
                                            ? <div className="row">
                                                <div className='col my-4 text-center'>
                                                    <img src={noData} alt="no data found" className='img-fluid' />
                                                    <h5 className='mt-4 text-warning '>Sorry, the blog you are trying to access is not available. The author deleted the blog.</h5>
                                                </div>
                                            </div>
                                            : <>
                                                <div>
                                                    <img
                                                        className='img-fluid rounded'
                                                        width={'100%'}
                                                        src={blog?.image}
                                                    />
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col-12 col-sm-1">
                                                        <Link to={`/user/${blog?.addedBy?._id}`}>
                                                            <Avatar size={50} src={blog?.addedBy?.image} icon={<UserOutlined />} />
                                                        </Link>
                                                    </div>
                                                    <div className="col-12 col-sm-11 d-block d-md-flex justify-content-between">
                                                        <div className='ms-0 ms-sm-3'>
                                                            <small className='fw-bold'>{blog?.addedBy?.fullName}</small><br />
                                                            <small>{blog?.addedBy?.profession}</small>
                                                        </div>
                                                        <div className='ms-0 ms-sm-3 mt-2 mt-md-0'>
                                                            <button className='btn btn-light btn-sm me-3 me-md-0'>
                                                                <VisibilityTwoToneIcon fontSize='small' className='me-2 me-md-1 text-secondary' />
                                                                <span className='text-secondary'>{formatNumber(blog?.views?.length)}</span>
                                                            </button>
                                                            <button className='btn btn-light btn-sm me-3 me-md-0' onClick={handleLikeEvent}>
                                                                {blog?.likes?.some(item => item === user?._id)
                                                                    ? <FavoriteIcon className='me-2 me-md-1 text-danger' fontSize='small' />
                                                                    : <FavoriteTwoToneIcon className='me-2 me-md-1 text-danger' fontSize='small' />
                                                                }
                                                                <span className='text-danger'>{formatNumber(blog?.likes?.length)}</span>
                                                            </button>
                                                            <button className='btn btn-light btn-sm' onClick={() => commentRef.current.scrollIntoView({ behavior: 'smooth' })} >
                                                                <ChatBubbleTwoToneIcon fontSize='small' className='me-2 me-md-1 text-primary' />
                                                                <span className='text-primary'>{formatNumber(blog?.comments?.length)}</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div><hr />
                                                <div className='my-2'>
                                                    <h4 className='fw-bold'>{blog?.title}</h4>
                                                </div>
                                                <div>
                                                    <div className='mt-3 ' dangerouslySetInnerHTML={{ __html: blog?.description ? blog?.description : "No description added yet" }} />

                                                </div>
                                            </>
                                    }


                                </>
                            }
                        </div>
                    </div>
                </div>
                {blog?.status === "Published" &&
                    <div className="row">
                        <div className="col-12 col-md-7 mx-auto" ref={commentRef}>
                            {/* comments */}
                            <Comments id={id} getBlogData={getBlogData} />
                        </div>
                    </div>
                }
            </div >

            <Footer />
        </>
    )
}
