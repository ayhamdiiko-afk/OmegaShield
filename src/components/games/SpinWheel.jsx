import React, { useState, useContext } from 'react'
import { motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import { GameContext } from '../context/GameContext'

const SpinWheel = ({ onClose }) => {
  const { coins, setCoins, addGameHistory } = useContext(GameContext)
  const [bet, setBet] = useState(10)
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState(null)

  const wheelSegments = [
    { id: 1, color: '#FF6B6B', multiplier: 2, label: '2x' },
    { id: 2, color: '#4ECDC4', multiplier: 3, label: '3x' },
    { id: 3, color: '#FFE66D', multiplier: 1.5, label: '1.5x' },
    { id: 4, color: '#95E1D3', multiplier: 5, label: '5x' },
    { id: 5, color: '#F38181', multiplier: 2, label: '2x' },
    { id: 6, color: '#AA96DA', multiplier: 4, label: '4x' },
  ]

  const spin = () => {
    if (bet > coins) {
      alert('رصيدك غير كافي!')
      return
    }

    setSpinning(true)
    setCoins(coins - bet)

    const spins = Math.floor(Math.random() * 5) + 5
    const segmentDegree = 360 / wheelSegments.length
    const randomDegree = Math.random() * segmentDegree
    const totalDegree = spins * 360 + randomDegree

    setRotation(totalDegree)

    setTimeout(() => {
      const winningSegmentIndex = Math.floor(randomDegree / segmentDegree)
      const winningSegment = wheelSegments[winningSegmentIndex]
      const winAmount = Math.floor(bet * winningSegment.multiplier)

      setResult({
        segment: winningSegment,
        winAmount,
      })

      setCoins((prev) => prev + winAmount)

      addGameHistory({
        gameName: '🎡 عجلة الحظ',
        bet,
        result: 'فوز',
        amount: winAmount,
        timestamp: new Date(),
      })

      setSpinning(false)
    }, 4000)
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gradient-to-b from-kingdom-card to-kingdom-darker border-2 border-kingdom-gold rounded-2xl p-8 max-w-2xl w-full"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-kingdom-gold">🎡 عجلة الحظ</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-kingdom-danger/10 rounded-lg text-kingdom-danger"
          >
            <FiX size={24} />
          </button>
        </div>

        {!result ? (
          <>
            {/* Wheel */}
            <div className="flex justify-center mb-8">
              <div className="relative w-60 h-60">
                <motion.div
                  className="w-full h-full rounded-full border-4 border-kingdom-gold flex items-center justify-center"
                  style={{
                    background: `conic-gradient(${
                      wheelSegments.map((s) => s.color).join(', ')
                    })`,
                  }}
                  animate={spinning ? { rotate: 360 } : { rotate: 0 }}
                  transition={spinning ? { duration: 4, ease: 'easeOut' } : {}}
                  initial={{ rotate }}
                >
                  <div className="absolute w-12 h-12 bg-kingdom-gold rounded-full border-2 border-kingdom-darker flex items-center justify-center text-lg">🎯</div>
                </motion.div>
                {/* Pointer */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 text-2xl">📍</div>
              </div>
            </div>

            {/* Bet Section */}
            <div className="bg-kingdom-darker/50 rounded-xl p-4 mb-6">
              <p className="text-gray-400 text-sm mb-3">الرهان:</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setBet(Math.max(10, bet - 10))}
                  className="px-4 py-2 bg-kingdom-gold/20 text-kingdom-gold rounded hover:bg-kingdom-gold/30"
                >
                  -
                </button>
                <input
                  type="number"
                  value={bet}
                  onChange={(e) => setBet(Math.max(10, parseInt(e.target.value) || 10))}
                  className="bg-kingdom-card border border-kingdom-gold rounded px-4 py-2 text-center text-white flex-1 focus:outline-none"
                />
                <button
                  onClick={() => setBet(bet + 10)}
                  className="px-4 py-2 bg-kingdom-gold/20 text-kingdom-gold rounded hover:bg-kingdom-gold/30"
                >
                  +
                </button>
              </div>
            </div>

            <motion.button
              onClick={spin}
              disabled={spinning}
              className="btn-kingdom w-full disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {spinning ? '🎡 الدوران...' : '🎡 ادور العجلة'}
            </motion.button>
          </>
        ) : (
          <motion.div
            className="text-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <div className="text-6xl mb-4 animate-bounce">🎉</div>
            <h3 className="text-3xl font-bold text-kingdom-gold mb-2">فزت!</h3>
            <p className="text-gray-400 mb-6">الضارب: {result.segment.label}</p>
            <div className="bg-kingdom-gold/20 border border-kingdom-gold rounded-lg p-4 mb-6">
              <p className="text-kingdom-gold text-lg font-bold">+{result.winAmount} 🪙</p>
            </div>
            <motion.button
              onClick={() => {
                setResult(null)
                setRotation(0)
              }}
              className="btn-kingdom w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              ادور مرة أخرى
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default SpinWheel
