import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Award, Globe, Leaf, Gem } from 'lucide-react';
import Button from '../components/ui/Button';
import Breadcrumb from '../components/ui/Breadcrumb';

const values = [
  { icon: Heart, title: 'Love', desc: 'Every piece is crafted with love, inspired by our Finnish heritage.' },
  { icon: Award, title: 'Craftsmanship', desc: 'Uncompromising quality from master artisans across the world.' },
  { icon: Globe, title: 'Sustainability', desc: 'Ethically sourced materials and responsible production.' },
  { icon: Gem, title: 'Exclusivity', desc: 'Limited editions and timeless designs for the discerning few.' },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img src="https://images.pexels.com/photos/8386665/pexels-photo-8386665.jpeg?auto=compress&cs=tinysrgb&w=1920" alt="RAKKA Atelier" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-medium border border-white/20 mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Our Story
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white">The RAKKA Story</h1>
            <p className="text-lg text-white/80 mt-4 max-w-2xl mx-auto">Born from love, crafted for eternity.</p>
          </motion.div>
        </div>
      </section>

      <div className="page-container py-16">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'About' }]} />
      </div>

      {/* Story */}
      <section className="py-16 md:py-20">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-3">Rakkaus — Finnish for Love</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">A Legacy Born from Love</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>RAKKA was founded on a simple yet powerful idea: that true luxury is an expression of love. Our name is inspired by "Rakkaus," the Finnish word for love, reflecting our belief that everything we create should be made with passion, care, and devotion.</p>
                <p>From our ateliers in Florence to our workshops in Geneva and Paris, each RAKKA piece is a testament to the enduring power of human craftsmanship. We work with master artisans who have spent decades perfecting their craft, ensuring every stitch, every setting, and every finish meets the highest standards of excellence.</p>
                <p>Today, RAKKA serves discerning clients in over 120 countries, offering a curated collection of luxury fashion pieces designed to be treasured for generations.</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid grid-cols-2 gap-4">
              <img src="https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Craftsmanship" className="rounded-2xl aspect-[3/4] object-cover" />
              <img src="https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Atelier" className="rounded-2xl aspect-[3/4] object-cover mt-8" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-dark-card">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">What We Stand For</p>
            <h2 className="section-title">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Leaf className="w-10 h-10 text-primary-500 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              To create objects of enduring beauty that celebrate the art of craftsmanship, honor our planet, and bring joy to those who possess them. We believe luxury should be timeless, responsible, and deeply personal.
            </p>
            <div className="mt-8">
              <Button to="/shop" size="lg">Explore the Collection</Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
