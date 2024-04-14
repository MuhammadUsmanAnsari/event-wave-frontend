import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import seats from 'assets/pictures/seats.png';
import test from 'assets/pictures/test.png';


export default function PopularEvents() {
    const [selectedTab, setSelectedTab] = useState("Business")
    console.log(selectedTab);


    return (
        <div className='container mt-5 mt-sm-0' id='popularEvents-section'>
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
                            delay: 10000,
                            disableOnInteraction: false,
                        }}
                        className="mySwiper">
                        {window?.categories?.map((item, i) => {
                            return <SwiperSlide key={i}><button className={`btn btn-link text-decoration-none ${selectedTab === item ? "text-warning" : "text-dark"}  fw-bold`} onClick={() => setSelectedTab(item)}>{item}</button></SwiperSlide>
                        })}
                    </Swiper>
                </div>
            </div>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                <div className="col">
                    <div class="card border-0 shadow rounded-4 overflow-hidden">
                        <div className="card-img">
                            <img src={test} class="card-img-top" alt="..." />
                            <div className="seats bg-info py-2 px-4 d-flex align-items-center">
                                <img src={seats} style={{ width: 30, marginRight: 10 }} alt="" />
                                <span>500 Seat</span>
                            </div>
                        </div>
                        <div class="card-body">
                            <div className="d-flex justify-content-between mb-3">
                                <div>
                                    <i class='bx bx-calendar text-warning me-1'></i> <span>Jan 21, 2021</span>
                                </div>
                                <div>
                                    <LocationOnOutlinedIcon fontSize='small' className='text-warning me-1' />
                                    <span>Pakistan</span>
                                </div>
                            </div>
                            <h5 class="card-title">
                                <Link to="/">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor, eius?</Link>
                            </h5>
                            <div className="d-flex justify-content-between align-items-center mt-4 mb-2">
                                <span>
                                    <a href="#" className='text-warning'>Book Now</a>
                                </span>
                                <span>
                                    <button className='btn btn-outline-info btn-sm'><ShareOutlinedIcon fontSize='small' /></button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div class="card border-0 shadow rounded-4 overflow-hidden">
                        <div className="card-img">
                            <img src={test} class="card-img-top" alt="..." />
                            <div className="seats bg-info py-2 px-4 d-flex align-items-center">
                                <img src={seats} style={{ width: 30, marginRight: 10 }} alt="" />
                                <span>500 Seat</span>
                            </div>
                        </div>
                        <div class="card-body">
                            <div className="d-flex justify-content-between mb-3">
                                <div>
                                    <i class='bx bx-calendar text-warning me-1'></i> <span>Jan 21, 2021</span>
                                </div>
                                <div>
                                    <LocationOnOutlinedIcon fontSize='small' className='text-warning me-1' />
                                    <span>Pakistan</span>
                                </div>
                            </div>
                            <h5 class="card-title">
                                <Link to="/">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor, eius?</Link>
                            </h5>
                            <div className="d-flex justify-content-between align-items-center mt-4 mb-2">
                                <span>
                                    <a href="#" className='text-warning'>Book Now</a>
                                </span>
                                <span>
                                    <button className='btn btn-outline-info btn-sm'><ShareOutlinedIcon fontSize='small' /></button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div class="card border-0 shadow rounded-4 overflow-hidden">
                        <div className="card-img">
                            <img src={test} class="card-img-top" alt="..." />
                            <div className="seats bg-info py-2 px-4 d-flex align-items-center">
                                <img src={seats} style={{ width: 30, marginRight: 10 }} alt="" />
                                <span>500 Seat</span>
                            </div>
                        </div>
                        <div class="card-body">
                            <div className="d-flex justify-content-between mb-3">
                                <div>
                                    <i class='bx bx-calendar text-warning me-1'></i> <span>Jan 21, 2021</span>
                                </div>
                                <div>
                                    <LocationOnOutlinedIcon fontSize='small' className='text-warning me-1' />
                                    <span>Pakistan</span>
                                </div>
                            </div>
                            <h5 class="card-title">
                                <Link to="/">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor, eius?</Link>
                            </h5>
                            <div className="d-flex justify-content-between align-items-center mt-4 mb-2">
                                <span>
                                    <a href="#" className='text-warning'>Book Now</a>
                                </span>
                                <span>
                                    <button className='btn btn-outline-info btn-sm'><ShareOutlinedIcon fontSize='small' /></button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div class="card border-0 shadow rounded-4 overflow-hidden">
                        <div className="card-img">
                            <img src={test} class="card-img-top" alt="..." />
                            <div className="seats bg-info py-2 px-4 d-flex align-items-center">
                                <img src={seats} style={{ width: 30, marginRight: 10 }} alt="" />
                                <span>500 Seat</span>
                            </div>
                        </div>
                        <div class="card-body">
                            <div className="d-flex justify-content-between mb-3">
                                <div>
                                    <i class='bx bx-calendar text-warning me-1'></i> <span>Jan 21, 2021</span>
                                </div>
                                <div>
                                    <LocationOnOutlinedIcon fontSize='small' className='text-warning me-1' />
                                    <span>Pakistan</span>
                                </div>
                            </div>
                            <h5 class="card-title">
                                <Link to="/">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor, eius?</Link>
                            </h5>
                            <div className="d-flex justify-content-between align-items-center mt-4 mb-2">
                                <span>
                                    <a href="#" className='text-warning'>Book Now</a>
                                </span>
                                <span>
                                    <button className='btn btn-outline-info btn-sm'><ShareOutlinedIcon fontSize='small' /></button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div class="card border-0 shadow rounded-4 overflow-hidden">
                        <div className="card-img">
                            <img src="https://triggerxchange.com/images/Corporate%20Events.webp" class="card-img-top" alt="..." />
                            <div className="seats bg-info py-2 px-4 d-flex align-items-center">
                                <img src={seats} style={{ width: 30, marginRight: 10 }} alt="" />
                                <span>500 Seat</span>
                            </div>
                        </div>
                        <div class="card-body">
                            <div className="d-flex justify-content-between mb-3">
                                <div>
                                    <i class='bx bx-calendar text-warning me-1'></i> <span>Jan 21, 2021</span>
                                </div>
                                <div>
                                    <LocationOnOutlinedIcon fontSize='small' className='text-warning me-1' />
                                    <span>Pakistan</span>
                                </div>
                            </div>
                            <h5 class="card-title">
                                <Link to="/">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor, eius?</Link>
                            </h5>
                            <div className="d-flex justify-content-between align-items-center mt-4 mb-2">
                                <span>
                                    <a href="#" className='text-warning'>Book Now</a>
                                </span>
                                <span>
                                    <button className='btn btn-outline-info btn-sm'><ShareOutlinedIcon fontSize='small' /></button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div class="card border-0 shadow rounded-4 overflow-hidden">
                        <div className="card-img">
                            <img src={test} class="card-img-top" alt="..." />
                            <div className="seats bg-info py-2 px-4 d-flex align-items-center">
                                <img src={seats} style={{ width: 30, marginRight: 10 }} alt="" />
                                <span>500 Seat</span>
                            </div>
                        </div>
                        <div class="card-body">
                            <div className="d-flex justify-content-between mb-3">
                                <div>
                                    <i class='bx bx-calendar text-warning me-1'></i> <span>Jan 21, 2021</span>
                                </div>
                                <div>
                                    <LocationOnOutlinedIcon fontSize='small' className='text-warning me-1' />
                                    <span>Pakistan</span>
                                </div>
                            </div>
                            <h5 class="card-title">
                                <Link to="/">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor, eius?</Link>
                            </h5>
                            <div className="d-flex justify-content-between align-items-center mt-4 mb-2">
                                <span>
                                    <a href="#" className='text-warning'>Book Now</a>
                                </span>
                                <span>
                                    <button className='btn btn-outline-info btn-sm'><ShareOutlinedIcon fontSize='small' /></button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
