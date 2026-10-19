import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowDownRight, ArrowRight, CalendarClock, Check, ChevronDown, ClipboardCheck, Clock3, Droplets, FileText, Factory, Fuel, MapPin, Menu, Mail, MessageCircle, Package, PanelTop, Phone, Search, ShieldCheck, Volume2, Wrench, X, Zap } from 'lucide-react';
import { apiBaseUrl, business, businessTypes, customerGroups, engineBrands, generatorBrands, industries, serviceCards, serviceMaterials, serviceOptions } from './config/business.js';
import * as o from 'react/jsx-runtime';
import { CustomerPreview } from './Customers.jsx';
import GeneratorGallery from './GeneratorGallery.jsx';
import GeneratorCarousel from './GeneratorCarousel.jsx';
import './IndustriesFeature.css';
import sectorPhotos from './config/sector-photos.json';
import './SectorGallery.css';
import { submitEnquiry } from './enquiry-guard.js';
const C = React,
  Ie = business,
  Kc = apiBaseUrl,
  qe = useLocation,
  ci = MapPin,
  Jn = MessageCircle,
  Fm = businessTypes,
  Dm = generatorBrands,
  Am = serviceOptions;
const _d = message => 'https://wa.me/91' + business.whatsapp + '?text=' + encodeURIComponent(message);
const iconMap = {
  Droplets,
  CalendarClock,
  Wrench,
  Search,
  Factory,
  Volume2,
  PanelTop,
  Package
};
const navLinks = [['Home', 'home'], ['About Us', 'about'], ['Services', 'services'], ['Industries We Serve', 'industries'], ['Our Customers', 'customers'], ['Gallery', 'gallery'], ['Contact Us', 'contact']];
function jumpToQuote(preset = {}) {
  window.dispatchEvent(new CustomEvent('quote-preset', {
    detail: preset
  }));
  document.getElementById('quote')?.scrollIntoView({
    behavior: 'smooth'
  });
}
function QuoteAction({
  children = 'Enquire on WhatsApp',
  preset,
  className = ''
}) {
  return <button className={className} type="button" onClick={() => jumpToQuote(preset)}>
      {children}
    </button>;
}
export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  useEffect(() => {
    const sectionIds = location.pathname === '/services' ? ['services', 'industries'] : location.pathname === '/' ? navLinks.filter(([, id]) => id !== 'services').map(([, id]) => id) : [];
    if (!sectionIds.length) {
      setActiveSection('');
      return undefined;
    }
    setActiveSection(sectionIds[0]);
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(entries => {
      const activeEntry = entries.filter(entry => entry.isIntersecting).sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
      if (activeEntry) setActiveSection(activeEntry.target.id);
    }, {
      rootMargin: '-20% 0px -65% 0px',
      threshold: [0, 0.1, 0.35]
    });
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [location.pathname]);
  return <header className="site-header">
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
    </header>;
}
function NavigationLink({
  id,
  label,
  active,
  onClick
}) {
  const location = useLocation();
  const className = active ? 'nav-link is-active' : 'nav-link';
  const current = active ? id === 'services' ? 'page' : 'location' : undefined;
  if (id === 'services') {
    return <Link className={className} to="/services" aria-current={current} onClick={onClick}>{label}</Link>;
  }
  if (id === 'customers') {
    return <Link className={className} to="/customers" aria-current={location.pathname === '/customers' ? 'page' : undefined} onClick={onClick}>{label}</Link>;
  }
  if (location.pathname === '/' || location.pathname === '/services' && id === 'industries') {
    return <a className={className} href={`#${id}`} aria-current={current} onClick={onClick}>{label}</a>;
  }
  return <Link className={className} to={`/#${id}`} aria-current={current} onClick={onClick}>{label}</Link>;
}
function Hero() {
  return <section className="hero" id="home"><div className="wrap hero-grid">
    <div className="hero-copy"><h1>Reliable power.<br />Expert engineering.</h1>
      <p className="hero-description">Generator sales, servicing and AMC for Chennai businesses. Power Tech Diesel Services, since 2014.</p>
      <div className="hero-actions"><QuoteAction className="button button-gold">Get a Quote <ArrowRight size={18} /></QuoteAction><a className="button button-light" href={_d('Hello Power Tech Diesel Services, I would like to discuss my generator requirements.')} target="_blank" rel="noopener noreferrer">WhatsApp Us <MessageCircle size={18} /></a></div>
    </div>
    <figure className="hero-visual"><img src="/engines/cummins.webp" alt="Enclosed Cummins diesel generator" fetchpriority="high" width="600" height="600" /><figcaption>Built around your generator. Planned around your business.</figcaption></figure>
    <div className="hero-base"><p>Chennai, Tamil Nadu</p><p>Sales · Service · Repair · Installation · AMC</p><a href="#about">Discover Power Tech <ArrowDownRight size={18} /></a></div>
  </div></section>;
}
function SectionHeading({
  kicker,
  title,
  description,
  light = false
}) {
  return <div className={`section-heading reveal${light ? ' heading-light' : ''}`}><h2>{title}</h2>{description && <p className="section-description">{description}</p>}</div>;
}
function About() {
  return <section className="about section-pad" id="about">
      <div className="wrap about-grid">
        <div className="about-art reveal">
          <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1050&q=85" alt="Professional inspecting machinery in a workshop" loading="lazy" />
          <div className="about-art-label"><span className="label-rule" /><span>GENERATOR SERVICE<br />& MAINTENANCE</span></div>
          
        </div>
        <div className="about-copy reveal">
          
          <h2>Generator care since 2014</h2>
          <p>Operating since 2014, Power Tech Diesel Services specializes in servicing and maintaining heavy-duty diesel generator sets for businesses and industries.</p>
          <p>Our experience includes generator maintenance and troubleshooting, engine repairs and overhauling, and spare parts support. We discuss each requirement around the generator model and the customer’s needs.</p>
          <Link className="text-link" to="/services">Discover our services <ArrowRight size={16} /></Link>
          <div className="about-points"><div><Check size={15} /> Generator maintenance & troubleshooting</div><div><Check size={15} /> Engine repairs & spare parts support</div></div>
        </div>
      </div>
    </section>;
}
function Services() {
  return <section className="services section-pad" id="services">
      <div className="wrap">
        <SectionHeading kicker="WHAT WE DO" title={<>Care for every generator.</>} description="From routine maintenance to repairs and parts support, choose a service to discuss your generator’s requirements." />
        <div className="service-grid">
          {serviceCards.map((service, index) => {
          const Icon = iconMap[service.icon];
          return <article className="service-card reveal" key={service.title}>
              <div className="service-card-top"><span className="service-icon"><Icon size={23} strokeWidth={1.8} /></span></div>
              <h3>{service.title}</h3><p className="service-description">{service.description}</p>
              <ul>{service.items.map(item => <li key={item}><Check size={15} />{item}</li>)}</ul>
              <QuoteAction className="service-link" preset={{
              service: service.service
            }}>Enquire Now <ArrowRight size={16} /></QuoteAction>
            </article>;
        })}
        </div>
        <p className="service-disclaimer">Service scope is confirmed after understanding your generator and facility requirements.</p>
      </div>
    </section>;
}
const Om = engineBrands,
  Jm = {
    Cummins: "/engines/cummins.webp",
    "Ashok Leyland": "/engines/ashok-leyland.jpg",
    Kirloskar: "/engines/kirloskar.webp",
    Ruston: "/engines/ruston.avif",
    MWM: "/engines/MWM-TCG-2032.webp"
  },
  kn = SectionHeading;
function BrandsSection() {
  return <GeneratorCarousel />;
}
function Industries() {
  return <section className="industries section-pad" id="industries">
      <div className="wrap">
        <div className="industry-feature reveal">
          <picture className="industry-feature-media"><img src="/industries/diesel-generator-1280.webp" srcSet="/industries/diesel-generator-640.webp 640w, /industries/diesel-generator-1280.webp 1280w, /industries/diesel-generator-1920.webp 1920w" sizes="(max-width: 600px) calc(100vw - 40px), 94vw" width="1920" height="1082" alt="Large blue SDMO diesel generator installed outdoors" loading="lazy" decoding="async" /></picture>
          <div className="industry-feature-overlay" aria-hidden="true" />
          <div className="industry-feature-copy"><SectionHeading kicker="INDUSTRIES WE SERVE" title={<>Power for your business.</>} description="We work with businesses that depend on generators as part of their facility planning." /></div>
        </div>
        <p className="industry-photo-credit">Reference photo: <a href="https://commons.wikimedia.org/wiki/File:SDMO_diesel-generator_in_%C3%9Clemiste.JPG" target="_blank" rel="noopener noreferrer">SDMO diesel generator</a> by Dmitry G / Wikimedia Commons, <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 3.0</a>. Resized and converted to WebP; displayed with a crop and overlay.</p>
        <p className="sector-reference-note">These photographs illustrate the business sectors we serve. The pictured organizations are not presented as Power Tech Diesel Services customers or partners.</p>
        <div className="sector-gallery-grid">
          {industries.map(industry => {
            const photo = sectorPhotos[industry.title];
            return <article className="sector-gallery-card reveal" key={industry.title}>
              <div className="sector-gallery-image"><img src={photo.src} srcSet={`${photo.small} 480w, ${photo.src} 960w`} sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 1000px) 46vw, 30vw" alt={photo.alt} width="960" height="720" loading="lazy" decoding="async" /><h3>{industry.title}</h3></div>
              <div className="sector-gallery-content"><p>{industry.description}</p><QuoteAction className="text-link" preset={{ businessType: industry.type }}>{'WhatsApp enquiry'} <ArrowRight size={15} /></QuoteAction></div>
            </article>;
          })}
        </div>
        <details className="sector-photo-credits"><summary>Sector photograph sources &amp; licences</summary><p>All five photographs are used under CC BY-SA 4.0. Images were cropped, resized and converted to WebP; a dark overlay is applied on the page. The image derivatives retain the same licence.</p><ul>{industries.map(industry => {
          const photo = sectorPhotos[industry.title];
          return <li key={industry.title}><strong>{industry.title}:</strong> <a href={photo.source} target="_blank" rel="noopener noreferrer">{photo.title}</a> by {photo.author}, via Wikimedia Commons. <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer">{photo.license}</a>.</li>;
        })}</ul></details>
      </div>
    </section>;
}
function ServiceProcess() {
  const steps = [{
    title: 'Enquiry',
    description: 'Share your business and generator service needs.',
    icon: MessageCircle
  }, {
    title: 'Requirement Assessment',
    description: 'Discuss the generator, capacity, and facility requirements.',
    icon: ClipboardCheck
  }, {
    title: 'Quotation',
    description: 'Review the service scope and quotation for your needs.',
    icon: FileText
  }, {
    title: 'Service Scheduling',
    description: 'Coordinate a suitable schedule for the agreed service.',
    icon: CalendarClock
  }, {
    title: 'Maintenance Follow-up',
    description: 'Discuss follow-up needs and future maintenance planning.',
    icon: Wrench
  }];
  return <section className="process section-pad" id="process">
      <div className="wrap">
        <SectionHeading kicker="HOW WE WORK" title={<>A clear path to service.</>} description="A straightforward process to understand your generator and plan the next step." />
        <ol className="process-grid">
          {steps.map(({
          title,
          description,
          icon: Icon
        }, index) => <li className="process-step reveal" key={title}>
              
              <span className="process-icon"><Icon size={20} strokeWidth={1.8} /></span>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>)}
        </ol>
      </div>
    </section>;
}
function WhyChooseUs() {
  const points = [{
    icon: ShieldCheck,
    title: 'Service-focused approach',
    text: 'Discuss your generator service requirement before planning the next step.'
  }, {
    icon: CalendarClock,
    title: 'Maintenance planning',
    text: 'Plan recurring maintenance around your facility and operating needs.'
  }, {
    icon: Wrench,
    title: 'Tailored to your generator',
    text: 'Service discussions start with your generator and its requirements.'
  }, {
    icon: MessageCircle,
    title: 'Enquiry & quotation support',
    text: 'Share your details and service needs for a follow-up discussion.'
  }];
  return <section className="why section-pad">
      <div className="wrap why-grid">
        <div className="why-intro reveal"><h2>Care beyond the call.</h2><p>Generator support should begin with a clear understanding of the equipment and the facility it serves.</p><QuoteAction className="button button-light" preset={{
          service: 'Annual Maintenance Contracts (AMC)'
        }}>Discuss an AMC <ArrowRight size={16} /></QuoteAction></div>
        <div className="why-list">{points.map(({
          icon: Icon,
          title,
          text
        }, index) => <div className="why-item reveal" key={title}><span className="why-icon"><Icon size={20} /></span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div>
      </div>
    </section>;
}
function WorkGallery() {
  const workItems = [{
    title: 'Generator Maintenance',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=82',
    alt: 'Technician checking generator engine components',
    points: ['Routine inspection and maintenance.', 'Oil changes and filter replacement.', 'Maintenance planned around the generator model.'],
    buttonLabel: 'Request a Callback',
    service: 'Diesel Generator Servicing'
  }, {
    title: 'Troubleshooting & Engine Repairs',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=900&q=82',
    alt: 'Technician inspecting industrial equipment',
    points: ['Troubleshooting generator and engine problems.', 'Engine repair and overhauling support.', 'Requirements assessed for the specific generator.'],
    buttonLabel: 'Request a Callback',
    service: 'Generator Repairs'
  }, {
    title: 'Spare Parts Support',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=82',
    alt: 'Maintenance materials and equipment',
    points: ['Support for applicable generator engine spare parts.', 'Engine oil, filters, and coolant where applicable.', 'Availability and compatibility depend on generator model.'],
    buttonLabel: 'Request a Callback',
    service: 'Genuine & Imported Spare Parts'
  }];
  return <section className="work section-pad" id="work">
      <div className="wrap">
        <SectionHeading kicker="SERVICE EXPERTISE" title={<>Generator care, considered</>} description="From planned maintenance to troubleshooting and spare parts support, discuss your generator requirements with our team." />
        <div className="service-showcase-grid">
          {workItems.map(({
          title,
          image,
          alt,
          points,
          buttonLabel,
          service
        }) => <article className="service-showcase-card reveal" key={title}>
              <div className="service-showcase-image">
                <img src={image} alt={alt} loading="lazy" />
              </div>
              <div className="service-showcase-body">
                <h3>{title}</h3>
                <ul>
                  {points.map(point => <li key={point}><Check size={15} />{point}</li>)}
                </ul>
                <QuoteAction className="button button-navy service-showcase-button" preset={{
              service
            }}>
                  {buttonLabel} <ArrowRight size={16} />
                </QuoteAction>
              </div>
            </article>)}
        </div>
      </div>
    </section>;
}
function CustomerSection() {
  return <section className="customers section-pad" id="customers"><div className="wrap"><SectionHeading title="Trusted across Chennai" description="Explore our customers across industry, fuel stations, healthcare, education and local businesses." /><CustomerPreview /><Link className="button button-navy" to="/customers">View all customers <ArrowRight size={18} /></Link></div></section>;
}
function MaterialsSection() {
  return <section className="materials section-pad" id="materials">
      <div className="wrap">
        <SectionHeading kicker="PARTS & MATERIALS" title={<>Parts &amp; materials</>} description="Support includes engine oil, filters, coolant where applicable, and generator engine spare parts." />
        <div className="materials-grid">
          {serviceMaterials.map(material => <article className="material-card reveal" key={material.name}>
              <div className="material-image">
                <img src={material.image} alt={material.alt} loading="lazy" />
              </div>
              <div className="material-body">
                <h3>{material.name}</h3>
                <p>{material.description}</p>
              </div>
            </article>)}
        </div>
        <p className="materials-disclaimer">Spare parts availability and compatibility depend on the generator model.</p>
      </div>
    </section>;
}
const initialForm = {
  name: '',
  company: '',
  phone: '',
  businessType: '',
  capacity: '',
  generatorBrand: '',
  service: '',
  location: '',
  requirements: ''
};
function QuoteForm() {
  const [i, u] = C.useState(initialForm),
    [a, f] = C.useState({}),
    [d, p] = C.useState(""),
    [g, w] = C.useState(""),
    [y, E] = C.useState(!1),
    N = qe();
  C.useEffect(() => {
    const A = M => {
      u(D => ({
        ...D,
        ...M.detail
      })), p(""), w("");
    };
    return window.addEventListener("quote-preset", A), () => window.removeEventListener("quote-preset", A);
  }, []), C.useEffect(() => {
    var M;
    const A = (M = N.state) == null ? void 0 : M.quotePreset;
    A && (u(D => ({
      ...D,
      ...A
    })), p(""), w(""), requestAnimationFrame(() => {
      var D;
      return (D = document.getElementById("quote")) == null ? void 0 : D.scrollIntoView({
        behavior: "smooth"
      });
    }));
  }, [N.key, N.state]);
  const R = A => {
      u(M => ({
        ...M,
        [A.target.name]: A.target.value
      })), f(M => ({
        ...M,
        [A.target.name]: ""
      })), p(""), w("");
    },
    z = [`Hello ${Ie.name},`, "", "I would like to request a callback about generator service.", "", `Customer name: ${i.name || "Not provided"}`, ...(i.company.trim() ? [`Business name: ${i.company.trim()}`] : []), `Contact number: ${i.phone || "Not provided"}`, `Business type: ${i.businessType || "Not provided"}`, `Generator capacity: ${i.capacity ? `${i.capacity} kVA` : "Not provided"}`, `Generator brand: ${i.generatorBrand || "Not sure / not provided"}`, `Service required: ${i.service || "Not provided"}`, `Business location: ${i.location || "Not provided"}`, ...(i.requirements.trim() ? ["", `Additional message: ${i.requirements.trim()}`] : [])].join(`
`),
    W = _d(z),
    q = async A => {
      if (A.preventDefault(), y) return;
      const M = ["name", "phone", "businessType", "service", "location"],
        D = {};
      if (M.forEach(G => {
        i[G].trim() || (D[G] = "Please complete this field.");
      }), i.phone.trim() && (!/^[+()\d\s-]{7,20}$/.test(i.phone.trim()) || (i.phone.match(/\d/g) || []).length < 7) && (D.phone = "Enter a valid contact number."), f(D), Object.keys(D).length) {
        p("Please review the highlighted fields and try again."), w("error");
        return;
      }
      E(!0), p("Submitting your enquiry..."), w("loading");
      try {
        const G = await submitEnquiry(`${Kc}/api/enquiry`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: i.name.trim(),
            phone: i.phone.trim(),
            businessType: i.businessType,
            service: i.service,
            location: i.location.trim(),
            company: i.company.trim(),
            capacity: i.capacity.trim(),
            generatorBrand: i.generatorBrand,
            message: i.requirements.trim()
          })
        });
        let Q;
        try {
          Q = await G.json();
        } catch {
          throw new Error("The backend returned an invalid response.");
        }
        if (!G.ok || (Q == null ? void 0 : Q.ok) !== !0) throw new Error((Q == null ? void 0 : Q.message) || `The server rejected the enquiry (HTTP ${G.status}).`);
        p("Enquiry submitted successfully. Power Tech Diesel Services may contact you about your request."), w("success");
      } catch (G) {
        const Q = G instanceof Error ? G.message : "An unexpected error occurred.";
        p(`Could not submit your enquiry: ${Q} Please try again or contact us on WhatsApp.`), w("error");
      } finally {
        E(!1);
      }
    };
  return o.jsx("section", {
    className: "quote section-pad",
    id: "quote",
    children: o.jsxs("div", {
      className: "wrap quote-grid",
      children: [o.jsxs("div", {
        className: "quote-aside reveal",
        children: [null, o.jsx("h2", {
          children: "Let’s plan your service."
        }), o.jsx("p", {
          children: "Share a few details about your business and service requirement. We’ll contact you about your enquiry."
        }), o.jsxs("div", {
          className: "quote-step",
          children: [o.jsx("span", {
            children: null
          }), o.jsxs("div", {
            children: [o.jsx("strong", {
              children: "Share your requirements"
            }), o.jsx("small", {
              children: "Tell us about your business and generator."
            })]
          })]
        }), o.jsxs("div", {
          className: "quote-step",
          children: [o.jsx("span", {
            children: null
          }), o.jsxs("div", {
            children: [o.jsx("strong", {
              children: "We’ll contact you"
            }), o.jsx("small", {
              children: "Power Tech Diesel Services will follow up about your enquiry."
            })]
          })]
        }), o.jsxs("div", {
          className: "quote-aside-contact",
          children: [o.jsx(ci, {
            size: 16
          }), o.jsx("span", {
            children: Ie.serviceArea
          })]
        })]
      }), o.jsx("div", {
        className: "quote-form-wrap reveal",
        children: o.jsxs("form", {
          className: "quote-form",
          onSubmit: q,
          noValidate: !0,
          children: [o.jsxs("div", {
            className: "form-heading",
            children: [o.jsxs("div", {
              children: [null, o.jsx("h3", {
                children: "Request a Callback"
              })]
            }), o.jsx("span", {
              className: "form-required",
              children: "* Required"
            })]
          }), o.jsxs("div", {
            className: "form-grid",
            children: [o.jsx(Field, {
              label: "Customer name",
              name: "name",
              value: i.name,
              onChange: R,
              error: a.name,
              required: !0,
              maxLength: "100",
              placeholder: "Your name"
            }), o.jsx(Field, {
              label: "Company or business name",
              name: "company",
              value: i.company,
              onChange: R,
              maxLength: "150",
              placeholder: "Business name"
            }), o.jsx(Field, {
              label: "WhatsApp / contact number",
              name: "phone",
              type: "tel",
              value: i.phone,
              onChange: R,
              error: a.phone,
              required: !0,
              maxLength: "20",
              placeholder: "Your contact number"
            }), o.jsx(SelectField, {
              label: "Business type",
              name: "businessType",
              value: i.businessType,
              onChange: R,
              error: a.businessType,
              required: !0,
              options: Fm
            }), o.jsx(Field, {
              label: "Generator capacity (kVA)",
              name: "capacity",
              type: "number",
              min: "1",
              value: i.capacity,
              onChange: R,
              maxLength: "50",
              placeholder: "e.g. 125"
            }), o.jsx(SelectField, {
              label: "Generator brand (optional)",
              name: "generatorBrand",
              value: i.generatorBrand,
              onChange: R,
              options: Dm
            }), o.jsx(SelectField, {
              label: "Service required",
              name: "service",
              value: i.service,
              onChange: R,
              error: a.service,
              required: !0,
              options: Am
            }), o.jsx(Field, {
              label: "Business location",
              name: "location",
              value: i.location,
              onChange: R,
              error: a.location,
              required: !0,
              maxLength: "150",
              placeholder: "Area / locality in Chennai"
            }), o.jsxs("label", {
              className: "field field-wide",
              children: [o.jsx("span", {
                children: "Optional message"
              }), o.jsx("textarea", {
                name: "requirements",
                value: i.requirements,
                onChange: R,
                maxLength: "2000",
                rows: "3",
                placeholder: "Anything else we should know?"
              })]
            })]
          }), d && o.jsx("p", {
            className: `form-status${g === "error" ? " status-error" : ""}`,
            role: g === "error" ? "alert" : "status",
            "aria-live": g === "error" ? "assertive" : "polite",
            children: d
          }), o.jsxs("button", {
            className: "button button-navy submit-button",
            type: "submit",
            disabled: y,
            "aria-busy": y,
            children: [y ? "Submitting Request…" : "Request a Callback", " ", o.jsx(Jn, {
              size: 17
            })]
          }), o.jsxs("a", {
            className: "button button-whatsapp submit-button",
            href: W,
            target: "_blank",
            rel: "noopener noreferrer",
            children: ["Enquire on WhatsApp ", o.jsx(Jn, {
              size: 17
            })]
          }), o.jsx("p", {
            className: "form-disclaimer",
            children: "By submitting this form, you allow Power Tech Diesel Services to contact you about your enquiry using the details provided. WhatsApp opens a draft for you to review and send yourself."
          })]
        })
      })]
    })
  });
}
function Field({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  ...props
}) {
  const id = `field-${name}`;
  return <label className={`field${error ? ' has-error' : ''}`} htmlFor={id}><span>{label}{required && <b aria-hidden="true"> *</b>}</span><input id={id} name={name} value={value} onChange={onChange} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} required={required} {...props} />{error && <small id={`${id}-error`}>{error}</small>}</label>;
}
function SelectField({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  options
}) {
  const id = `field-${name}`;
  return <label className={`field${error ? ' has-error' : ''}`} htmlFor={id}><span>{label}{required && <b aria-hidden="true"> *</b>}</span><select id={id} name={name} value={value} onChange={onChange} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} required={required}><option value="">Select an option</option>{options.map(option => <option key={option} value={option}>{option}</option>)}</select>{error && <small id={`${id}-error`}>{error}</small>}</label>;
}
function PTMap() {
  return o.jsxs("div", {
    className: "contact-map",
    children: [o.jsxs("div", {
      className: "contact-map-heading",
      children: [o.jsxs("div", {
        children: [o.jsx("h3", {
          children: "Find us in Thiruverkadu"
        }), o.jsx("p", {
          children: "22a, Reddy Street, Chinna Koladi, Thiruverkadu, Chennai – 600077"
        })]
      }), o.jsx("a", {
        className: "button button-navy",
        href: "https://maps.app.goo.gl/SU9Ld2BMwMP5xKNa9",
        target: "_blank",
        rel: "noopener noreferrer",
        children: "Open in Google Maps ↗"
      })]
    }), o.jsx("iframe", {
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.276721016282!2d80.12813419999999!3d13.081640799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52638e1524bc9f%3A0x46c54a93bd3c6306!2sPowertech%20diesel%20services!5e0!3m2!1sen!2sin!4v1792223000355!5m2!1sen!2sin",
      title: "Google Maps location of Power Tech Diesel Services",
      width: "100%",
      height: "380",
      loading: "lazy",
      allowFullScreen: true,
      referrerPolicy: "strict-origin-when-cross-origin"
    })]
  });
}
function Contact() {
  return <section className="contact section-pad" id="contact">
      <div className="wrap contact-grid">
        <div className="contact-copy reveal"><h2>Visit Power Tech.</h2><p>Reach out with your business and service requirements to start a conversation.</p><QuoteAction className="button button-navy" preset={{}}>Make an enquiry <ArrowRight size={16} /></QuoteAction></div>
        <div className="contact-details reveal">
          <div className="contact-detail"><span className="detail-icon"><MapPin size={19} /></span><div><small>SERVICE AREA</small><strong>{business.serviceArea}</strong></div></div>
          <div className="contact-detail"><span className="detail-icon"><MessageCircle size={19} /></span><div><small>WHATSAPP</small><strong>{business.whatsapp || 'Add WhatsApp number in configuration'}</strong></div></div>
          <div className="contact-detail"><span className="detail-icon"><Phone size={19} /></span><div><small>BUSINESS PHONE</small><strong>{business.phone || 'Add business phone in configuration'}</strong></div></div>
          <div className="contact-detail"><span className="detail-icon"><Mail size={19} /></span><div><small>EMAIL ADDRESS</small><strong>{business.email || 'Add business email in configuration'}</strong></div></div>
          <div className="contact-detail"><span className="detail-icon"><MapPin size={19} /></span><div><small>BUSINESS ADDRESS</small><strong>{business.address || 'Add business address in configuration'}</strong></div></div>
        </div>
      </div>
      <div className="wrap"><PTMap /></div>
    </section>;
}
export function Footer() {
  return <footer className="footer">
      <div className="wrap footer-main">
        <div className="footer-identity">
          <Link className="brand footer-brand" to="/#home"><img className="brand-symbol" src="/ptds-logo.png" alt="" /><span className="brand-copy"><strong>POWER TECH</strong><small>DIESEL SERVICES</small></span></Link>
          <p>Generator oil servicing, planned maintenance, and AMC solutions in Chennai.</p>
          <span className="footer-contact">{business.phone || 'Phone: add in business configuration'}</span>
          <span className="footer-contact">{business.whatsapp || 'WhatsApp: add in business configuration'}</span>
          <span className="footer-contact">{business.email || 'Email: add in business configuration'}</span>
          <span className="footer-contact">{business.address || 'Address: add in business configuration'}</span>
        </div>
        <div className="footer-group"><strong>Services</strong><Link to="/services">Diesel Generator Servicing</Link><Link to="/services">Engine Overhauling</Link><Link to="/services">Annual Maintenance Contracts</Link><Link to="/services">Spare Parts Support</Link></div>
        <div className="footer-group"><strong>Industries served</strong><a href="/#industries">Petrol Bunks</a><a href="/#industries">Industries &amp; Factories</a><a href="/#industries">Marriage Halls</a><a href="/#industries">Schools</a><a href="/#industries">Hospitals</a></div>
        <div className="footer-group footer-quick"><strong>Quick navigation</strong>{navLinks.map(([label, id]) => <NavigationLink key={id} id={id} label={label} active={false} />)}<Link className="footer-quote" to="/#quote">Request a callback <ArrowRight size={15} /></Link></div>
      </div>
      <div className="wrap footer-bottom"><span>© {new Date().getFullYear()} {business.name}</span><span>{business.city}</span><Link to="/#home">Back to top ↑</Link></div>
    </footer>;
}
function FinalCallToAction() {
  return <section className="final-cta">
      <div className="wrap final-cta-inner">
        <div><h2>Your next service starts here.</h2><p>Tell us about your facility and generator. We’ll help you start the right service conversation.</p></div>
        <QuoteAction className="button button-light" preset={{}}>Request a Callback <ArrowRight size={16} /></QuoteAction>
      </div>
    </section>;
}
export function WhatsAppButton() {
  const whatsappNumber = '91' + business.whatsapp.replace(/\D/g, '');
  const message = `Hello ${business.name}, I would like to enquire about generator service. Please contact me.`;
  const href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  return <a className="floating-whatsapp" href={href} target="_blank" rel="noopener noreferrer">
      <MessageCircle size={22} />
      <span>Enquire on WhatsApp</span>
    </a>;
}
export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12
    });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return <><a className="skip-link" href="#main-content">Skip to content</a><Navbar /><main id="main-content"><Hero /><About /><Services /><BrandsSection /><Industries /><ServiceProcess /><WhyChooseUs /><WorkGallery /><GeneratorGallery /><CustomerSection /><MaterialsSection /><QuoteForm /><Contact /><FinalCallToAction /></main><Footer /><WhatsAppButton /></>;
}



