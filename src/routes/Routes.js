import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Frontend from 'pages/frontend'
import Auth from 'pages/auth'
import Footer from 'components/Footer'

export default function index() {
    return (
        <>
            <main>
                <Routes>
                    <Route path='/*' element={<Frontend />} />
                    <Route path='/auth/*' element={<Auth />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}
