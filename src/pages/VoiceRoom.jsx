import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { FiMic, FiMicOff, FiX, FiSend, FiPhoneOff, FiGift, FiHeart } from 'react-icons/fi'
import FloatingGifts from '../components/FloatingGifts'

const VoiceRoom = ({ user }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isMuted, setIsMuted] = useState(false)
  const [showGifts, setShowGifts] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    { id: 1, user: 'أحمد محمد', message: 'أهلا وسهلا الجميع', isVIP: true },
    { id: 2, user: 'فاطمة علي', message: 'كيف حالكم؟', isVIP: false },
  ])

  const speakers = [
    {
      id: 1,
      name: 'أحمد محمد',
      avatar: 'https://ui-avatars.com/api/?name=Ahmed&background=FFD700&color=0F0F0F',
      isVIP: true,
      isHost: true,
    },
    {
      id: 2,
      name: 'فاطمة علي',
      avatar: 'https://ui-avatars.com/api/?name=Fatima&background=FFD700&color=0F0F0F',
      isVIP: true,
      isHost: false,
    },
    {
      id: 3,
      name: 'محمود حسن',
      avatar: 'https://ui-avatars.com/api/?name=Mahmoud&background=FFD700&color=0F0F0F',
      isVIP: false,
      isHost: false,
    },
  ]

  const listeners = [
    {
      id: 4,
      name: 'سارة محمود',
      avatar: 'https://ui-avatars.com/api/?name=Sarah&background=FFD700&color=0F0F0F',
    },
    {
      id: 5,
      name: 'علي محمد',
      avatar: 'https://ui-avatars.com/api/?name=Ali&background=FFD700&color=0F0F0F',
    },
    {
      id: 6,
      name: 'ليلى حسن',
      avatar: 'https://ui-avatars.com/api/?name=Laila&background=FFD700&color=0F0F0F',
    },
  ]

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { id: messages.length + 1, user: user?.name, message, isVIP: false }])
      setMessage('')
    }
  }

  const handleSendGift = () => {
    setShowGifts(true)
    setTimeout(() => setShowGifts(false), 3500)
  }

  return (
    <div className="min-h-screen bg-kingdom-darker flex flex-col">
      <motion.div
        className="bg-kingdom-card border-b border-kingdom-border px-6 py-4 flex items-center justify-between"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-2xl font-bold text-kingdom-gold">غرفة المتحدثين</h1>
          <p className="text-sm text-gray-400">24 شخص</p>
        </div>
        <motion.button
          onClick={() => navigate('/home')}
          className="text-gray-400 hover:text-kingdom-danger smooth-transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiX size={28} />
        </motion.button>
      </motion.div>

      <div className="flex-1 flex gap-6 p-6 overflow-hidden">
        <motion.div
          className="flex-1 flex flex-col gap-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <FiMic className="text-kingdom-gold" />
              المتحدثون ({speakers.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AnimatePresence>
                {speakers.map((speaker, index) => (
                  <motion.div
                    key={speaker.id}
                    className={`relative p-4 rounded-xl border smooth-transition ${
                      speaker.isVIP
                        ? 'border-kingdom-gold bg-gradient-to-br from-kingdom-gold/10 to-kingdom-accent/10 shadow-kingdom-lg'
                        : 'border-kingdom-border bg-kingdom-card'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {speaker.isVIP && (
                      <motion.div
                        className="absolute -top-2 -right-2 text-2xl"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        👑
                      </motion.div>
                    )}

                    {speaker.isHost && (
                      <div className="absolute top-2 left-2 bg-kingdom-gold text-kingdom-darker px-2 py-1 rounded text-xs font-bold">
                        المضيف
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <motion.div
                        className="relative"
                        animate={isMuted ? {} : { scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        <img
                          src={speaker.avatar}
                          alt={speaker.name}
                          className={`w-12 h-12 rounded-full border-2 ${
                            speaker.isVIP ? 'border-kingdom-gold' : 'border-gray-600'
                          }`}
                        />
                        {!isMuted && (
                          <motion.div
                            className="absolute inset-0 rounded-full border-2 border-kingdom-accent"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 0.7, repeat: Infinity }}
                          />
                        )}
                      </motion.div>
                      <div className="flex-1">
                        <p className="font-semibold text-white">{speaker.name}</p>
                        <p className="text-xs text-gray-400">يتحدث الآن...</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-3">المستمعون ({listeners.length})</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {listeners.map((listener, index) => (
                <motion.div
                  key={listener.id}
                  className="flex items-center gap-2 p-3 bg-kingdom-card border border-kingdom-border rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={listener.avatar}
                    alt={listener.name}
                    className="w-8 h-8 rounded-full border border-gray-600"
                  />
                  <p className="text-sm text-white truncate">{listener.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="w-full sm:w-80 flex flex-col bg-kingdom-card border border-kingdom-border rounded-xl overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <AnimatePresence>
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  className={`text-sm ${
                    msg.isVIP ? 'bg-kingdom-gold/10 border-l-2 border-kingdom-gold' : 'bg-kingdom-darker/50'
                  } p-3 rounded`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <p className={`font-semibold ${msg.isVIP ? 'text-kingdom-gold' : 'text-white'}`}>
                    {msg.user} {msg.isVIP && '👑'}
                  </p>
                  <p className="text-gray-300">{msg.message}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="border-t border-kingdom-border p-4 space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="اكتب رسالة..."
                className="input-kingdom flex-1"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <motion.button
                onClick={handleSendMessage}
                className="p-2 bg-kingdom-gold text-kingdom-darker rounded-lg hover:bg-kingdom-accent smooth-transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiSend size={20} />
              </motion.button>
            </div>

            <div className="flex gap-2">
              <motion.button
                onClick={() => setIsMuted(!isMuted)}
                className={`flex-1 py-2 rounded-lg font-semibold smooth-transition ${
                  isMuted
                    ? 'bg-kingdom-danger text-white'
                    : 'bg-kingdom-gold text-kingdom-darker hover:bg-kingdom-accent'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isMuted ? <FiMicOff className="mx-auto" size={20} /> : <FiMic className="mx-auto" size={20} />}
              </motion.button>

              <motion.button
                onClick={handleSendGift}
                className="flex-1 py-2 bg-kingdom-card border border-kingdom-gold text-kingdom-gold rounded-lg font-semibold hover:bg-kingdom-gold/10 smooth-transition flex items-center justify-center gap-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiGift size={18} />
              </motion.button>

              <motion.button
                onClick={() => navigate('/home')}
                className="flex-1 py-2 bg-kingdom-card border border-kingdom-danger text-kingdom-danger rounded-lg font-semibold hover:bg-kingdom-danger/10 smooth-transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiPhoneOff className="mx-auto" size={20} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      <FloatingGifts visible={showGifts} />
    </div>
  )
}

export default VoiceRoom
