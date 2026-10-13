import { useEffect } from 'react'
import { ArrowRight, Briefcase, Factory, Fuel, GraduationCap, Hospital } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Footer, Navbar, WhatsAppButton } from './App.jsx'
import CustomerDirectory from './CustomerDirectory.jsx'
import { customerCategories } from './config/customers.js'

const categoryIcons = { Factory, Fuel, Hospital, GraduationCap, Briefcase }

function IndustriesWeHaveServed() {
  return (
    <section className="customer-experience section-pad" id="industries-served">
      <div className="wrap customer-experience-grid">
        <div className="customer-experience-copy reveal">
          <p className="eyebrow eyebrow-light"><span /> EXPERIENCE SINCE 2014</p>
          <h2>Trusted Generator Service Experience Across Industries</h2>
          <p>Power Tech Diesel Services supports businesses and institutions with dependable generator servicing and maintenance. The categories and counts reflect entries in the customer list; no names or endorsements are shown.</p>
          <Link className="button button-light" to="/#quote">Request a Callback <ArrowRight size={16} /></Link>
        </div>
        <div className="customer-experience-list reveal">
          {customerCategories.map(category => {
            const Icon = categoryIcons[category.icon]
            return (
              <article className="customer-experience-item" key={category.id}>
                <span className="customer-experience-icon"><Icon size={18} strokeWidth={1.8} /></span>
                <h3>{category.name}</h3>
                <strong>{category.customerCount}</strong>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default function Customers() {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    document.querySelectorAll('.customers-page .reveal').forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar />
      <main className="customers-page">
        <section className="customers-page-hero" id="customers">
          <div className="wrap customers-page-hero-inner">
            <p className="eyebrow reveal"><span /> POWER TECH DIESEL SERVICES · CHENNAI</p>
            <h1 className="reveal">Our Valued Customers</h1>
            <p className="customers-page-subtitle reveal">Serving businesses and institutions across diverse sectors with dependable diesel generator servicing and maintenance.</p>
            <p className="customers-page-intro reveal">Since 2014, Power Tech Diesel Services has served customers across multiple industries. Customer organization names are shown only after approval for public display.</p>
          </div>
        </section>

        <section className="customer-directory-section section-pad" aria-labelledby="customer-directory-title">
          <div className="wrap">
            <div className="section-heading reveal">
              <p className="eyebrow"><span /> CUSTOMER DIRECTORY</p>
              <h2 id="customer-directory-title">Explore Our Customer Categories</h2>
              <p className="section-description">Choose any category to browse its customer organizations, or search approved organization names across all categories. Residential customers are not included.</p>
            </div>
            <CustomerDirectory />
          </div>
        </section>

        <IndustriesWeHaveServed />

        <section className="customers-page-cta">
          <div className="wrap customers-page-cta-inner reveal">
            <div>
              <p className="eyebrow"><span /> NEXT STEP</p>
              <h2>Discuss your generator service needs.</h2>
              <p>Tell us about your business and generator requirements. Our team will follow up about your enquiry.</p>
            </div>
            <Link className="button button-navy" to="/#quote">Request a Callback <ArrowRight size={16} /></Link>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
