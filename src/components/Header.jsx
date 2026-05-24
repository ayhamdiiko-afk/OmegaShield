import React from 'react'
import { motion } from 'framer-motion'
import { FiLogOut, FiUser, FiSettings, FiBell } from 'react-icons/fi'
import Logo from './Logo'
import { Link } from 'react-router-dom'

const Header = ({ user, onLogout }) => {
  return (
    <motion.header
      className="bg-kingdom-darker border-b border-kingdom-border sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/home" className="flex items-center gap-3 group">
            <Logo size="medium" />
            <div>
              <h1 className="text-2xl font-bold text-kingdom-gold group-hover:text-kingdom-accent smooth-transition">
                KINGDOM
              </h1>
              <p className="text-xs text-gray-500">CHAT</p>
            </div>
          </Link>

          <div className="flex items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative text-gray-400 hover:text-kingdom-gold smooth-transition"
            >
              <FiBell size={24} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-kingdom-accent rounded-full animate-pulse" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-400 hover:text-kingdom-gold smooth-transition"
            >
              <FiSettings size={24} />
            </motion.button>

            <Link to="/profile">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-kingdom-card border border-kingdom-border rounded-lg hover:border-kingdom-gold smooth-transition"
              >
                <img
                  src={user?.avatar || 'https://via.placeholder.com/32'}
                  alt={user?.name}
                  className="w-8 h-8 rounded-full border border-kingdom-gold"
                />
                <span className="text-sm font-semibold text-white hidden sm:block">
                  {user?.name}
                </span>
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLogout}
              className="text-gray-400 hover:text-kingdom-danger smooth-transition"
            >
              <FiLogOut size={24} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header
