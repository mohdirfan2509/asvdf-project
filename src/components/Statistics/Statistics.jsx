import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, Users, Clock, Building2 } from 'lucide-react'
import './Statistics.css'

const STATS = [
  {
    id: 'projects-completed',
    icon: <Briefcase />,
    number: 100,
    suffix: '+',
    label: 'Projects Completed',
  },
  {
    id: 'happy-clients',
    icon: <Users />,
    number: 50,
    suffix: '+',
    label: 'Happy Clients',
  },
  {
    id: 'years-experience',
    icon: <Clock />,
    number: 10,
    suffix: '+',
    label: 'Years Experience',
  },
  {
    id: 'industries-served',
    icon: <Building2 />,
    number: 8,
    suffix: '+',
    label: 'Industries Served',
  },
]

/* Animated counter hook */
function useCountUp(target, duration = 1800, inView) {
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    const steps = 60
    const increment = target / steps
    const interval = duration / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, interval)

    return () => clearInterval(timer)
  }, [inView, target, duration])

  return count
}

function StatItem({ stat }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const count = useCountUp(stat.number, 1600, inView)

  return (
    <motion.div
      ref={ref}
      id={stat.id}
      className="stat-item"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="stat-icon" aria-hidden="true">
        {stat.icon}
      </div>
      <div className="stat-body">
        <div className="stat-number" aria-label={`${stat.number}${stat.suffix}`}>
          {count}{stat.suffix}
        </div>
        <div className="stat-label">{stat.label}</div>
      </div>
    </motion.div>
  )
}

export default function Statistics() {
  return (
    <section className="statistics-section" aria-label="Company statistics">
      <div className="statistics-inner">
        <div className="statistics-container">
          {STATS.map((stat) => (
            <StatItem key={stat.id} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  )
}
