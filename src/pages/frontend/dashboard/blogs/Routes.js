import { Routes, Route } from 'react-router-dom'
import AddBlog from './AddBlog';
import MyBlogs from './MyBlogs';
import EditBlog from './EditBlog';

export default function index() {
    return (
        <>
            <Routes>
                <Route path='/add' element={<AddBlog />} />
                <Route path='/edit/:id' element={<EditBlog />} />
                <Route path='/myBlogs' element={<MyBlogs />} />
            </Routes>
        </>
    )
}
