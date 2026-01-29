'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Hero3D from '@/components/Hero3D';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with 3D Element */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-100">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <Hero3D />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.span
              className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-primary-700 bg-primary-100 rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              🚀 Exclusive Benefits for Startups
            </motion.span>

            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Premium SaaS Tools
              <br />
              <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                Without Premium Prices
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Access exclusive deals and discounts on cloud services, marketing tools,
              analytics platforms, and productivity software. Built for founders,
              early-stage teams, and indie hackers.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <Link
                href="/deals"
                className="group relative px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg overflow-hidden transition-all hover:bg-primary-700 hover:shadow-xl hover:scale-105"
              >
                <span className="relative z-10">Explore Deals</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <Link
                href="/register"
                className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg border-2 border-primary-600 transition-all hover:bg-primary-50 hover:shadow-lg hover:scale-105"
              >
                Get Started Free
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {[
              { id: 'deals', value: '50+', label: 'Exclusive Deals' },
              { id: 'value', value: '$100k+', label: 'Value Unlocked' },
              { id: 'startups', value: '1000+', label: 'Startups Helped' },
            ].map((stat) => (
              <motion.div
                key={stat.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to access premium tools at startup-friendly prices
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: 'curated',
                icon: '🎯',
                title: 'Curated Deals',
                description: 'Hand-picked exclusive offers from top SaaS providers',
              },
              {
                id: 'verified',
                icon: '🔒',
                title: 'Verified Access',
                description: 'Special locked deals for verified startup founders',
              },
              {
                id: 'instant',
                icon: '⚡',
                title: 'Instant Claims',
                description: 'Claim deals instantly and start saving right away',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.id}
                className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-2xl border border-primary-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-400">
        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Saving?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of startups already benefiting from exclusive deals
          </p>
          <Link
            href="/register"
            className="inline-block px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg transition-all hover:bg-primary-50 hover:shadow-2xl hover:scale-105"
          >
            Create Free Account
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
