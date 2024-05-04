import { Input } from 'antd'
import LoadingIndicator from 'components/LoadingIndicator';
import { useAuthContext } from 'context/AuthContext';
import React, { useState } from 'react'
import { updateUser } from 'services/auth';

export default function ChangeUserRole() {
    const { setToggle, toggle, user } = useAuthContext();
    const [showInput, setShowInput] = useState(false);
    const [idCard, setIdCard] = useState("")
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isDigit = /^\d+$/.test(idCard);


        if (!isDigit) {
            return window.toastify("Only numbers allowed in ID card number", "error");
        }
        if (idCard.length < 13 || idCard.length > 13) {
            return window.toastify("Please add valid ID card number. Only 13 digits are valid", "error");
        }
        let body = {
            role: "organizer",
            idCard
        }
        setLoading(true)
        try {

            let { data } = await updateUser(user?._id, body);

            window.toastify("User Role is changed. Please login again.", "success");
            localStorage.clear();
            // window.location.reload();
            setToggle(!toggle);
            setIdCard("")
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
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className="row g-3 g-sm-4 py-5">
                        <h5>Organizer Role:</h5>
                        <p>As an organizer, you have full control over event management. You can create, edit, and delete events, manage attendee lists, and customize event details to ensure a seamless experience for all participants.</p>
                        <br />
                        <h5>Attendee Role:</h5>
                        <p>As an attendee, you can explore upcoming events, view event details, and join events that interest you. While you can't make changes to events, you can engage with organizers and fellow attendees to make the most of your event experience.</p>
                        {!showInput &&
                            <div>
                                <button className='button-stylling-1 px-3' onClick={() => setShowInput(true)}>Switch to Organizer</button>
                            </div>
                        }
                        {showInput &&
                            <>
                                <div className="col-12 px-0 px-md-2">
                                    <label htmlFor="oldPass" className='mb-2'>Enter your ID card Number<span className='text-danger'>*</span></label>
                                    <Input placeholder="Enter ID Card Number" className='w-100' required value={idCard} onChange={e => setIdCard(e.target.value)} id='idCard' size='large' />
                                </div>
                                <div className="col-12 mt-5">
                                    <button disabled={loading} className='button-stylling-1 px-5 ms-auto'>
                                        {loading
                                            ? <div className='spinner-border spinner-border-sm'></div>
                                            : "Change Role"
                                        }

                                    </button>
                                </div>
                            </>
                        }
                    </div>
                </form>
            </div>
        </>
    )
}
