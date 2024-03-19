import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Frontend from 'pages/frontend'
import Auth from 'pages/auth'
import { useAuthContext } from 'context/AuthContext'

export default function Index() {
    const { isAuthenticated } = useAuthContext();
    return (
        <>
            <main>
                <Routes>
                    <Route path='/*' element={<Frontend />} />
                    <Route path='/auth/*' element={!isAuthenticated ? <Auth /> : <Navigate to={'/'}/>} />
                </Routes>
            </main>
        </>
    )
}
