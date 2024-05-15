import Navbar from 'components/Navbar'
import React, { useEffect, useState } from 'react'
import Events from './Events'
import Banner from 'components/background/Banner'
import Footer from 'components/Footer'
import LoadingIndicator from 'components/LoadingIndicator';
// import './_upcoming.scss';
import { getEventsUsingCategory, searchEvents } from 'services/event'
import Testimonial from '../home/Testimonial'
import { useParams } from 'react-router-dom'
import Searchbar from 'components/searchBar'


export default function Index() {
    const paramsData = useParams()
    const [category, setCategory1] = useState(paramsData?.category ? paramsData?.category : "")
    const [country, setCountry1] = useState(paramsData?.country ? paramsData?.country : "")
    const [date, setDate1] = useState(paramsData?.date ? paramsData?.date : "")
    // const { country, date, category } = useParams()
    const [events, setEvents] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(0)

    useEffect(() => {
        window.scroll(0, 0)
        getEvents();        
    }, [page, window.location.pathname])

    const getEvents = async () => {
        setIsLoading(true)
        try {
            let body = {
                country, date, category
            }
            console.log(body);
            let { data } = await searchEvents(page, body);
            setEvents(data?.data)
            console.log(data?.data);
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
            <Banner title={"ALL YOU NEED TO KNOW"} pageTitle={`Search Events`} page={"Search"} />
            <Searchbar category1={category} country1={country} date1={date} setCategory1={setCategory1} setCountry1={setCountry1} setDate1={setDate1} />
            <Events isLoading={isLoading} events={events} setPage={setPage} page={page} count={count} />
            <Testimonial />
            <Footer />
        </>
    )
}
