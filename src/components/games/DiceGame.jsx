import React, { useState, useContext } from 'react'
import { motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import { GameContext } from '../context/GameContext'

const DiceGame = ({ onClose }) => {
  const { coins, setCoins, addGameHistory } = useContext(GameContext)
  const [bet, setBet] = useState(10)
  const [selectedNumber, setSelectedNumber] = useState(null)
  const [diceResult, setDiceResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const playDice = async () => {
    if (bet > coins) {
      alert('رصيدك غير كافي!')
      return
    }
    if (!selectedNumber) {
      alert('اختر رقماً أولاً!')
      return
    }

    setLoading(true)
    setCoins(coins - bet)

    setTimeout(() => {
      const result = Math.floor(Math.random() * 6) + 1
      const won = result === selectedNumber
      const winAmount = won ? bet * 6 : 0

      setDiceResult({ result, won, winAmount })

      if (won) {
        setCoins((prev) => prev + winAmount)
      }

      addGameHistory({
        gameName: '🎲 لعبة الزهر',
        bet,
        result: won ? 'فوز' : 'خسارة',
        amount: winAmount,
        timestamp: new Date(),
      })

      setLoading(false)
    }, 2000)
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
          <h2 className="text-3xl font-bold text-kingdom-gold">🎲 لعبة الزهر</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-kingdom-danger/10 rounded-lg text-kingdom-danger"
          >
            <FiX size={24} />
          </button>
        </div>

        {!diceResult ? (
          <>
            <p className="text-gray-400 mb-6">اختر رقماً من 1 إلى 6 ورمي النرد:</p>

            {/* Numbers Selection */}
            <div className="grid grid-cols-6 gap-3 mb-8">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <motion.button
                  key={num}
                  onClick={() => setSelectedNumber(num)}
                  className={`p-4 rounded-xl font-bold text-2xl smooth-transition ${
                    selectedNumber === num
                      ? 'bg-kingdom-gold text-kingdom-darker border-2 border-kingdom-gold'
                      : 'bg-kingdom-darker border-2 border-kingdom-border hover:border-kingdom-gold text-white'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {num}
                </motion.button>
              ))}
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
              <p className="text-xs text-gray-500 mt-2">الرصيد المتبقي: {coins - bet} 🪙</p>
              <p className="text-xs text-kingdom-gold mt-1">الفوز: × 6 = {bet * 6} 🪙</p>
            </div>

            <motion.button
              onClick={playDice}
              disabled={loading}
              className="btn-kingdom w-full disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? '🎲 جارِ الرمي...' : '🎲 رمي النرد'}
            </motion.button>
          </>
        ) : (
          <motion.div
            className="text-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <div className={`text-8xl mb-6 ${
              diceResult.won ? 'animate-bounce' : 'opacity-50'
            }`}>
              {diceResult.result === 1 && '🎲'}
              {diceResult.result === 2 && '🎰'}
              {diceResult.result === 3 && '🎪'}
              {diceResult.result === 4 && '🎨'}
              {diceResult.result === 5 && '🎭'}
              {diceResult.result === 6 && '🎬'}
            </div>
            <p className="text-2xl font-bold mb-4 text-gray-400">النتيجة: <span className="text-kingdom-gold">{diceResult.result}</span></p>
            <h3 className={`text-3xl font-bold mb-6 ${
              diceResult.won ? 'text-kingdom-success' : 'text-kingdom-danger'
            }`}>
              {diceResult.won ? '🎉 فزت! 🎊' : '😢 حاول مرة أخرى'}
            </h3>
            {diceResult.won && (
              <div className="bg-kingdom-gold/20 border border-kingdom-gold rounded-lg p-4 mb-6">
                <p className="text-kingdom-gold text-lg font-bold">+{diceResult.winAmount} 🪙</p>
              </div>
            )}
            <motion.button
              onClick={() => {
                setDiceResult(null)
                setSelectedNumber(null)
              }}
              className="btn-kingdom w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              العب مرة أخرى
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default DiceGame
