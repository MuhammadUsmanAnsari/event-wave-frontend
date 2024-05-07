import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import Banner from 'components/background/Banner'
import React, { useEffect } from 'react'
import Testimonial from '../home/Testimonial'
import Blogs from './Blogs'
import './_blog.scss'

export default function Index() {
    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    return (
        <>
            <Navbar />
            <Banner title={"ALL YOU NEED TO KNOW"} pageTitle={`Read Our Blogs`} page={"Blogs"} />
            <Blogs />
            <Testimonial />
            <Footer />
        </>
    )
}
