import { Route, Routes } from 'react-router-dom'
import Home from 'pages/frontend/home'
import About from 'pages/frontend/about'
import EventDetails from 'pages/frontend/eventDetails'
import BlogDetails from 'pages/frontend/blogDetails'
import PrivateRoute from 'components/privateRoute/PrivateRoute'
import SpeakersEvents from 'pages/frontend/guestsEvents'
import UserProfile from 'pages/frontend/userDetails/Routes'
import Upcoming from 'pages/frontend/upcoming'
import EventsWithCategory from 'pages/frontend/eventsUsingCategory'
import Gallery from 'pages/frontend/gallery'
import Contact from 'pages/frontend/contact'

export default function index() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='upcoming' element={<PrivateRoute Component={Upcoming} />} />
        <Route path='gallery' element={<PrivateRoute Component={Gallery} />} />
        <Route path='contact' element={<Contact />} />
        <Route path='events/:category' element={<PrivateRoute Component={EventsWithCategory} />} />
        <Route path='speaker/:name' element={<PrivateRoute Component={SpeakersEvents} />} />
        <Route path='user/:id/*' element={<PrivateRoute Component={UserProfile} />} />
        <Route path='event/details/:id' element={<PrivateRoute Component={EventDetails} />} />
        <Route path='blog/details/:id' element={<PrivateRoute Component={BlogDetails} />} />
      </Routes>

    </>
  )
}
