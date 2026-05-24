import React, { useState, useContext } from 'react'
import { motion } from 'framer-motion'
import { FiX, FiVolume2, FiVolumeX } from 'react-icons/fi'
import { GameContext } from '../context/GameContext'

const GamesHub = ({ onClose }) => {
  const { coins, setCoins, gameHistory, addGameHistory } = useContext(GameContext)
  const [selectedGame, setSelectedGame] = useState(null)
  const [sound, setSound] = useState(true)

  const games = [
    { id: 1, name: '🎲 لعبة الزهر', description: 'رمي النرد وتخمين النتيجة', icon: '🎲', multiplier: 2 },
    { id: 2, name: '✂️ حجر ورقة مقص', description: 'العب ضد الذكاء الاصطناعي', icon: '✂️', multiplier: 2 },
    { id: 3, name: '🎡 عجلة الحظ', description: 'ادور العجلة وفوز كبير', icon: '🎡', multiplier: 3 },
    { id: 4, name: '🔢 تخمين الرقم', description: 'خمن الرقم بين 1-100', icon: '🔢', multiplier: 2.5 },
    { id: 5, name: '🎰 ماكينة الحظ', description: 'ثلاث أرقام للفوز الكبير', icon: '🎰', multiplier: 5 },
    { id: 6, name: '🏎️ سباق السرعة', description: 'اختر الفائز واربح', icon: '🏎️', multiplier: 2 },
    { id: 7, name: '🧠 الأسئلة والأجوبة', description: 'أجب على الأسئلة بشكل صحيح', icon: '🧠', multiplier: 1.5 },
    { id: 8, name: '🎴 لعبة الورق', description: 'سحب ورقة وتخمين الرقم', icon: '🎴', multiplier: 2 },
    { id: 9, name: '🌈 لعبة الألوان', description: 'اختر اللون الصحيح', icon: '🌈', multiplier: 2 },
    { id: 10, name: '🚀 Crash Game', description: 'توقف قبل ما ينهار', icon: '🚀', multiplier: 3 },
    { id: 11, name: '👯 لعبة التوأم', description: 'اختر رقم التوأم المحظوظ', icon: '👯', multiplier: 4 },
    { id: 12, name: '🍀 الحظ الأخضر', description: 'ادور عجلة الحظ', icon: '🍀', multiplier: 2.5 },
  ]

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-kingdom-card border-2 border-kingdom-gold rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-kingdom-darker border-b border-kingdom-gold p-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-kingdom-gold">🎮 مركز الألعاب</h2>
            <p className="text-gray-400 text-sm">اختر لعبتك واربح الكوينزات</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-kingdom-gold/10 px-4 py-2 rounded-lg">
              <span className="text-2xl">🪙</span>
              <span className="text-2xl font-bold text-kingdom-gold">{coins}</span>
            </div>
            <button
              onClick={() => setSound(!sound)}
              className="p-2 hover:bg-kingdom-gold/10 rounded-lg smooth-transition"
            >
              {sound ? <FiVolume2 size={24} className="text-kingdom-gold" /> : <FiVolumeX size={24} className="text-gray-500" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-kingdom-danger/10 rounded-lg smooth-transition text-kingdom-danger"
            >
              <FiX size={24} />
            </button>
          </div>
        </div>

        {/* Games Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {games.map((game, index) => (
              <motion.button
                key={game.id}
                onClick={() => setSelectedGame(game)}
                className="bg-gradient-to-br from-kingdom-card to-kingdom-darker border-2 border-kingdom-border rounded-xl p-6 hover:border-kingdom-gold smooth-transition group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, borderColor: '#FFD700' }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-5xl mb-3 group-hover:scale-110 smooth-transition">{game.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{game.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{game.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-kingdom-gold/20 text-kingdom-gold px-2 py-1 rounded">x{game.multiplier}</span>
                  <span className="text-kingdom-accent">→</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Game Modal */}
      {selectedGame && (
        <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} sound={sound} />
      )}
    </motion.div>
  )
}

// Game Modal Component
const GameModal = ({ game, onClose, sound }) => {
  const { coins, setCoins, addGameHistory } = useContext(GameContext)
  const [bet, setBet] = useState(10)
  const [gameResult, setGameResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const playGame = async () => {
    if (bet > coins) {
      alert('رصيدك غير كافي!')
      return
    }

    setLoading(true)
    setCoins(coins - bet)

    // محاكاة اللعبة
    setTimeout(() => {
      const isWin = Math.random() > 0.5
      const winAmount = isWin ? bet * game.multiplier : 0

      setGameResult({
        won: isWin,
        amount: winAmount,
      })

      if (isWin) {
        setCoins((prev) => prev + winAmount)
      }

      addGameHistory({
        gameName: game.name,
        bet,
        result: isWin ? 'فوز' : 'خسارة',
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
      onClick={onClose}
    >
      <motion.div
        className="bg-gradient-to-b from-kingdom-card to-kingdom-darker border-2 border-kingdom-gold rounded-2xl p-8 max-w-md w-full"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        onClick={(e) => e.stopPropagation()}
      >
        {!gameResult ? (
          <>
            <div className="text-center mb-6">
              <div className="text-7xl mb-4">{game.icon}</div>
              <h3 className="text-2xl font-bold text-kingdom-gold mb-2">{game.name}</h3>
              <p className="text-gray-400">{game.description}</p>
            </div>

            <div className="bg-kingdom-darker/50 rounded-xl p-4 mb-6">
              <p className="text-gray-400 text-sm mb-3">الرهان الخاص بك:</p>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setBet(Math.max(10, bet - 10))}
                  className="px-3 py-2 bg-kingdom-gold/20 text-kingdom-gold rounded hover:bg-kingdom-gold/30 smooth-transition"
                >
                  -
                </button>
                <input
                  type="number"
                  value={bet}
                  onChange={(e) => setBet(Math.max(10, parseInt(e.target.value) || 10))}
                  className="bg-kingdom-card border border-kingdom-gold rounded px-4 py-2 text-center text-white w-24 focus:outline-none"
                />
                <button
                  onClick={() => setBet(bet + 10)}
                  className="px-3 py-2 bg-kingdom-gold/20 text-kingdom-gold rounded hover:bg-kingdom-gold/30 smooth-transition"
                >
                  +
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">الرصيد: {coins - bet} 🪙</p>
            </div>

            <motion.button
              onClick={playGame}
              disabled={loading}
              className="btn-kingdom w-full disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? '🎮 جارِ اللعب...' : '🎮 العب الآن'}
            </motion.button>

            <button
              onClick={onClose}
              className="w-full mt-3 py-2 text-gray-400 hover:text-white border border-gray-600 rounded-lg smooth-transition"
            >
              إلغاء
            </button>
          </>
        ) : (
          <motion.div
            className="text-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <div className={`text-6xl mb-4 ${
              gameResult.won ? 'animate-bounce' : 'opacity-50'
            }`}>
              {gameResult.won ? '🎉' : '😢'}
            </div>
            <h3 className={`text-3xl font-bold mb-4 ${
              gameResult.won ? 'text-kingdom-success' : 'text-kingdom-danger'
            }`}>
              {gameResult.won ? 'فزت! 🎊' : 'حاول مرة أخرى'}
            </h3>
            {gameResult.won && (
              <div className="bg-kingdom-gold/20 border border-kingdom-gold rounded-lg p-4 mb-6">
                <p className="text-gray-400 text-sm mb-2">الجائزة:</p>
                <p className="text-4xl font-bold text-kingdom-gold">+{gameResult.amount} 🪙</p>
              </div>
            )}
            <div className="bg-kingdom-darker/50 rounded-lg p-3 mb-6">
              <p className="text-gray-400 text-sm">الرصيد الحالي:</p>
              <p className="text-2xl font-bold text-kingdom-gold">{coins} 🪙</p>
            </div>
            <motion.button
              onClick={() => setGameResult(null)}
              className="btn-kingdom w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              العب مرة أخرى
            </motion.button>
            <button
              onClick={onClose}
              className="w-full mt-3 py-2 text-gray-400 hover:text-white border border-gray-600 rounded-lg smooth-transition"
            >
              أغلق
            </button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default GamesHub
