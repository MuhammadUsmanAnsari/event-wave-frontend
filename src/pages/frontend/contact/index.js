import LoadingIndicator from 'components/LoadingIndicator'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import Banner from 'components/background/Banner'
import React, { useState } from 'react'
import Testimonial from '../home/Testimonial'
import Contact from './Contact'
import './_contact.scss'

export default function Index() {
    const [loading, setLoading] = useState(false);

    return (
        <>
            <LoadingIndicator loading={loading} />
            <Navbar />
            <Banner title={"ALL YOU NEED TO KNOW"} pageTitle={`Contact With Us`} page={"Contact"} />
            <Contact />
            <Testimonial />
            <Footer />
        </>
    )
}
