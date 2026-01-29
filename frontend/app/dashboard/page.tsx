'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

interface Claim {
  _id: string;
  deal: {
    _id: string;
    title: string;
    partnerName: string;
    discountValue: string;
    category: string;
  } | null;
  status: string;
  claimCode?: string;
  createdAt: string;
  approvedAt?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, token, logout } = useAuth();
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !token) {
      router.push('/login');
      return;
    }
    fetchClaims();
  }, [user, token]);

  const fetchClaims = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/claims/my-claims`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setClaims(data.data);
      }
    } catch (error) {
      console.error('Error fetching claims:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-xl text-gray-600">Welcome back, {user.name}!</p>
        </motion.div>

        {/* User Info Card */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h2>
              <p className="text-gray-600 mb-1">{user.email}</p>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500 capitalize">
                  {user.role?.replace('-', ' ')}
                </span>
                {user.companyName && (
                  <>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-500">{user.companyName}</span>
                  </>
                )}
              </div>
              <div className="mt-2">
                {user.isVerified ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                    ✓ Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700">
                    ⚠ Unverified
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={logout}
              className="mt-4 md:mt-0 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              Logout
            </button>
          </div>
        </motion.div>

        {/* Claims Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">My Claimed Deals</h2>
            <span className="text-gray-600">{claims.length} total</span>
          </div>

          {loading && (
            <div className="grid grid-cols-1 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl h-32 animate-pulse" />
              ))}
            </div>
          )}

          {!loading && claims.length === 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <p className="text-xl text-gray-600 mb-4">No claimed deals yet</p>
              <a
                href="/deals"
                className="inline-block px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition"
              >
                Browse Deals
              </a>
            </div>
          )}

          {!loading && claims.length > 0 && (
            <div className="grid grid-cols-1 gap-4">
              {claims.map((claim, index) => {
                if (!claim.deal) {
                  return null; // Skip claims with deleted deals
                }
                
                return (
                  <motion.div
                    key={claim._id}
                    className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {claim.deal.title}
                        </h3>
                        <p className="text-gray-600 mb-2">{claim.deal.partnerName}</p>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="text-sm font-semibold text-primary-600">
                            {claim.deal.discountValue}
                          </span>
                          <span className="text-gray-300">•</span>
                          <span className="text-sm text-gray-500 capitalize">
                            {claim.deal.category.replace('-', ' ')}
                          </span>
                          <span className="text-gray-300">•</span>
                          <span className="text-sm text-gray-500">
                            Claimed {new Date(claim.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        {claim.claimCode && (
                          <div className="mt-3 bg-gray-50 px-3 py-2 rounded-lg inline-block">
                            <span className="text-sm text-gray-600">Code: </span>
                            <span className="text-sm font-mono font-bold text-gray-900">
                              {claim.claimCode}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="mt-4 md:mt-0">
                        <span
                          className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                            claim.status
                          )}`}
                        >
                          {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
