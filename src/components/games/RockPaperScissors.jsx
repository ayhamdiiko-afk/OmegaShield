import React, { useState, useContext } from 'react'
import { motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import { GameContext } from '../context/GameContext'

const RockPaperScissors = ({ onClose }) => {
  const { coins, setCoins, addGameHistory } = useContext(GameContext)
  const [bet, setBet] = useState(10)
  const [playerChoice, setPlayerChoice] = useState(null)
  const [gameResult, setGameResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const choices = [
    { name: 'حجر', emoji: '🪨', beats: 'مقص' },
    { name: 'ورقة', emoji: '📄', beats: 'حجر' },
    { name: 'مقص', emoji: '✂️', beats: 'ورقة' },
  ]

  const playGame = () => {
    if (bet > coins) {
      alert('رصيدك غير كافي!')
      return
    }
    if (!playerChoice) {
      alert('اختر خيارك أولاً!')
      return
    }

    setLoading(true)
    setCoins(coins - bet)

    setTimeout(() => {
      const computerChoice = Math.floor(Math.random() * 3)
      const playerChoiceIndex = choices.findIndex((c) => c.name === playerChoice)

      let won = false
      let message = ''

      if (playerChoiceIndex === computerChoice) {
        message = 'تعادل!'
        setCoins((prev) => prev + bet)
      } else if (choices[playerChoiceIndex].beats === choices[computerChoice].name) {
        message = 'فزت!'
        won = true
        const winAmount = bet * 2
        setCoins((prev) => prev + winAmount)
        addGameHistory({
          gameName: '✂️ حجر ورقة مقص',
          bet,
          result: 'فوز',
          amount: winAmount,
          timestamp: new Date(),
        })
      } else {
        message = 'خسرت!'
        addGameHistory({
          gameName: '✂️ حجر ورقة مقص',
          bet,
          result: 'خسارة',
          amount: 0,
          timestamp: new Date(),
        })
      }

      setGameResult({
        playerChoice: choices[playerChoiceIndex],
        computerChoice: choices[computerChoice],
        message,
        won,
      })

      setLoading(false)
    }, 1500)
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
          <h2 className="text-3xl font-bold text-kingdom-gold">✂️ حجر ورقة مقص</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-kingdom-danger/10 rounded-lg text-kingdom-danger"
          >
            <FiX size={24} />
          </button>
        </div>

        {!gameResult ? (
          <>
            <p className="text-gray-400 mb-6">اختر اختيارك واللعب ضد الحاسوب:</p>

            {/* Choices */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {choices.map((choice) => (
                <motion.button
                  key={choice.name}
                  onClick={() => setPlayerChoice(choice.name)}
                  className={`p-6 rounded-xl smooth-transition ${
                    playerChoice === choice.name
                      ? 'bg-kingdom-gold text-kingdom-darker border-2 border-kingdom-gold'
                      : 'bg-kingdom-darker border-2 border-kingdom-border hover:border-kingdom-gold'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-4xl mb-2">{choice.emoji}</div>
                  <p className="font-bold text-sm">{choice.name}</p>
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
              <p className="text-xs text-gray-500 mt-2">الرصيد: {coins - bet} 🪙</p>
            </div>

            <motion.button
              onClick={playGame}
              disabled={loading}
              className="btn-kingdom w-full disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? '⏳ جاري اللعب...' : '▶️ اللعب'}
            </motion.button>
          </>
        ) : (
          <motion.div
            className="text-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <div className="flex justify-center items-center gap-8 mb-6">
              <motion.div
                className="text-6xl"
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                {gameResult.playerChoice.emoji}
              </motion.div>
              <motion.div
                className="text-4xl text-kingdom-gold"
                animate={{ scale: [1, 1.5, 1] }}
              >
                VS
              </motion.div>
              <motion.div
                className="text-6xl"
                animate={{ rotate: [0, 10, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                {gameResult.computerChoice.emoji}
              </motion.div>
            </div>
            <h3 className={`text-3xl font-bold mb-6 ${
              gameResult.message === 'تعادل!' ? 'text-gray-400' : gameResult.won ? 'text-kingdom-success' : 'text-kingdom-danger'
            }`}>
              {gameResult.message}
            </h3>
            <motion.button
              onClick={() => {
                setGameResult(null)
                setPlayerChoice(null)
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

export default RockPaperScissors
