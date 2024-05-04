import './_feedbacks.scss';
import { useState } from 'react';
import { addFeedback } from 'services/feedback';

export default function Index() {
    const [feedback, setFeedback] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (feedback.length > 250) {
            return window.toastify("Maximum 250 characters allowed","error")
        }
        let body = { feedback };
        setLoading(true)
        try {
            let { data } = await addFeedback(body);
            window.toastify(data?.msg, "success");
            setFeedback("")
        } catch (error) {
            console.log(error);
            let msg = "Some error occured";
            let { status, data } = error?.response;
            if (status == 400 || status == 401 || status == 500 || status == 413 || status == 404) {
                msg = data?.message || data?.msg;
                window.toastify(msg, "error");
            }
        } finally {
            setLoading(false)
        }

    }
    return (
        <div>
            <div id='feedback-section'>
                <div className="container-fluid p-0">
                    <div className="container px-0 px-sm-3">
                        <div className="card p-4 rounded-pill border-0 shadow-lg">
                            <form onSubmit={handleSubmit}>
                                <div className="row g-3 d-flex justify-content-center">
                                    <div className="col-11">
                                        <h3 className='text-light fw-bold mb-3'>GIVE US FEEDBACK</h3>
                                        <div class="input-group">
                                            <input type="text" max={250} required class="form-control py-2 py-md-3 border-3 border-warning bg-transparent" value={feedback} onChange={e => setFeedback(e.target.value)} placeholder="Write your feedback here..." aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                            <button class="button-stylling input-group-text px-2 px-sm-4 px-lg-5 py-2 py-md-3  bg-warning border-0 d-flex align-items-center justify-content-center" disabled={loading} role="button">
                                                {loading
                                                    ? <div className='spinner-border spinner-border-sm'></div>
                                                    : <>
                                                        <span class="text d-flex align-items-center"><span className='d-none d-sm-block'>Submit</span> <i class='bx bx-send bx-tada ms-2 fs-4' ></i></span>
                                                        <span className='d-flex align-items-center'>Send Feedback</span>
                                                    </>
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
