import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import LocalPhoneTwoToneIcon from '@mui/icons-material/LocalPhoneTwoTone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { sendContactMsg } from 'services/feedback';

const initialState = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
}
export default function Contact() {
    const [state, setState] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = e => {
        setState(s => ({ ...s, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(state);
        setIsLoading(true)
        try {
            let { data } = await sendContactMsg(state);
            // setEvents(data?.data)
            window.toastify(data?.msg, "success");
            setState(initialState)
        } catch (error) {
            console.log(error);
            let msg = "Some error occured";
            let { status, data } = error?.response;
            if (status == 400 || status == 401 || status == 500 || status == 413 || status == 404) {
                msg = data?.message || data?.msg;
                window.toastify(msg, "error");
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className="container" id='contact-section'>
                <div className="row my-5 g-3 g-md-4 g-lg-5">
                    <div className="col px-3">
                        <div className='row p-4 rounded-3 shadow '>
                            <div className="col-1">
                                <LocationOnTwoToneIcon className='text-info' />
                            </div>
                            <div className="col-11 ps-4">
                                <h3 className='fw-bold text-warning'>LOCATION</h3>
                                <Link to="https://maps.app.goo.gl/gCf1rpnhbJ6vbm1p8">1479-D Block shahi Chowk</Link>
                            </div>
                        </div>
                        <div className='row p-4 rounded-3 shadow mt-4'>
                            <div className="col-1">
                                <LocalPhoneTwoToneIcon className='text-info' />
                            </div>
                            <div className="col-11 ps-4">
                                <h3 className='fw-bold text-warning'>PHONE</h3>
                                <Link to="tel:+923229788949">+923229788949</Link>
                            </div>
                        </div>
                        <div className='row p-4 rounded-3 shadow mt-4'>
                            <div className="col-1">
                                <EmailTwoToneIcon className='text-info' />
                            </div>
                            <div className="col-11 ps-4">
                                <h3 className='fw-bold text-warning'>EMAIL</h3>
                                <div>
                                    <Link to="mailto:wahaabjaviad.weorg@gmail.com">wahaabjaviad.weorg@gmail.com</Link>
                                </div>
                                <div>
                                    <Link to="mailto:maanansari2913@gmail.com">maanansari2913@gmail.com</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card p-4 p-lg-5  border-0 shadow">
                            <h2 className='fw-bold'>WRITE A MESSAGE</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="row row-cols-1 g-3 my-3">
                                    <div className="col">
                                        <input type="text" class="form-control py-3" id="" name='name' value={state.name} onChange={handleChange} placeholder="Your Name" />
                                    </div>
                                    <div className="col">
                                        <input type="email" class="form-control py-3" id="" name='email' value={state.email} onChange={handleChange} placeholder="Your Email" />
                                    </div>
                                    <div className="col">
                                        <input type="tel" class="form-control py-3" id="" name='phone' value={state.phone} onChange={handleChange} placeholder="Your Phone" />
                                    </div>
                                    <div className="col">
                                        <input type="text" class="form-control py-3" id="" name='subject' value={state.subject} onChange={handleChange} placeholder="Subject" />
                                    </div>
                                    <div className="col">
                                        <textarea class="form-control" id="" name='message' value={state.message} onChange={handleChange} placeholder='Write Message' rows="4"></textarea>
                                    </div>
                                    <div className="col">
                                        <button className='button-stylling-1 px-5' disabled={isLoading}>
                                            {isLoading
                                                ? <div className='spinner-border spinner-border-sm'></div>
                                                : "Submit Now"
                                            }
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
