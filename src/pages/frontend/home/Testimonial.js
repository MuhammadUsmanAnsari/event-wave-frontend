import { SwiperSlide, Swiper } from "swiper/react";
import { Pagination, Navigation, Parallax, Autoplay } from 'swiper/modules';
import commas from 'assets/svg/commas.svg'
import { useEffect, useState } from "react";
import { getFeedbacks } from "services/feedback";

export default function Testimonial() {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        getAllFeedbacks();
    }, [])

    const getAllFeedbacks = async () => {
        try {
            let { data } = await getFeedbacks(6);
            setFeedbacks(data?.data)
        } catch (error) {
            console.log(error);
            let msg = "Some error occured";
            let { status, data } = error.response;
            if (status == 400 || status == 401 || status == 500 || status == 413 || status == 404) {
                msg = data.message || data.msg;
                setFeedbacks([])
                window.toastify(msg, "error");
            }
        } finally {
        }
    }

    return (
        <div className="container" id="testimonial-section">
            <div className="row mt-5 mt-md-3 mb-5">
                <div className="col">
                    <h5 className='text-center text-warning'>Testimonial</h5>
                    <h2 className='heading-stylling display-5'>PEOPLE REVIEWS</h2>
                </div>
            </div>
            <div className="row row-cols-1 row-cols-md-2 mb-5 pt-3 pb-4">
                <div className="col d-flex flex-column justify-content-center">
                    <h2 className="fw-bold mb-4">WHAT PEOPLE SAY ABOUT EVENTWAVE.</h2>
                    <p>Our clients' experiences speak volumes about our commitment to excellence in event management. Here at EventWave, we take pride in delivering memorable events that exceed expectations.</p>
                </div>
                <div className="col">
                    <Swiper
                        pagination={{
                            type: 'fraction',
                        }}
                        speed={600}
                        parallax={true}
                        navigation={true}
                        autoplay
                        modules={[Pagination, Navigation, Parallax, Autoplay]}
                        className="mySwiper"
                    >
                        {feedbacks?.map((item, i) => {
                            return <SwiperSlide key={i}>
                                <div className="card rounded-4 overflow-hidden border-0">
                                    <div className="row g-0" >
                                        <div className="col-4 col-sm-3">
                                            <div className="profile-pic">
                                                <img src={(item?.addedBy?.image && item?.addedBy?.image !== "" && item?.addedBy?.image !== "/users/no-image.jpg")
                                                    ? item?.addedBy?.image
                                                    : item?.addedBy?.gender === "Female"
                                                        ? "https://img.freepik.com/premium-vector/school-teacher-avatar-icon-flat-illustration-school-teacher-avatar-vector-icon-web-design_98396-34363.jpg"
                                                        : "https://www.w3schools.com/howto/img_avatar.png"} className="img-fluid" alt="" />
                                            </div>
                                        </div>
                                        <div className="col d-flex flex-column justify-content-center ms-3">
                                            <img src={commas} alt="" />
                                            <h4 className="d-none d-md-block" data-swiper-parallax="-300">{item.addedBy.fullName}</h4>
                                            <h6 className="d-block d-md-none" data-swiper-parallax="-300">{item.addedBy.fullName}</h6>
                                            <small data-swiper-parallax="-200">{item.addedBy.profession}</small>
                                        </div>
                                    </div>
                                    <div className="container my-4 px-3 px-lg-5= py-2 py-lg-4">
                                        <div className="row">
                                            <div className="col" data-swiper-parallax="-100">
                                                {item.feedback}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        })}
                    </Swiper>
                </div>
            </div>
        </div>
    )
}
