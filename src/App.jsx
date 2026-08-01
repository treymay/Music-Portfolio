import { useEffect, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowUpRight,
  AudioWaveform,
  Camera,
  Check,
  Copy,
  Download,
  FileText,
  Mail,
  Menu,
  Pause,
  Play,
  X,
} from 'lucide-react'
import './App.css'

// Replace these placeholders with your real details before publishing.
const PROFILE = {
  name: 'TREY MAY',
  email: 'treymayofficial@gmail.com',
  location: 'Savannah · Atlanta · Remote',
  instagram: 'https://instagram.com/treymayofficial',
}

const tracks = [
  { id: 1, title: 'Extasy (Sempero)', genre: 'Progressive House / Hyperpop', tone: 'orange', src: '/audio/extasy.m4a', art: '/images/extasy-cover.jpg' },
  { id: 2, title: 'It’s Alive', genre: 'Progressive House / Hyperpop', tone: 'red', src: '/audio/its-alive.m4a', art: '/images/editorial-motion.jpg' },
  { id: 3, title: 'Sofia', genre: 'Progressive House / Hyperpop', tone: 'gold', src: '/audio/sofia.m4a', art: '/images/editorial-motion.jpg' },
  { id: 4, title: 'Life For Me', genre: 'Progressive House / Hyperpop', tone: 'peach', src: '/audio/life-for-me.m4a', art: '/images/editorial-motion.jpg' },
  { id: 5, title: 'You', genre: 'Progressive House / Hyperpop', tone: 'rose', src: '/audio/you.m4a', art: '/images/editorial-motion.jpg' },
  { id: 6, title: 'Spite', genre: 'Progressive House / Hyperpop', tone: 'ember', src: '/audio/spite.m4a', art: '/images/editorial-motion.jpg' },
  { id: 7, title: 'Beautiful Thoughts', genre: 'Progressive House / Hyperpop', tone: 'sand', src: '/audio/beautiful-thoughts.m4a', art: '/images/editorial-motion.jpg' },
  { id: 8, title: 'Not Much to Say', genre: 'Progressive House / Hyperpop', tone: 'coral', src: '/audio/not-much-to-say.m4a', art: '/images/editorial-motion.jpg' },
  { id: 9, title: 'Obsessed', genre: 'Progressive House / Hyperpop', tone: 'orange', src: '/audio/obsessed.m4a', art: '/images/editorial-motion.jpg' },
]

const capabilities = [
  {
    number: '01',
    title: 'Production',
    text: 'Songwriting, arrangement, vocal production, editing, mixing, and delivery-ready sessions.',
    tags: ['FL Studio', 'Mixing', 'Songwriting', 'Arrangement'],
  },
  {
    number: '02',
    title: 'Sound Design',
    text: 'Detailed synthesis, sampling, texture, and sonic identities built for artists and visual worlds.',
    tags: ['Serum', 'Vital', 'Sound design', 'Sampling'],
  },
  {
    number: '03',
    title: 'Creative Direction',
    text: 'Campaign-minded concepts connecting sound, visual language, culture, and audience.',
    tags: ['Brand strategy', 'Adobe CC', 'Content', 'Art direction'],
  },
]

const visuals = [
  { title: 'EXTASY (SEMPERO)', type: 'Single artwork', src: '/images/extasy-cover.jpg', className: 'visual-wide' },
  { title: 'PORTRAIT 01', type: 'Editorial photography', src: '/images/editorial-portrait.jpg', className: 'visual-tall' },
  { title: 'MOTION STUDY', type: 'Fashion editorial', src: '/images/editorial-motion.jpg', className: 'visual-square' },
  { title: 'SOCIAL SYSTEM', type: 'Content direction', src: '/images/social-grid.jpg', className: 'visual-tall' },
  { title: 'MALL ANGELS', type: 'Cover art direction', src: '/images/mall-angel-cover.jpg', className: 'visual-wide' },
]

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '0:00'
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`
}

function AudioCard({ track, activeTrack, setActiveTrack }) {
  const audioRef = useRef(null)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [missing, setMissing] = useState(false)
  const isPlaying = activeTrack === track.id

  useEffect(() => {
    if (!isPlaying && audioRef.current) audioRef.current.pause()
  }, [isPlaying])

  const togglePlayback = async () => {
    const audio = audioRef.current
    if (!audio || missing) return
    if (isPlaying) {
      audio.pause()
      setActiveTrack(null)
      return
    }
    try {
      await audio.play()
      setActiveTrack(track.id)
    } catch {
      setMissing(true)
      setActiveTrack(null)
    }
  }

  return (
    <article className={`track-card tone-${track.tone}`}>
      <audio
        ref={audioRef}
        src={track.src}
        preload="metadata"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onEnded={() => {
          setCurrentTime(0)
          setActiveTrack(null)
        }}
        onError={() => setMissing(true)}
      />
      <div className={`track-art ${track.art ? 'track-art-image' : ''}`} aria-hidden="true">
        {track.art && <img src={track.art} alt="" />}
        <span className="track-number">{String(track.id).padStart(2, '0')}</span>
        {!track.art && <div className="track-orbit" />}
        {!track.art && <AudioWaveform size={34} strokeWidth={1} />}
      </div>
      <div className="track-info">
        <div className="track-heading">
          <div>
            <h3>{track.title}</h3>
            <p>{track.genre} · Audio excerpt</p>
          </div>
          <button
            className="play-button"
            type="button"
            onClick={togglePlayback}
            aria-label={`${isPlaying ? 'Pause' : 'Play'} ${track.title}`}
            title={missing ? `Add ${track.src} to enable playback` : undefined}
          >
            {isPlaying ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}
          </button>
        </div>
        <div className="timeline">
          <input
            aria-label={`Seek ${track.title}`}
            type="range"
            min="0"
            max={duration || 30}
            value={currentTime}
            onChange={(event) => {
              const nextTime = Number(event.target.value)
              audioRef.current.currentTime = nextTime
              setCurrentTime(nextTime)
            }}
          />
          <span>{missing ? 'ADD AUDIO' : `${formatTime(currentTime)} / ${formatTime(duration)}`}</span>
        </div>
      </div>
    </article>
  )
}

function App() {
  const [activeTrack, setActiveTrack] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)
  const progressRef = useRef(null)

  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0
      progressRef.current?.style.setProperty('transform', `scaleX(${progress})`)
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email)
      setEmailCopied(true)
      window.setTimeout(() => setEmailCopied(false), 2200)
    } catch {
      window.location.href = `mailto:${PROFILE.email}`
    }
  }

  const moveHeroLight = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`)
    event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`)
  }

  return (
    <div className="site-shell">
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
      <header className="site-header">
        <a className="monogram" href="#top" aria-label="Back to top">T<span>/</span>01</a>
        <nav className={menuOpen ? 'nav-open' : ''} aria-label="Main navigation">
          <a href="#music" onClick={closeMenu}>Music</a>
          <a href="#capabilities" onClick={closeMenu}>Capabilities</a>
          <a href="#future-club" onClick={closeMenu}>Case study</a>
          <a href="#visuals" onClick={closeMenu}>Visuals</a>
          <a href="#brand-research" onClick={closeMenu}>Research</a>
          <a href="#about" onClick={closeMenu}>About</a>
        </nav>
        <a className="header-contact" href={`mailto:${PROFILE.email}`}>Let’s work <ArrowUpRight size={15} /></a>
        <button
          className="menu-toggle"
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <main>
        <section className="hero-section" id="top" onPointerMove={moveHeroLight}>
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow"><span /> Future Club · Music · Creative</p>
            <h1>
              Creating sound<br />
              <span>with a pulse.</span>
            </h1>
            <p className="hero-intro">
              Electronic music producer and sound designer building emotive,
              future-forward worlds for artists, brands, and immersive experiences.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#music">Hear the work <ArrowDown size={16} /></a>
              <a className="text-link email-link" href={`mailto:${PROFILE.email}`}>
                Email me <ArrowUpRight size={15} />
              </a>
              <a className="text-link" href="/documents/trey-may-music-resume.pdf" download>
                Download résumé <Download size={15} />
              </a>
            </div>
          </div>
          <div className="hero-sculpture" aria-hidden="true">
            <div className="sphere sphere-main" />
            <div className="sphere sphere-small" />
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="signal-label">SIGNAL<br />ACTIVE</div>
          </div>
          <div className="hero-meta">
            <span>{PROFILE.location}</span>
            <span className="meta-center">Available for select opportunities</span>
            <span>© 2026</span>
          </div>
        </section>

        <div className="ticker" aria-hidden="true">
          <div>
            <span>Future Club</span><i /> <span>Release strategy</span><i />
            <span>Editorial</span><i /> <span>Creative direction</span><i />
            <span>Future Club</span><i /> <span>Release strategy</span><i />
            <span>Editorial</span><i /> <span>Creative direction</span><i />
          </div>
        </div>

        <section className="section music-section" id="music">
          <div className="section-heading">
            <div>
              <p className="section-index">01 / Selected sound</p>
              <h2>Featured music</h2>
            </div>
            <p>Nine original progressive house and hyperpop excerpts balancing club energy, cinematic tension, and emotional songwriting.</p>
          </div>
          <div className="track-grid">
            {tracks.map((track) => (
              <AudioCard
                key={track.id}
                track={track}
                activeTrack={activeTrack}
                setActiveTrack={setActiveTrack}
              />
            ))}
          </div>
        </section>

        <section className="section capabilities-section" id="capabilities">
          <div className="section-heading">
            <div>
              <p className="section-index">02 / What I do</p>
              <h2>Sound, strategy,<br />and story.</h2>
            </div>
            <p>I bring a producer’s ear and a brand thinker’s perspective to every project.</p>
          </div>
          <div className="capability-list">
            {capabilities.map((capability) => (
              <article className="capability" key={capability.number}>
                <span>{capability.number}</span>
                <h3>{capability.title}</h3>
                <div>
                  <p>{capability.text}</p>
                  <ul>
                    {capability.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <div className="genre-line">
            <span>Genre range</span>
            <p>Progressive House / Hyperpop</p>
          </div>
        </section>

        <section className="case-study-section" id="future-club">
          <div className="case-intro">
            <div>
              <p className="section-index">03 / Case study</p>
              <span className="case-status">Campaign plan · In development</span>
            </div>
            <div>
              <h2>Building a world<br />for <em>Future Club.</em></h2>
              <p>
                A release ecosystem where forward-leaning club music, fashion
                imagery, and community-first content operate as one identity.
                The strategy turns each track into a visual and social world—not
                a one-day announcement.
              </p>
            </div>
          </div>

          <div className="case-hero">
            <video
              controls
              playsInline
              preload="metadata"
              poster="/images/extasy-cover.jpg"
              aria-label="Extasy (Sempero) official visualizer"
            >
              <source src="/video/extasy-visualizer-web.m4v" type="video/mp4" />
            </video>
            <div className="case-hero-caption">
              <span>Extasy (Sempero) / Official visualizer</span>
              <span>Direction · Identity · Motion</span>
            </div>
          </div>

          <div className="case-framework">
            <article>
              <span>01</span>
              <h3>The positioning</h3>
              <p>
                Future Club is framed as a complete cultural signal: emotional
                electronic music with fashion-level image making, futuristic
                typography, warm light, and human presence.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>The content engine</h3>
              <p>
                Each single expands through process breakdowns, playthroughs,
                visualizers, editorial stills, studio footage, fan reactions,
                and day-in-the-life storytelling.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>The release system</h3>
              <p>
                A connected release sequence brings together singles, visual
                drops, press outreach, playlists, live moments, email capture,
                and post-campaign learning.
              </p>
            </article>
          </div>

          <div className="campaign-system">
            <div className="campaign-image">
              <img src="/images/social-grid.jpg" alt="Future Club social media content grid" />
            </div>
            <div className="campaign-copy">
              <p className="section-index">Strategy architecture</p>
              <h3>From first signal<br />to long-tail community.</h3>
              <ol>
                <li><span>01</span><div><strong>Establish</strong><p>Optimize channels, build the calendar, define the Dream 100, and prepare release assets.</p></div></li>
                <li><span>02</span><div><strong>Activate</strong><p>Release singles with BTS, visualizers, editorial imagery, pre-save, and playlist support.</p></div></li>
                <li><span>03</span><div><strong>Expand</strong><p>Connect influencers, press, collaborators, music supervisors, live events, and paid audiences.</p></div></li>
                <li><span>04</span><div><strong>Retain</strong><p>Treat email and Bandcamp as a fan club, then use engagement data to shape the next cycle.</p></div></li>
              </ol>
            </div>
          </div>

        </section>

        <section className="section visual-section" id="visuals">
          <div className="section-heading">
            <div>
              <p className="section-index">04 / Visual language</p>
              <h2>World-building,<br />beyond the sound.</h2>
            </div>
            <p>Fashion-led photography, social systems, cover art, and release imagery built around the music.</p>
          </div>
          <div className="visual-grid">
            {visuals.map((visual, index) => (
              <article className={`visual-project ${visual.className}`} key={visual.title}>
                <figure className="visual-art">
                  <img src={visual.src} alt={`${visual.title} — ${visual.type}`} loading="lazy" />
                  <span className="visual-code">V.{String(index + 1).padStart(2, '0')}</span>
                </figure>
                <div className="visual-caption">
                  <h3>{visual.title}</h3>
                  <span>{visual.type} · 2026</span>
                </div>
              </article>
            ))}
          </div>

          <article className="research-feature" id="brand-research">
            <a
              className="research-cover"
              href="/documents/opium-brand-research.pdf"
              target="_blank"
              rel="noreferrer"
              aria-label="Open the Opium brand research deck"
            >
              <img src="/images/opium-brand-research.jpg" alt="Cover of Trey May’s Opium brand research deck" loading="lazy" />
              <span><FileText size={15} /> 7-page research deck</span>
            </a>
            <div className="research-copy">
              <p className="section-index">Brand research / ADBR-205</p>
              <h3>Opium:<br />building a cultural movement.</h3>
              <p>
                An analysis of how Opium uses luxury fashion, punk references,
                mystery, and highly consistent art direction to create a
                recognizable world around its artists.
              </p>
              <ul>
                <li>Editorial fashion positioning</li>
                <li>Scarcity and fan participation</li>
                <li>Unified campaign art direction</li>
                <li>Music, fashion, and community as one identity</li>
              </ul>
              <a className="button research-button" href="/documents/opium-brand-research.pdf" target="_blank" rel="noreferrer">
                View research deck <ArrowUpRight size={15} />
              </a>
            </div>
          </article>
        </section>

        <section className="about-section" id="about">
          <div className="about-label">
            <p className="section-index">05 / About</p>
            <span className="availability-dot">Open to work</span>
          </div>
          <figure className="about-photo">
            <img src="/images/trey-about.jpg" alt="Portrait of Trey May" loading="lazy" />
            <figcaption>Trey May · Artist / Creative</figcaption>
          </figure>
          <div className="about-copy">
            <h2>Music is the idea.<br /><span>Everything else builds the world.</span></h2>
            <p>
              I’m a 24-year-old progressive house and hyperpop producer and songwriter studying Advertising
              & Branding at SCAD. I combine precise production with campaign-minded
              creative thinking to make music and content that connect emotionally
              and move with culture.
            </p>
            <p className="roles">
              Exploring artist marketing, creative coordination, label, A&amp;R,
              social content, studio, and production opportunities.
            </p>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <p className="section-index">06 / Start a conversation</p>
          <div className="contact-main">
            <h2>Let’s make<br />something <em>resonate.</em></h2>
            <a className="contact-circle" href={`mailto:${PROFILE.email}`} aria-label="Send an email">
              <ArrowUpRight size={28} />
            </a>
          </div>
          <div className="contact-details">
            <div className="email-actions">
              <a href={`mailto:${PROFILE.email}`}><Mail size={16} /> {PROFILE.email}</a>
              <button type="button" onClick={copyEmail} aria-live="polite">
                {emailCopied ? <Check size={14} /> : <Copy size={14} />}
                {emailCopied ? 'Copied' : 'Copy email'}
              </button>
            </div>
            <div className="socials">
              <a href={PROFILE.instagram} target="_blank" rel="noreferrer"><Camera size={16} /> Instagram</a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <a className="monogram" href="#top">T<span>/</span>01</a>
        <p>Music for artists, brands, and immersive experiences.</p>
        <a href={`mailto:${PROFILE.email}`}>Email me <ArrowUpRight size={14} /></a>
      </footer>
    </div>
  )
}

export default App
