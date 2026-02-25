import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  FolderOpen,
  MessageSquare,
  Newspaper,
  Mail,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const menuItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'الرئيسية', exact: true },
  { path: '/admin/content', icon: FileText, label: 'إدارة المحتوى', exact: false },
  { path: '/admin/services', icon: Briefcase, label: 'الخدمات', exact: false },
  { path: '/admin/projects', icon: FolderOpen, label: 'المشاريع', exact: false },
  { path: '/admin/testimonials', icon: MessageSquare, label: 'آراء العملاء', exact: false },
  { path: '/admin/news', icon: Newspaper, label: 'الأخبار', exact: false },
  { path: '/admin/messages', icon: Mail, label: 'الرسائل', exact: false },
];

const pageTitles: Record<string, string> = {
  '/admin': 'لوحة التحكم',
  '/admin/content': 'إدارة المحتوى',
  '/admin/services': 'الخدمات',
  '/admin/projects': 'المشاريع',
  '/admin/testimonials': 'آراء العملاء',
  '/admin/news': 'الأخبار',
  '/admin/messages': 'الرسائل',
};

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const location = useLocation();
  const currentTitle = pageTitles[location.pathname] || 'لوحة التحكم';

  return (
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">

      {/* ── Sidebar (desktop) ── */}
      <motion.aside
        animate={{ width: sidebarOpen ? 256 : 72 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="hidden lg:flex flex-col shrink-0 bg-white border-l border-gray-200 overflow-hidden shadow-sm"
        style={{ minHeight: '100vh' }}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 shrink-0 rounded-xl bg-gradient-to-br from-green to-orange flex items-center justify-center shadow-md">
              <span className="text-white font-black text-base">غ</span>
            </div>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-gray-900 font-black text-sm leading-tight whitespace-nowrap">شركة الغذاء الليبية</p>
                  <p className="text-gray-400 text-[10px] whitespace-nowrap">لوحة الإدارة</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative ${isActive
                  ? 'text-green bg-green/8'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-xl bg-green/8 border border-green/20"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <item.icon className="w-4 h-4 shrink-0 relative z-10" />
                  <AnimatePresence>
                    {sidebarOpen && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-sm font-semibold whitespace-nowrap relative z-10"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="shrink-0 px-3 py-4 border-t border-gray-100 space-y-1">
          <div className="flex items-center gap-3 px-3 py-2 overflow-hidden">
            <div className="w-8 h-8 shrink-0 rounded-full bg-gradient-to-br from-green to-orange flex items-center justify-center text-white text-xs font-black">
              {user?.username?.[0]?.toUpperCase() || 'A'}
            </div>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-800 text-xs font-bold whitespace-nowrap">{user?.username}</p>
                  <p className="text-gray-400 text-[10px] whitespace-nowrap truncate max-w-[140px]">{user?.email}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm font-semibold whitespace-nowrap"
                >
                  تسجيل الخروج
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 35 }}
            className="fixed inset-y-0 right-0 z-50 w-64 bg-white border-l border-gray-200 flex flex-col shadow-xl lg:hidden"
          >
            <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green to-orange flex items-center justify-center">
                  <span className="text-white font-black">غ</span>
                </div>
                <p className="text-gray-900 font-black text-sm">لوحة الإدارة</p>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-0.5">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${isActive
                      ? 'bg-green/8 text-green border border-green/20'
                      : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                    }`
                  }
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">

        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-all"
            >
              <Menu className="w-4 h-4" />
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span className="text-gray-400">الرئيسية</span>
              <ChevronRight className="w-3 h-3 rotate-180" />
              <span className="text-gray-800 font-bold">{currentTitle}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 hover:text-gray-800 text-xs font-semibold transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>عرض الموقع</span>
            </a>

            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green to-orange flex items-center justify-center text-white text-xs font-black shrink-0">
              {user?.username?.[0]?.toUpperCase() || 'A'}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
