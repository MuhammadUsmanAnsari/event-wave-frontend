import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllGuests } from 'services/speakers';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


export default function Guests() {
    const [guests, setGuests] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        getEvents();
    }, [])

    const getEvents = async () => {
        try {
            let { data } = await getAllGuests();
            setGuests(data?.data)
        } catch (error) {
            console.log(error);
            let msg = "Some error occured";
            let { status, data } = error.response;
            if (status == 400 || status == 401 || status == 500 || status == 413 || status == 404) {
                msg = data.message || data.msg;
                // setEvents([])
                window.toastify(msg, "error");
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='container my-5' id='guests-section'>
            <div className="row">
                <div className="col">
                    <h5 className='text-center text-warning'>Guests</h5>
                    <h2 className='heading-stylling display-5'>VALUABLE GUESTS</h2>
                </div>
            </div>
            {isLoading
                ? <div className="row">
                    <div className="col">
                        <div className='my-5 text-center'>
                            <div className="spinner-grow spinner-grow-sm bg-info"></div>
                            <div className="spinner-grow spinner-grow-sm bg-warning mx-3"></div>
                            <div className="spinner-grow spinner-grow-sm bg-info"></div>
                        </div>
                    </div>
                </div>
                :
                <div className="row mt-5 pt-4">
                    <div className="col">
                        <Swiper
                            effect={'coverflow'}
                            grabCursor={true}
                            centeredSlides={true}
                            initialSlide={2}
                            slidesPerView={'auto'}
                            coverflowEffect={{
                                rotate: 50,
                                stretch: 0,
                                depth: 100,
                                modifier: 1,
                                slideShadows: true,
                            }}
                            modules={[EffectCoverflow]}
                            className="mySwiper"
                        >
                            {guests?.map((item, i) => {
                                return <SwiperSlide key={i}>
                                    <div class="card rounded-4 overflow-hidden shadow border-0" onClick={() => navigate(`/speaker/${item.name}`)}>
                                        <div className="card-img">
                                            <img src={item.img ? item.img : "https://media.istockphoto.com/id/476085198/zh/%E7%85%A7%E7%89%87/businessman-silhouette-as-avatar-or-default-profile-picture.jpg?s=612x612&w=0&k=20&c=e4GrLIfIRW0Gpm0DS4eYQMxrMr6O3qXNAGYoNs2_IPI="} alt="..." />
                                            {/* <div className="social-media">
                                            <div className='p-2 p-sm-3'>
                                                <Link to={item.instaId} target='_blank'>
                                                    <i class='bx bxl-instagram fs-4' ></i>
                                                </Link>
                                            </div>
                                            <div className='p-2 p-sm-3'>
                                            <Link to={item.twitterId} target='_blank'>
                                                    <i class='bx bxl-twitter fs-4' ></i>
                                                </Link>
                                            </div>
                                            <div className='p-2 p-sm-3'>
                                                <Link to={item.facebookId} target='_blank'>
                                                    <i class='bx bxl-facebook fs-4'></i>
                                                </Link>
                                            </div>
                                            <div className='p-2 p-sm-3'>
                                                <Link to={item.linkedInId} target='_blank'>
                                                    <i class='bx bxl-linkedin fs-4' ></i>
                                                </Link>
                                            </div>
                                        </div> */}
                                        </div>
                                        <div class="card-body text-center py-3 px-0">
                                            <h5 class="card-title">{item.name}</h5>
                                            <p className='mb-0'>{item.profession}</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            })}
                        </Swiper>
                    </div>
                </div>
            }
        </div>
    )
}
