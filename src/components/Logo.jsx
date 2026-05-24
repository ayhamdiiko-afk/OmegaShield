import React from 'react'
import { motion } from 'framer-motion'

const Logo = ({ size = 'medium' }) => {
  const sizes = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
    xl: 'w-24 h-24',
  }

  return (
    <motion.div
      className={`${sizes[size]} relative`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="crownGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#FFA500" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Crown Base */}
        <path
          d="M 20 50 L 30 20 L 50 10 L 70 20 L 80 50 Z"
          fill="url(#crownGradient)"
          filter="url(#glow)"
          stroke="#FFD700"
          strokeWidth="2"
        />

        {/* Crown Points */}
        <circle cx="30" cy="20" r="4" fill="#FFD700" filter="url(#glow)" />
        <circle cx="50" cy="8" r="5" fill="#FFD700" filter="url(#glow)" />
        <circle cx="70" cy="20" r="4" fill="#FFD700" filter="url(#glow)" />

        {/* K Letter */}
        <g fill="#0F0F0F" stroke="#FFD700" strokeWidth="1.5">
          <rect x="40" y="35" width="3" height="35" />
          <line x1="43" y1="45" x2="60" y2="35" strokeWidth="2" />
          <line x1="43" y1="60" x2="60" y2="70" strokeWidth="2" />
        </g>

        {/* Decorative Elements */}
        <circle cx="25" cy="55" r="2" fill="#FFD700" opacity="0.6" />
        <circle cx="75" cy="55" r="2" fill="#FFD700" opacity="0.6" />
      </svg>

      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-kingdom-gold opacity-20 blur-lg"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
    </motion.div>
  )
}

export default Logo
