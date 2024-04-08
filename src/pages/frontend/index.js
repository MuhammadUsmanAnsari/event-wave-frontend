import { Route, Routes } from 'react-router-dom'
import Home from 'pages/frontend/home'
import About from 'pages/frontend/about'

export default function index() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
      </Routes>

    </>
  )
}
