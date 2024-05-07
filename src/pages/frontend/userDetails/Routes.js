import React, { useEffect, useState } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'
import Overview from 'pages/frontend/userDetails/Overview';
import Events from './Events';
import ProfileHeader from './ProfileHeader';
import { getUserWithId } from 'services/auth';
import LoadingIndicator from 'components/LoadingIndicator';
import Footer from 'components/Footer';
import Navbar from 'components/Navbar/Navbar';
import './_userDetails.scss'

export default function Index() {
    const { id } = useParams()
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.scroll(0, 0)
        getData()
    }, [])

    const getData = async () => {
        setLoading(true)
        try {
            let { data } = await getUserWithId(id);
            setUserData(data?.data);
        } catch (error) {
            let msg = "Some error occured";
            let { status, data } = error.response;
            if (status == 400 || status == 401 || status == 500) {
                msg = data.message;
                window.toastify(msg, "error");
            }
        } finally {
            setLoading(false)
        }
    }


    return (
        <>
            <LoadingIndicator loading={loading} />
            <Navbar />
            <ProfileHeader userData={userData} getData={getData} loading={loading} />
            <Routes>
                <Route path='/' element={<Overview userData={userData} />} />
                <Route path='events' element={<Events userData={userData} />} />
            </Routes>
            <Footer />
        </>
    )
}
