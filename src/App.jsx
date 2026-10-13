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
  Package,
  PanelTop,
  Phone,
  Search,
  ShieldCheck,
  Volume2,
  Wrench,
  X,
} from 'lucide-react'
import { apiBaseUrl, business, businessTypes, engineBrands, generatorBrands, industries, serviceCards, serviceMaterials, serviceOptions, whatsappInternationalNumber } from './config/business.js'
import { CustomerPreview } from './CustomerDirectory.jsx'

const iconMap = { Droplets, CalendarClock, Wrench, Search, Factory, Volume2, PanelTop, Package }
const navLinks = [
  ['Home', 'home'],
  ['About Us', 'about'],
  ['Services', 'services'],
  ['Industries We Serve', 'industries'],
  ['Our Customers', 'customers'],
  ['Our Services', 'work'],
  ['Contact Us', 'contact'],
]

function jumpToQuote(preset = {}) {
  window.dispatchEvent(new CustomEvent('quote-preset', { detail: preset }))
  document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })
}

function buildWhatsAppUrl(message) {
  return `https://wa.me/${whatsappInternationalNumber}?text=${encodeURIComponent(message)}`
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
      setActiveSection(location.pathname === '/customers' ? 'customers' : '')
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
          <img className="brand-symbol" src="/ptds-logo.png" alt="" aria-hidden="true" />
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

  if (id === 'customers') {
    return <Link className={className} to="/customers" aria-current={current} onClick={onClick}>{label}</Link>
  }

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
            <QuoteAction className="button button-navy" preset={{}}>Request a Callback <ArrowRight size={17} /></QuoteAction>
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
          <p>Operating since 2014, Power Tech Diesel Services specializes in servicing and maintaining heavy-duty diesel generator sets for businesses and industries.</p>
          <p>Our experience includes generator maintenance and troubleshooting, engine repairs and overhauling, and spare parts support. We discuss each requirement around the generator model and the customer’s needs.</p>
          <Link className="text-link" to="/services">Discover our services <ArrowRight size={16} /></Link>
          <div className="about-points"><div><Check size={15} /> Generator maintenance & troubleshooting</div><div><Check size={15} /> Engine repairs & spare parts support</div></div>
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="services section-pad" id="services">
      <div className="wrap">
        <SectionHeading kicker="WHAT WE DO" title={<>Generator services for<br />the work that matters.</>} description="From routine maintenance to repairs and parts support, choose a service to discuss your generator’s requirements." />
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

const engineImageByBrand = {
  Cummins: '/engines/cummins.webp',
  'Ashok Leyland': '/engines/ashok-leyland.jpg',
  Kirloskar: '/engines/kirloskar.webp',
  Ruston: '/engines/ruston.avif',
  MWM: '/engines/MWM-TCG-2032.webp',
}

function BrandsSection() {
  return (
    <section className="brands-section section-pad" id="generator-brands">
      <div className="wrap">
        <SectionHeading
          kicker="ENGINE EXPERIENCE"
          title="Our Engine Experience"
          description="Experience Across Leading Diesel Generator Brands"
        />
        <div className="brand-grid">
          {engineBrands.map((brand, index) => (
            <article className="brand-card reveal" key={brand}>
              <div className="brand-card-image">
                <img
                  src={engineImageByBrand[brand]}
                  alt={`${brand} diesel generator engine`}
                  loading="lazy"
                />
              </div>
              <div className="brand-card-content">
                <span className="brand-card-index">0{index + 1}</span>
                <h3 className="brand-card-name">{brand}</h3>
                <span className="brand-card-caption">Diesel generator engines</span>
              </div>
            </article>
          ))}
        </div>
        <p className="brand-section-disclaimer">Brand names are shown for service reference only. No manufacturer authorization or affiliation is implied.</p>
      </div>
    </section>
  )
}

function Industries() {
  const icons = [Fuel, Factory, CalendarClock, ShieldCheck, Wrench]
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
      title: 'Generator Maintenance',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=82',
      alt: 'Technician checking generator engine components',
      points: [
        'Routine inspection and maintenance.',
        'Oil changes and filter replacement.',
        'Maintenance planned around the generator model.',
      ],
      buttonLabel: 'Request a Callback',
      service: 'Diesel Generator Servicing',
    },
    {
      title: 'Troubleshooting & Engine Repairs',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=900&q=82',
      alt: 'Technician inspecting industrial equipment',
      points: [
        'Troubleshooting generator and engine problems.',
        'Engine repair and overhauling support.',
        'Requirements assessed for the specific generator.',
      ],
      buttonLabel: 'Request a Callback',
      service: 'Generator Repairs',
    },
    {
      title: 'Spare Parts Support',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=82',
      alt: 'Maintenance materials and equipment',
      points: [
        'Support for applicable generator engine spare parts.',
        'Engine oil, filters, and coolant where applicable.',
        'Availability and compatibility depend on generator model.',
      ],
      buttonLabel: 'Request a Callback',
      service: 'Genuine & Imported Spare Parts',
    },
  ]

  return (
    <section className="work section-pad" id="work">
      <div className="wrap">
        <SectionHeading kicker="SERVICE EXPERTISE" title={<>Our Generator Service Approach</>} description="From planned maintenance to troubleshooting and spare parts support, discuss your generator requirements with our team." />
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
        <SectionHeading kicker="OUR CUSTOMERS" title={<>Our Valued Customers</>} description="Since 2014, Power Tech Diesel Services has served customers across multiple industries. Organization names are shown only after approval for public display." />
        <CustomerPreview />
        <div className="customer-preview-action reveal">
          <Link className="button button-navy" to="/customers">View All Customers <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
  )
}

function MaterialsSection() {
  return (
    <section className="materials section-pad" id="materials">
      <div className="wrap">
        <SectionHeading kicker="PARTS & MATERIALS" title={<>Diesel Generator Spare Parts &amp;<br />Maintenance Materials</>} description="Support includes engine oil, filters, coolant where applicable, and generator engine spare parts." />
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
        <p className="materials-disclaimer">Spare parts availability and compatibility depend on the generator model.</p>
      </div>
    </section>
  )
}

const initialForm = { name: '', company: '', phone: '', businessType: '', capacity: '', generatorBrand: '', service: '', location: '', requirements: '' }

function QuoteForm() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')
  const [statusType, setStatusType] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const applyPreset = (event) => {
      setForm(current => ({ ...current, ...event.detail }))
      setStatus('')
      setStatusType('')
    }
    window.addEventListener('quote-preset', applyPreset)
    return () => window.removeEventListener('quote-preset', applyPreset)
  }, [])

  useEffect(() => {
    const preset = location.state?.quotePreset
    if (!preset) return
    setForm(current => ({ ...current, ...preset }))
    setStatus('')
    setStatusType('')
    requestAnimationFrame(() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' }))
  }, [location.key, location.state])

  const update = (event) => {
    setForm(current => ({ ...current, [event.target.name]: event.target.value }))
    setErrors(current => ({ ...current, [event.target.name]: '' }))
    setStatus('')
    setStatusType('')
  }

  const whatsappMessage = [
    `Hello ${business.name},`,
    '',
    'I would like to request a callback about generator service.',
    '',
    `Customer name: ${form.name || 'Not provided'}`,
    ...(form.company.trim() ? [`Business name: ${form.company.trim()}`] : []),
    `Contact number: ${form.phone || 'Not provided'}`,
    `Business type: ${form.businessType || 'Not provided'}`,
    `Generator capacity: ${form.capacity ? `${form.capacity} kVA` : 'Not provided'}`,
    `Generator brand: ${form.generatorBrand || 'Not sure / not provided'}`,
    `Service required: ${form.service || 'Not provided'}`,
    `Business location: ${form.location || 'Not provided'}`,
    ...(form.requirements.trim() ? ['', `Additional message: ${form.requirements.trim()}`] : []),
  ].join('\n')
  const whatsappUrl = buildWhatsAppUrl(whatsappMessage)

  const submit = async (event) => {
    event.preventDefault()
    if (isSubmitting) return
    const required = ['name', 'phone', 'businessType', 'service', 'location']
    const nextErrors = {}
    required.forEach(key => {
      if (!form[key].trim()) nextErrors[key] = 'Please complete this field.'
    })
    if (form.phone.trim() && (!/^[+()\d\s-]{7,20}$/.test(form.phone.trim()) || (form.phone.match(/\d/g) || []).length < 7)) {
      nextErrors.phone = 'Enter a valid contact number.'
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      setStatus('Please review the highlighted fields and try again.')
      setStatusType('error')
      return
    }

    setIsSubmitting(true)
    setStatus('Submitting your enquiry...')
    setStatusType('loading')
    try {
      const response = await fetch(`${apiBaseUrl}/api/enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          businessType: form.businessType,
          service: form.service,
          location: form.location.trim(),
          company: form.company.trim(),
          capacity: form.capacity.trim(),
          generatorBrand: form.generatorBrand,
          message: form.requirements.trim(),
        }),
      })
      let result
      try {
        result = await response.json()
      } catch {
        throw new Error('The backend returned an invalid response.')
      }
      if (!response.ok || result?.ok !== true) {
        throw new Error(result?.message || `The server rejected the enquiry (HTTP ${response.status}).`)
      }
      setStatus('Enquiry submitted successfully. Power Tech Diesel Services may contact you about your request.')
      setStatusType('success')
    } catch (error) {
      const reason = error instanceof Error ? error.message : 'An unexpected error occurred.'
      setStatus(`Could not submit your enquiry: ${reason} Please check that the local backend is running at ${apiBaseUrl} and try again.`)
      setStatusType('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="quote section-pad" id="quote">
      <div className="wrap quote-grid">
        <div className="quote-aside reveal"><p className="eyebrow eyebrow-light"><span /> REQUEST A CALLBACK</p><h2>Tell us what your generator needs.</h2><p>Share a few details about your business and service requirement. We’ll contact you about your enquiry.</p><div className="quote-step"><span>01</span><div><strong>Share your requirements</strong><small>Tell us about your business and generator.</small></div></div><div className="quote-step"><span>02</span><div><strong>We’ll contact you</strong><small>Power Tech Diesel Services will follow up about your enquiry.</small></div></div><div className="quote-aside-contact"><MapPin size={16} /><span>{business.serviceArea}</span></div></div>
        <div className="quote-form-wrap reveal"><form className="quote-form" onSubmit={submit} noValidate>
          <div className="form-heading"><div><span className="form-kicker">SERVICE ENQUIRY</span><h3>Request a Callback</h3></div><span className="form-required">* Required</span></div>
          <div className="form-grid">
            <Field label="Customer name" name="name" value={form.name} onChange={update} error={errors.name} required maxLength="100" placeholder="Your name" />
            <Field label="Company or business name" name="company" value={form.company} onChange={update} maxLength="150" placeholder="Business name" />
            <Field label="WhatsApp / contact number" name="phone" type="tel" value={form.phone} onChange={update} error={errors.phone} required maxLength="20" placeholder="Your contact number" />
            <SelectField label="Business type" name="businessType" value={form.businessType} onChange={update} error={errors.businessType} required options={businessTypes} />
            <Field label="Generator capacity (kVA)" name="capacity" type="number" min="1" value={form.capacity} onChange={update} maxLength="50" placeholder="e.g. 125" />
            <SelectField label="Generator brand (optional)" name="generatorBrand" value={form.generatorBrand} onChange={update} options={generatorBrands} />
            <SelectField label="Service required" name="service" value={form.service} onChange={update} error={errors.service} required options={serviceOptions} />
            <Field label="Business location" name="location" value={form.location} onChange={update} error={errors.location} required maxLength="150" placeholder="Area / locality in Chennai" />
            <label className="field field-wide"><span>Optional message</span><textarea name="requirements" value={form.requirements} onChange={update} maxLength="2000" rows="3" placeholder="Anything else we should know?" /></label>
          </div>
          {status && <p className={`form-status${statusType === 'error' ? ' status-error' : ''}`} role={statusType === 'error' ? 'alert' : 'status'} aria-live={statusType === 'error' ? 'assertive' : 'polite'}>{status}</p>}
          <button className="button button-navy submit-button" type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>{isSubmitting ? 'Submitting Request…' : 'Request a Callback'} <MessageCircle size={17} /></button>
          <a className="button button-whatsapp submit-button" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Enquire on WhatsApp <MessageCircle size={17} /></a>
          <p className="form-disclaimer">By submitting this form, you allow Power Tech Diesel Services to contact you about your enquiry using the details provided. WhatsApp opens a draft for you to review and send yourself.</p>
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
          <Link className="brand footer-brand" to="/#home" aria-label={`${business.name}, home`}><img className="brand-symbol" src="/ptds-logo.png" alt="" aria-hidden="true" /><span className="brand-copy"><strong>POWER TECH</strong><small>DIESEL SERVICES</small></span></Link>
          <p>Generator oil servicing, planned maintenance, and AMC solutions in Chennai.</p>
          <span className="footer-contact">{business.phone || 'Phone: add in business configuration'}</span>
          <span className="footer-contact">{business.whatsapp || 'WhatsApp: add in business configuration'}</span>
          <span className="footer-contact">{business.email || 'Email: add in business configuration'}</span>
          <span className="footer-contact">{business.address || 'Address: add in business configuration'}</span>
        </div>
        <div className="footer-group"><strong>Services</strong><Link to="/services">Diesel Generator Servicing</Link><Link to="/services">Engine Overhauling</Link><Link to="/services">Annual Maintenance Contracts</Link><Link to="/services">Spare Parts Support</Link></div>
        <div className="footer-group"><strong>Industries served</strong><a href="#industries">Petrol Bunks</a><a href="#industries">Industries &amp; Factories</a><a href="#industries">Marriage Halls</a><a href="#industries">Schools</a><a href="#industries">Hospitals</a></div>
        <div className="footer-group footer-quick"><strong>Quick navigation</strong>{navLinks.map(([label, id]) => <NavigationLink key={id} id={id} label={label} active={false} />)}<Link className="footer-quote" to="/#quote">Request a callback <ArrowRight size={15} /></Link></div>
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
        <QuoteAction className="button button-light" preset={{}}>Request a Callback <ArrowRight size={16} /></QuoteAction>
      </div>
    </section>
  )
}

export function WhatsAppButton() {
  const message = `Hello ${business.name},\n\nI would like to enquire about generator service. Please contact me.\n\nThank you.`
  const href = buildWhatsAppUrl(message)

  return (
    <a className="floating-whatsapp" href={href} target="_blank" rel="noopener noreferrer">
      <MessageCircle size={22} />
      <span>Enquire on WhatsApp</span>
    </a>
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

  return <><Navbar /><main><Hero /><About /><Services /><BrandsSection /><Industries /><ServiceProcess /><WhyChooseUs /><WorkGallery /><CustomerSection /><MaterialsSection /><QuoteForm /><Contact /><FinalCallToAction /></main><Footer /><WhatsAppButton /></>
}