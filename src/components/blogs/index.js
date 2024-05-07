import { Link } from 'react-router-dom';
import './_blogs.scss';
import { useEffect, useState } from 'react';
import { getTopLatestBlogs } from 'services/blogs';
import moment from 'moment';


export default function Index() {
    const [blogs, setBlogs] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getBlogs();
    }, [])

    const getBlogs = async () => {
        try {
            let { data } = await getTopLatestBlogs();
            setBlogs(data?.data)
        } catch (error) {
            console.log(error);
            let msg = "Some error occured";
            let { status, data } = error.response;
            if (status == 400 || status == 401 || status == 500 || status == 413 || status == 404) {
                msg = data.message || data.msg;
                setBlogs([])
                window.toastify(msg, "error");
            }
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="container my-5" id='blogs-section'>
            {isLoading
                ? <div className="row">
                    <div className="col">
                        <div className='my-5 text-center'>
                            <div className="spinner-grow spinner-grow-sm bg-info"></div>
                            <div className="spinner-grow spinner-grow-sm bg-warning mx-3"></div>
                            <div className="spinner-grow spinner-grow-sm bg-info"></div>
                        </div>
                    </div>
                </div>
                : <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {blogs?.slice(0, 8)?.map((item, i) => {
                        return <div className="col" key={i}>
                            <div class="card rounded-3 overflow-hidden border-0">
                                <Link className="card-img" to={`/blog/details/${item?._id}`}>
                                    <img src={item?.image} class="card-img-top" alt="blog_image" />
                                </Link>
                                <div class="card-body">
                                    <p>
                                        <span><i class='bx bx-calendar text-warning me-1'></i></span>
                                        <span>{moment(item?.createdAt).format('YYYY-MM-DD')}</span>
                                    </p>
                                    <div className='details text-secondary my-2'>
                                        <span className='pe-2'>{item?.addedBy?.fullName}</span><span>/</span>
                                        <span className='px-2'>{item?.category}</span><span>/</span>
                                        <span className='px-2'>{item?.comments?.length} Comments</span>
                                    </div>
                                    <h6 class="card-title">{item?.title?.length > 70 ? item?.title?.substring(0, 70) + "..." : item?.title}</h6>
                                    <div className="text-end">
                                        <Link to={`/blog/details/${item?._id}`} class="btn btn-link btn-sm text-warning text-decoration-none"><i className='bx bx-chevron-right bx-flashing' ></i> Read More</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            }
        </div>
    )
}
