'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Deal } from '@/types';

interface DealCardProps {
  deal: Deal;
  index: number;
}

export default function DealCard({ deal, index }: Readonly<DealCardProps>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
    >
      <Link href={`/deals/${deal._id}`}>
        <div className="bg-white rounded-xl shadow-md overflow-hidden h-full border border-gray-100 hover:border-primary-200 transition-all cursor-pointer">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-400 px-6 py-4 relative">
            {deal.isLocked && (
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-white text-sm font-semibold">🔒 Verified</span>
              </div>
            )}
            <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">
              {deal.title}
            </h3>
            <p className="text-primary-100 text-sm">{deal.partnerName}</p>
          </div>

          {/* Body */}
          <div className="p-6">
            <div className="mb-4">
              <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-lg text-sm font-semibold">
                {deal.discountValue}
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {deal.description}
            </p>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 capitalize">
                {deal.category.replace('-', ' ')}
              </span>
              {deal.claimLimit && (
                <span className="text-gray-500">
                  {deal.claimLimit - deal.currentClaims} left
                </span>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 pb-6">
            <motion.div
              className="w-full py-2 text-center bg-primary-600 text-white font-semibold rounded-lg"
              whileHover={{ backgroundColor: '#0369a1' }}
            >
              View Details
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
