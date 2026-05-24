import React from 'react'
import { motion } from 'framer-motion'
import { FiUsers, FiMic, FiHeart } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const RoomCard = ({ room, index }) => {
  return (
    <Link to={`/room/${room.id}`}>
      <motion.div
        className="card-kingdom cursor-pointer group overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -10 }}
      >
        <div className="relative h-32 bg-gradient-kingdom mb-4 rounded-lg overflow-hidden">
          <img
            src={room.background || 'https://via.placeholder.com/400x200'}
            alt={room.name}
            className="w-full h-full object-cover group-hover:scale-110 smooth-transition"
          />
          {room.isVIP && (
            <motion.div
              className="absolute top-2 right-2 bg-kingdom-gold text-kingdom-darker px-3 py-1 rounded-full text-xs font-bold"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              👑 VIP
            </motion.div>
          )}
        </div>

        <div className="space-y-3">
          <h3 className="font-bold text-lg text-white group-hover:text-kingdom-gold smooth-transition">
            {room.name}
          </h3>

          <div className="flex items-center gap-2">
            <img
              src={room.hostAvatar || 'https://via.placeholder.com/32'}
              alt={room.host}
              className="w-6 h-6 rounded-full border border-kingdom-gold"
            />
            <span className="text-sm text-gray-400">
              بواسطة <span className="text-kingdom-gold font-semibold">{room.host}</span>
            </span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-kingdom-border">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <FiUsers size={16} className="text-kingdom-gold" />
              <span>{room.users}/{room.maxUsers}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <FiMic size={16} className="text-kingdom-accent" />
              <span>{room.speakers} متحدث</span>
            </div>
            <motion.div
              className="flex items-center gap-1"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FiHeart size={16} className="text-kingdom-danger" />
              <span className="text-sm text-gray-400">{room.likes}</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

export default RoomCard
