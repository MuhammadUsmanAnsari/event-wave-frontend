import { Avatar, Skeleton } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getMyUpcomingEvents, getMyPastEvents } from 'services/event';
import { getMyLikedBlogs, getMyBlogComments } from 'services/blogs';

const eventsTypesTabs = [
    {
        title: "Upcoming Events",
        id: 1
    },
    {
        title: "Past Events",
        id: 2
    },
]
export default function Events() {
    const [selectedTab, setSelectedTab] = useState(1);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedTab === 1) {
            upcomingEvents()
        }
        if (selectedTab === 2) {
            pastEvents()
        }
        if (selectedTab === 3) {
            likedBlogs()
        }
        if (selectedTab === 4) {
            blogComments()
        }
    }, [selectedTab])

    const upcomingEvents = async () => {
        setIsLoading(true)
        try {
            let { data } = await getMyUpcomingEvents();
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

    const pastEvents = async () => {
        setIsLoading(true)
        try {
            let { data } = await getMyPastEvents();
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

    return (
        <div className='container-fluid ' id='activities-dashboard-section'>
            <div className="container px-3">
                <div className="row gx-4 ">
                    <div className="col-12 col-lg-3">
                        <div className="card rounded-1 p-3 py-4 border-0 shadow ">
                            <h6 className='fw-bold '>Events history</h6><hr />
                            {eventsTypesTabs?.map((item, i) => {
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
                                                    <Avatar shape="square" className='w-100 h-100' src={item?.eventId?.image} />
                                                </div>
                                                <div className="col-md-9 col-xl-10 px-4 px-md-3 py-2 d-flex flex-column justify-content-center">
                                                    <div>
                                                        <button className='btn btn-link p-0 text-decoration-none text-dark fw-bold text-start' onClick={() => navigate(`/event/details/${item?.eventId?._id}`)} >{item?.eventId?.title}</button>
                                                    </div>
                                                    <div className='mt-3'>
                                                        <small>
                                                            You had reserved <strong>{item?.quantity}</strong> {item.quantity === 1 ? "seat" : "seats"} on <strong>{moment(item?.createdAt).format('MMM DD, YYYY')}</strong>
                                                        </small>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    })}
                                </>
                                : (data?.length > 0 && selectedTab === 2)
                                    ? <>
                                        {data?.map((item, i) => {
                                            return <div className={`card ${item?._id === data[data.length - 1]?._id ? "" : "mb-3"}  border-0 shadow`} key={i}>
                                                <div className="row">
                                                    <div className="col-md-3  col-xl-2 pe-auto pe-md-0">
                                                        <Avatar shape="square" className='w-100 h-100' src={item?.eventId?.image} />
                                                    </div>
                                                    <div className="col-md-9 col-xl-10 px-4 px-md-3 py-2 d-flex flex-column justify-content-center">
                                                        <div>
                                                            <button className='btn btn-link p-0 text-decoration-none text-dark fw-bold text-start' onClick={() => navigate(`/event/details/${item?.eventId?._id}`)} >{item?.eventId?.title}</button>
                                                        </div>
                                                        <div className='mt-3'>
                                                            <small>
                                                                You had reserved <strong>{item?.quantity}</strong> {item.quantity === 1 ? "seat" : "seats"} on <strong>{moment(item?.createdAt).format('MMM DD, YYYY')}</strong>
                                                            </small>
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
