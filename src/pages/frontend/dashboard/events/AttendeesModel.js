import { Avatar, Modal, Skeleton } from 'antd'
import './_events.scss';
import React, { useEffect, useState } from 'react'
import { viewAttendeesOfEvent } from 'services/event'
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';

export default function AttendeesModel({ open, setOpen, id }) {
    const [attendees, setAttendees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getEvent()
    }, [])

    const getEvent = async () => {
        try {
            let { data } = await viewAttendeesOfEvent(id);
            setAttendees(data?.data);
            console.log(data?.data);
        } catch (error) {
            console.log(error);
            let msg = "Some error occured";
            let { status, data } = error.response;
            if (status == 400 || status == 401 || status == 500 || status == 413) {
                msg = data.message || data.msg;
                window.toastify(msg, "error");
            }
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div >
            <Modal
                title={'Attendees List'}
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={800}
                footer={[]}
                className='event-modal my-2'
            >
                <hr />
                <div className="px-3">
                    {(!isLoading && !attendees.length)
                        ? <div>
                            No attendees found
                        </div>
                        : (isLoading && !attendees.length)
                            ? <>
                                <div className={`card border-0 mb-4`}>
                                    <div className='d-flex align-items-center'>
                                        <Skeleton.Avatar active size={40} />
                                        <Skeleton.Input active className='ms-3' />
                                    </div>
                                    <div className='row row-cols-2 mt-4'>
                                        <div className="col">
                                            <Skeleton active />
                                        </div>
                                        <div className="col">
                                            <Skeleton active />
                                        </div>
                                    </div>
                                </div>
                                <div className={`card border-0`}>
                                    <div className='d-flex align-items-center'>
                                        <Skeleton.Avatar active size={40} />
                                        <Skeleton.Input active className='ms-3' />
                                    </div>
                                    <div className='row row-cols-2 mt-4'>
                                        <div className="col">
                                            <Skeleton active />
                                        </div>
                                        <div className="col">
                                            <Skeleton active />
                                        </div>
                                    </div>
                                </div>
                            </>
                            : <>
                                {attendees?.map((item, i) => {
                                    return <div className={`card border-0 shadow p-3 ${attendees[attendees.length - 1]._id === item._id ? "" : "mb-3"}`} key={i}>
                                        <div className='d-flex align-items-center'>
                                            <Link to={`/user/${item?.addedBy?._id}`}>
                                                <Avatar size={40} src={item?.addedBy?.image} icon={<UserOutlined />} />
                                            </Link>
                                            <div>
                                                <Link to={`/user/${item?.addedBy?._id}`} className='ms-3 text-dark'>
                                                    <b>{item?.addedBy?.fullName}</b>
                                                </Link><br />
                                                <small className='ms-3'>{item?.addedBy?.profession}</small>
                                            </div>
                                        </div><hr />
                                        <div className='row row-cols-2'>
                                            <div className="col">
                                                <strong>Email: </strong>{item?.email}
                                            </div>
                                            <div className="col">
                                                <strong>Phone: </strong>{item?.phone}
                                            </div>
                                            <div className="col">
                                                <strong>Quantity: </strong>{item?.quantity}
                                            </div>
                                            <div className="col">
                                                <strong>Price: </strong>Rs. {item?.totalPrice}
                                            </div>
                                            <div className="col">
                                                <strong>Purchase Date: </strong>{item?.createdAt?.split("T")[0]}
                                            </div>
                                        </div>
                                    </div>
                                })}
                            </>
                    }
                </div>
            </Modal>
        </div>
    )
}
