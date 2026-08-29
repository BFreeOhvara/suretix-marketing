import { motion } from 'framer-motion'

const DIRECTIONS = {
  up: { x: 0, y: 30 },
  down: { x: 0, y: -20 },
  left: { x: 36, y: 0 },
  right: { x: -36, y: 0 },
  none: { x: 0, y: 0 },
}

export default function Reveal({
  children,
  delay = 0,
  direction = 'up',
  scale = false,
  className = '',
}) {
  const offset = DIRECTIONS[direction] || DIRECTIONS.up
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset, scale: scale ? 0.94 : 1 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, delay, ease: [0.22, 0.68, 0.32, 0.99] }}
    >
      {children}
    </motion.div>
  )
}
