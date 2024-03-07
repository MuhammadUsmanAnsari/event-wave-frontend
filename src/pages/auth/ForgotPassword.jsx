import { Link } from "react-router-dom";

export default function ForgotPassword() {
    return (
        <div id='auth-page-right'>
            <div className='container'>
                <div className="row">
                    <div className="col-12 col-md-8 col-lg-6 offset-0 offset-md-2 offset-lg-3">
                        <div className="card shadow-lg rounded-5 border-0 mt-3 mb-4">
                            <div className="row  g-0">
                                <div className="col p-3 p-md-4 p-lg-5 my-4">
                                    <h3 className='event-wave-logo text-center mb-5'>EventWave</h3>
                                    <form className="px-0 px-lg-4">
                                        <div class="form-floating mb-3">
                                            <input type="email" class="form-control shadow-none" id="floatingInput" placeholder="name@example.com" />
                                            <label htmlFor="floatingInput" className="text-secondary">Email address</label>
                                        </div>                                                                               
                                        <div className="my-5">
                                            <button class="button-stylling w-100 py-3 rounded bg-info border-0" role="button">
                                                <span class="text">Reset Password</span>
                                                <span>Reset Password</span>
                                            </button>
                                        </div>
                                        <p className="text-center text-secondary">Know your password? <Link to="/auth/login" className="text-decoration-none">Login</Link></p>
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
