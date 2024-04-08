import { Routes, Route } from 'react-router-dom'
import AddEvent from './AddEvent';

export default function index() {
    return (
        <>
            <Routes>
                <Route path='/add' element={<AddEvent />} />
            </Routes>
        </>
    )
}
