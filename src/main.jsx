import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import App from './App.jsx'
import Services from './Services.jsx'
import Customers from './Customers.jsx'
import './App.css'
import './Services.css'

function ScrollToHash() {
  const { pathname, hash } = useLocation()

  React.useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }))
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [pathname, hash])

  return null
}

function PageMetadata() {
  const { pathname } = useLocation()

  React.useEffect(() => {
    const isServicesPage = pathname === '/services'
    const isCustomersPage = pathname === '/customers'
    document.title = isServicesPage
      ? 'Generator Services & AMC in Chennai | Power Tech Diesel Services'
      : isCustomersPage
        ? 'Our Customers | Power Tech Diesel Services'
        : 'Power Tech Diesel Services | Generator Care in Chennai'
    const description = isServicesPage
      ? 'Explore generator oil servicing, AMC, preventive maintenance, and inspection services for businesses in Chennai.'
      : isCustomersPage
        ? 'Explore the customer categories served by Power Tech Diesel Services in Chennai. Customer names are displayed only with approval.'
        : 'Generator oil servicing, AMC, and planned maintenance for petrol bunks, industries, factories, and event venues in Chennai.'
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [pathname])

  return null
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToHash />
      <PageMetadata />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/services" element={<Services />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)