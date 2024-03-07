import React from 'react'
import HeroSection from './HeroSection'
import './_home.scss'
import Navbar from 'components/Navbar'
import Searchbar from './Searchbar'
import PopularEvents from './PopularEvents'
import HappyCustomers from './HappyCustomers'
import Speakers from './Speakers'
import Testimonial from './Testimonial'
import Blogs from 'components/blogs'
import Newsletter from 'components/NewsLetter'

export default function index() {
    return (
        <>
            <Navbar />
            <HeroSection />
            <Searchbar />
            <PopularEvents />
            <HappyCustomers />
            <Speakers />
            <Testimonial />
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h5 className='text-center text-warning'>Blog</h5>
                        <h2 className='heading-stylling display-5'>LATEST BLOGS</h2>
                    </div>
                </div>
            </div>
            <Blogs />
            <Newsletter />
        </>
    )
}
