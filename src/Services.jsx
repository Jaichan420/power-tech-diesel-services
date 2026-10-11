import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CalendarClock, Check, Droplets, Factory, Fuel, Search, Wrench } from 'lucide-react'
import { Footer, Navbar } from './App.jsx'
import { detailedServices, serviceIndustries } from './config/business.js'

const serviceIcons = { Droplets, CalendarClock, Wrench, Search }
const industryIcons = [Fuel, Factory, CalendarClock, Search, Wrench]

function ServiceCard({ service, index }) {
  const Icon = serviceIcons[service.icon]
  return (
    <article className="detail-service-card">
      <div className="detail-service-top">
        <span className="detail-service-icon"><Icon size={24} strokeWidth={1.8} /></span>
        <span className="detail-service-number">0{index + 1}</span>
      </div>
      <h2>{service.title}</h2>
      <p className="detail-service-description">{service.description}</p>
      <ul>{service.items.map(item => <li key={item}><Check size={15} />{item}</li>)}</ul>
      <Link className="button button-navy detail-service-cta" to="/" state={{ quotePreset: { service: service.service } }}>
        Request a Quote <ArrowRight size={16} />
      </Link>
    </article>
  )
}

function IndustryCard({ industry, index }) {
  const Icon = industryIcons[index]
  return (
    <article className="services-industry-card">
      <div className="services-industry-image">
        <img src={industry.image} alt={industry.alt} loading="lazy" />
        <span className="services-industry-icon"><Icon size={19} /></span>
      </div>
      <div className="services-industry-copy"><h3>{industry.title}</h3><p>{industry.description}</p></div>
    </article>
  )
}

export default function Services() {
  return (
    <>
      <Navbar />
      <main className="services-page">
        <section className="services-page-hero" id="services">
          <div className="wrap services-page-hero-inner">
            <div className="services-page-heading">
              <p className="eyebrow"><span /> GENERATOR CARE · CHENNAI</p>
              <h1>Generator Services<br /><span>You Can Rely On</span></h1>
              <p className="services-page-subtitle">Professional generator servicing and maintenance solutions for businesses in Chennai.</p>
              <Link className="button button-navy services-back-button" to="/"><ArrowLeft size={16} /> Back to Home</Link>
            </div>
            <div className="services-page-visual">
              <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1050&q=85" alt="Technician checking industrial equipment" fetchpriority="high" />
              <span className="services-visual-caption">GENERATOR SERVICE & MAINTENANCE</span>
            </div>
          </div>
        </section>

        <section className="detail-services-section section-pad" aria-labelledby="service-cards-title">
          <div className="wrap">
            <div className="section-heading">
              <p className="eyebrow"><span /> SERVICE OPTIONS</p>
              <h2 id="service-cards-title">Find the right support<br />for your generator.</h2>
              <p className="section-description">Choose a service to start an enquiry. The scope can be discussed around your generator and facility requirements.</p>
            </div>
            <div className="detail-service-grid">
              {detailedServices.map((service, index) => <ServiceCard key={service.service} service={service} index={index} />)}
            </div>
          </div>
        </section>

        <section className="services-industries-section section-pad" id="industries">
          <div className="wrap">
            <div className="section-heading">
              <p className="eyebrow"><span /> INDUSTRIES WE SERVE</p>
              <h2>Generator support for<br />different business settings.</h2>
              <p className="section-description">Maintenance planning starts with understanding how your facility uses its generator.</p>
            </div>
            <div className="services-industries-grid">
              {serviceIndustries.map((industry, index) => <IndustryCard key={industry.title} industry={industry} index={index} />)}
            </div>
          </div>
        </section>

        <section className="services-page-cta">
          <div className="wrap services-page-cta-inner">
            <div><p className="eyebrow"><span /> NEXT STEP</p><h2>Discuss your generator requirements.</h2><p>Share your service needs and business location through the quote form.</p></div>
            <Link className="button button-navy" to="/#quote">Request a Quote <ArrowRight size={16} /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}