import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, ChevronDown } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import Breadcrumb from '../components/ui/Breadcrumb';
import Button from '../components/ui/Button';

const stores = [
  { name: 'New York', address: '712 5th Avenue, New York, NY 10019', phone: '+1 (212) 555-0100', hours: 'Mon-Sat: 10am-8pm, Sun: 11am-7pm' },
  { name: 'Paris', address: '31 Rue Saint-Honoré, 75001 Paris, France', phone: '+33 1 55 55 01 01', hours: 'Mon-Sat: 10am-7pm, Sun: Closed' },
  { name: 'Milan', address: 'Via Montenapoleone 8, 20121 Milano, Italy', phone: '+39 02 5555 0101', hours: 'Mon-Sun: 10am-8pm' },
  { name: 'Tokyo', address: 'Ginza 6-9-5, Chuo City, Tokyo 104-0061', phone: '+81 3 5555 0101', hours: 'Mon-Sun: 11am-9pm' },
];

const faqs = [
  { q: 'How long does shipping take?', a: 'Express shipping delivers in 2-3 business days worldwide. Standard shipping takes 5-7 business days.' },
  { q: 'What is your return policy?', a: 'We offer a 30-day return policy. Items must be in original condition with all tags and packaging intact.' },
  { q: 'Are your products authentic?', a: 'Every RAKKA product comes with a certificate of authenticity and a unique serial number.' },
  { q: 'Do you offer gift wrapping?', a: 'Yes, all orders include complimentary luxury gift packaging. Personalized messages available at checkout.' },
  { q: 'How do I care for my RAKKA product?', a: 'Each product comes with specific care instructions. For general care, store in the provided dust bag away from direct sunlight.' },
  { q: 'Do you offer repairs?', a: 'Yes, we offer repair services for all RAKKA products. Contact our concierge for assistance.' },
];

export default function Contact() {
  const { addToast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    addToast('Message sent! We will respond within 24 hours.', 'success');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="page-container py-8">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />

      <div className="text-center mt-6 mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Get in Touch</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto">Our concierge team is available to assist you with any inquiries, styling advice, or special requests.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="space-y-4">
          {[
            { icon: Mail, title: 'Email', value: 'care@rakka.com', sub: 'We respond within 24 hours' },
            { icon: Phone, title: 'Phone', value: '+1 (800) 725-5272', sub: 'Mon-Fri: 9am-6pm EST' },
            { icon: MapPin, title: 'Headquarters', value: 'New York, USA', sub: '712 5th Avenue, NY 10019' },
            { icon: Clock, title: 'Concierge', value: '24/7 Support', sub: 'Available around the clock' },
          ].map((item, i) => (
            <div key={i} className="card p-5 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 flex-shrink-0">
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.title}</p>
                <p className="text-sm text-gray-900 dark:text-white mt-0.5">{item.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="card p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" placeholder="you@example.com" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Subject</label>
                <input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="input-field" placeholder="How can we help?" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message</label>
                <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} className="input-field resize-none" placeholder="Your message..." />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button type="submit" size="lg"><Send className="w-4 h-4" /> Send Message</Button>
            </div>
          </form>
        </div>
      </div>

      {/* Store Locations */}
      <section className="mt-16">
        <h2 className="section-title mb-8 text-center">Our Boutiques</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stores.map((store, i) => (
            <div key={i} className="card p-5">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">{store.name}</h3>
              <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <p className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" /> {store.address}</p>
                <p className="flex items-center gap-2"><Phone className="w-4 h-4 flex-shrink-0" /> {store.phone}</p>
                <p className="flex items-start gap-2"><Clock className="w-4 h-4 mt-0.5 flex-shrink-0" /> {store.hours}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-16">
        <h2 className="section-title mb-8 text-center">Frequently Asked Questions</h2>
        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="card overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
