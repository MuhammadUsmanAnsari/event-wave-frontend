import React from 'react'
import { Link } from 'react-router-dom'
import seats from 'assets/pictures/seats.png';
import moment from 'moment';
import noData from 'assets/gifs/noData.gif';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { Pagination } from 'antd';

export default function Upcoming({ events, isLoading, count, setPage }) {

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

    const bookedSeats = (seatsBooked) => {
        return seatsBooked?.reduce((acc, currentItem) => acc + currentItem.seats, 0)
    };

    return (
        <>
            <div className="container my-5 py-5">
                {isLoading
                    ? <div className="row">
                        <div className="col">
                            <div className='my-5 text-center'>
                                <div className="spinner-grow bg-info"></div>
                                <div className="spinner-grow bg-warning mx-3"></div>
                                <div className="spinner-grow bg-info"></div>
                            </div>
                        </div>
                    </div>
                    : <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4 mb-3 mb-md-4" id='events-card-row'>
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
                }
                <div className="row">
                    {(!events?.length && !isLoading)
                        && <div className='col my-4 text-center'>
                            <img src={noData} alt="no data found" className='img-fluid' />
                        </div>
                    }
                </div>
                {count > 20
                    && <div className="row mt-5">
                        <div className="col text-center">
                            <Pagination className='w-100' pageSize={20} onChange={e => setPage(e)} defaultCurrent={1} total={count} />
                        </div>
                    </div>
                }
            </div >
        </>
    )
}
