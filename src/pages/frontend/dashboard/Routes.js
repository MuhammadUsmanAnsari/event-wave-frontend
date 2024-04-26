import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Profile from './profile/Profile'
import Events from './events/Routes'
import AdminEvents from './admin/Routes'
import EditProfile from './editProfile/EditProfile'
import { useAuthContext } from 'context/AuthContext'

export default function Index() {
    const { user } = useAuthContext();

    return (
        <Routes>
            <Route path='/profile/*' element={user?.role === "admin" ? <Navigate to={'/dashboard/admin/events'}/> : <Profile />} />
            <Route path='/events/*' element={user?.role === "organizer" ? <Events /> : <div className='container py-5 text-center text-danger display-5'> You do not have access to this page. Only organizers can access this page.</div>} />
            <Route path='/admin/*' element={user?.role === "admin" ? <AdminEvents /> : <div className='container py-5 text-center text-danger display-5'> You do not have access to this page. Only admins can access this page.</div>} />
            <Route path='/profile-edit' element={<EditProfile />} />
        </Routes>
    )
}
