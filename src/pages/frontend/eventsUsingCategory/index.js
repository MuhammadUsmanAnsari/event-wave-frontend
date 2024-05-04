import Navbar from 'components/Navbar'
import React, { useEffect, useState } from 'react'
import Events from './Events'
import Banner from 'components/background/Banner'
import Footer from 'components/Footer'
import LoadingIndicator from 'components/LoadingIndicator';
// import './_upcoming.scss';
import { getEventsUsingCategory } from 'services/event'
import Testimonial from '../home/Testimonial'
import { useParams } from 'react-router-dom'


export default function Index() {
    const { category } = useParams()
    const [events, setEvents] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(0)

    useEffect(() => {
        window.scroll(0, 0)
        getEvents();
    }, [category, page])

    useEffect(() => {
    }, [])

    const getEvents = async () => {
        setIsLoading(true)
        try {
            let { data } = await getEventsUsingCategory(page, category);
            setEvents(data?.data)
            console.log(data?.count);
            setCount(data?.count)
        } catch (error) {
            console.log(error);
            let msg = "Some error occured";
            let { status, data } = error?.response;
            if (status == 400 || status == 401 || status == 500 || status == 413 || status == 404) {
                msg = data?.message || data?.msg;
                setEvents([])
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
            <Banner title={"ALL YOU NEED TO KNOW"} pageTitle={`${category} Events`} page={category} />
            <Events isLoading={isLoading} events={events} setPage={setPage} page={page} count={count} />
            <Testimonial />
            <Footer />
        </>
    )
}
