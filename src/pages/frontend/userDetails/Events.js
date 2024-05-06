import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getOrganizerEventsUsingCategory } from 'services/event';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import seats from 'assets/pictures/seats.png';
import noData from 'assets/gifs/noData.gif';
import moment from 'moment';
import { Skeleton } from 'antd';

export default function Events({ userData }) {
    const [category, setCategory] = useState("Business")
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        if (Object.keys(userData).length > 0) {
            getEvents()
        }
    }, [category, userData])


    const getEvents = async () => {
        setIsLoading(true)
        try {
            let { data } = await getOrganizerEventsUsingCategory(category, userData?._id);
            console.log(data?.data);
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

    const handleShareEvent = (id) => {

        const contentToCopy = `https://eventwawe.vercel.app/event/details/${id}`
        navigator.clipboard.writeText(contentToCopy)
            .then(() => {
                window.toastify("Link copied to clipboard.", "success");
            })
            .catch((error) => {
                window.toastify(error?.message, "error");
            });
    }


    return (
        <div className='container-fluid ' id='overview-section-details'>
            <div className="container px-3">
                <div className="row gx-4 ">
                    <div className="col-12 col-lg-3">
                        <div className="card rounded-1 p-3 py-4 border-0 shadow ">
                            <h6 className='fw-bold '>Events Category</h6><hr />
                            {window.categories?.map((item, i) => {
                                return <button
                                    className={`btn ${item === category ? "btn-warning" : "btn-light"}  my-1 text-start`}
                                    key={i}
                                    onClick={() => setCategory(item)}
                                >
                                    {item}
                                </button>
                            })}
                        </div>
                    </div>
                    <div className="col-12 col-lg-9 mt-3 mt-md-0" id='organizerEvents-section'>
                        <div className="card rounded-1 p-0 p-md-3 py-0 py-md-4 border-0  mt-2 mt-md-4 mt-lg-0">
                            {isLoading
                                ? <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-3 g-3">
                                    <div className="col">
                                        <Skeleton.Image shape='square' active style={{ height: 200 }} className="w-100" />
                                        <Skeleton active className='mt-3'/>
                                    </div>
                                    <div className="col">
                                        <Skeleton.Image shape='square' active style={{ height: 200 }} className="w-100" />
                                        <Skeleton active className='mt-3'/>
                                    </div>
                                    <div className="col">
                                        <Skeleton.Image shape='square' active style={{ height: 200 }} className="w-100" />
                                        <Skeleton active className='mt-3'/>
                                    </div>
                                </div>
                                :
                                <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-3 g-3">
                                    {data?.map((item, i) => {
                                        return <div className="col d-flex align-items-stretch justify-content-center" key={i}>
                                            <div class="card border-0 shadow rounded-4 w-100 overflow-hidden">
                                                <Link className="card-img text-decoration-none text-body" to={`/event/details/${item?._id}`}>
                                                    <img src={item?.image} class="card-img-top" alt="..." />
                                                    <div className="seats bg-info py-2 px-4 d-flex align-items-center">
                                                        <img src={seats} style={{ width: 30, marginRight: 10 }} alt="" />
                                                        {item.seats <= bookedSeats(item?.seatsBooked)
                                                            ? <span>Sold Out</span>
                                                            : <span>{item?.seats - bookedSeats(item?.seatsBooked)} Seat</span>
                                                        }

                                                    </div>
                                                </Link>
                                                <div class="card-body d-flex flex-column justify-content-between">
                                                    <div className="d-flex justify-content-between mb-3">
                                                        <div>
                                                            <i class='bx bx-calendar text-warning me-1'></i> <small>{moment(item?.date).format('MMM D, YYYY')}</small>
                                                        </div>
                                                        <div>
                                                            <LocationOnOutlinedIcon fontSize='small' className='text-warning me-1' />
                                                            <small>{item?.country}</small>
                                                        </div>
                                                    </div>
                                                    <h5 class="card-title">
                                                        <Link to={`/event/details/${item?._id}`}>
                                                            <small>{item?.title?.length > 50 ? item?.title?.substring(0, 50) + "..." : item?.title}</small>
                                                        </Link>
                                                    </h5>
                                                    <div className="d-flex justify-content-between align-items-center  mt-2 mb-2">
                                                        <span>
                                                            <Link to={`/event/details/${item?._id}`} className='text-warning'>Book Now</Link>
                                                        </span>
                                                        <span>
                                                            <button className='btn btn-outline-info btn-sm p-1' onClick={() => handleShareEvent(item?._id)}><ShareOutlinedIcon fontSize='small' /></button>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    })}
                                </div>
                            }
                            <div className="row">
                                {(!data.length && !isLoading)
                                    && <div className='col my-4 text-center'>
                                        <img src={noData} alt="no data found" className='img-fluid' />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
