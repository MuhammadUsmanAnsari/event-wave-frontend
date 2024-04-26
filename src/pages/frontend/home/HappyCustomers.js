import { useEffect, useState } from "react";
import CountUp from 'react-countup';
import speaker from 'assets/pictures/happy-customers/speakers.png';
import events from 'assets/pictures/happy-customers/events.png';
import users from 'assets/pictures/happy-customers/users.png';
import tickets from 'assets/pictures/happy-customers/tickets.png';
import { getHomeDetails } from "services/details";


export default function HappyCustomers() {
    const [data, setData] = useState({})

    useEffect(() => {
        getDetails();
    }, [])

    const getDetails = async () => {
        try {
            let { data } = await getHomeDetails();
            setData(data?.data)
        } catch (error) {
            console.log(error);
            let msg = "Some error occured";
            let { status, data } = error?.response;
            if (status == 400 || status == 401 || status == 500 || status == 413 || status == 404) {
                msg = data?.message || data?.msg;
                // setEvents([])
                window.toastify(msg, "error");
            }
        } finally {
        }
    }
    return (
        <div className='my-5' id='happyCustomers-section'>
            <div className="absolute-layer"></div>
            <div className="container-fluid">
                <div className="container text-light">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-5">
                        <div className="col">
                            <CountUp
                                start={0}
                                end={data?.guests}
                                duration={2}
                                enableScrollSpy
                            >
                                {({ countUpRef }) => (
                                    <div className="text-center">
                                        <img src={speaker} width={80} alt="" />
                                        <h1 className="fw-bold text-info my-3">
                                            <span ref={countUpRef} />
                                        </h1>
                                        <h4>
                                            Valuable Guests
                                        </h4>
                                    </div>
                                )}
                            </CountUp>
                        </div>
                        <hr className="w-75 mx-auto d-block d-sm-none" />
                        <div className="col">
                            <CountUp
                                start={0}
                                end={data?.events}
                                duration={2}
                                enableScrollSpy
                            >
                                {({ countUpRef }) => (
                                    <div className="text-center">
                                        <img src={events} width={80} alt="" />
                                        <h1 className="fw-bold text-info my-3">
                                            <span ref={countUpRef} />
                                        </h1>
                                        <h4>
                                            Total Events
                                        </h4>
                                    </div>
                                )}
                            </CountUp>
                        </div>
                        <hr className="w-75 mx-auto d-block d-sm-none" />
                        <div className="col">
                            <CountUp
                                start={0}
                                end={data?.users}
                                duration={2}
                                enableScrollSpy
                            >
                                {({ countUpRef }) => (
                                    <div className="text-center">
                                        <img src={users} width={80} alt="" />
                                        <h1 className="fw-bold text-info my-3">
                                            <span ref={countUpRef} />
                                        </h1>
                                        <h4>
                                            Total Users
                                        </h4>
                                    </div>
                                )}
                            </CountUp>
                        </div>
                        <hr className="w-75 mx-auto d-block d-sm-none" />
                        <div className="col">
                            <CountUp
                                start={0}
                                end={data?.soldTickets}
                                duration={2}
                                enableScrollSpy
                            >
                                {({ countUpRef }) => (
                                    <div className="text-center">
                                        <img src={tickets} width={80} alt="" />
                                        <h1 className="fw-bold text-info my-3">
                                            <span ref={countUpRef} />
                                        </h1>
                                        <h4>
                                            Tickets Sold
                                        </h4>
                                    </div>
                                )}
                            </CountUp>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
