import { Link } from "react-router-dom";

export default function Login() {
    return (
        <div id='auth-page-right'>
            <div className='container'>
                <div className="row">
                    <div className="col">
                        <div className="card shadow-lg rounded-5 border-0 mt-3 mb-4">
                            <div className="row row-cols-1 row-cols-md-2  g-0">
                                <div className="col p-3 p-md-4 p-lg-5 my-4">
                                    <h3 className='event-wave-logo text-center mb-5'>EventWave</h3>
                                    <form className="px-0 px-lg-4">
                                        <div class="form-floating mb-3">
                                            <input type="email" class="form-control shadow-none" id="floatingInput" placeholder="name@example.com" />
                                            <label htmlFor="floatingInput" className="text-secondary">Email address</label>
                                        </div>
                                        <div class="form-floating mb-3">
                                            <input type="password" class="form-control shadow-none" id="floatingInput1" placeholder="Enter Password" />
                                            <label htmlFor="floatingInput1" className="text-secondary">Password</label>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <div class="form-check text-secondary">
                                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                <label class="form-check-label" htmlFor="flexCheckDefault">
                                                    Remember Me
                                                </label>
                                            </div>
                                            <Link className="text-decoration-none" to="/auth/forgot-password">Forgot Password?</Link>
                                        </div>
                                        <div className="my-5">
                                            <button class="button-stylling w-100 py-3 rounded bg-info border-0" role="button">
                                                <span class="text">Log in</span>
                                                <span>Log in</span>
                                            </button>
                                        </div>
                                        <p className="text-center text-secondary">Don't have an account? <Link to="/auth/register" className="text-decoration-none">Register</Link></p>
                                    </form>
                                </div>
                                <div className="col text-light d-none d-md-block">
                                    <div className="row  d-flex align-items-center justify-content-center">
                                        <div className="col-9 text-center">
                                            <h1 className="fw-bold">Join us to explore the world</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
