import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  FolderOpen,
  MessageSquare,
  Newspaper,
  Mail,
  TrendingUp,
  ArrowUpRight,
  Activity,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

interface Stats {
  services: number;
  projects: number;
  testimonials: number;
  news: number;
  unread_messages: number;
  total_messages: number;
}

const statCards = [
  {
    key: 'services',
    label: 'الخدمات',
    icon: Briefcase,
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    numColor: 'text-blue-700',
    link: '/admin/services',
  },
  {
    key: 'projects',
    label: 'المشاريع',
    icon: FolderOpen,
    bg: 'bg-green/5',
    border: 'border-green/15',
    iconBg: 'bg-green/10',
    iconColor: 'text-green',
    numColor: 'text-green',
    link: '/admin/projects',
  },
  {
    key: 'testimonials',
    label: 'آراء العملاء',
    icon: MessageSquare,
    bg: 'bg-purple-50',
    border: 'border-purple-100',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    numColor: 'text-purple-700',
    link: '/admin/testimonials',
  },
  {
    key: 'news',
    label: 'الأخبار',
    icon: Newspaper,
    bg: 'bg-orange/5',
    border: 'border-orange/15',
    iconBg: 'bg-orange/10',
    iconColor: 'text-orange',
    numColor: 'text-orange',
    link: '/admin/news',
  },
];

const quickActions = [
  { label: 'إضافة خدمة', icon: Briefcase, href: '/admin/services', color: 'bg-blue-500 hover:bg-blue-600', shadow: 'shadow-blue-200' },
  { label: 'إضافة مشروع', icon: FolderOpen, href: '/admin/projects', color: 'bg-green hover:bg-green-dark', shadow: 'shadow-green/30' },
  { label: 'نشر خبر', icon: Newspaper, href: '/admin/news', color: 'bg-orange hover:bg-orange-dark', shadow: 'shadow-orange/30' },
  { label: 'الرسائل الواردة', icon: Mail, href: '/admin/messages', color: 'bg-purple-500 hover:bg-purple-600', shadow: 'shadow-purple-200' },
];

function StatSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 animate-pulse shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-gray-100" />
        <div className="w-4 h-4 rounded bg-gray-100" />
      </div>
      <div className="w-12 h-8 rounded bg-gray-100 mb-2" />
      <div className="w-20 h-3 rounded bg-gray-100" />
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchStats(); }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-7 max-w-7xl" dir="rtl">

      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900">لوحة التحكم</h1>
          <p className="text-gray-500 text-sm mt-1">نظرة عامة على أداء الموقع</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green/8 border border-green/20 rounded-full">
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-green"
          />
          <span className="text-green text-xs font-bold">الموقع نشط</span>
        </div>
      </motion.div>

      {/* Unread messages alert */}
      {stats && stats.unread_messages > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between gap-4 bg-orange/5 border border-orange/20 rounded-2xl px-5 py-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-orange" />
            </div>
            <div>
              <p className="text-gray-800 font-bold text-sm">رسائل جديدة تنتظر ردك</p>
              <p className="text-gray-500 text-xs mt-0.5">
                {stats.unread_messages} غير مقروءة من أصل {stats.total_messages} رسائل
              </p>
            </div>
          </div>
          <Link
            to="/admin/messages"
            className="shrink-0 flex items-center gap-1.5 px-4 py-2 bg-orange text-white text-xs font-bold rounded-xl hover:bg-orange-dark transition-colors shadow-sm"
          >
            <span>عرض الرسائل</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? Array(4).fill(0).map((_, i) => <StatSkeleton key={i} />)
          : statCards.map((card, index) => (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <Link
                to={card.link}
                className={`flex flex-col p-5 rounded-2xl border ${card.bg} ${card.border} hover:shadow-md transition-all duration-300 group bg-white shadow-sm`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center`}>
                    <card.icon className={`w-5 h-5 ${card.iconColor}`} />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
                </div>
                <p className={`text-3xl font-black ${card.numColor} mb-1`}>
                  {stats?.[card.key as keyof Stats] ?? '—'}
                </p>
                <p className="text-gray-500 text-xs font-semibold">{card.label}</p>
              </Link>
            </motion.div>
          ))
        }
      </div>

      {/* Bottom row */}
      <div className="grid lg:grid-cols-3 gap-5">

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-5">
            <Zap className="w-4 h-4 text-yellow-500" />
            <h2 className="text-gray-900 font-black text-base">إجراءات سريعة</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, i) => (
              <motion.div key={i} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to={action.href}
                  className={`flex items-center gap-3 p-4 rounded-xl text-white text-sm font-bold shadow-md ${action.color} ${action.shadow} transition-all`}
                >
                  <action.icon className="w-4 h-4 shrink-0" />
                  {action.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col"
        >
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-green" />
            <h3 className="text-gray-900 font-black text-base">نصائح</h3>
          </div>
          <ul className="space-y-3 flex-1">
            {[
              'حدّث المحتوى دورياً لجذب الزوار',
              'رد على رسائل العملاء بسرعة',
              'أضف صوراً عالية الجودة للمشاريع',
              'راجع الإحصائيات بانتظام',
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-2.5 text-gray-500 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-green mt-1.5 shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
          <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green" />
            <span className="text-gray-400 text-xs">آخر تحديث: منذ قليل</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
