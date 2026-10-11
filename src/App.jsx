import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  ArrowDownRight,
  ArrowRight,
  CalendarClock,
  Check,
  ChevronDown,
  ClipboardCheck,
  Clock3,
  Droplets,
  FileText,
  Factory,
  Fuel,
  MapPin,
  Menu,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
  Wrench,
  X,
  Zap,
} from 'lucide-react'
import { business, businessTypes, customerGroups, industries, serviceCards, serviceMaterials, serviceOptions } from './config/business.js'

const iconMap = { Droplets, CalendarClock, Wrench }
const navLinks = [
  ['Home', 'home'],
  ['About Us', 'about'],
  ['Services', 'services'],
  ['Industries We Serve', 'industries'],
  ['Our Services', 'work'],
  ['Contact Us', 'contact'],
]

function jumpToQuote(preset = {}) {
  window.dispatchEvent(new CustomEvent('quote-preset', { detail: preset }))
  document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })
}

function QuoteAction({ children = 'Enquire on WhatsApp', preset, className = '' }) {
  return (
    <button className={className} type="button" onClick={() => jumpToQuote(preset)}>
      {children}
    </button>
  )
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const location = useLocation()

  useEffect(() => {
    const sectionIds = location.pathname === '/services'
      ? ['services', 'industries']
      : location.pathname === '/'
        ? navLinks.filter(([, id]) => id !== 'services').map(([, id]) => id)
        : []

    if (!sectionIds.length) {
      setActiveSection('')
      return undefined
    }

    setActiveSection(sectionIds[0])
    const sections = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean)
    const observer = new IntersectionObserver(entries => {
      const activeEntry = entries
        .filter(entry => entry.isIntersecting)
        .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0]
      if (activeEntry) setActiveSection(activeEntry.target.id)
    }, { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.1, 0.35] })

    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [location.pathname])

  return (
    <header className="site-header">
      <nav className="navbar wrap" aria-label="Main navigation">
        <Link className="brand" to={location.pathname === '/' ? '#home' : '/#home'} onClick={() => setMenuOpen(false)} aria-label={`${business.name}, home`}>
          <span className="brand-symbol" aria-hidden="true"><Zap size={19} strokeWidth={2.5} /></span>
          <span className="brand-copy"><strong>POWER TECH</strong><small>DIESEL SERVICES</small></span>
        </Link>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <div className={`nav-links${menuOpen ? ' is-open' : ''}`}>
          {navLinks.map(([label, id]) => <NavigationLink key={id} id={id} label={label} active={activeSection === id} onClick={() => setMenuOpen(false)} />)}
          <Link className="button button-small button-navy" to="/#quote" onClick={() => setMenuOpen(false)}>Get a Quote <ArrowRight size={15} /></Link>
        </div>
      </nav>
    </header>
  )
}

function NavigationLink({ id, label, active, onClick }) {
  const location = useLocation()
  const className = active ? 'nav-link is-active' : 'nav-link'
  const current = active ? (id === 'services' ? 'page' : 'location') : undefined

  if (id === 'services') {
    return <Link className={className} to="/services" aria-current={current} onClick={onClick}>{label}</Link>
  }

  if (location.pathname === '/' || (location.pathname === '/services' && id === 'industries')) {
    return <a className={className} href={`#${id}`} aria-current={current} onClick={onClick}>{label}</a>
  }

  return <Link className={className} to={`/#${id}`} aria-current={current} onClick={onClick}>{label}</Link>
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-grid wrap">
        <div className="hero-copy reveal">
          <p className="eyebrow"><span /> GENERATOR CARE FOR CHENNAI BUSINESSES</p>
          <h1>Reliable Power.<br /><span>Professional Generator Maintenance.</span></h1>
          <p className="hero-description">Generator oil servicing, Annual Maintenance Contracts, and planned maintenance for businesses across Chennai.</p>
          <div className="hero-actions">
            <QuoteAction className="button button-navy" preset={{}}>Request a Quote <ArrowRight size={17} /></QuoteAction>
            <Link className="button button-outline" to="/services">Explore Our Services <ArrowRight size={17} /></Link>
          </div>
          <div className="hero-note"><MapPin size={15} /><span>Chennai, Tamil Nadu</span><span className="note-divider" /><span>Oil servicing · AMC · Maintenance</span></div>
        </div>
        <div className="hero-visual reveal">
          <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1300&q=88" alt="Industrial technician carrying out equipment checks" fetchpriority="high" />
          <div className="hero-image-shade" />
          <div className="image-caption"><span className="caption-icon"><Wrench size={18} /></span><span><strong>Planned generator care</strong><small>Service built around your requirements</small></span><ArrowDownRight className="caption-arrow" size={20} /></div>
          <span className="hero-index">01 <i /> POWER SUPPORT</span>
        </div>
        <div className="hero-side-label">POWERING BUSINESS CONTINUITY</div>
      </div>
      <a href="#about" className="scroll-cue" aria-label="Scroll to about us"><ChevronDown size={18} /></a>
    </section>
  )
}

function SectionHeading({ kicker, title, description, light = false }) {
  return <div className={`section-heading reveal${light ? ' heading-light' : ''}`}><p className="eyebrow"><span />{kicker}</p><h2>{title}</h2>{description && <p className="section-description">{description}</p>}</div>
}

function About() {
  return (
    <section className="about section-pad" id="about">
      <div className="wrap about-grid">
        <div className="about-art reveal">
          <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1050&q=85" alt="Professional inspecting machinery in a workshop" loading="lazy" />
          <div className="about-art-label"><span className="label-rule" /><span>GENERATOR SERVICE<br />& MAINTENANCE</span></div>
          <span className="about-art-number">PT / CHN</span>
        </div>
        <div className="about-copy reveal">
          <p className="eyebrow"><span /> ABOUT POWER TECH</p>
          <h2>Trusted Generator Service Since 2014</h2>
          <p>Power Tech Diesel Services has been supporting businesses with generator oil servicing, general generator maintenance, and Annual Maintenance Contracts (AMC) since 2014.</p>
          <p>We work with facility owners and operators to discuss generator care needs based on service requirements, operating conditions, and the type of business involved.</p>
          <Link className="text-link" to="/services">Discover our services <ArrowRight size={16} /></Link>
          <div className="about-points"><div><Check size={15} /> Service-focused approach</div><div><Check size={15} /> Chennai-based business</div></div>
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="services section-pad" id="services">
      <div className="wrap">
        <SectionHeading kicker="WHAT WE DO" title={<>Generator services for<br />the work that matters.</>} description="Choose a service to discuss your generator's requirements with our team." />
        <div className="service-grid">
          {serviceCards.map((service, index) => {
            const Icon = iconMap[service.icon]
            return <article className="service-card reveal" key={service.title}>
              <div className="service-card-top"><span className="service-icon"><Icon size={23} strokeWidth={1.8} /></span><span className="card-index">0{index + 1}</span></div>
              <h3>{service.title}</h3><p className="service-description">{service.description}</p>
              <ul>{service.items.map(item => <li key={item}><Check size={15} />{item}</li>)}</ul>
              <QuoteAction className="service-link" preset={{ service: service.service }}>Enquire Now <ArrowRight size={16} /></QuoteAction>
            </article>
          })}
        </div>
        <p className="service-disclaimer">Service scope is confirmed after understanding your generator and facility requirements.</p>
      </div>
    </section>
  )
}

function Industries() {
  const icons = [Fuel, Factory, CalendarClock]
  return (
    <section className="industries section-pad" id="industries">
      <div className="wrap">
        <SectionHeading kicker="INDUSTRIES WE SERVE" title={<>Different facilities.<br />A shared need for reliable backup.</>} description="We work with businesses that depend on generators as part of their facility planning." />
        <div className="industry-grid">
          {industries.map((industry, index) => {
            const Icon = icons[index]
            return <article className="industry-card reveal" key={industry.title}>
              <div className="industry-image"><img src={industry.image} alt={industry.alt} loading="lazy" /><span className="industry-count">0{index + 1}</span><span className="industry-icon"><Icon size={20} /></span></div>
              <div className="industry-content"><h3>{industry.title}</h3><p>{industry.description}</p><QuoteAction className="text-link" preset={{ businessType: industry.type }}>{'WhatsApp enquiry'} <ArrowRight size={15} /></QuoteAction></div>
            </article>
          })}
        </div>
      </div>
    </section>
  )
}

function ServiceProcess() {
  const steps = [
    { title: 'Enquiry', description: 'Share your business and generator service needs.', icon: MessageCircle },
    { title: 'Requirement Assessment', description: 'Discuss the generator, capacity, and facility requirements.', icon: ClipboardCheck },
    { title: 'Quotation', description: 'Review the service scope and quotation for your needs.', icon: FileText },
    { title: 'Service Scheduling', description: 'Coordinate a suitable schedule for the agreed service.', icon: CalendarClock },
    { title: 'Maintenance Follow-up', description: 'Discuss follow-up needs and future maintenance planning.', icon: Wrench },
  ]

  return (
    <section className="process section-pad" id="process">
      <div className="wrap">
        <SectionHeading kicker="HOW WE WORK" title={<>Clear steps from enquiry<br />to service follow-up.</>} description="A straightforward process to understand your generator and plan the next step." />
        <ol className="process-grid">
          {steps.map(({ title, description, icon: Icon }, index) => (
            <li className="process-step reveal" key={title}>
              <span className="process-index">0{index + 1}</span>
              <span className="process-icon"><Icon size={20} strokeWidth={1.8} /></span>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function WhyChooseUs() {
  const points = [
    { icon: ShieldCheck, title: 'Service-focused approach', text: 'Discuss your generator service requirement before planning the next step.' },
    { icon: CalendarClock, title: 'Maintenance planning', text: 'Plan recurring maintenance around your facility and operating needs.' },
    { icon: Wrench, title: 'Tailored to your generator', text: 'Service discussions start with your generator and its requirements.' },
    { icon: MessageCircle, title: 'Enquiry & quotation support', text: 'Share your details and service needs for a follow-up discussion.' },
  ]
  return (
    <section className="why section-pad">
      <div className="wrap why-grid">
        <div className="why-intro reveal"><p className="eyebrow eyebrow-light"><span /> THE POWER TECH APPROACH</p><h2>Thoughtful service.<br />Clear next steps.</h2><p>Generator support should begin with a clear understanding of the equipment and the facility it serves.</p><QuoteAction className="button button-light" preset={{}}>Talk to our team <ArrowRight size={16} /></QuoteAction></div>
        <div className="why-list">{points.map(({ icon: Icon, title, text }, index) => <div className="why-item reveal" key={title}><span className="why-number">0{index + 1}</span><span className="why-icon"><Icon size={20} /></span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div>
      </div>
    </section>
  )
}

function WorkGallery() {
  const workItems = [
    {
      title: 'Oil Servicing',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=82',
      alt: 'Generator oil servicing technician checking engine components',
      points: [
        'Generator engine oil servicing and oil replacement.',
        'Oil filter inspection and replacement where required.',
        'Routine checks during oil servicing.',
      ],
      buttonLabel: 'Request a Quote',
      service: 'Generator Oil Servicing',
    },
    {
      title: 'General Service',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=900&q=82',
      alt: 'Technician performing general generator inspection and maintenance',
      points: [
        'General generator inspection and maintenance.',
        'Checking visible leaks, unusual noise, and operating condition.',
        'Inspection of relevant generator components.',
      ],
      buttonLabel: 'Request a Quote',
      service: 'General Service',
    },
    {
      title: 'Annual Maintenance Contract (AMC)',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=82',
      alt: 'Generator maintenance contract technician reviewing service schedule',
      points: [
        'Scheduled preventive maintenance according to the agreed contract.',
        'Planned servicing and maintenance follow-ups.',
        'Monitoring generator condition and identifying maintenance requirements.',
      ],
      buttonLabel: 'Request a Quote',
      service: 'Annual Maintenance Contract (AMC)',
    },
  ]

  return (
    <section className="work section-pad" id="work">
      <div className="wrap">
        <SectionHeading kicker="GENERATOR SERVICES" title={<>Our Services</>} description="Professional generator servicing and maintenance support for businesses in Chennai." />
        <div className="service-showcase-grid">
          {workItems.map(({ title, image, alt, points, buttonLabel, service }) => (
            <article className="service-showcase-card reveal" key={title}>
              <div className="service-showcase-image">
                <img src={image} alt={alt} loading="lazy" />
              </div>
              <div className="service-showcase-body">
                <h3>{title}</h3>
                <ul>
                  {points.map(point => <li key={point}><Check size={15} />{point}</li>)}
                </ul>
                <QuoteAction className="button button-navy service-showcase-button" preset={{ service }}>
                  {buttonLabel} <ArrowRight size={16} />
                </QuoteAction>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function CustomerSection() {
  return (
    <section className="customers section-pad" id="customers">
      <div className="wrap">
        <SectionHeading kicker="OUR CUSTOMERS" title={<>Our Valued Customers</>} description="Customer names, logos, and site images can be updated in one data file. Placeholder images remain until real, approved customer material is uploaded." />
        <div className="customer-groups">
          {customerGroups.map(group => (
            <div className="customer-group reveal" key={group.category}>
              <h3>{group.category}</h3>
              <div className="customer-grid">
                {group.customers.map(customer => (
                  <article className="customer-card" key={`${group.category}-${customer.name}`}>
                    <div className="customer-logo-wrap">
                      {customer.logo && !customer.showNameOnly ? (
                        <img src={customer.logo} alt={`${customer.name} logo`} loading="lazy" />
                      ) : (
                        <div className="customer-name-only">{customer.name}</div>
                      )}
                    </div>
                    <div className="customer-site-photo">
                      {customer.sitePhoto ? (
                        <img src={customer.sitePhoto} alt={customer.alt} loading="lazy" />
                      ) : (
                        <span>Site photo placeholder</span>
                      )}
                    </div>
                    <div className="customer-card-meta">
                      <strong>{customer.name}</strong>
                      <small>{customer.permissionNote || 'Published only with permission.'}</small>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function MaterialsSection() {
  return (
    <section className="materials section-pad" id="materials">
      <div className="wrap">
        <SectionHeading kicker="MATERIALS USED" title={<>Materials Used in Generator Servicing</>} description="Update this list with the real products, brands, and specifications used by your team during generator servicing and maintenance." />
        <div className="materials-grid">
          {serviceMaterials.map(material => (
            <article className="material-card reveal" key={material.name}>
              <div className="material-image">
                <img src={material.image} alt={material.alt} loading="lazy" />
              </div>
              <div className="material-body">
                <h3>{material.name}</h3>
                <p>{material.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const initialForm = { name: '', company: '', phone: '', businessType: '', capacity: '', service: '', location: '', requirements: '' }

function QuoteForm() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')
  const location = useLocation()

  useEffect(() => {
    const applyPreset = (event) => {
      setForm(current => ({ ...current, ...event.detail }))
      setStatus('')
    }
    window.addEventListener('quote-preset', applyPreset)
    return () => window.removeEventListener('quote-preset', applyPreset)
  }, [])

  useEffect(() => {
    const preset = location.state?.quotePreset
    if (!preset) return
    setForm(current => ({ ...current, ...preset }))
    setStatus('')
    requestAnimationFrame(() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' }))
  }, [location.key, location.state])

  const update = (event) => {
    setForm(current => ({ ...current, [event.target.name]: event.target.value }))
    setErrors(current => ({ ...current, [event.target.name]: '' }))
    setStatus('')
  }

  const submit = (event) => {
    event.preventDefault()
    const required = ['name', 'phone', 'businessType', 'service', 'location']
    const nextErrors = {}
    required.forEach(key => {
      if (!form[key].trim()) nextErrors[key] = 'Please complete this field.'
    })
    if (form.phone.trim() && !/^[+()\d\s-]{7,20}$/.test(form.phone.trim())) {
      nextErrors.phone = 'Enter a valid contact number.'
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      setStatus('Please review the highlighted fields and try again.')
      return
    }
    if (!business.whatsapp.trim()) {
      setStatus('The business WhatsApp number is not configured yet. Please contact the business directly once its contact details have been added.')
      return
    }

    const message = [
      `Hello ${business.name}, I would like to enquire about generator service.`,
      '',
      `Customer name: ${form.name}`,
      `Company / business: ${form.company || 'Not provided'}`,
      `Contact number: ${form.phone}`,
      `Business type: ${form.businessType}`,
      `Generator capacity: ${form.capacity ? `${form.capacity} kVA` : 'Not provided'}`,
      `Service required: ${form.service}`,
      `Business location: ${form.location}`,
      `Additional requirements: ${form.requirements || 'None provided'}`,
    ].join('\n')
    const waNumber = business.whatsapp.replace(/\D/g, '')
    if (!waNumber) {
      setStatus('The configured WhatsApp number is invalid. Please update it in src/config/business.js.')
      return
    }
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
    setStatus('WhatsApp has opened with your enquiry. Review the message and press Send in WhatsApp to complete it.')
  }

  return (
    <section className="quote section-pad" id="quote">
      <div className="wrap quote-grid">
        <div className="quote-aside reveal"><p className="eyebrow eyebrow-light"><span /> REQUEST A QUOTE</p><h2>Tell us what your generator needs.</h2><p>Share a few details about your business and service requirement. We’ll prepare an enquiry for you to review in WhatsApp.</p><div className="quote-step"><span>01</span><div><strong>Share your requirements</strong><small>Tell us about your business and generator.</small></div></div><div className="quote-step"><span>02</span><div><strong>Review in WhatsApp</strong><small>Your message opens for you to review and send.</small></div></div><div className="quote-aside-contact"><MapPin size={16} /><span>{business.serviceArea}</span></div></div>
        <div className="quote-form-wrap reveal"><form className="quote-form" onSubmit={submit} noValidate>
          <div className="form-heading"><div><span className="form-kicker">SERVICE ENQUIRY</span><h3>Request a quote</h3></div><span className="form-required">* Required</span></div>
          <div className="form-grid">
            <Field label="Customer name" name="name" value={form.name} onChange={update} error={errors.name} required placeholder="Your name" />
            <Field label="Company or business name" name="company" value={form.company} onChange={update} placeholder="Business name" />
            <Field label="WhatsApp / contact number" name="phone" type="tel" value={form.phone} onChange={update} error={errors.phone} required placeholder="Your contact number" />
            <SelectField label="Business type" name="businessType" value={form.businessType} onChange={update} error={errors.businessType} required options={businessTypes} />
            <Field label="Generator capacity (kVA)" name="capacity" type="number" min="1" value={form.capacity} onChange={update} placeholder="e.g. 125" />
            <SelectField label="Service required" name="service" value={form.service} onChange={update} error={errors.service} required options={serviceOptions} />
            <Field label="Business location" name="location" value={form.location} onChange={update} error={errors.location} required placeholder="Area / locality in Chennai" />
            <label className="field field-wide"><span>Additional requirements</span><textarea name="requirements" value={form.requirements} onChange={update} rows="3" placeholder="Anything else we should know?" /></label>
          </div>
          {status && <p className={`form-status${Object.keys(errors).length ? ' status-error' : ''}`} role="status">{status}</p>}
          <button className="button button-navy submit-button" type="submit">Prepare WhatsApp Enquiry <MessageCircle size={17} /></button>
          <p className="form-disclaimer">Your enquiry is not sent automatically. WhatsApp will open so you can review and send the message.</p>
        </form></div>
      </div>
    </section>
  )
}

function Field({ label, name, value, onChange, error, required = false, ...props }) {
  const id = `field-${name}`
  return <label className={`field${error ? ' has-error' : ''}`} htmlFor={id}><span>{label}{required && <b aria-hidden="true"> *</b>}</span><input id={id} name={name} value={value} onChange={onChange} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} required={required} {...props} />{error && <small id={`${id}-error`}>{error}</small>}</label>
}

function SelectField({ label, name, value, onChange, error, required = false, options }) {
  const id = `field-${name}`
  return <label className={`field${error ? ' has-error' : ''}`} htmlFor={id}><span>{label}{required && <b aria-hidden="true"> *</b>}</span><select id={id} name={name} value={value} onChange={onChange} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} required={required}><option value="">Select an option</option>{options.map(option => <option key={option} value={option}>{option}</option>)}</select>{error && <small id={`${id}-error`}>{error}</small>}</label>
}

function Contact() {
  return (
    <section className="contact section-pad" id="contact">
      <div className="wrap contact-grid">
        <div className="contact-copy reveal"><p className="eyebrow"><span /> CONTACT</p><h2>Let’s discuss your generator service needs.</h2><p>Reach out with your business and service requirements to start a conversation.</p><QuoteAction className="button button-navy" preset={{}}>Make an enquiry <ArrowRight size={16} /></QuoteAction></div>
        <div className="contact-details reveal">
          <div className="contact-detail"><span className="detail-icon"><MapPin size={19} /></span><div><small>SERVICE AREA</small><strong>{business.serviceArea}</strong></div></div>
          <div className="contact-detail"><span className="detail-icon"><MessageCircle size={19} /></span><div><small>WHATSAPP</small><strong>{business.whatsapp || 'Add WhatsApp number in configuration'}</strong></div></div>
          <div className="contact-detail"><span className="detail-icon"><Phone size={19} /></span><div><small>BUSINESS PHONE</small><strong>{business.phone || 'Add business phone in configuration'}</strong></div></div>
          <div className="contact-detail"><span className="detail-icon"><Mail size={19} /></span><div><small>EMAIL ADDRESS</small><strong>{business.email || 'Add business email in configuration'}</strong></div></div>
          <div className="contact-detail"><span className="detail-icon"><MapPin size={19} /></span><div><small>BUSINESS ADDRESS</small><strong>{business.address || 'Add business address in configuration'}</strong></div></div>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-main">
        <div className="footer-identity">
          <Link className="brand footer-brand" to="/#home"><span className="brand-symbol"><Zap size={19} strokeWidth={2.5} /></span><span className="brand-copy"><strong>POWER TECH</strong><small>DIESEL SERVICES</small></span></Link>
          <p>Generator oil servicing, planned maintenance, and AMC solutions in Chennai.</p>
          <span className="footer-contact">{business.phone || 'Phone: add in business configuration'}</span>
          <span className="footer-contact">{business.whatsapp || 'WhatsApp: add in business configuration'}</span>
          <span className="footer-contact">{business.email || 'Email: add in business configuration'}</span>
          <span className="footer-contact">{business.address || 'Address: add in business configuration'}</span>
        </div>
        <div className="footer-group"><strong>Services</strong><Link to="/services">Generator Oil Servicing</Link><Link to="/services">Annual Maintenance Contract</Link><Link to="/services">Preventive Maintenance</Link><Link to="/services">Generator Inspection</Link></div>
        <div className="footer-group"><strong>Industries served</strong><a href="#industries">Petrol Bunks</a><a href="#industries">Industries &amp; Factories</a><a href="#industries">Marriage Halls</a></div>
        <div className="footer-group footer-quick"><strong>Quick navigation</strong>{navLinks.map(([label, id]) => <NavigationLink key={id} id={id} label={label} active={false} />)}<Link className="footer-quote" to="/#quote">Request a quote <ArrowRight size={15} /></Link></div>
      </div>
      <div className="wrap footer-bottom"><span>© {new Date().getFullYear()} {business.name}</span><span>{business.city}</span><Link to="/#home">Back to top ↑</Link></div>
    </footer>
  )
}

function FinalCallToAction() {
  return (
    <section className="final-cta">
      <div className="wrap final-cta-inner">
        <div><p className="eyebrow eyebrow-light"><span /> POWER TECH DIESEL SERVICES · CHENNAI</p><h2>Plan your generator’s next service.</h2><p>Tell us about your facility and generator. We’ll help you start the right service conversation.</p></div>
        <QuoteAction className="button button-light" preset={{}}>Request a Quote <ArrowRight size={16} /></QuoteAction>
      </div>
    </section>
  )
}

function WhatsAppButton() {
  return (
    <QuoteAction className="floating-whatsapp" preset={{}}>
      <MessageCircle size={22} />
      <span>Enquire on WhatsApp</span>
    </QuoteAction>
  )
}

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return <><Navbar /><main><Hero /><About /><Services /><Industries /><ServiceProcess /><WhyChooseUs /><WorkGallery /><CustomerSection /><MaterialsSection /><QuoteForm /><Contact /><FinalCallToAction /></main><Footer /><WhatsAppButton /></>
}