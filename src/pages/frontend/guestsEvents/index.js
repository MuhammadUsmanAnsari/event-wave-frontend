import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import Banner from 'components/background/Banner';
import { getGuestEvents } from 'services/speakers';
import LoadingIndicator from 'components/LoadingIndicator';
import './_guestsEvents.scss';
import seats from 'assets/pictures/seats.png';
import moment from 'moment';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import Testimonial from '../home/Testimonial';

export default function Index() {
    const { name } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        window.scroll(0, 0)
        getEvents();
    }, [name])

    const getEvents = async () => {
        try {
            let { data } = await getGuestEvents(name);
            setEvents(data?.data)
        } catch (error) {
            console.log(error);
            let msg = "Some error occured";
            let { status, data } = error?.response;
            if (status == 400 || status == 401 || status == 500 || status == 413 || status == 404) {
                msg = data?.message || data?.msg;
                // setEvents([])
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
        <>
            <Navbar />
            <LoadingIndicator loading={isLoading} />
            <Banner title={"ALL YOU NEED TO KNOW"} pageTitle={"Speaker's events"} page={'Speaker'} />
            <div className="container my-5 py-5">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4 mb-3 mb-md-4" id='events-card-row'>
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
                                    <h6 class="card-title">
                                        <Link to={`/event/details/${item?._id}`}>{item?.title?.length > 50 ? item?.title?.substring(0, 50) + "..." : item?.title}</Link>
                                    </h6>
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
            </div>
            <Testimonial />
            <Footer />
        </>
    )
}
