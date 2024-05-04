import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthContext } from 'context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';

export default function ProfileMenu() {
    const { dispatch, user } = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: "SET_LOGGED_OUT" });
        window.toastify("Logout Successfully", "success")
        window.location.reload()

    }

    return (
        <div id='profileMenu-section'>
            <hr />
            {user?.role !== "admin" &&
                <button className='btn btn-light' onClick={() => navigate("/dashboard/profile")}>
                    <span><PermIdentityOutlinedIcon fontSize='small' /></span>
                    <span>Profile</span>
                </button>
            }
            {user?.role === "organizer" && <button className='btn btn-light' onClick={() => navigate("/dashboard/events/myEvents")}>
                <span><CelebrationOutlinedIcon fontSize='small' /></span>
                <span>My Events</span>
            </button>}
            {user?.role === "admin" && <button className='btn btn-light' onClick={() => navigate("/dashboard/admin/events")}>
                <span><CelebrationOutlinedIcon fontSize='small' /></span>
                <span>Added Events</span>
            </button>}
            {(user?.role === "admin" || user?.role === "organizer") &&
                <button className='btn btn-light' onClick={() => navigate("/dashboard/blogs/myBlogs")}>
                    <span><BookOutlinedIcon fontSize='small' /></span>
                    <span>My Blogs</span>
                </button>
            }
            <hr />
            <button className='btn btn-light w-100' onClick={handleLogout}>
                <span><LogoutIcon fontSize='small' /></span>
                <span>Logout</span>
            </button>
        </div >
    )
}
