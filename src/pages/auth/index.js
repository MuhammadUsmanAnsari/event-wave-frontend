import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import './_auth.scss'
import Navbar from 'components/Navbar/Navbar'
import Register from './Register'
import ForgotPassword from './ForgotPassword'

export default function index() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route path='forgot-password' element={<ForgotPassword />} />
            </Routes>
        </>
    )
}
