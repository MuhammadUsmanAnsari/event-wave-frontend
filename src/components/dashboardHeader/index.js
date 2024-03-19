import { Avatar, Input, Layout, Popover } from 'antd';
import { useAuthContext } from 'context/AuthContext';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ProfileMenu from 'components/Navbar/ProfileMenu';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import './_dashboardHeader.scss';

export default function Index() {
    const { user } = useAuthContext();
    const text = <span>{user?.firstName}</span>;

    return (
        // <Header
        //     style={{
        //         position: "sticky",
        //         top: 0,
        //         padding: 0,
        //         background: "white",
        //     }}
        // >
        <div className="py-3 bg-white position-sticky top-0 border-bottom border-2" id='dashboardHeader-section'>
            <div className="container px-5">
                <ul class="nav d-flex h-100 justify-content-end align-items-center">
                    <li class="nav-item me-auto ">
                        <Input size="large" variant='filled' placeholder="Search ..." prefix={<SearchOutlinedIcon className='text-secondary' />} />
                    </li>
                    <li class="nav-item me-3">
                        <a class="nav-link"><NotificationsNoneOutlinedIcon /></a>
                    </li>
                    <li>
                        <Popover placement="bottomRight" title={text} content={<ProfileMenu />} >
                            <Avatar size="large" style={{ cursor: "pointer" }} icon={<UserOutlined />} />
                        </Popover>
                    </li>
                </ul>
            </div>
        </div>
        // </Header>
    )
}
