import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import { FiMail, FiLock, FiUser, FiPhone } from 'react-icons/fi'

const Login = ({ setIsAuthenticated, setUser }) => {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      setIsAuthenticated(true)
      setUser({
        id: '1',
        name: formData.name || formData.email.split('@')[0],
        email: formData.email,
        avatar: `https://ui-avatars.com/api/?name=${formData.name || formData.email}&background=FFD700&color=0F0F0F`,
        vipLevel: 0,
      })
      navigate('/home')
    }, 1500)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 bg-kingdom-gold rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute right-0 bottom-0 w-96 h-96 bg-kingdom-accent rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="flex justify-center mb-8" variants={itemVariants}>
          <Logo size="xl" />
        </motion.div>

        <motion.div className="text-center mb-8" variants={itemVariants}>
          <h1 className="text-4xl font-bold text-kingdom-gold mb-2">KINGDOM CHAT</h1>
          <p className="text-gray-400">الشات الصوتي الأول</p>
        </motion.div>

        <motion.div
          className="glass p-8 rounded-2xl backdrop-blur-xl"
          variants={itemVariants}
        >
          <div className="flex gap-4 mb-8">
            <motion.button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-lg font-semibold smooth-transition ${
                isLogin
                  ? 'bg-kingdom-gold text-kingdom-darker'
                  : 'bg-kingdom-card text-gray-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              دخول
            </motion.button>
            <motion.button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-lg font-semibold smooth-transition ${
                !isLogin
                  ? 'bg-kingdom-gold text-kingdom-darker'
                  : 'bg-kingdom-card text-gray-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              تسجيل
            </motion.button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <motion.div variants={itemVariants}>
                <div className="relative">
                  <FiUser className="absolute left-3 top-3.5 text-kingdom-gold" />
                  <input
                    type="text"
                    placeholder="اسمك الكامل"
                    className="input-kingdom pl-10 w-full"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required={!isLogin}
                  />
                </div>
              </motion.div>
            )}

            <motion.div variants={itemVariants}>
              <div className="relative">
                <FiMail className="absolute left-3 top-3.5 text-kingdom-gold" />
                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  className="input-kingdom pl-10 w-full"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </motion.div>

            {!isLogin && (
              <motion.div variants={itemVariants}>
                <div className="relative">
                  <FiPhone className="absolute left-3 top-3.5 text-kingdom-gold" />
                  <input
                    type="tel"
                    placeholder="رقم الهاتف"
                    className="input-kingdom pl-10 w-full"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required={!isLogin}
                  />
                </div>
              </motion.div>
            )}

            <motion.div variants={itemVariants}>
              <div className="relative">
                <FiLock className="absolute left-3 top-3.5 text-kingdom-gold" />
                <input
                  type="password"
                  placeholder="كلمة المرور"
                  className="input-kingdom pl-10 w-full"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading}
              className="btn-kingdom w-full mt-6 disabled:opacity-50"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <motion.div
                  className="flex justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ⏳
                </motion.div>
              ) : isLogin ? (
                'دخول'
              ) : (
                'تسجيل'
              )}
            </motion.button>
          </form>
        </motion.div>

        <motion.p className="text-center text-gray-400 mt-6" variants={itemVariants}>
          جميع الحقوق محفوظة © 2026 KINGDOM CHAT
        </motion.p>
      </motion.div>
    </div>
  )
}

export default Login
