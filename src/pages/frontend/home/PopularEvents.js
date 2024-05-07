import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import seats from 'assets/pictures/seats.png';
import noData from 'assets/gifs/noData.gif';
import { getPopularEvents } from 'services/event';
import moment from 'moment'
import { Skeleton } from 'antd';

export default function PopularEvents() {
    const [selectedTab, setSelectedTab] = useState("Business")
    const [events, setEvents] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getEvents();
    }, [selectedTab])

    const getEvents = async () => {
        setIsLoading(true)
        try {
            let { data } = await getPopularEvents(selectedTab);
            setEvents(data?.data)
        } catch (error) {
            console.log(error);
            let msg = "Some error occured";
            let { status, data } = error.response;
            if (status == 400 || status == 401 || status == 500 || status == 413 || status == 404) {
                msg = data.message || data.msg;
                setEvents([])
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
        <div className='container mt-5 mt-sm-4 mb-5' id='popularEvents-section'>
            <div className="row">
                <div className="col">
                    <h5 className='text-center text-warning'>Event</h5>
                    <h2 className='heading-stylling display-5'>POPULAR EVENTS</h2>
                </div>
            </div>
            <div className="row my-5">
                <div className="col-12 col-md-8 offset-0 offset-md-2">
                    <Swiper
                        slidesPerView={4}
                        navigation={true}
                        loop={true}
                        modules={[Autoplay, Navigation]}
                        breakpoints={{
                            1200: {
                                slidesPerView: 6,
                            },
                            992: {
                                slidesPerView: 5,
                            },
                            576: {
                                slidesPerView: 4,
                            },
                        }}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                        className="mySwiper">
                        {window?.categories?.map((item, i) => {
                            return <SwiperSlide key={i}><button className={`btn btn-link text-decoration-none ${selectedTab === item ? "text-warning" : "text-dark"}  fw-bold`} onClick={() => setSelectedTab(item)}>{item}</button></SwiperSlide>
                        })}
                    </Swiper>
                </div>
            </div>
            {isLoading
                ? <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 ">
                    <div className="col">
                        <Skeleton.Image shape='square' active style={{ height: 200 }} className="w-100" />
                        <Skeleton active className='mt-3' />
                    </div>
                    <div className="col">
                        <Skeleton.Image shape='square' active style={{ height: 200 }} className="w-100" />
                        <Skeleton active className='mt-3' />
                    </div>
                    <div className="col">
                        <Skeleton.Image shape='square' active style={{ height: 200 }} className="w-100" />
                        <Skeleton active className='mt-3' />
                    </div>
                </div>
                : <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 ">
                    {events?.map((item, i) => {
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
                                        <Link to={`/event/details/${item?._id}`}>{item?.title?.length > 50 ? item?.title?.substring(0, 50) + "..." : item?.title}</Link>
                                    </h5>
                                    <div className="d-flex justify-content-between align-items-center  mt-2 mb-2">
                                        <span>
                                            <Link to={`/event/details/${item?._id}`} className='text-warning'>Book Now</Link>
                                        </span>
                                        <span>
                                            <button className='btn btn-outline-info btn-sm' onClick={() => handleShareEvent(item?._id)}><ShareOutlinedIcon fontSize='small' /></button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            }
            <div className="row">
                {(!events.length && !isLoading)
                    && <div className='col my-4 text-center'>
                        <img src={noData} alt="no data found" className='img-fluid' />
                    </div>
                }
            </div>

        </div>

    )
}
