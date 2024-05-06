import { Avatar, Skeleton } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getMyLikedEvents, getMyEventComments } from 'services/event';
import { getMyLikedBlogs, getMyBlogComments } from 'services/blogs';

const activityLogTabs = [
    {
        title: "Liked Events",
        id: 1
    },
    {
        title: "Event Comments",
        id: 2
    },
    {
        title: "Liked Blogs",
        id: 3
    },
    {
        title: "Blog Comments",
        id: 4
    },
]
export default function Activities() {
    const [selectedTab, setSelectedTab] = useState(1);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedTab === 1) {
            likedEvents()
        }
        if (selectedTab === 2) {
            eventComments()
        }
        if (selectedTab === 3) {
            likedBlogs()
        }
        if (selectedTab === 4) {
            blogComments()
        }
    }, [selectedTab])

    const likedEvents = async () => {
        setIsLoading(true)
        try {
            let { data } = await getMyLikedEvents();
            setData(data?.data)
        } catch (error) {
            console.log(error);
            let msg = "Some error occured";
            let { status, data } = error?.response;
            if (status == 400 || status == 401 || status == 500 || status == 413 || status == 404) {
                msg = data.message || data.msg;
                setData([])
                window.toastify(msg, "error");
            }
        } finally {
            setIsLoading(false)
        }
    }

    const eventComments = async () => {
        setIsLoading(true)
        try {
            let { data } = await getMyEventComments();
            setData(data?.data)
        } catch (error) {
            console.log(error);
            let msg = "Some error occured";
            let { status, data } = error?.response;
            if (status == 400 || status == 401 || status == 500 || status == 413 || status == 404) {
                msg = data.message || data.msg;
                setData([])
                window.toastify(msg, "error");
            }
        } finally {
            setIsLoading(false)
        }
    }

    const blogComments = async () => {
        setIsLoading(true)
        try {
            let { data } = await getMyBlogComments();
            setData(data?.data)
        } catch (error) {
            console.log(error);
            let msg = "Some error occured";
            let { status, data } = error?.response;
            if (status == 400 || status == 401 || status == 500 || status == 413 || status == 404) {
                msg = data.message || data.msg;
                setData([])
                window.toastify(msg, "error");
            }
        } finally {
            setIsLoading(false)
        }
    }

    const likedBlogs = async () => {
        setIsLoading(true)
        try {
            let { data } = await getMyLikedBlogs();
            setData(data?.data)
        } catch (error) {
            console.log(error);
            let msg = "Some error occured";
            let { status, data } = error?.response;
            if (status == 400 || status == 401 || status == 500 || status == 413 || status == 404) {
                msg = data.message || data.msg;
                setData([])
                window.toastify(msg, "error");
            }
        } finally {
            setIsLoading(false)
        }
    }

    const bookedSeats = (seatsBooked) => {
        return seatsBooked?.reduce((acc, currentItem) => acc + currentItem.seats, 0)
    };
    return (
        <div className='container-fluid ' id='activities-dashboard-section'>
            <div className="container px-3">
                <div className="row gx-4 ">
                    <div className="col-12 col-lg-3">
                        <div className="card rounded-1 p-3 py-4 border-0 shadow ">
                            <h6 className='fw-bold '>Activity log</h6><hr />
                            {activityLogTabs?.map((item, i) => {
                                return <button
                                    className={`btn ${item?.id === selectedTab ? "btn-warning" : "btn-light"}  my-1 text-start`}
                                    key={i}
                                    onClick={() => setSelectedTab(item?.id)}
                                >
                                    {item?.title}
                                </button>
                            })}
                        </div>
                    </div>
                    <div className="col-12 col-lg-9 mt-3 mt-md-0">
                        <div className="card rounded-1 p-3 py-4 border-0 shadow mt-2 mt-md-4 mt-lg-0">
                            {(data?.length > 0 && selectedTab === 1)
                                ? <>
                                    {data?.map((item, i) => {
                                        return <div className={`card ${item?._id === data[data.length - 1]?._id ? "" : "mb-3"}  border-0 shadow`} key={i}>
                                            <div className="row">
                                                <div className="col-md-3  col-xl-2 pe-auto pe-md-0">
                                                    <Avatar shape="square" className='w-100 h-100' src={item?.image} />
                                                </div>
                                                <div className="col-md-9 col-xl-10 px-4 px-md-3 py-2 d-flex flex-column justify-content-center">
                                                    <div>
                                                        <button className='btn btn-link p-0 text-decoration-none text-dark fw-bold text-start' onClick={() => navigate(`/event/details/${item?._id}`)} >{item?.title}</button>
                                                    </div>
                                                    <div className='my-2'>
                                                        <small><strong className='text-warning'>Date:</strong> {moment(item?.date).format('MMM D, YYYY')}</small>
                                                        <small><strong className='text-warning ms-3'>Category:</strong> {item?.category}</small>
                                                        <small><strong className='text-warning ms-3'>Location:</strong> {item?.location}</small>
                                                        <small><strong className='text-warning ms-3'>City:</strong> {item?.city}</small>
                                                        <small><strong className='text-warning ms-3'>Status:</strong> {item?.status}</small>
                                                    </div>
                                                    <div>
                                                        <small>
                                                            <strong>Seats Left: </strong>
                                                            {item.seats <= bookedSeats(item?.seatsBooked)
                                                                ? <span className='text-danger'>Sold Out</span>
                                                                : <span>{item?.seats - bookedSeats(item?.seatsBooked)} Seat</span>
                                                            }
                                                        </small>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    })}
                                </>
                                : (data?.length > 0 && selectedTab === 3)
                                    ? <>
                                        {data?.map((item, i) => {
                                            return <div className={`card ${item?._id === data[data.length - 1]?._id ? "" : "mb-3"}  border-0 shadow`} key={i}>
                                                <div className="row">
                                                    <div className="col-md-3  col-xl-2 pe-auto pe-md-0">
                                                        <Avatar shape="square" className='w-100 h-100' src={item?.image} />
                                                    </div>
                                                    <div className="col-md-9 col-xl-10 px-4 px-md-3 py-2 d-flex flex-column justify-content-center">
                                                        <div>
                                                            <button className='btn btn-link p-0 text-decoration-none text-dark fw-bold text-start' onClick={() => navigate(`/blog/details/${item?._id}`)} >{item?.title}</button>
                                                        </div>
                                                        <div className='my-2'>
                                                            <small><strong className='text-warning'>Date:</strong> {moment(item?.createdAt).format('MMM D, YYYY')}</small>
                                                            <small><strong className='text-warning ms-3'>Category:</strong> {item?.category}</small>
                                                            <small><strong className='text-warning ms-3'>Status:</strong> {item?.status}</small>
                                                        </div>
                                                        <div>
                                                            <button className='btn btn-link p-0 text-dark text-start' onClick={() => navigate(`/blog/details/${item?._id}`)}>
                                                                <small>Read More</small>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        })}
                                    </>
                                    : (data?.length > 0 && selectedTab === 2)
                                        ? <>
                                            {data?.map((item, i) => {
                                                return <div className={`card ${item?._id === data[data.length - 1]?._id ? "" : "mb-3"} p-3 border-0 shadow`} key={i}>
                                                    <div className="row row-cols-1">
                                                        <div className="col">
                                                            <div className="text-center">
                                                                <Link to={`/event/details/${item?.eventId?._id}`}>
                                                                    <Avatar
                                                                        className='w-100 h-100'
                                                                        shape='square'
                                                                        src={item?.eventId?.image}
                                                                    />
                                                                </Link>
                                                            </div>
                                                            <div className='mt-3'>
                                                                <button className='btn btn-link p-0 text-decoration-none text-dark fw-bold text-start' onClick={() => navigate(`/event/details/${item?.eventId?._id}`)} >{item?.eventId?.title}</button>
                                                                <hr />
                                                                <div className='my-2'>
                                                                    <small><strong className='text-warning'>Date:</strong> {moment(item?.eventId?.date).format('MMM D, YYYY')}</small>
                                                                    <small><strong className='text-warning ms-3'>Category:</strong> {item?.eventId?.category}</small>
                                                                    <small><strong className='text-warning ms-3'>Location:</strong> {item?.eventId?.location}</small>
                                                                    <small><strong className='text-warning ms-3'>City:</strong> {item?.eventId?.city}</small>
                                                                    <small><strong className='text-warning ms-3'>Status:</strong> {item?.eventId?.status}</small>
                                                                </div>
                                                                <hr />
                                                            </div>
                                                            <div className="col px-4 px-md-3">
                                                                <h6>Comment</h6>
                                                                <div className='my-2'>
                                                                    <small>{item?.comment}</small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            })}
                                        </>
                                        : (data?.length > 0 && selectedTab === 4)
                                            ? <>
                                                {data?.map((item, i) => {
                                                    return <div className={`card ${item?._id === data[data.length - 1]?._id ? "" : "mb-3"} p-3 border-0 shadow`} key={i}>
                                                        <div className="row row-cols-1">
                                                            <div className="col">
                                                                <div className="text-center">
                                                                    <Link to={`/blog/details/${item?.blogId?._id}`}>
                                                                        <Avatar
                                                                            className='w-100 h-100'
                                                                            shape='square'
                                                                            src={item?.blogId?.image}
                                                                        />
                                                                    </Link>
                                                                </div>
                                                                <div className='mt-3'>
                                                                    <button className='btn btn-link p-0 text-decoration-none text-dark fw-bold text-start' onClick={() => navigate(`/blog/details/${item?.blogId?._id}`)} >{item?.blogId?.title}</button>
                                                                    <hr />
                                                                    <div className='my-2'>
                                                                        <small><strong className='text-warning'>Date:</strong> {moment(item?.blogId?.createdAt).format('MMM D, YYYY')}</small>
                                                                        <small><strong className='text-warning ms-3'>Category:</strong> {item?.blogId?.category}</small>
                                                                        <small><strong className='text-warning ms-3'>Status:</strong> {item?.blogId?.status}</small>
                                                                    </div>
                                                                    <hr />
                                                                </div>
                                                                <div className="col px-4 px-md-3">
                                                                    <h6>Comment</h6>
                                                                    <div className='my-2'>
                                                                        <small>{item?.comment}</small>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                })}
                                            </>
                                            : isLoading ?
                                                <>
                                                    <div className="row">
                                                        <div className="col-md-3 col-xl-2 d-flex align-items-center justify-content-center">
                                                            <Skeleton.Avatar active shape='square' size={100} />
                                                        </div>
                                                        <div className="col-md-9 col-xl-10 mt-4 mt-md-0">
                                                            <Skeleton active />
                                                        </div>
                                                    </div>
                                                    <div className="row mt-3">
                                                        <div className="col-md-3 col-xl-2 d-flex align-items-center justify-content-center">
                                                            <Skeleton.Avatar active shape='square' size={100} />
                                                        </div>
                                                        <div className="col-md-9 col-xl-10 mt-4 mt-md-0">
                                                            <Skeleton active />
                                                        </div>
                                                    </div>
                                                </>
                                                : <div className='text-center'>
                                                    <i>No data found</i>
                                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
