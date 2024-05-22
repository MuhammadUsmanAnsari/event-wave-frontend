import React, { useEffect, useState } from 'react'
import BookmarkAddTwoToneIcon from '@mui/icons-material/BookmarkAddTwoTone';
import AssignmentIndTwoToneIcon from '@mui/icons-material/AssignmentIndTwoTone';
import BookmarkAddedTwoToneIcon from '@mui/icons-material/BookmarkAddedTwoTone';
import { Avatar, Input, InputNumber } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import LoadingIndicator from 'components/LoadingIndicator';
import { addTicketReservation, myBookedSeats, makePayment } from 'services/ticketReservation';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';

export default function RightCol({ event, getEventData }) {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [totalPrice, setTotalPrice] = useState(0)
    const [quantity, setQuantity] = useState("")
    const [loading, setLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [mySeats, setMySeats] = useState([])


    useEffect(() => {
        if (event && event?._id) {
            getYourBookedSeats()
        }
    }, [event])

    const getYourBookedSeats = async () => {
        try {
            let { data } = await myBookedSeats(event?._id);
            setMySeats(data?.data);
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
            setIsLoading(false)
        }
    }

    const formatNumber = (num) => {
        num = num ? num : 0
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    };

    const handleSubmit = async (transactionId) => {
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (!email.match(validRegex)) {
            return window.toastify("Email is not valid", "error")
        }
        if (quantity <= 0) {
            return window.toastify("Minimum one quantity is required", "error")
        }

        let body = {
            fullName, email, phone, quantity, totalPrice, transactionId
        }

        try {
            let { data } = await addTicketReservation(event?._id, body);
            window.toastify(data?.msg, "success");
            setFullName("");
            setEmail("");
            setPhone("");
            setTotalPrice(0);
            setQuantity("");
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
            getEventData()
        }
    }

    const onToken = async (token) => {
        //understand the info within the token
        setLoading(true)

        try {
            let body = {
                token, amount: Math.abs(totalPrice)
            }
            let { data } = await makePayment(body);
            handleSubmit(data.data.transactionId)
        } catch (error) {
            setLoading(false)
            window.toastify(error.message, "error");
        }
    };




    const handleQuantity = e => {
        setQuantity(e);
        setTotalPrice(e * event?.ticketPrice)
    }

    const bookedSeats = event?.seatsBooked?.reduce((acc, currentItem) => acc + currentItem.seats, 0);

    return (
        <>
            <LoadingIndicator loading={loading || isLoading} />

            <div style={{ position: "sticky", top: 90 }}>
                <div className="card border-0 shadow py-4 rounded-4">
                    <div className="row mx-0">
                        <div className="col-9 col-sm-7 col-md-12 col-lg-9 col-xl-7 bg-warning py-2 rounded-end d-flex justify-content-center">
                            <h5 className='fw-bold text-light d-flex align-items-center'><BookmarkAddTwoToneIcon /> <span className='ms-2'>Book This Event</span></h5>
                        </div>
                    </div>
                    <div className="container mt-4">
                        <form >
                            <div className="row row-cols-1 px-2 px-sm-3 px-md-1 px-lg-3 g-3">
                                <div className="col">
                                    <Input size='large' required value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Enter Full Name" />
                                </div>
                                <div className="col">
                                    <Input type='email' size='large' required value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter Email" />
                                </div>
                                <div className="col">
                                    <InputNumber size='large' required value={phone} onChange={e => setPhone(e)} className='w-100' placeholder="Enter Phone" />
                                </div>
                                <div className="col">
                                    <InputNumber size='large' required max={event?.seats - bookedSeats} value={quantity} onChange={handleQuantity} className='w-100' placeholder="Quantity" />
                                </div>
                                {quantity > 0 &&
                                    <div className="col d-flex justify-content-between">
                                        <small>Total Price:</small>
                                        <small>{totalPrice}</small>
                                    </div>
                                }
                                {
                                    event?.seats <= bookedSeats
                                        ? <div className='col'>
                                            <button class="button-stylling w-100 py-3 bg-danger text-light rounded bg-info border-0" disabled type='button' role="button">
                                                <span class="text">Sold out</span>
                                                <span>No more tickets available</span>
                                            </button>
                                        </div>
                                        : <div className="col">
                                            <StripeCheckout
                                                billingAddress
                                                token={onToken}
                                                amount={Math.abs(totalPrice * 100)}
                                                currency="GBP"
                                                stripeKey={"pk_test_51PJCaPRpzFB7QfCkyhUpsB4Svbf22YCMgi2Z7w1L4aCOV74HIX0jhMuFjTJCNmhbHnO130vtavNOX5dkh41M8Ya5000xZU0lps"}
                                            >
                                                <button
                                                    className={`button-stylling w-100 py-3 rounded bg-info border-0`}
                                                    type='button'
                                                    disabled={
                                                        ((!fullName || fullName == "") || (!email || email == "") || (!phone || phone == "") || (!totalPrice || totalPrice <= 0) || loading)
                                                            ? true
                                                            : false
                                                    }
                                                >
                                                    {loading
                                                        ? <div className='spinner-border spinner-border-sm'></div>
                                                        : <>
                                                            <span class="text">Submit Now</span>
                                                            <span>Book Ticket</span>
                                                        </>
                                                    }
                                                </button>
                                            </StripeCheckout>
                                        </div>
                                }
                            </div>
                        </form>
                    </div>
                </div>

                {/* my booked seats */}
                {(mySeats.length > 0 && event.status === "Published") &&
                    <div className="card border-0 shadow py-4 rounded-4 mt-4">
                        <div className="row mx-0">
                            <div className="col-9 col-sm-7 col-md-12 col-lg-9 bg-warning py-2 rounded-end d-flex justify-content-center">
                                <h5 className='fw-bold text-light d-flex align-items-center'><BookmarkAddedTwoToneIcon /> <span className='ms-2'>My Booked Seats</span></h5>
                            </div>
                        </div>
                        <div className="container mt-4 px-3 px-sm-4 px-md-2 px-lg-4">
                            <ul class="list-group">
                                {mySeats?.map((item, i) => {
                                    return <li key={i} class="list-group-item">You had reserved <strong>{item.quantity}</strong> {item.quantity === 1 ? "seat" : "seats"} on <strong>{moment(item.createdAt).format('MMM DD, YYYY')}</strong></li>
                                })}
                            </ul>
                        </div>
                    </div>
                }

                {/* added by */}
                <div className="card border-0 shadow rounded-4 py-4 mt-4" id='addedBy-user-details'>
                    <div className="row mx-0">
                        <div className="col-7 col-sm-6 col-md-10 col-lg-9 col-xl-6 bg-warning py-2 rounded-end d-flex justify-content-center">
                            <h5 className='fw-bold text-light d-flex align-items-center'><AssignmentIndTwoToneIcon /> <span className='ms-2'>Added By</span></h5>
                        </div>
                    </div>
                    <div className="container mt-4 px-3 px-sm-4 px-md-2 px-lg-4">
                        <div className="text-center my-4">
                            <Link to={`/user/${event?.addedBy?._id}`}>
                                <Avatar shape="square" size={100} src={event?.addedBy?.image} icon={<UserOutlined />} />
                            </Link>
                        </div>
                        <div className='row mb-3'>
                            <div className="col">Followers: {formatNumber(event?.addedBy?.followers?.length)}</div>
                            <div className="col">Following: {formatNumber(event?.addedBy?.following?.length)}</div>
                        </div>
                        <div>
                            {(event?.addedBy?.fullName && event?.addedBy?.fullName !== "")
                                && <>
                                    <h6 className='text-warning'>Full Name</h6>
                                    <p>{event?.addedBy?.fullName}</p>
                                </>
                            }

                            {(event?.addedBy?.profession && event?.addedBy?.profession !== "")
                                && <>
                                    <h6 className='text-warning'>Profession</h6>
                                    <p>{event?.addedBy?.profession}</p>
                                </>
                            }

                            {(event?.addedBy?.email && event?.addedBy?.email !== "")
                                && <>
                                    <h6 className='text-warning'>Email</h6>
                                    <p>{event?.addedBy?.email}</p>
                                </>
                            }

                            {(event?.addedBy?.phone && event?.addedBy?.phone !== "")
                                && <>
                                    <h6 className='text-warning'>Phone</h6>
                                    <p>{event?.addedBy?.phone}</p>
                                </>
                            }

                            {(event?.addedBy?.country && event?.addedBy?.country !== "")
                                && <>
                                    <h6 className='text-warning'>Country</h6>
                                    <p>{event?.addedBy?.country}</p>
                                </>
                            }

                            {(event?.addedBy?.city && event?.addedBy?.city !== "")
                                && <>
                                    <h6 className='text-warning'>City</h6>
                                    <p>{event?.addedBy?.city}</p>
                                </>
                            }
                        </div>

                    </div>
                </div>
            </div >
        </>
    )
}
