import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { FiX, FiAward, FiTrendingUp, FiTarget } from 'react-icons/fi'
import { GameContext } from '../context/GameContext'

const GameStats = ({ onClose }) => {
  const { coins, gameHistory, userStats } = useContext(GameContext)

  const stats = [
    { icon: FiAward, label: 'إجمالي الفوز', value: userStats.totalWins, color: 'text-kingdom-success' },
    { icon: FiTarget, label: 'إجمالي الخسارة', value: userStats.totalLosses, color: 'text-kingdom-danger' },
    { icon: FiTrendingUp, label: 'إجمالي الأرباح', value: userStats.totalEarnings, color: 'text-kingdom-gold' },
  ]

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gradient-to-b from-kingdom-card to-kingdom-darker border-2 border-kingdom-gold rounded-2xl p-8 max-w-3xl w-full max-h-[80vh] overflow-y-auto"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-kingdom-gold">📊 إحصائياتي</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-kingdom-danger/10 rounded-lg text-kingdom-danger"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Coins */}
        <div className="bg-gradient-kingdom rounded-xl p-6 mb-6 text-kingdom-darker">
          <p className="text-sm opacity-80 mb-2">رصيد الكوينزات</p>
          <div className="flex items-center gap-3">
            <span className="text-4xl">🪙</span>
            <span className="text-4xl font-bold">{coins}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                className="bg-kingdom-darker border border-kingdom-border rounded-xl p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Icon className={`${stat.color} mb-2`} size={24} />
                <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Game History */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">سجل الألعاب</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {gameHistory.length > 0 ? (
              gameHistory.slice().reverse().map((game, index) => (
                <motion.div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    game.result === 'فوز'
                      ? 'bg-kingdom-success/10 border-kingdom-success'
                      : 'bg-kingdom-danger/10 border-kingdom-danger'
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">{game.gameName}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(game.timestamp).toLocaleString('ar-SA')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${game.result === 'فوز' ? 'text-kingdom-success' : 'text-kingdom-danger'}`}>
                        {game.result === 'فوز' ? '+' : '-'}{game.bet}
                      </p>
                      {game.result === 'فوز' && <p className="text-sm text-kingdom-gold">+{game.amount}</p>}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-8">لم تلعب أي لعبة حتى الآن</p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default GameStats
