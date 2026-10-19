import { engineBrands } from './config/business'
import './EngineBrands.css'

const assets = {
  Cummins: { src: '/brands/cummins.svg', width: 950, height: 960 },
  'Ashok Leyland': { src: '/brands/ashok-leyland.svg', width: 188, height: 40 },
  Kirloskar: { src: '/brands/kirloskar.png', width: 171, height: 64 },
  Ruston: { src: '/brands/ruston-badge.jpg', width: 500, height: 520, alt: 'Historic Ruston & Hornsby badge', note: 'Historic badge' },
  MWM: { src: '/brands/mwm.jpg', width: 260, height: 142 },
}

export default function EngineBrands() {
  return <div className="engine-brand-showcase" aria-labelledby="diesel-brands-title">
    <div className="engine-brand-heading"><h3 id="diesel-brands-title">Diesel generator brands</h3><p>Experience across leading diesel generator brands.</p></div>
    <ul className="engine-brand-cards">
      {engineBrands.map(name => {
        const asset = assets[name]
        return <li key={name} className="engine-brand-card">
          <div className="engine-brand-logo"><img src={asset.src} alt={asset.alt || `${name} logo`} width={asset.width} height={asset.height} loading="lazy" decoding="async" /></div>
          <h4>{name}</h4>
          <p className="engine-brand-card-note">{asset.note || 'Diesel generator engines'}</p>
        </li>
      })}
    </ul>
    <p className="engine-brand-disclaimer">Brand names are shown for service reference only. No manufacturer authorization or affiliation is implied.</p>
    <details className="engine-brand-sources"><summary>Image sources &amp; credits</summary><p>Logos remain the property of their respective owners and are used for brand identification.</p><ul>
      <li>Cummins logo: <a href="https://commons.wikimedia.org/wiki/File:Cummins_logo.svg" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a> (PD-textlogo); displayed according to <a href="https://brandstandards.cummins.com/" target="_blank" rel="noopener noreferrer">Cummins brand standards</a>.</li>
      <li>Ashok Leyland, Kirloskar Oil Engines and MWM logos: <a href="https://www.ashokleyland.com/" target="_blank" rel="noopener noreferrer">Ashok Leyland</a>, <a href="https://www.kirloskaroilengines.com/" target="_blank" rel="noopener noreferrer">Kirloskar Oil Engines</a> and <a href="https://www.mwm.net/en/" target="_blank" rel="noopener noreferrer">MWM</a> official websites.</li>
      <li>Historic Ruston &amp; Hornsby badge photograph by Debbiesw, <a href="https://commons.wikimedia.org/wiki/File:Ruston_%26_Hornsby_badge.jpg" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a>, <a href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank" rel="noopener noreferrer">CC0 1.0</a>.</li>
    </ul></details>
  </div>
}
