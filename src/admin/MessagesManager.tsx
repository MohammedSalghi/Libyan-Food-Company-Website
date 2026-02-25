import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Trash2, Loader2, CheckCircle, Phone, User } from 'lucide-react';
import api from '../api/axios';

interface Message {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function MessagesManager() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await api.get('/contact');
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      await api.put(`/contact/${id}/read`);
      await fetchMessages();
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذه الرسالة؟')) return;

    try {
      await api.delete(`/contact/${id}`);
      await fetchMessages();
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const openMessage = (message: Message) => {
    setSelectedMessage(message);
    if (!message.is_read) {
      handleMarkAsRead(message.id);
    }
  };

  const unreadCount = messages.filter((m) => !m.is_read).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-green" />
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-dark mb-2">رسائل التواصل</h1>
          <p className="text-gray-500">
            {unreadCount > 0 ? (
              <span className="text-orange font-semibold">
                لديك {unreadCount} رسائل غير مقروءة
              </span>
            ) : (
              'جميع الرسائل مقروءة'
            )}
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100">
          <Mail className="w-5 h-5 text-gray-500" />
          <span className="font-semibold text-dark">{messages.length}</span>
          <span className="text-gray-500">رسالة</span>
        </div>
      </motion.div>

      {/* Messages List */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Messages List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-card overflow-hidden"
        >
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-bold text-dark">قائمة الرسائل</h2>
          </div>
          <div className="divide-y divide-gray-100 max-h-[600px] overflow-auto">
            {messages.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Mail className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>لا توجد رسائل</p>
              </div>
            ) : (
              messages.map((message) => (
                <motion.div
                  key={message.id}
                  onClick={() => openMessage(message)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedMessage?.id === message.id ? 'bg-green/5 border-r-4 border-green' : ''
                  } ${!message.is_read ? 'bg-orange/5' : ''}`}
                  whileHover={{ x: -4 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        message.is_read ? 'bg-gray-100 text-gray-500' : 'bg-orange/10 text-orange'
                      }`}>
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className={`font-semibold ${!message.is_read ? 'text-dark' : 'text-gray-600'}`}>
                          {message.name}
                        </h4>
                        <p className="text-sm text-gray-500 line-clamp-1">{message.message}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!message.is_read && (
                        <span className="w-3 h-3 rounded-full bg-orange" />
                      )}
                      <span className="text-xs text-gray-400">
                        {new Date(message.created_at).toLocaleDateString('ar-LY')}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        {/* Message Detail */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-card overflow-hidden"
        >
          {selectedMessage ? (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-dark">تفاصيل الرسالة</h2>
                <div className="flex gap-2">
                  {!selectedMessage.is_read && (
                    <motion.button
                      onClick={() => handleMarkAsRead(selectedMessage.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 rounded-lg bg-green/10 text-green flex items-center justify-center hover:bg-green/20 transition-colors"
                      title="تحديد كمقروءة"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </motion.button>
                  )}
                  <motion.button
                    onClick={() => handleDelete(selectedMessage.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 rounded-lg bg-red/10 text-red flex items-center justify-center hover:bg-red/20 transition-colors"
                    title="حذف"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">الاسم</p>
                    <p className="font-semibold text-dark">{selectedMessage.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">البريد الإلكتروني</p>
                    <p className="font-semibold text-dark" dir="ltr">
                      {selectedMessage.email}
                    </p>
                  </div>
                </div>

                {selectedMessage.phone && (
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">رقم الهاتف</p>
                      <p className="font-semibold text-dark" dir="ltr">
                        {selectedMessage.phone}
                      </p>
                    </div>
                  </div>
                )}

                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500 mb-2">الرسالة</p>
                  <p className="text-dark leading-relaxed">{selectedMessage.message}</p>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-400 pt-4 border-t border-gray-100">
                  <span>تاريخ الإرسال:</span>
                  <span>{new Date(selectedMessage.created_at).toLocaleString('ar-LY')}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-8 text-gray-400">
              <Mail className="w-16 h-16 mb-4 text-gray-200" />
              <p>اختر رسالة لعرض التفاصيل</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
