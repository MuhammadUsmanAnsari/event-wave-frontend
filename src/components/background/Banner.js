import { Link } from 'react-router-dom';
import './_banner.scss';

export default function Banner({ title, pageTitle, page }) {
    return (
        <div id='background-banner'>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4 className='text-info mb-3 d-none d-sm-block'>{title}</h4>
                        <h1 className='d-none d-sm-block'>{pageTitle}</h1>
                        <h5 className='text-info mb-3 d-block d-sm-none'>{title}</h5>
                        <h2 className='d-block d-sm-none'>{pageTitle}</h2>
                        <h6><span className="px-3"><Link to="/" className='text-decoration-none text-light'>Home</Link></span> | <span className="px-3">{page}</span></h6>
                    </div>
                </div>
            </div>
        </div>
    )
}
