import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Events from './Events'

export default function index() {
  return (
    <>
      <Routes>
        <Route path='events' element={<Events />} />
      </Routes>
    </>
  )
}
