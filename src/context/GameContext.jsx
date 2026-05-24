import React, { createContext, useState } from 'react'

export const GameContext = createContext()

export const GameProvider = ({ children }) => {
  const [coins, setCoins] = useState(1000)
  const [gameHistory, setGameHistory] = useState([])
  const [userStats, setUserStats] = useState({
    totalWins: 0,
    totalLosses: 0,
    totalEarnings: 0,
  })

  const addGameHistory = (gameData) => {
    setGameHistory([...gameHistory, gameData])
    
    if (gameData.result === 'فوز') {
      setUserStats(prev => ({
        ...prev,
        totalWins: prev.totalWins + 1,
        totalEarnings: prev.totalEarnings + gameData.amount,
      }))
    } else if (gameData.result === 'خسارة') {
      setUserStats(prev => ({
        ...prev,
        totalLosses: prev.totalLosses + 1,
      }))
    }
  }

  return (
    <GameContext.Provider
      value={{
        coins,
        setCoins,
        gameHistory,
        userStats,
        addGameHistory,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
