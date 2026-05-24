import React from 'react'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const gifts = [
  { emoji: '💎', name: 'Diamond' },
  { emoji: '🌹', name: 'Rose' },
  { emoji: '👑', name: 'Crown' },
  { emoji: '⭐', name: 'Star' },
  { emoji: '🎁', name: 'Gift' },
  { emoji: '🔥', name: 'Fire' },
  { emoji: '💰', name: 'Money' },
  { emoji: '🎵', name: 'Music' },
]

const FloatingGift = ({ gift, delay }) => {
  return (
    <motion.div
      className="fixed pointer-events-none"
      initial={{
        x: Math.random() * window.innerWidth,
        y: window.innerHeight,
        opacity: 1,
        scale: 1,
      }}
      animate={{
        x: Math.random() * window.innerWidth,
        y: -100,
        opacity: 0,
        scale: 0.5,
        rotate: 360,
      }}
      transition={{
        duration: 3,
        delay: delay,
        ease: 'easeOut',
      }}
    >
      <div className="text-4xl filter drop-shadow-lg">{gift.emoji}</div>
    </motion.div>
  )
}

const FloatingGifts = ({ visible = false }) => {
  const [floatingGifts, setFloatingGifts] = useState([])

  useEffect(() => {
    if (visible) {
      const newGifts = Array.from({ length: 8 }).map((_, i) => ({
        id: Date.now() + i,
        gift: gifts[Math.floor(Math.random() * gifts.length)],
        delay: i * 0.1,
      }))
      setFloatingGifts(newGifts)

      const timer = setTimeout(() => {
        setFloatingGifts([])
      }, 3500)

      return () => clearTimeout(timer)
    }
  }, [visible])

  return (
    <>
      {floatingGifts.map((item) => (
        <FloatingGift key={item.id} gift={item.gift} delay={item.delay} />
      ))}
    </>
  )
}

export default FloatingGifts
