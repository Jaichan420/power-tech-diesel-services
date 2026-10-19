import { useRef, useState } from 'react'
import { LazyMotion, domAnimation, m, useReducedMotion } from 'motion/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import EngineBrands from './EngineBrands'
import gallery from './config/gallery.json'
import './GeneratorCarousel.css'

const groups = [
  { title: 'Generator at the service site', description: 'An enclosed generator, shown with its access doors closed and open.', photos: [1, 3] },
  { title: 'Blue & white enclosure', description: 'Three views of the same generator enclosure and its service access doors.', photos: [60, 62, 64] },
  { title: 'Inside the service compartment', description: 'A generator photographed with its control and engine compartments open.', photos: [11] },
  { title: 'Green generator enclosure', description: 'An enclosed generator photographed beside its exhaust pipework.', photos: [42] },
  { title: 'Generator under a shelter', description: 'A white generator enclosure photographed beneath a metal roof.', photos: [45] },
  { title: 'Indoor generator installation', description: 'Two views of the generator enclosure inside a plant room.', photos: [49, 50] },
].map(group => ({ ...group, photos: group.photos.map(number => gallery.images.find(photo => photo.id === `generator-service-${String(number).padStart(3, '0')}`)) }))
const spring = { type: 'spring', stiffness: 170, damping: 27, mass: 1 }
const wrap = number => (number + groups.length) % groups.length

export default function GeneratorCarousel() {
  const [active, setActive] = useState(0)
  const [views, setViews] = useState({})
  const start = useRef(null)
  const reducedMotion = useReducedMotion()
  const current = groups[active]
  const move = direction => setActive(index => wrap(index + direction))

  return <LazyMotion features={domAnimation} strict><section className="generator-showcase section-pad" id="generator-brands" aria-labelledby="engine-experience-title">
    <div className="wrap">
      <div className="generator-showcase-heading">
        <h2 id="engine-experience-title">Engine experience</h2>
        <p>Real generators. A closer look at the equipment in our service gallery.</p>
      </div>
      <div className="generator-carousel" role="region" aria-roledescription="carousel" aria-label="Generator showcase" tabIndex={0} onKeyDown={event => {
        if (event.altKey || event.ctrlKey || event.metaKey) return
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault()
          move(event.key === 'ArrowRight' ? 1 : -1)
        }
      }}>
        <div className="generator-carousel-stage" onPointerDown={event => { start.current = { x: event.clientX, y: event.clientY } }} onPointerUp={event => {
          if (!start.current) return
          const dx = event.clientX - start.current.x
          const dy = event.clientY - start.current.y
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) move(dx < 0 ? 1 : -1)
          start.current = null
        }} onPointerCancel={() => { start.current = null }}>
          {groups.map((group, index) => {
            let offset = wrap(index - active)
            if (offset > groups.length / 2) offset -= groups.length
            const distance = Math.abs(offset)
            const photo = group.photos[views[index] || 0]
            return <m.div className="generator-carousel-slide" key={group.title} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${groups.length}: ${group.title}`} aria-hidden={distance !== 0} initial={false} animate={{ x: `${offset * 57}%`, y: distance * 17, z: -distance * 120, rotateY: offset * -9, scale: 1 - distance * .13, opacity: distance > 2 ? 0 : 1 - distance * .24 }} transition={reducedMotion ? { duration: 0 } : spring} style={{ zIndex: groups.length - distance, pointerEvents: distance === 0 ? 'auto' : 'none' }}>
              <img src={photo.src} srcSet={`${photo.thumbnail} ${photo.thumbnailWidth}w, ${photo.src} ${photo.width}w`} sizes="(max-width: 600px) 78vw, 60vw" width={photo.width} height={photo.height} alt={photo.caption} loading="lazy" decoding="async" draggable={false} />
            </m.div>
          })}
        </div>
        <div className="generator-carousel-bottom">
          <div className="generator-carousel-caption" aria-live="polite" aria-atomic="true"><h3>{current.title}</h3><p>{current.description}</p></div>
          {/* taste-skill-ignore: The user specifically requested an active 01 / 06 carousel position indicator. */}<div className="generator-carousel-controls"><button type="button" aria-label="Previous generator" onClick={() => move(-1)}><ArrowLeft size={23} strokeWidth={1.5} /></button><span className="generator-carousel-count" aria-label={`Generator ${active + 1} of ${groups.length}`}>{String(active + 1).padStart(2, '0')} <span>/ {String(groups.length).padStart(2, '0')}</span></span><button type="button" aria-label="Next generator" onClick={() => move(1)}><ArrowRight size={23} strokeWidth={1.5} /></button></div>
        </div>
        {<div className="generator-carousel-views" role="group" aria-label="Other views of the selected generator"><span>Available views</span>{current.photos.map((photo, index) => <button type="button" key={photo.id} aria-label={`View ${index + 1}: ${photo.caption}`} aria-pressed={(views[active] || 0) === index} onClick={() => setViews(value => ({ ...value, [active]: index }))}><img src={photo.small} width={photo.width} height={photo.height} alt="" loading="lazy" /></button>)}</div>}
        <p className="generator-carousel-help">Use the arrows or swipe to explore. You can also use your keyboard's left and right arrows.</p>
      </div>
      <EngineBrands />
    </div>
  </section></LazyMotion>
}
