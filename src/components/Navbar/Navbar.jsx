import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Menu, X, ArrowRight } from 'lucide-react'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Clients', to: '/clients' },
  { label: 'Services', to: '/services' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contact' },
]

/* --- ASVDF Logo SVG ------------------------------------ */
const LogoIcon = () => (
  <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2L3 22h22L14 2z" fill="white" opacity="0.9"/>
    <path d="M14 8L7 22h14L14 8z" fill="white" opacity="0.5"/>
  </svg>
)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [location])

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  return (
    <>
      <motion.header
        className={`navbar-wrapper${scrolled ? ' scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ---- Container One: Logo + Nav Links ---- */}
        <div className="nav-container-one">
          {/* Logo */}
          <Link to="/" className="nav-logo" aria-label="ASVDF Flooring Home">
            <div className="nav-logo-icon">
              <LogoIcon />
            </div>
            <div className="nav-logo-text">
              <span className="nav-logo-brand">ASVDF</span>
              <span className="nav-logo-sub">Flooring</span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav aria-label="Main navigation">
            <ul className="nav-links">
              {NAV_LINKS.map(({ label, to }) => (
                <li
                  key={to}
                  className={`nav-link-item${isActive(to) ? ' active' : ''}`}
                >
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* ---- Container Two: CTA + Icons ---- */}
        <div className="nav-container-two">
          <motion.button
            className="nav-cta-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Request a quote"
          >
            <span>Request Quote</span>
            <ArrowRight size={16} />
          </motion.button>

          <button className="nav-icon-btn" aria-label="Search">
            <Search size={18} />
          </button>

          <button
            className="nav-icon-btn"
            aria-label="Toggle mobile menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.header>

      {/* ---- Mobile Menu ---- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            className="nav-mobile-menu open"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className={`nav-mobile-link${isActive(to) ? ' active' : ''}`}
              >
                {label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
