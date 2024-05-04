import Navbar from 'components/Navbar'
import React, { useEffect, useState } from 'react'
import Gallery from './Gallery'
import Banner from 'components/background/Banner'
import Footer from 'components/Footer'
import LoadingIndicator from 'components/LoadingIndicator';
// import './_upcoming.scss';
import { getGalleryImages } from 'services/event'
import Testimonial from '../home/Testimonial'


export default function Index() {
    const [images, setImages] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [showMore, setShowMore] = useState(false)

    useEffect(() => {
        window.scroll(0, 0)
        getEvents();
    }, [])

    useEffect(() => {
        getEvents();
    }, [showMore])

    const getEvents = async () => {
        setIsLoading(true)
        try {
            let { data } = await getGalleryImages(showMore);
            setImages(data?.data)
        } catch (error) {
            console.log(error);
            let msg = "Some error occured";
            let { status, data } = error?.response;
            if (status == 400 || status == 401 || status == 500 || status == 413 || status == 404) {
                msg = data?.message || data?.msg;
                setImages([])
                window.toastify(msg, "error");
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <LoadingIndicator loading={isLoading} />
            <Navbar />
            <Banner title={"ALL YOU NEED TO KNOW"} pageTitle={`Great Memories`} page={'Gallery'} />
            <Gallery isLoading={isLoading} images={images} setShowMore={setShowMore} showMore={showMore} />
            <Testimonial />
            <Footer />
        </>
    )
}
