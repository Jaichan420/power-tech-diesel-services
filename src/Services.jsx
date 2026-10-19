import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CalendarClock, Check, Droplets, Factory, Fuel, Package, PanelTop, Search, Volume2, Wrench } from 'lucide-react';
import { Footer, Navbar, WhatsAppButton } from './App.jsx';
import { detailedServices, serviceIndustries } from './config/business.js';
const serviceIcons = {
  Droplets,
  CalendarClock,
  Wrench,
  Search,
  Factory,
  Volume2,
  PanelTop,
  Package
};
const industryIcons = [Fuel, Factory, CalendarClock, Search, Wrench];
function ServiceCard({
  service,
  index
}) {
  const Icon = serviceIcons[service.icon];
  return <article className="detail-service-card">
      <div className="detail-service-top">
        <span className="detail-service-icon"><Icon size={24} strokeWidth={1.8} /></span>
        
      </div>
      <h2>{service.title}</h2>
      <p className="detail-service-description">{service.description}</p>
      <ul>{service.items.map(item => <li key={item}><Check size={15} />{item}</li>)}</ul>
      <Link className="button button-navy detail-service-cta" to="/" state={{
      quotePreset: {
        service: service.service
      }
    }}>
        Request a Callback <ArrowRight size={16} />
      </Link>
    </article>;
}
function IndustryCard({
  industry,
  index
}) {
  const Icon = industryIcons[index];
  return <article className="services-industry-card">
      <div className="services-industry-image">
        <img src={industry.image} alt={industry.alt} loading="lazy" />
        <span className="services-industry-icon"><Icon size={19} /></span>
      </div>
      <div className="services-industry-copy"><h3>{industry.title}</h3><p>{industry.description}</p></div>
    </article>;
}
export default function Services() {
  return <>
      <Navbar />
      <main className="services-page">
        <section className="services-page-hero" id="services">
          <div className="wrap services-page-hero-inner">
            <div className="services-page-heading">
              
              <h1>Generator care.<br />Every detail.</h1>
              <p className="services-page-subtitle">Generator maintenance, troubleshooting, repairs, and spare parts support for businesses in Chennai.</p>
              <Link className="button button-light services-back-button" to="/"><ArrowLeft size={16} /> Back to Home</Link>
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
              
              <h2 id="service-cards-title">Our Services</h2>
              <p className="section-description">Choose a service to request a callback. Scope and availability are discussed around your generator and facility requirements.</p>
            </div>
            <div className="detail-service-grid">
              {detailedServices.map((service, index) => <ServiceCard key={service.service} service={service} index={index} />)}
            </div>
          </div>
        </section>

        <section className="services-industries-section section-pad" id="industries">
          <div className="wrap">
            <div className="section-heading">
              
              <h2>Support for your sector.</h2>
              <p className="section-description">Maintenance planning starts with understanding how your facility uses its generator.</p>
            </div>
            <div className="services-industries-grid">
              {serviceIndustries.map((industry, index) => <IndustryCard key={industry.title} industry={industry} index={index} />)}
            </div>
          </div>
        </section>

        <section className="services-page-cta">
          <div className="wrap services-page-cta-inner">
            <div><h2>Plan your next service.</h2><p>Share your service needs and business location through the callback form.</p></div>
            <Link className="button button-navy" to="/#quote">Request a Callback <ArrowRight size={16} /></Link>
          </div>
        </section>
      </main>
      <Footer /><WhatsAppButton />
    </>;
}

