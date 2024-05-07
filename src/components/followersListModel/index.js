import { Avatar, Skeleton } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export default function FollowerListModel({ data, loading }) {
    const navigate = useNavigate();
    return (
        <div>
            <hr />
            {loading
                ? <>
                    <div className='row d-flex align-items-center mb-3'>
                        <div className='col-2'>
                            <Skeleton.Avatar active shape='circle' size={40} />
                        </div>
                        <div className='col-10'>
                            <Skeleton.Input active className='w-100' />
                        </div>
                    </div>
                    <div className='row d-flex align-items-center mb-3'>
                        <div className='col-2'>
                            <Skeleton.Avatar active shape='circle' size={40} />
                        </div>
                        <div className='col-10'>
                            <Skeleton.Input active className='w-100' />
                        </div>
                    </div>
                    <div className='row d-flex align-items-center'>
                        <div className='col-2'>
                            <Skeleton.Avatar active shape='circle' size={40} />
                        </div>
                        <div className='col-10'>
                            <Skeleton.Input active className='w-100' />
                        </div>
                    </div>
                </>
                : data?.length > 0
                    ? <>
                        {
                            data?.map((item, i) => {
                                return <button key={i} className={`btn btn-light d-flex align-items-center w-100 ${item?._id === data[data.length - 1]._id ? "" : "mb-2"} `} onClick={() => navigate(`/user/${item?._id}`)}>
                                    <div>
                                        <Avatar shape='circle'
                                            icon={<UserOutlined />}
                                            src={item?.image} size={40} />
                                    </div>
                                    <div className='ps-3 text-start'>
                                        <div>
                                            <small className='fw-bold'>{item?.fullName}</small>
                                        </div>
                                        <div>
                                            <small>{item?.profession}</small>
                                        </div>
                                    </div>
                                </button>
                            })
                        }

                    </>
                    : <div className='text-center'>
                        <i>No Users found</i>
                    </div>
            }

        </div>
    )
}
