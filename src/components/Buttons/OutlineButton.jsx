import { motion } from 'framer-motion'
import './Buttons.css'

export default function OutlineButton({ children, icon, onClick, ...props }) {
  return (
    <motion.button
      className="btn-outline"
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {children}
      {icon && <span className="btn-icon">{icon}</span>}
    </motion.button>
  )
}
