import React from 'react'
import { Link } from 'react-router-dom'
import seats from 'assets/pictures/seats.png';
import moment from 'moment';
import noData from 'assets/gifs/noData.gif';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { Pagination, Skeleton } from 'antd';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import { useAuthContext } from 'context/AuthContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';


export default function Upcoming({ events, isLoading, setPage, count }) {
    const { user } = useAuthContext()

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
    const formatNumber = (num) => {
        num = num ? num : 0
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    };


    const truncateHTML = (html, maxLength) => {
        if (!html) return "No description added yet";

        // Create a temporary div to parse the HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        // Remove all style attributes and collect text content
        let allText = "";
        const allElements = tempDiv.querySelectorAll('*');
        allElements.forEach(el => {
            // Get text from each element
            if (el.textContent && el.textContent.trim()) {
                allText += el.textContent.trim() + " ";
            }
            // Remove all elements to start fresh
            if (el.parentNode) {
                el.parentNode.removeChild(el);
            }
        });

        // Clean up text and ensure it's not too long
        allText = allText.trim();
        if (allText.length > maxLength) {
            allText = allText.substring(0, maxLength) + "...";
        }

        // If no text was found, use the original div content as fallback
        if (!allText) {
            allText = tempDiv.textContent || "No description added yet";
            if (allText.length > maxLength) {
                allText = allText.substring(0, maxLength) + "...";
            }
        }

        // Return a single paragraph with all text
        return `<p>${allText}</p>`;
    };

    return (
        <>
            <div className="container my-5 py-5">
                {isLoading
                    ? <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4 mb-3 mb-md-4" >
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
                        <div className="col">
                            <Skeleton.Image shape='square' active style={{ height: 200 }} className="w-100" />
                            <Skeleton active className='mt-3' />
                        </div>
                    </div>
                    : <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 mb-3 mb-md-4" id='events-card-row'>
                        {events?.map((item, i) => {
                            return <div className="col d-flex align-items-stretch justify-content-center" key={i}>
                                <div class="card border-0 shadow rounded-4 w-100 overflow-hidden">
                                    {/* <Link className="card-img text-decoration-none text-body" to={`/event/details/${item?._id}`}>
                                        <img src={item?.image} class="card-img-top" alt="..." />
                                        <div className="seats bg-info py-2 px-4 d-flex align-items-center">
                                            <img src={seats} style={{ width: 30, marginRight: 10 }} alt="" />
                                            {item.seats <= bookedSeats(item?.seatsBooked)
                                                ? <span>Sold Out</span>
                                                : <span>{item?.seats - bookedSeats(item?.seatsBooked)} Seat</span>
                                            }

                                        </div>
                                    </Link> */}
                                    <div class="card-body d-flex flex-column justify-content-between">
                                        <h4 class="card-title">
                                            <Link to={`/event/details/${item?._id}`}>{item?.title?.length > 50 ? item?.title?.substring(0, 50) + "..." : item?.title}</Link>
                                        </h4>
                                        <Link to={`/event/details/${item?._id}`} className='rounded '
                                            style={{ height: '100px', overflow: 'hidden' }}
                                            dangerouslySetInnerHTML={{ __html: truncateHTML(item?.description, 150) }} >

                                        </Link>
                                        <div className="seats bg-info py-2 ps-3 d-flex align-items-center rounded">
                                            <div className="row w-100">
                                                <div className="col ">
                                                    <img src={seats} style={{ width: 30, marginRight: 10 }} alt="" />
                                                    {item.seats <= bookedSeats(item?.seatsBooked)
                                                        ? <span>Sold Out</span>
                                                        : <span>{item?.seats - bookedSeats(item?.seatsBooked)} Seat</span>
                                                    }
                                                </div>
                                                <div className="col text-end">
                                                    {/* <img src={seats} style={{ width: 30, marginRight: 10 }} alt="" /> */}
                                                    <span className='fw-bold'>Ticket Price: </span>
                                                    <span>Rs. {item?.ticketPrice}</span>
                                                </div>
                                            </div>


                                        </div>
                                        <div className="d-flex justify-content-between my-4">
                                            <button style={{ width: "33%" }} className='btn btn-light d-flex justify-content-center flex-column flex-sm-row align-items-center'><VisibilityTwoToneIcon className='text-secondary' fontSize='small' /> <small className='ms-2'>{formatNumber(item?.views?.length)} Views</small></button>
                                            <button style={{ width: "33%" }} className='btn btn-light d-flex justify-content-center flex-column flex-sm-row align-items-center' >
                                                {item?.likes?.some(innerItem => innerItem === user?._id)
                                                    ? <FavoriteIcon className='text-danger' fontSize='small' />
                                                    : <FavoriteTwoToneIcon className='text-danger' fontSize='small' />
                                                }

                                                <small className='ms-2'>{formatNumber(item?.likes?.length)} Likes</small>
                                            </button>
                                            <button style={{ width: "33%" }} className='btn btn-light d-flex justify-content-center flex-column flex-sm-row align-items-center'><ChatBubbleTwoToneIcon className='text-primary' fontSize='small' /> <small className='ms-2'>{formatNumber(item?.comments?.length)} Comments</small></button>
                                        </div>
                                        <div className="d-flex justify-content-between mb-3">
                                            <div>
                                                <i class='bx bx-calendar text-warning me-1'></i> <small>{moment(item?.date).format('MMM D, YYYY')}</small>
                                            </div>
                                            <div>
                                                <LocationOnOutlinedIcon fontSize='small' className='text-warning me-1' />
                                                <small>{item?.country}</small>
                                            </div>
                                        </div>
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
