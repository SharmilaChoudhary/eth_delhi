'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, ArrowLeft, MoreVertical, Heart, Star, Smile, Image, Paperclip } from 'lucide-react'
import { EnhancedProfile } from './EnhancedProfileCard'

interface Message {
  id: string
  senderId: string
  content: string
  timestamp: Date
  type: 'text' | 'image' | 'system'
  isRead: boolean
}

interface ChatInterfaceProps {
  currentUser: {
    id: string
    name: string
    image?: string
  }
  matchedProfile: EnhancedProfile
  onBack: () => void
  onClose: () => void
}

export default function ChatInterface({ 
  currentUser, 
  matchedProfile, 
  onBack, 
  onClose 
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: 'welcome',
      senderId: 'system',
      content: `You and ${matchedProfile.name} are now connected! Start your cosmic conversation.`,
      timestamp: new Date(),
      type: 'system',
      isRead: true
    }
    setMessages([welcomeMessage])
  }, [matchedProfile.name])

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])


  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      content: newMessage.trim(),
      timestamp: new Date(),
      type: 'text',
      isRead: false
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')
    
    // In a real app, this would send the message to the server/database
    // and the other user would receive it in real-time
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const icebreakers = [
    "Hey! I noticed we both love astrology. What's your favorite constellation? ✨",
    "Hi! Your bio caught my attention. Tell me more about your cosmic interests! 🌙",
    "Hello! I'd love to know what drew you to cosmic connections. 🌟",
    "Your zodiac traits seem really interesting! What's your take on compatibility? 💫",
    "I'm excited we matched! What's your favorite thing about astrology? ⭐"
  ]

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <motion.div 
        className="bg-gradient-to-r from-cosmic-500 to-accent-500 text-white p-4 shadow-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-white/20">
                  {matchedProfile.image ? (
                    <img 
                      src={matchedProfile.image} 
                      alt={matchedProfile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white">
                      {matchedProfile.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
              </div>
              
              <div>
                <h3 className="font-semibold">{matchedProfile.name}</h3>
                <p className="text-xs text-white/80">
                  {matchedProfile.zodiacSign && `${matchedProfile.zodiacSign} • `}
                  Last seen recently
                </p>
              </div>
            </div>
          </div>
          
          <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.length === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-6"
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm border">
                <div className="flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-red-500 mr-2" />
                  <Star className="w-6 h-6 text-yellow-500" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Start the conversation!</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Here are some cosmic icebreakers to get you started:
                </p>
                <div className="space-y-2">
                  {icebreakers.slice(0, 3).map((icebreaker, index) => (
                    <button
                      key={index}
                      onClick={() => setNewMessage(icebreaker)}
                      className="w-full text-left p-3 bg-cosmic-50 hover:bg-cosmic-100 rounded-xl text-sm text-cosmic-700 transition-colors"
                    >
                      {icebreaker}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex ${
                  message.senderId === currentUser.id ? 'justify-end' : 
                  message.senderId === 'system' ? 'justify-center' : 'justify-start'
                }`}
              >
                {message.type === 'system' ? (
                  <div className="bg-gray-200 text-gray-600 px-4 py-2 rounded-full text-sm">
                    {message.content}
                  </div>
                ) : (
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.senderId === currentUser.id
                      ? 'bg-gradient-to-r from-cosmic-500 to-accent-500 text-white'
                      : 'bg-white text-gray-800 shadow-sm border'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.senderId === currentUser.id ? 'text-white/70' : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>


          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <motion.div 
        className="bg-white border-t p-4"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-cosmic-500 focus:border-transparent resize-none"
                maxLength={500}
              />
              
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-1 text-gray-400 hover:text-cosmic-500 transition-colors"
                >
                  <Smile className="w-5 h-5" />
                </button>
                <button className="p-1 text-gray-400 hover:text-cosmic-500 transition-colors">
                  <Paperclip className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <motion.button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="p-3 bg-gradient-to-r from-cosmic-500 to-accent-500 text-white rounded-2xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
          
          {/* Character Count */}
          <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
            <span></span>
            <span>{newMessage.length}/500</span>
          </div>
        </div>
      </motion.div>

      {/* Emoji Picker Placeholder */}
      <AnimatePresence>
        {showEmojiPicker && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-20 right-4 bg-white rounded-2xl shadow-2xl border p-4 z-10"
          >
            <div className="grid grid-cols-6 gap-2">
              {['😊', '😍', '🥰', '😘', '🌟', '✨', '💫', '🌙', '💖', '💕', '🔥', '👍', '🎉', '😂', '😎', '🤗', '💯', '⭐'].map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => {
                    setNewMessage(prev => prev + emoji)
                    setShowEmojiPicker(false)
                    inputRef.current?.focus()
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg text-lg transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
