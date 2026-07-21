import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, MapPin, CreditCard, Heart, Settings, LogOut, Mail, Phone, Edit2, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Breadcrumb from '../components/ui/Breadcrumb';
import Button from '../components/ui/Button';

const sections = [
  { id: 'personal', label: 'Personal Information', icon: User },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'payments', label: 'Payment Methods', icon: CreditCard },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Profile() {
  const { user, logout, updateProfile } = useAuth();
  const { addToast } = useToast();
  const [active, setActive] = useState('personal');
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: '+1 (555) 000-0000' });

  if (!user) {
    return (
      <div className="page-container py-20 text-center">
        <p className="text-gray-500 dark:text-gray-400 mb-4">Please log in to view your profile.</p>
        <Button to="/login">Login</Button>
      </div>
    );
  }

  const handleSave = () => {
    updateProfile({ name: form.name, email: form.email });
    setEditing(false);
    addToast('Profile updated successfully', 'success');
  };

  return (
    <div className="page-container py-8">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'My Profile' }]} />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-6">
        <aside className="lg:col-span-1">
          <div className="card p-6 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-full bg-gradient-luxury flex items-center justify-center text-white text-xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
              </div>
            </div>
          </div>
          <nav className="card p-2">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active === s.id ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-hover'}`}
              >
                <s.icon className="w-4 h-4" /> {s.label}
              </button>
            ))}
            <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all mt-2 border-t border-gray-100 dark:border-dark-border pt-3">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </nav>
        </aside>

        <div className="lg:col-span-3">
          {active === 'personal' && (
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Personal Information</h2>
                <Button size="sm" variant="secondary" onClick={() => setEditing(!editing)}>
                  {editing ? 'Cancel' : <><Edit2 className="w-3.5 h-3.5" /> Edit</>}
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
                  <input disabled={!editing} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={`input-field ${!editing ? 'opacity-60' : ''}`} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                  <input disabled={!editing} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={`input-field ${!editing ? 'opacity-60' : ''}`} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone</label>
                  <input disabled={!editing} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={`input-field ${!editing ? 'opacity-60' : ''}`} />
                </div>
              </div>
              {editing && <div className="flex justify-end mt-6"><Button onClick={handleSave}>Save Changes</Button></div>}
            </div>
          )}
          {active === 'addresses' && (
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Saved Addresses</h2>
                <Button size="sm"><Plus className="w-4 h-4" /> Add New</Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-gray-200 dark:border-dark-border rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="tag bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">Default</span>
                    <button className="text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">123 Luxury Avenue<br />New York, NY 10001<br />United States</p>
                </div>
              </div>
            </div>
          )}
          {active === 'payments' && (
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Payment Methods</h2>
                <Button size="sm"><Plus className="w-4 h-4" /> Add Card</Button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-4 border border-gray-200 dark:border-dark-border rounded-xl p-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-luxury flex items-center justify-center"><CreditCard className="w-5 h-5 text-white" /></div>
                  <div className="flex-1"><p className="text-sm font-semibold text-gray-900 dark:text-white">•••• •••• •••• 4242</p><p className="text-xs text-gray-500 dark:text-gray-400">Expires 12/27</p></div>
                  <span className="tag bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">Default</span>
                </div>
              </div>
            </div>
          )}
          {active === 'wishlist' && (
            <div className="card p-6 text-center">
              <Heart className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 mb-4">View your saved items.</p>
              <Button to="/wishlist" variant="secondary">Go to Wishlist</Button>
            </div>
          )}
          {active === 'settings' && (
            <div className="card p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Settings</h2>
              <div className="space-y-4">
                {['Email notifications', 'SMS alerts', 'Marketing emails', 'Order updates'].map((s) => (
                  <div key={s} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{s}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 dark:bg-dark-border rounded-full peer peer-checked:bg-primary-500 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
