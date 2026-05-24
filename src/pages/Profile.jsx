import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { FiEdit2, FiCamera, FiGift, FiTrendingUp, FiAward } from 'react-icons/fi'

const Profile = ({ user, setUser }) => {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || 'مرحباً بك في KINGDOM CHAT',
  })

  const handleLogout = () => {
    navigate('/')
  }

  const stats = [
    { label: 'الهدايا المستلمة', value: '1,247', icon: FiGift },
    { label: 'الجلسات', value: '48', icon: FiTrendingUp },
    { label: 'الإنجازات', value: '12', icon: FiAward },
  ]

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          className="card-kingdom mb-8 relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-32 bg-gradient-kingdom rounded-t-xl relative">
            <motion.button
              className="absolute bottom-2 right-2 p-2 bg-kingdom-darker rounded-full border border-kingdom-gold"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiCamera className="text-kingdom-gold" size={20} />
            </motion.button>
          </div>

          <div className="p-6 relative -mt-16 flex items-end gap-4">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-32 h-32 rounded-full border-4 border-kingdom-darker bg-kingdom-card"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white">{user?.name}</h1>
              <p className="text-gray-400">@{user?.name?.toLowerCase().replace(' ', '')}</p>
            </div>
            <motion.button
              onClick={() => setIsEditing(!isEditing)}
              className="btn-kingdom flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiEdit2 size={18} />
              {isEditing ? 'إلغاء' : 'تعديل'}
            </motion.button>
          </div>
        </motion.div>

        {isEditing && (
          <motion.div
            className="card-kingdom mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-xl font-bold text-white mb-4">تعديل الملف الشخصي</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-kingdom-gold mb-2">الاسم</label>
                <input
                  type="text"
                  className="input-kingdom w-full"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-kingdom-gold mb-2">النبذة</label>
                <textarea
                  className="input-kingdom w-full h-24"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                />
              </div>
              <motion.button
                className="btn-kingdom w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                حفظ التغييرات
              </motion.button>
            </div>
          </motion.div>
        )}

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                className="card-kingdom text-center"
                whileHover={{ scale: 1.05 }}
              >
                <Icon className="text-kingdom-gold mx-auto mb-2" size={32} />
                <p className="text-3xl font-bold text-kingdom-gold mb-2">{stat.value}</p>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          className="card-kingdom"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">حالة VIP</h2>
              <p className="text-gray-400">ترقّ الآن واحصل على مميزات حصرية</p>
            </div>
            <motion.button
              className="btn-kingdom"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              الترقية إلى VIP 👑
            </motion.button>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default Profile
