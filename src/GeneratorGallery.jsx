import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Expand, X } from 'lucide-react'
import gallery from './config/gallery.json'
import './GeneratorGallery.css'

const categories = ['All photos', ...new Set(gallery.images.map(image => image.category))]
const pageSize = 12
const imageSources = photo => [...new Map([[photo.smallWidth, photo.small], [photo.thumbnailWidth, photo.thumbnail], [photo.width, photo.src]]).entries()].map(([width, src]) => `${src} ${width}w`).join(', ')

export default function GeneratorGallery() {
  const [category, setCategory] = useState('All photos')
  const [visibleCount, setVisibleCount] = useState(pageSize)
  const [selectedId, setSelectedId] = useState(null)
  const dialogRef = useRef(null)
  const pointerStart = useRef(null)
  const photos = category === 'All photos' ? gallery.images : gallery.images.filter(image => image.category === category)
  const selectedIndex = photos.findIndex(image => image.id === selectedId)
  const selected = photos[selectedIndex]
  const isOpen = Boolean(selected)

  useEffect(() => {
    if (!isOpen) return undefined
    const dialog = dialogRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    if (!dialog.open) dialog.showModal()
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  function navigate(direction) {
    setSelectedId(current => {
      const index = photos.findIndex(image => image.id === current)
      return photos[(index + direction + photos.length) % photos.length].id
    })
  }

  function changeCategory(next) {
    setCategory(next)
    setVisibleCount(pageSize)
  }

  return <>
    <section className="generator-gallery section-pad" id="gallery" aria-labelledby="generator-gallery-title">
      <div className="wrap">
        <div className="gallery-heading">
          <div><h2 id="generator-gallery-title">Generator service gallery</h2><p>Generator equipment, workshop details and service visits from our photo collection.</p></div>
          {gallery.videos.length > 0 && <a className="text-link" href="#service-videos">Watch service videos <ArrowRight size={18} /></a>}
        </div>
        <div className="gallery-filters" role="group" aria-label="Filter service photographs">
          {categories.map(item => <button key={item} type="button" aria-pressed={item === category} onClick={() => changeCategory(item)}>{item}</button>)}
        </div>
        <p className="gallery-count" role="status">Showing {Math.min(visibleCount, photos.length)} of {photos.length} photos</p>
        <div className="generator-photo-grid">
          {photos.slice(0, visibleCount).map(photo => <figure className="generator-photo" key={photo.id}>
            <button className="gallery-photo-button" type="button" onClick={() => setSelectedId(photo.id)} aria-label={`View photo: ${photo.caption}`} aria-haspopup="dialog">
              <img src={photo.thumbnail} srcSet={imageSources(photo)} sizes="(max-width: 580px) calc(100vw - 40px), (max-width: 900px) 46vw, 30vw" alt={photo.caption} width={photo.width} height={photo.height} loading="lazy" decoding="async" />
              <span className="gallery-expand" aria-hidden="true"><Expand size={20} /></span>
            </button>
            <figcaption>{photo.caption}</figcaption>
          </figure>)}
        </div>
        {visibleCount < photos.length && <div className="gallery-load-more"><button type="button" className="button button-navy" onClick={() => setVisibleCount(count => count + pageSize)}>Load more photos <ArrowRight size={18} /></button></div>}
      </div>
    </section>

    {gallery.videos.length > 0 && <section className="service-videos section-pad" id="service-videos" aria-labelledby="service-videos-title">
      <div className="wrap">
        <div className="gallery-heading"><div><h2 id="service-videos-title">Service videos</h2><p>A closer look at the equipment and work recorded during our service visits.</p></div></div>
        <div className="service-video-grid">
          {gallery.videos.map(video => <figure className="service-video" key={video.id}>
            <video controls playsInline preload="none" aria-label={video.caption}>
              <source src={video.src} type="video/mp4" />
              Your browser does not support video playback. <a href={video.src}>Open this service video</a>.
            </video>
            <figcaption>{video.caption} <a href={video.src} target="_blank" rel="noopener noreferrer">Open video <ArrowRight size={16} /></a></figcaption>
          </figure>)}
        </div>
      </div>
    </section>}

    <dialog className="gallery-lightbox" ref={dialogRef} aria-label="Full-screen generator photo" aria-describedby="gallery-preview-caption" onCancel={() => setSelectedId(null)} onClose={() => setSelectedId(null)} onKeyDown={event => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); navigate(-1) }
      if (event.key === 'ArrowRight') { event.preventDefault(); navigate(1) }
    }}>
      {selected && <div className="gallery-lightbox-layout">
        <div className="gallery-lightbox-top"><span>{selectedIndex + 1} / {photos.length}</span><button type="button" aria-label="Close image viewer" onClick={() => setSelectedId(null)} autoFocus><X size={26} /></button></div>
        <div className="gallery-full-image" onPointerDown={event => { pointerStart.current = { x: event.clientX, y: event.clientY } }} onPointerUp={event => {
          if (!pointerStart.current) return
          const dx = event.clientX - pointerStart.current.x, dy = event.clientY - pointerStart.current.y
          if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) navigate(dx > 0 ? -1 : 1)
          pointerStart.current = null
        }} onPointerCancel={() => { pointerStart.current = null }}>
          <img key={selected.id} src={selected.src} width={selected.width} height={selected.height} alt={selected.caption} />
        </div>
        <div className="gallery-lightbox-bottom"><button type="button" aria-label="Previous photo" onClick={() => navigate(-1)}><ArrowLeft size={22} /><span>Previous</span></button><p id="gallery-preview-caption" aria-live="polite">{selected.caption}</p><button type="button" aria-label="Next photo" onClick={() => navigate(1)}><span>Next</span><ArrowRight size={22} /></button></div>
      </div>}
    </dialog>
  </>
}
