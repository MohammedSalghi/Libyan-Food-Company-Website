import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Save, Loader2 } from 'lucide-react';
import api from '../api/axios';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  order_num: number;
  is_active: boolean;
}

const colorOptions = [
  { value: 'from-amber-500 to-amber-600', label: 'ذهبي', bg: 'bg-amber-50' },
  { value: 'from-blue-500 to-blue-600', label: 'أزرق', bg: 'bg-blue-50' },
  { value: 'from-green-500 to-green-600', label: 'أخضر', bg: 'bg-green-50' },
  { value: 'from-orange-500 to-orange-600', label: 'برتقالي', bg: 'bg-orange-50' },
  { value: 'from-purple-500 to-purple-600', label: 'بنفسجي', bg: 'bg-purple-50' },
  { value: 'from-rose-500 to-rose-600', label: 'وردي', bg: 'bg-rose-50' },
];

const iconOptions = [
  { value: 'Wheat', label: 'قمح' },
  { value: 'Milk', label: 'حليب' },
  { value: 'Package', label: 'صندوق' },
  { value: 'Truck', label: 'شاحنة' },
  { value: 'Warehouse', label: 'مستودع' },
  { value: 'Lightbulb', label: 'فكرة' },
];

export default function ServicesManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'Wheat',
    color: 'from-green-500 to-green-600',
    order_num: 0,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get('/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingService) {
        await api.put(`/services/${editingService.id}`, { ...formData, is_active: true });
      } else {
        await api.post('/services', formData);
      }
      await fetchServices();
      closeModal();
    } catch (error) {
      console.error('Error saving service:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذه الخدمة؟')) return;

    try {
      await api.delete(`/services/${id}`);
      await fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const openModal = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData({
        title: service.title,
        description: service.description,
        icon: service.icon,
        color: service.color,
        order_num: service.order_num,
      });
    } else {
      setEditingService(null);
      setFormData({
        title: '',
        description: '',
        icon: 'Wheat',
        color: 'from-green-500 to-green-600',
        order_num: services.length,
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingService(null);
  };

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
          <h1 className="text-3xl font-bold text-dark mb-2">إدارة الخدمات</h1>
          <p className="text-gray-500">إضافة وتعديل خدمات الموقع</p>
        </div>
        <motion.button
          onClick={() => openModal()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green text-white font-bold hover:bg-green-dark transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>إضافة خدمة</span>
        </motion.button>
      </motion.div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                colorOptions.find(c => c.value === service.color)?.bg || 'bg-gray-100'
              }`}>
                <span className="text-2xl">
                  {service.icon === 'Wheat' && '🌾'}
                  {service.icon === 'Milk' && '🥛'}
                  {service.icon === 'Package' && '📦'}
                  {service.icon === 'Truck' && '🚚'}
                  {service.icon === 'Warehouse' && '🏭'}
                  {service.icon === 'Lightbulb' && '💡'}
                </span>
              </div>
              <div className="flex gap-2">
                <motion.button
                  onClick={() => openModal(service)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center hover:bg-blue-100 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </motion.button>
                <motion.button
                  onClick={() => handleDelete(service.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
            <h3 className="text-lg font-bold text-dark mb-2">{service.title}</h3>
            <p className="text-gray-500 text-sm line-clamp-2">{service.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-dark">
                  {editingService ? 'تعديل خدمة' : 'إضافة خدمة جديدة'}
                </h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-dark">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">العنوان</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green focus:ring-2 focus:ring-green/20 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الوصف</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green focus:ring-2 focus:ring-green/20 outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الأيقونة</label>
                  <div className="grid grid-cols-3 gap-2">
                    {iconOptions.map((icon) => (
                      <button
                        key={icon.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, icon: icon.value })}
                        className={`p-3 rounded-xl border-2 transition-all ${
                          formData.icon === icon.value
                            ? 'border-green bg-green/10'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="text-2xl block mb-1">
                          {icon.value === 'Wheat' && '🌾'}
                          {icon.value === 'Milk' && '🥛'}
                          {icon.value === 'Package' && '📦'}
                          {icon.value === 'Truck' && '🚚'}
                          {icon.value === 'Warehouse' && '🏭'}
                          {icon.value === 'Lightbulb' && '💡'}
                        </span>
                        <span className="text-xs">{icon.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">اللون</label>
                  <div className="flex flex-wrap gap-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, color: color.value })}
                        className={`px-4 py-2 rounded-xl border-2 transition-all ${
                          formData.color === color.value
                            ? 'border-green bg-green/10'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${color.value} inline-block ml-2`} />
                        {color.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <motion.button
                    type="button"
                    onClick={closeModal}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-colors"
                  >
                    إلغاء
                  </motion.button>
                  <motion.button
                    type="submit"
                    disabled={saving}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green text-white font-bold hover:bg-green-dark transition-colors disabled:opacity-50"
                  >
                    {saving ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        <span>حفظ</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
