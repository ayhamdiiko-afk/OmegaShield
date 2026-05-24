import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import RoomCard from '../components/RoomCard'
import { FiPlus, FiSearch } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const Home = ({ user }) => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  const rooms = [
    {
      id: 1,
      name: 'غرفة المتحدثين',
      host: 'أحمد محمد',
      hostAvatar: 'https://ui-avatars.com/api/?name=Ahmed&background=FFD700&color=0F0F0F',
      users: 24,
      maxUsers: 50,
      speakers: 5,
      likes: 1200,
      isVIP: false,
      background: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
    },
    {
      id: 2,
      name: 'الغرفة الملكية VIP',
      host: 'فاطمة علي',
      hostAvatar: 'https://ui-avatars.com/api/?name=Fatima&background=FFD700&color=0F0F0F',
      users: 15,
      maxUsers: 30,
      speakers: 3,
      likes: 2500,
      isVIP: true,
      background: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400',
    },
    {
      id: 3,
      name: 'غرفة الألعاب',
      host: 'محمود حسن',
      hostAvatar: 'https://ui-avatars.com/api/?name=Mahmoud&background=FFD700&color=0F0F0F',
      users: 32,
      maxUsers: 50,
      speakers: 8,
      likes: 1800,
      isVIP: false,
      background: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400',
    },
    {
      id: 4,
      name: 'غرفة الموسيقى',
      host: 'سارة محمود',
      hostAvatar: 'https://ui-avatars.com/api/?name=Sarah&background=FFD700&color=0F0F0F',
      users: 18,
      maxUsers: 40,
      speakers: 2,
      likes: 950,
      isVIP: false,
      background: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400',
    },
    {
      id: 5,
      name: 'غرفة البث المباشر',
      host: 'محمد علي',
      hostAvatar: 'https://ui-avatars.com/api/?name=Mohammed&background=FFD700&color=0F0F0F',
      users: 45,
      maxUsers: 100,
      speakers: 4,
      likes: 3200,
      isVIP: true,
      background: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400',
    },
    {
      id: 6,
      name: 'غرفة النقاش',
      host: 'ليلى محمد',
      hostAvatar: 'https://ui-avatars.com/api/?name=Leila&background=FFD700&color=0F0F0F',
      users: 28,
      maxUsers: 50,
      speakers: 6,
      likes: 1100,
      isVIP: false,
      background: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400',
    },
  ]

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter =
      filterType === 'all' || (filterType === 'vip' && room.isVIP) || (filterType === 'popular' && room.likes > 1500)
    return matchesSearch && matchesFilter
  })

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-white mb-2">مرحباً {user?.name} 👋</h2>
          <p className="text-gray-400">اختر غرفة وابدأ محادثتك الآن</p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-3.5 text-kingdom-gold" size={20} />
            <input
              type="text"
              placeholder="ابحث عن الغرف..."
              className="input-kingdom pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="input-kingdom px-4"
          >
            <option value="all">جميع الغرف</option>
            <option value="vip">غرف VIP</option>
            <option value="popular">الأكثر شهرة</option>
          </select>

          <motion.button
            onClick={() => {}}
            className="btn-kingdom flex items-center gap-2 whitespace-nowrap"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiPlus size={20} />
            إنشاء غرفة
          </motion.button>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          {filteredRooms.map((room, index) => (
            <RoomCard key={room.id} room={room} index={index} />
          ))}
        </motion.div>

        {filteredRooms.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-2xl text-gray-400">لم تُعثر على غرف متطابقة</p>
            <p className="text-gray-500">حاول تغيير معايير البحث</p>
          </motion.div>
        )}
      </main>
    </div>
  )
}

export default Home
