import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import { getEditEvent, rejectEvent } from 'services/event';
import { Input } from 'antd';


export default function RejectEvent({ open, setOpen, id }) {
    const [event, setEvent] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [rejLoading, setRejLoading] = useState(false);
    const [reason, setReason] = useState("");
    const { TextArea } = Input;


    useEffect(() => {
        getEvent()
    }, [])

    const getEvent = async () => {
        try {
            let { data } = await getEditEvent(id);
            setEvent(data?.data);
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

    const handleRejectEvent = async () => {
        setRejLoading(true)
        try {
            let { data } = await rejectEvent(id, reason);
            window.toastify(data?.msg, "success");
            setReason("")
            setOpen(false)
            getEvent()
        } catch (error) {
            console.log(error);
            let msg = "Some error occured";
            let { status, data } = error.response;
            if (status == 400 || status == 401 || status == 500 || status == 413) {
                msg = data.message || data.msg;
                window.toastify(msg, "error");
            }
        } finally {
            setRejLoading(false)
        }
    }



    return (
        <div >
            <Modal
                title={'Rejection reason'}
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={800}
                footer={[]}
                className='event-modal my-2'
            >
                <div className="container-fluid">
                    {isLoading
                        ? <div className="row">
                            <div className="col">
                                <div className='my-5 text-center'>
                                    <div className="spinner-grow bg-info"></div>
                                    <div className="spinner-grow bg-warning mx-3"></div>
                                    <div className="spinner-grow bg-info"></div>
                                    <div>Loading...</div>
                                </div>
                            </div>
                        </div>
                        : <>
                            <TextArea rows={4} value={reason} onChange={e => setReason(e.target.value)} placeholder='Please describe the reason of rejection...' />
                            <div className="text-end mt-4">
                                <button className='btn btn-info' disabled={rejLoading} onClick={handleRejectEvent}>
                                    {rejLoading
                                        ? <div className='spinner-border spinner-border-sm'></div>
                                        : "Submit"
                                    }                                    
                                </button>
                            </div>
                        </>
                    }
                </div>
            </Modal>
        </div>
    )
}
