import { Route, Routes } from 'react-router-dom'
import Home from 'pages/frontend/home'
import About from 'pages/frontend/about'
import EventDetails from 'pages/frontend/eventDetails'
import PrivateRoute from 'components/privateRoute/PrivateRoute'
import SpeakersEvents from 'pages/frontend/guestsEvents'
import UserProfile from 'pages/frontend/userDetails/Routes'

export default function index() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='speaker/:name' element={<PrivateRoute Component={SpeakersEvents} />} />
        <Route path='user/:id/*' element={<PrivateRoute Component={UserProfile} />} />
        <Route path='event/details/:id' element={<PrivateRoute Component={EventDetails} />} />
      </Routes>

    </>
  )
}
