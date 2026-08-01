import { motion } from 'framer-motion'
import { ShieldCheck, Users, BadgeCheck, Clock } from 'lucide-react'
import './FeatureCards.css'

const CARDS = [
  {
    id: 'advanced-technology',
    icon: <ShieldCheck />,
    title: 'Advanced Technology',
    desc: 'World-class machinery and modern techniques.',
  },
  {
    id: 'experienced-team',
    icon: <Users />,
    title: 'Experienced Team',
    desc: 'Skilled professionals delivering precision and quality.',
  },
  {
    id: 'quality-assurance',
    icon: <BadgeCheck />,
    title: 'Quality Assurance',
    desc: 'Committed to safety, quality and timely delivery.',
  },
  {
    id: 'on-time-delivery',
    icon: <Clock />,
    title: 'On-time Delivery',
    desc: 'We value time and ensure projects stay on schedule.',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function FeatureCards() {
  return (
    <section className="feature-cards-section" aria-label="Feature highlights">
      <div className="feature-cards-inner">
        <motion.div
          className="feature-cards-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {CARDS.map(({ id, icon, title, desc }) => (
            <motion.article
              key={id}
              id={id}
              className="feature-card"
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              <div className="feature-card-icon" aria-hidden="true">
                {icon}
              </div>
              <div className="feature-card-body">
                <h3 className="feature-card-title">{title}</h3>
                <p className="feature-card-desc">{desc}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
