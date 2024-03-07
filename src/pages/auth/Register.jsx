import { useState } from "react";
import { Link } from "react-router-dom";

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    idCard: "",
    password: "",
    confirmPassword: "",
}

export default function Register() {
    const [state, setState] = useState(initialState);
    const [accountType, setAccountType] = useState(1);

    const handleChange = e => {
        setState(s => ({ ...s, [e.target.name]: e.target.value }))
    }
    const handleSubmit = e => {
        e.preventDefault();
        const { firstName, lastName, email, idCard, password, confirmPassword } = state;
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (accountType === 2 && (idCard.length < 13 || idCard.length > 13)) {
            return window.toastify("Please add valid ID card number. Only 13 digits are valid", "error");
        }
        if (!email.match(validRegex)) {
            return window.toastify("Please add valid email", "error");
        }
        if (password !== confirmPassword) {
            return window.toastify("Password doesn't match", "error");
        }

        console.log(firstName);
    }

    return (
        <div id='auth-page-left'>
            <div className='container'>
                <div className="row">
                    <div className="col">
                        <div className="card shadow-lg rounded-5 border-0 mt-3 mb-4">
                            <div className="row row-cols-1 row-cols-md-2 g-0">
                                <div className="col text-light d-none d-md-block">
                                    <div className="row  d-flex align-items-center justify-content-center">
                                        <div className="col-9 text-center">
                                            <h1 className="fw-bold">Join us to explore the world</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="col p-3 p-md-4 px-4 px-lg-5 my-4">
                                    <h3 className='event-wave-logo text-center mb-5'>EventWave</h3>
                                    <div className="container h-auto mb-3">
                                        <div className="row px-0 px-lg-4 ">
                                            <div className="col p-0">
                                                <button className={`btn  ${accountType === 1 ? "btn-info" : "btn-outline-info"} text-dark rounded-end-0 w-100 h-100 p-3`} onClick={() => setAccountType(1)}>
                                                    Event Attendees
                                                </button>
                                            </div>
                                            <div className="col p-0" >
                                                <button className={`btn ${accountType === 2 ? "btn-info" : "btn-outline-info"}  text-dark rounded-start-0 w-100 h-100 p-3`} onClick={() => setAccountType(2)}>
                                                    Event Organizers
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <form className="px-0 px-lg-4" onSubmit={handleSubmit}>
                                        <div className="row mb-3 h-auto">
                                            <div className="col">
                                                <div class="form-floating ">
                                                    <input type="text" name="firstName" class="form-control shadow-none" id="fname" placeholder="Enter your first name" onChange={handleChange} />
                                                    <label htmlFor="fname" className="text-secondary">First Name</label>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="col">
                                                    <div class="form-floating ">
                                                        <input type="text" name="lastName" class="form-control shadow-none" id="lname" placeholder="Enter your last name" onChange={handleChange} />
                                                        <label htmlFor="lname" className="text-secondary">Last Name</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {accountType === 2 && <div class="form-floating mb-3">
                                            <input type="number" name="idCard" class="form-control shadow-none" id="name" placeholder="33100--------" value={state.idCard} onChange={handleChange} />
                                            <label htmlFor="name" className="text-secondary">Enter ID Card Number</label>
                                        </div>}

                                        <div class="form-floating mb-3">
                                            <input type="email" name="email" class="form-control shadow-none" id="floatingInput" placeholder="name@example.com" onChange={handleChange} />
                                            <label htmlFor="floatingInput" className="text-secondary">Email Address</label>
                                        </div>
                                        <div class="form-floating mb-3">
                                            <input type="password" name="password" class="form-control shadow-none" id="floatingInput1" placeholder="Enter Password" onChange={handleChange} />
                                            <label htmlFor="floatingInput1" className="text-secondary">Password</label>
                                        </div>
                                        <div class="form-floating mb-3">
                                            <input type="password" name="confirmPassword" class="form-control shadow-none" id="floatingInput2" placeholder="Enter Password" onChange={handleChange} />
                                            <label htmlFor="floatingInput2" className="text-secondary">Confirm Password</label>
                                        </div>
                                        <div className="mb-5">
                                            <button class="button-stylling w-100 py-3 rounded bg-info border-0" type="submit" role="button">
                                                <span class="text">Register</span>
                                                <span>Register</span>
                                            </button>
                                        </div>
                                        <p className="text-center text-secondary">Already have an account? <Link to="/auth/login" className="text-decoration-none">Login</Link></p>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
