import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Pause, Play } from 'lucide-react'
import PrimaryButton from '@components/Buttons/PrimaryButton'
import OutlineButton from '@components/Buttons/OutlineButton'
import warehouseBg from '@assets/images/warehouse-bg.jpg'
import './Hero.css'

const SLIDES = [
  {
    badge: 'Premium Flooring Solutions',
    line1: 'Stronger Floors.',
    line2: 'Stronger',
    accent: 'Foundations.',
    para: 'High-performance flooring solutions for industrial, commercial and infrastructure projects. Built for durability. Designed to last.',
    cta1: 'Explore Our Services',
    cta2: 'View Our Projects',
  },
]

const TOTAL_DOTS = 4

/* ---- Stagger animation variants ---- */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Hero() {
  const [activeDot, setActiveDot] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef(null)

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setActiveDot((d) => (d + 1) % TOTAL_DOTS)
    }, 4000)
  }

  useEffect(() => {
    if (!paused) startTimer()
    return () => clearInterval(intervalRef.current)
  }, [paused])

  const slide = SLIDES[0]

  return (
    <section className="hero" aria-label="Hero section">
      {/* Background */}
      <div className="hero-bg">
        <img
          src={warehouseBg}
          alt="Large industrial warehouse with polished concrete floor"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      {/* Gradient overlay */}
      <div className="hero-overlay" aria-hidden="true" />

      {/* Main content */}
      <div className="hero-content">
        <motion.div
          className="hero-text"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div className="hero-badge" variants={itemVariants}>
            <span>{slide.badge}</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 className="hero-headline" variants={itemVariants}>
            <span className="hero-headline-line">{slide.line1}</span>
            <span className="hero-headline-line">
              {slide.line2}{' '}
              <span className="accent">{slide.accent}</span>
            </span>
          </motion.h1>

          {/* Paragraph */}
          <motion.p className="hero-para" variants={itemVariants}>
            {slide.para}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div className="hero-ctas" variants={itemVariants}>
            <PrimaryButton icon={<ArrowRight size={16} />}>
              {slide.cta1}
            </PrimaryButton>
            <OutlineButton icon={<ArrowRight size={16} />}>
              {slide.cta2}
            </OutlineButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Right slider controls */}
      <div className="hero-slider-controls" role="group" aria-label="Slide controls">
        {Array.from({ length: TOTAL_DOTS }).map((_, i) => (
          <button
            key={i}
            className={`hero-dot${activeDot === i ? ' active' : ''}`}
            onClick={() => setActiveDot(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={activeDot === i ? 'true' : undefined}
          />
        ))}
        <motion.button
          className="hero-pause-btn"
          onClick={() => setPaused((p) => !p)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
        >
          {paused ? <Play size={12} /> : <Pause size={12} />}
        </motion.button>
      </div>
    </section>
  )
}
