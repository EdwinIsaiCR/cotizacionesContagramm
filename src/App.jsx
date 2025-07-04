import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import StepsForm from './components/StepsForm'
import Cotizaciones from './components/Cotizaciones'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/asesorias" element={ <ProtectedRoute isAllowed={false} redirectPath="/" children={<StepsForm />} /> } />
        <Route path='/cotizaciones' element={<ProtectedRoute isAllowed={true} redirectPath="/" children={<Cotizaciones/>}/>}/>
      </Routes>
    </Router>
  )
}

export default App